import React, { useEffect, useState } from "react";
import { getDocument } from "../firestore";

export const useFetchDocument = (collectionName: string, documentName: string) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();


    const fetchDocument = async () => {
        setLoading(true);

        try {
            await getDocument(collectionName as string,
                documentName as string)
                .then(res => {
                    setData(res);
                })
                .catch((error) => setError(error));
        }
        catch (error) {
            setError(error)
        };
        
        setLoading(false);
        // return doc;
    }

    useEffect(() => {
        fetchDocument();

        // const cleanup = fetchDocument();
        // return cleanup;
    // }, [collectionName, documentName])
    }, []);

    return { data, loading, error };
}