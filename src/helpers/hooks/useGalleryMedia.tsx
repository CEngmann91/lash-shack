import React, { useEffect, useState } from "react";
import { REACT_APP_STORAGE_GALLERY_DIRECTORY, REACT_APP_STORAGE_VIDEOS_CLIENT_DIRECTORY } from "../../constants/firebase";
import { getAll } from "../../networking/firebase/firebase";
import { GalleryItem } from "../../pages/Main/Gallery/Gallery";

export const useGalleryMedia = () => {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [galleryError, setGalleryError] = useState<any>();
    const [loadingGallery, setLoadingGallery] = useState(false);


    const fetchGalleryMedia = async () => {
        try {
            setLoadingGallery(true);

            await getAll(REACT_APP_STORAGE_GALLERY_DIRECTORY as string)
                .then(res => {
                    let temp: GalleryItem[] = [];
                    // res.forEach(item => temp.push({ path: item, type: "Image" }));
                    res.map(item => temp.push({ path: item, type: "Image" }))
                    setGallery(temp);


                    // setGallery(res);
                    // console.log("getImages - ", res);
                })
                .catch(error => setGalleryError(error));


            await getAll(REACT_APP_STORAGE_VIDEOS_CLIENT_DIRECTORY as string)
                .then(res => {
                    let temp: GalleryItem[] = [];
                    res.map(item => temp.push({ path: item, type: "Video" }))
                    setGallery(items => items.concat(temp) );


                    // setGallery(items => items.concat(res));
                    // console.log("Videos - ", res);
                })
                .catch(error => setGalleryError(error));
        }
        catch (error) { setGalleryError(error) };

        setLoadingGallery(false);
    }

    useEffect(() => {
        fetchGalleryMedia();
    }, [])

    return { gallery, loadingGallery, galleryError };
}