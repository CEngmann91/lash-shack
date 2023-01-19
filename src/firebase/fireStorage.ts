import { storage } from "./firebase";
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from "firebase/storage";




export const uploadImage = async (
    folder: string, id: string, file: Blob | Uint8Array | ArrayBuffer,
    // onProgress: (value: number) => void
    onSuccess: (url:string) => void
) => {
    let data = "";
    const storageRef = ref(storage, `/${folder}/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        (snapshot) => {
            /* // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                break;
                case 'running':
                    console.log('Upload is running');
                break;
            }
            onProgress(progress);*/
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('uploadImage - Error', error);
            // onError(error);
        },
        async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            await getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    // console.log('File available at', url);
                    data = url;
                    onSuccess(url);
                    // return data;
                });
        }
    );
    // return data;
}