import React, { useEffect, useState } from "react";
import { REACT_APP_STORAGE_GALLERY_DIRECTORY } from "../../constants/firebase";
import { getImages } from "../firebase/firebase";

export const useGalleryPhotos = () => {
    const [gallery, setGallery] = useState<string[]>([]);
    const [galleryError, setGalleryError] = useState<any>();
    const [loadingGallery, setLoadingGallery] = useState(false);


    const fetchGalleryPhotos = async () => {
        try {
            setLoadingGallery(true);

            await getImages(REACT_APP_STORAGE_GALLERY_DIRECTORY as string)
                .then(imgResult => {
                    setGallery(imgResult);
                    setLoadingGallery(false);
                    // console.log("getImages - ", imgResult);
                })
                .catch(error => {
                    setGalleryError(error);
                    setLoadingGallery(false);
                    return;
                });
        }
        catch (error) {
            setGalleryError(error)
        };
    }

    useEffect(() => {
        fetchGalleryPhotos();
    }, [])

    return { gallery, loadingGallery, galleryError };
}