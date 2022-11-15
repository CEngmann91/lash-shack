import './Gallery.scss';
import React, { useEffect, useMemo, useState } from 'react'
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame';
import GalleryPhoto from './GalleryPhoto/GalleryPhoto';

import { getImages, storage } from '../../helpers/firebase/firebase';
import { REACT_APP_STORAGE_GALLERY_DIRECTORY } from '../../constants/firebase';
import GalleryViewerModal from './GalleryViewerModal/GalleryViewerModal';
import { ActivityIndicator, Page } from '../../components';


const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

    if (memoizedList.length == 0)
      fetchImages();
  }, [])


  const fetchImages = async () => {
    setIsLoading(true)

    await getImages(REACT_APP_STORAGE_GALLERY_DIRECTORY as string)
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
        {/* <p>Error is: {error}</p> */}
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
            <h1 className="error">{error}</h1>
          </div>
          :
          <>
            {/* <div className="border"> */}
              {/* <div className="grid">
                {files.map((url, index) => (
                  <div key={index}>
                    <GalleryPhoto id={index.toString()}
                      imgSource={url} onClick={() => setSelectedImg(url)}
                    />
                  </div>
                ))} */}

                {/* <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
                <div>Item 5</div>
                <div>Item 6</div>
                <div>Item 7</div>
                <div>Item 8</div> */}
              {/* </div> */}


              {/* <div className="grid">
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
                <div>Item 5</div>
                <div>Item 6</div>
              </div> */}
            {/* </div> */}




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