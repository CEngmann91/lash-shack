import './Gallery.scss';
import React, { useEffect, useMemo, useState } from 'react'
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import GalleryPhoto from './GalleryPhoto/GalleryPhoto';

import { getImages, storage } from '../../helpers/firebase/firebase';
import { FIREBASE_GALLERY_IMAGES } from '../../constants/firebase';
import GalleryViewerModal from './GalleryViewerModal/GalleryViewerModal';
import { ActivityIndicator, Page } from '../../components';



const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState("");


  const memoizedList = useMemo(() => {
    return (
      files.map((url, index) => (
        // <PhotoFrame key={index} imgSource={url} onClick={() => getImage(url)} />
        <GalleryPhoto key={index} id={index.toString()}
          imgSource={url} onClick={() => setSelectedImg(url)}
        />
      ))
    )
  }, [files]);




  useEffect(() => {
    window.scrollTo(0, 0);

    if (!files)
      fetchImages();


    /*console.log("files.length - ", files.length);
    if (files.length == 0) {
      setLoading(true)
      fetchImages();


      // let loadTimer = setTimeout(() => {
      // }, 5000);

      // return () => {
      //   clearTimeout(loadTimer);
      // };

    }*/
  }, [])


  const fetchImages = async () => {
    setIsLoading(true)

    getImages(FIREBASE_GALLERY_IMAGES)
      .then(res => {
        setFiles(res);
        setIsLoading(false);
        // console.log("all done");
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }


  if (isLoading) {
    return (
      <Page id='gallery' className='app__gallery' header='Love What You See?'>
        <div className='app__flex app__min-height'>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
      </Page>
    );
  }

  return (
    <Page id='gallery' className='app__gallery' header='Love What You See?'>
      <>
        {error ?
          <div className='app__flex app__min-height'>
            <li className="error">{error}</li>
          </div>
          :
          <>
            <div className="container">
              <ul className="image-gallery">
                {memoizedList}
              </ul>
            </div>


            {selectedImg.length > 0 && (
              <GalleryViewerModal selectedPhoto={selectedImg} setSelectedPhoto={setSelectedImg} />
            )}
          </>
        }
      </>
      {/* } */}
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