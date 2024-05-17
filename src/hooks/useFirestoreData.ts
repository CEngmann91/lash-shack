import { useCallback, useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';
import { collection, DocumentData, getDocs, onSnapshot } from 'firebase/firestore';

interface ErrorState {
    code: string;
    message: string;
}
const useFirestoreData = (collectionName: string) => {
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [data, setData] = useState<DocumentData[] | null>(null);
    const [error, setError] = useState<ErrorState | null>(null);
    const collectionRef = collection(firestore, collectionName);

    const getData = useCallback(() => {
        setLoadingData(true);

        onSnapshot(collectionRef, (snapshot) => {
            try {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                const err: string = error as string;
                setError({ code: err, message: err });
            } finally {
                setLoadingData(false);
            }
        })
    }, [collectionName]);

    useEffect(() => {
        getData();
    }, [getData])

    return { data, loadingData, error, collectionRef }
}

export default useFirestoreData