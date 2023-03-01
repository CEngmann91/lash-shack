import { collection, query, where, getDocs, Timestamp, DocumentData } from "firebase/firestore";
import { useMemo, useState } from 'react'
import { getCurrentUser } from "../helpers/firebase/firebaseHelper";
import { UserProfile } from '../types/UserProfile';
import useFirestoreData from './useFirestoreData';

const useGetUsers = (removeCurrentUser: boolean = true) => {
    const { data, loadingData, dataError } = useFirestoreData("users");
    const [ activeCount, setActiveCount] = useState(0);



    const users = useMemo(() =>
    {
        const sortedUsers = data?.sort((a, b) => a.account.localeCompare(b.account));
        if (removeCurrentUser)
        {
            const filtered = sortedUsers?.filter(item => item.uid !== getCurrentUser().uid)
            return filtered as UserProfile[]
        }
        return data as UserProfile[];
    }

    // {
    //     const sortedUsers = [...(data as UserProfile[])].sort((a, b) => a.account.localeCompare(b.account));
    //     return sortedUsers;
   
    // }

    // data as UserProfile[]
    , [data]);

    const activeUsers = useMemo(() => users?.filter(item => item.active == true), [users])

    const loadingUsers = useMemo(() => loadingData, [loadingData]);

    const getUsersError = useMemo(() => dataError, [dataError]);

    const getAllStaff = useMemo(() => activeUsers?.filter(item => item.account === "Staff"), [users]);


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
        getUsersError,
        // getUserByID,
        getAllStaff,
        // getActiveUsersToday,
        // getActiveUsersTodayCount,
    }
}

export default useGetUsers