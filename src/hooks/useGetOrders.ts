import { useMemo } from 'react'
import { PurchaseOrder } from '../types/PurchaseOrder';
import useFirestoreData from './useFirestoreData';

const useGetOrders = (userID:string | null = null) => {
    const { data, loadingData, error, collectionRef } = useFirestoreData("orders");


    const orders = useMemo(() => {
        // Removes the empty document.
        const filtered = data?.filter(item => item.id !== "NONE") as PurchaseOrder[];
        const sorted = filtered?.sort((a, b) => {
            return new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime()
        }).reverse();

        return sorted;
    }, [data]);

    const loadingOrders = useMemo(() => loadingData, [loadingData]);

    const ordersError = useMemo(() =>  error, [error]);

    const getOrdersFromCurrentUser = useMemo(() => orders?.filter(item => item.customerID === userID), [userID]);

    const totalOrderAmountFromCurrentUser = useMemo(() => {
        if (!getOrdersFromCurrentUser || getOrdersFromCurrentUser?.length === 0) return 0;

        const total = getOrdersFromCurrentUser?.reduce((acc, curr) => acc + curr.total, 0);
        return total;
    }, [userID]);

    const totalOrderAmount = useMemo(() => orders?.reduce((acc, curr) => acc + curr.total, 0), [data]);

    const totalOrderAmountThisMonth = useMemo(() => {
        const dateTimeNow = new Date().toLocaleString('en-GB');
        // console.log("dateTimeNow - ", dateTimeNow);
        const sliced = dateTimeNow.slice(0, -10);
        // Split it by the separator provided.
        const dateSplit = sliced.split("/");
        const month = dateSplit[1];
        const year = dateSplit[2];
        // console.log("month: ", month, " - year: ", year);
        const filtered = orders?.filter(item => {
            const itemDateSplit = item.date.split("/");
            const itemMonth = itemDateSplit[1];
            const itemYear = itemDateSplit[2];
            return itemMonth === month && itemYear === year;
        });
        const total = filtered?.reduce((acc, curr) => acc + curr.total, 0);
        return total;
    }, [data]);
    

    return { loadingOrders, ordersError, orders, getOrdersFromCurrentUser, totalOrderAmountFromCurrentUser, totalOrderAmount, totalOrderAmountThisMonth }
}

export default useGetOrders