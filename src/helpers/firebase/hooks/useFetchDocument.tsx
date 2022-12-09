


import React, { useEffect, useState } from "react";
import { getDocument } from "../firestore";

export const useFetchDocument = (collectionName: string, documentName: string) => {
    const [data, setData] = useState();
    const [error, setError] = useState();


    const fetchDocument = async () => {
        getDocument(collectionName as string,
            documentName as string)
            .then(res => {
                setData(res);
            })
            .catch((error) => {
              setError(error);
            });
    }

    useEffect(() => {
        fetchDocument();
    }, [collectionName, documentName])

    return { data, error };
}