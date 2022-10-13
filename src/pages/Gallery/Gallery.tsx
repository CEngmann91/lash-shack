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
    window.scrollTo(0, 0);

    if (files.length == 0)
      fetchImages();
  }, [])


  const fetchImages = async() => {
    getImages(FIREBASE_GALLERY_IMAGES)
    .then(res => {
      setFiles(res);
      console.log("all done");
    })
    .catch(error => {
      alert(error);
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

  const getImage = (url : string) => {
    alert(url);
  }

  return (
    <div className='app__gallery'>
      <div className="container">

        <ul className="image-gallery">
          {files.map((url, index) => (
            // <PhotoFrame key={index} imgSource={url} onClick={() => getImage(url)} />
            <GalleryPhoto key={index} id={index.toString()} imgSource={url} onClick={() => getImage(url)} />
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Gallery