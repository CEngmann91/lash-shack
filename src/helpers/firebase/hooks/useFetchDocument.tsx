


import React, { useEffect, useState } from "react";
import { getDocument } from "../firestore";

export const useFetchDocument = (collectionName: string, documentName: string) => {
    const [data, setData] = useState();
    const [error, setError] = useState();


    const fetchDocument = async () => {
        const doc = await getDocument(collectionName as string,
            documentName as string)
            .then(res => {
                setData(res);
            })
            .catch((error) => setError(error));

        return doc;
    }

    useEffect(() => {
        fetchDocument();

        // const cleanup = fetchDocument();
        // return cleanup;
    }, [collectionName, documentName])

    return { data, error };
}