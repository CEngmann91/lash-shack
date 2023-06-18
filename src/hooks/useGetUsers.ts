import { collection, query, where, getDocs, Timestamp, DocumentData } from "firebase/firestore";
import { useMemo, useState } from 'react'
import { getCurrentUser } from "../firebase/firebaseHelper";
import { UserProfile } from '../types/UserProfile';
import useFirestoreData from './useFirestoreData';

const useGetUsers = (removeCurrentUser: boolean = true) => {
    const { data, loadingData, error } = useFirestoreData("users");
    const [ activeCount, setActiveCount] = useState(0);



    const users = useMemo(() => {
        const sortedUsers = data?.sort((a, b) => a.account.localeCompare(b.account));
        if (removeCurrentUser)
        {
            const filtered = sortedUsers?.filter(item => item?.uid !== getCurrentUser()?.uid) as UserProfile[]
            return filtered;
        }
        return data as UserProfile[];
    }, [data]);

    const activeUsers = useMemo(() => users?.filter(item => item.active == true), [users])

    function getAllUsersInMonth(month: string) {
        if (month && month.length > 3)
            month = month.slice(0, 3);

        const months = getLocalMonthNames();
        const indexof = months.findIndex(m => m.toLowerCase().startsWith(month.toLowerCase()));
        if (indexof != -1)
        {
            const filtered = activeUsers?.filter(item => item.memberSince) as UserProfile[]
        }
        // console.log(indexof)


        // return services.find(item => item.id === id);
    }
    
    const getManagers = useMemo(() => activeUsers?.filter(item => item.account === "Manager"), [users]);

    const getAllStaff = useMemo(() => activeUsers?.filter(item => item.account === "Staff"), [users]);

    const getAllMembersOfLashShack = useMemo(() => {
        if (getManagers && getAllStaff)
            return [...getManagers, ...getAllStaff]
        return [];
    }, [users]);

    const getAllStaffInRomford = useMemo(() => 
        getAllMembersOfLashShack?.filter(item => 
            (item.preferredLocation === "Romford" || item.preferredLocation === "ANY")
    ), [users]);

    const getAllStaffInRomfordNames = useMemo(() => {
        let list : string[] = [];
        getAllStaffInRomford?.map(item => list.push(item.firstName))
        return list;
    }, [users]);

    const getAllStaffInHackney = useMemo(() => 
        getAllMembersOfLashShack?.filter(item => 
            (item.preferredLocation === "Hackney" || item.preferredLocation === "ANY")
    ), [users]);

    const getAllStaffInHackneyNames = useMemo(() => {
        let list : string[] = [];
        getAllStaffInHackney?.map(item => list.push(item.firstName))
        return list;
    }, [users]);

    const getAllAtLashShackBirthdays = useMemo(() => {
        let dates = [] as string[];
        getAllMembersOfLashShack.forEach(staff => dates.push(staff.dob));
        return dates;
    }, [users]);

    const loadingUsers = useMemo(() => loadingData, [loadingData]);

    const usersError = useMemo(() => error, [error]);

    function getLocalMonthNames() {
        let d = new Date(2000, 0); // January
        let months = [];
        for (let i = 0; i < 12; i++) {
            months.push(d.toLocaleString('default', { month: 'long' }));
            d.setMonth(i + 1);
        }
        return months;
    }

    // const getUserByID = (id: string) => data?.find(item => item.id === id);


    /**
     * Returns all users that have logged in today
     */
    // const getActiveUsersToday = useMemo(async () => {
    //     // Get todays date.
    //     const dateTimeNow = new Date().toUTCString();
    //     // Split it by the separator provided.
    //     const split = dateTimeNow.split(" ");
    //     const dayOfWeek = split[0];
    //     const day = split[1];
    //     const month = split[2];
    //     const year = split[3];
    //     // Get the collection from the store.
    //     const collectionRef = collection(firestore, "users");
    //     // const q = query(collectionRef, where("displayName", "==", "Christian Engmann"));
    //     // Only query users that have logged in today.
    //     // Sun, 22 Jan 2023 14:12:53 GMT
    //     const queryDateTime = `${dayOfWeek} ${day} ${month} ${year} 00:00:00 GMT`;
    //     const q = query(collectionRef,
    //         // where("uid", "!=", getCurrentUser()?.uid),
    //         where("lastLoggedIn", ">", queryDateTime),
    //     );
    //     const querySnapshot = await getDocs(q);
    //     let array: DocumentData[] = [];
    //     querySnapshot.forEach((doc) => array = [...array, doc.data()]);
    //     setActiveCount(array?.length);
    //     return array as UserProfile[];
    // }, [users])

    // const getActiveUsersTodayCount = useMemo(() => {
    //     const usersToday = getActiveUsersToday;
    //     usersToday.catch(error => console.log(error));
    //     // return usersToday?.length;

    //     return activeCount;
    // }, [users]);

    return {
        users,
        loadingUsers,
        usersError,
        // getUserByID,
        getAllUsersInMonth,
        getAllMembersOfLashShack, getManagers, getAllStaff,
        getAllAtLashShackBirthdays,
        getAllStaffInRomford, getAllStaffInHackney,
        getAllStaffInRomfordNames, getAllStaffInHackneyNames
        // getActiveUsersToday,
        // getActiveUsersTodayCount,
    }
}

export default useGetUsers