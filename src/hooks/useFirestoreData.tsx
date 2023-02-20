import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { collection, DocumentData, getDocs, onSnapshot } from 'firebase/firestore';

interface ErrorState {
    code: string;
    message: string;
}
const useFirestoreData = (collectionName: string) => {
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [data, setData] = useState<DocumentData[] | null>(null);
    const [dataError, setDataError] = useState<ErrorState | null>(null);
    const collectionRef = collection(firestore, collectionName);



    useEffect(() => {
        setLoadingData(true);

        try {
            const getData = async () => {

                // Firebase, Firestore realtime data update.
                onSnapshot(collectionRef, (snapshot) => {
                    setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                    setLoadingData(false);
                })
            };
            getData();
        } catch (error) {
            const err: string = error as string;
            setDataError({ code: err, message: err });
            setLoadingData(false);
        }
    }, [collectionName])

    return { data, loadingData, dataError, collectionRef }
}

export default useFirestoreData