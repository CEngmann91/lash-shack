import { useEffect, useMemo, useState } from 'react'
import { getAllDownloadURLRef } from '../firebase/firebaseHelper';

const useGetGallery = () => {
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [photos, setPhotos] = useState<string[] | null>(null);


    useEffect(() => {
        if (photos)
            return;
        
        setLoadingData(true);
        
        try {
            getAllDownloadURLRef('gallery')
                .then((urls: string[]) => {
                    setPhotos(urls);
                })
        } catch (error) {
            setLoadingData(false);
        }
    }, [])

    return { photos, loadingData }









    // const [imagePaths, setImagePaths] = useState<string[] | null>(null);

    // const photos = useMemo(async () => {
    //     if (!imagePaths)
    //         await getAllDownloadURLRef('gallery')
    //             .then((urls: string[]) => {
    //                 // alert("urls.length - " + urls.length);
    //                 setImagePaths(urls);
    //                 // return urls;
    //                 alert("urls.length - " + urls.length);
    //             })
    //     return imagePaths;
    // }, []);

    // return { photos }
}

export default useGetGallery