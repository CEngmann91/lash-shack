import './Gallery.scss';
import React, { useEffect, useState } from 'react'
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import GalleryPhoto from './GalleryPhoto/GalleryPhoto';

import { getImages, storage } from '../../helpers/firebase/firebase';
import { getStorage, list, listAll, ref, getDownloadURL } from 'firebase/storage';
import { FIREBASE_GALLERY_IMAGES } from '../../constants/firebase';



const Gallery = () => {
  const [files, setFiles] = useState<string[]>([]);



  useEffect(() => {
    fetchImages();
  }, [])


  const fetchImages = async() => {
    getImages(FIREBASE_GALLERY_IMAGES)
    .then(res => {
      setFiles(res);
      console.log("all done");
    });



    // // Create a reference under which you want to list
    // const imageListRef = ref(storage, FIREBASE_GALLERY_IMAGES);

    // listAll(imageListRef)
    //   .then((result) => {
    //     let promises = result.items.map((item) =>{
    //       return getDownloadURL(item)
    //     });
    //     Promise.all(promises).then(urls => {
    //       setFiles(urls);
    //       console.log("all done");
    //     });
    //   });
  }


  return (
    <div className='app__gallery'>
      <div className="container">

        {/* <PhotoFrame imgSource={images[0].source} onClick={() => alert("touched")} /> */}

        <ul className="image-gallery">
          {files.map((url, index) => (
            <GalleryPhoto key={index} id={index.toString()} imgSource={url} onClick={() => {
              alert(url)
            }} />
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Gallery