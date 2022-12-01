import React, { useEffect, useState } from "react";
import { REACT_APP_STORAGE_GALLERY_DIRECTORY } from "../../constants/firebase";
import { getImages } from "../firebase/firebase";

export const useGalleryPhotos = () => {
    const [gallery, setGallery] = useState<string[]>([]);


    const fetchGalleryPhotos = async () => {
        // setIsLoading(true)

        await getImages(REACT_APP_STORAGE_GALLERY_DIRECTORY as string)
            .then(imgResult => {
                setGallery(imgResult);
                // setIsLoading(false);
                console.log("getImages - ", imgResult);
            })
            .catch(error => {
                // setIsLoading(false);
                // setError(error);
                console.log(error);
            });
    }

    useEffect(() => {
        fetchGalleryPhotos();
    }, [])

    return { gallery };
}