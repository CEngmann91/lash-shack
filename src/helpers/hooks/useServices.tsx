import React, { useEffect, useState } from "react";
import { REACT_APP_FIRESTORE_SERVICES_COLLECTION, REACT_APP_FIRESTORE_SERVICES_DOCUMENT } from "../../constants/firebase";
import { iService } from "../../pages/Services/Services";
import { getDocument } from "../firebase/firestore";

export const useServices = () => {
    const [services, setServices] = useState<iService[]>([
        {
            active: true,
            id: 0,
            name: 'Eyelash Extensions Full Sets',
            options: [
                {
                    name: "Classic Semi-Permanent",
                    price: 45,
                    duration: 60
                },
                {
                    name: "YY Express",
                    price: 45,
                    duration: 60
                }
            ]
        },
        {
            active: true,
            id: 1,
            name: 'Eyelash Extensions Infills',
            options: [
            ]
        }
    ]);


    const fetchServices = async () => {
        // setIsLoading(true);

        getDocument(REACT_APP_FIRESTORE_SERVICES_COLLECTION as string,
            REACT_APP_FIRESTORE_SERVICES_DOCUMENT as string)
            .then(res => {
                const array: iService[] = res['content'];
                let sorted = array.sort((a, b) => a.id - b.id);
                setServices(sorted);

                // setIsLoading(false);
            })
            .catch(error => {
                // setIsLoading(false);
                // setError(error);
                // return;
            });
    }

    useEffect(() => {
        // fetchServices();
    }, [])

    return { services };
}