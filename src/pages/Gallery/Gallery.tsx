import './Gallery.scss';
import React, { useEffect, useState } from 'react'
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import GalleryPhoto from './GalleryPhoto/GalleryPhoto';

import { getImages, storage } from '../../helpers/firebase/firebase';
import { FIREBASE_GALLERY_IMAGES } from '../../constants/firebase';
import GalleryViewerModal from './GalleryViewerModal/GalleryViewerModal';
import { ActivityIndicator, Page } from '../../components';



const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>("");



  useEffect(() => {
    window.scrollTo(0, 0);

    if (files.length == 0) {
      setLoading(true)
      fetchImages();
    }
  }, [])


  const fetchImages = async () => {
    getImages(FIREBASE_GALLERY_IMAGES)
      .then(res => {
        setFiles(res);
        setLoading(false);
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

  return (
    <Page id='gallery' className='app__gallery' header='Love What You See?'>
      {loading ?
        <div className='app__flex app__min-height'>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
        :
        <>
          <div className="container">
            <ul className="image-gallery">
              {files.map((url, index) => (
                // <PhotoFrame key={index} imgSource={url} onClick={() => getImage(url)} />
                <GalleryPhoto key={index} id={index.toString()}
                  imgSource={url} onClick={() => setSelectedImg(url)}
                />
              ))}
            </ul>
          </div>


          {selectedImg.length > 0 && (
            <GalleryViewerModal selectedPhoto={selectedImg} setSelectedPhoto={setSelectedImg} />
          )}
        </>
      }
    </Page>



    // <div className='app__gallery'>
    //   <div className="container">

    //     <ul className="image-gallery">
    //       {files.map((url, index) => (
    //         // <PhotoFrame key={index} imgSource={url} onClick={() => getImage(url)} />
    //         <GalleryPhoto key={index} id={index.toString()}
    //           imgSource={url} onClick={() => setSelectedImg(url)}
    //         />
    //       ))}
    //     </ul>

    //   </div>



    //   {selectedImg.length > 0 && (
    //     <GalleryViewerModal selectedPhoto={selectedImg} setSelectedPhoto={setSelectedImg} />
    //   )}

    // </div>
  )
}

export default Gallery