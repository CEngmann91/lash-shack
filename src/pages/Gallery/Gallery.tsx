import './Gallery.scss';
import React, { useEffect, useMemo, useState } from 'react'
import GalleryPhoto from './GalleryPhoto/GalleryPhoto';

import { getImages } from '../../helpers/firebase/firebase';
import { REACT_APP_FIRESTORE_GALLERY_COLLECTION, REACT_APP_FIRESTORE_GALLERY_DOCUMENT, REACT_APP_STORAGE_GALLERY_DIRECTORY } from '../../constants/firebase';
import GalleryViewerModal from './GalleryViewerModal/GalleryViewerModal';
import { ActivityIndicator, MyIFrame, Page } from '../../components';
import { getDocument } from '../../helpers/firebase/firestore';

type Size = "" | "horizontal" | "vertical" | "big";
export interface iGalleryPhoto {
  id: number;
  size: Size;
  url: string;
}

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [photos, setPhotos] = useState<iGalleryPhoto[]>([]);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);
  const [selectedImg, setSelectedImg] = useState<string>("");

  // const [hoverChild, setHoverChild] = useState(0);



  const memoizedList = useMemo(() => {
    return (
      photos.map(({ url, size, id }) => (
        <GalleryPhoto key={id} id={id}
          imgSource={url} onClick={() => {
            setSelectedImgIndex(id)
            setSelectedImg(url)
          }}
        />
      ))
    )
  }, [photos]);



  useEffect(() => {
    window.scrollTo(0, 0);

    if (memoizedList)
      fetchImages();
  }, [])


  const fetchImages = async () => {
    setIsLoading(true)

    await getImages(REACT_APP_STORAGE_GALLERY_DIRECTORY as string)
      .then(imgResult => {
        // setFiles(imgResult);
        // setIsLoading(false);
        // console.log("getImages - ", result);


        getDocument(REACT_APP_FIRESTORE_GALLERY_COLLECTION as string,
          REACT_APP_FIRESTORE_GALLERY_DOCUMENT as string)
          .then(docResult => {
            const result = docResult['content'];
    
    
            for (let i = 0; i < imgResult.length; i++) {
              const element = imgResult[i];
              let p: iGalleryPhoto = {
                id: i,
                size: result[i] as Size,
                url: element as string,
              }
              setPhotos(prev => [...prev, p]);
            }
    
    
            setIsLoading(false);
            // console.log("getDocument - ", result);
          })
          .catch(error => {
            setIsLoading(false);
            setError(error);
          });
          


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




            {/* <div className="container">
              {photos.map(({ url, size, id }) => (
                <div className={size}>
                  <img src={url} />
                </div>
              ))}
            </div> */}




            {/* <div className="container">
              {files.map((url, index) => (
                <a href="https://images4.alphacoders.com/819/819837.png" className="big">
                  <img src={url} />
                </a>
              ))}
            </div> */}









            {/* <div className="container">
              <a href="https://images4.alphacoders.com/819/819837.png">
                <img src="https://images4.alphacoders.com/819/819837.png" />
              </a>

              <a href="https://wallpaperaccess.com/full/938178.jpg" className="vertical">
                <img src="https://wallpaperaccess.com/full/938178.jpg" />
              </a>

              <a href="https://c4.wallpaperflare.com/wallpaper/1003/738/330/yakusoku-no-neverland-ray-the-promised-neverland-emma-the-promised-neverland-the-promised-neverland-anime-hd-wallpaper-preview.jpg" className="horizontal">
                <img src="https://c4.wallpaperflare.com/wallpaper/1003/738/330/yakusoku-no-neverland-ray-the-promised-neverland-emma-the-promised-neverland-the-promised-neverland-anime-hd-wallpaper-preview.jpg" />
              </a>

              <a href="https://source.unsplash.com/600x600/?sig=40">
                <MyIFrame source="https://www.youtube.com/embed/W0iCWFwwIaQ" />
              </a>

              <a href="https://images7.alphacoders.com/722/722029.png">
                <img src="https://images7.alphacoders.com/722/722029.png" />
              </a>

              <a href="https://source.unsplash.com/800x800/?sig=7" className="big">
                <img src="https://source.unsplash.com/800x800/?sig=7" />
              </a>

              <a href="https://source.unsplash.com/600x600/?sig=111">
                <img src="https://source.unsplash.com/600x600/?sig=111" />
              </a>

              <a href="https://source.unsplash.com/600x800/?sig=94" className="vertical">
                <img src="https://source.unsplash.com/600x800/?sig=94" />
              </a>

              <a href="https://source.unsplash.com/600x600/?sig=11">
                <img src="https://source.unsplash.com/600x600/?sig=11" />
              </a>

              <a href="https://source.unsplash.com/800x600/?sig=68" className="horizontal">
                <img src="https://source.unsplash.com/800x600/?sig=68" />
              </a>

              <a href="https://source.unsplash.com/600x600/?sig=24">
                <img src="https://source.unsplash.com/600x600/?sig=24" />
              </a>

              <a href="https://source.unsplash.com/800x800/?sig=55" className="big">
                <img src="https://source.unsplash.com/800x800/?sig=55" />
              </a>

              <a href="https://source.unsplash.com/600x600/?sig=56">
                <img src="https://source.unsplash.com/600x600/?sig=56" />
              </a>

              <a href="https://source.unsplash.com/800x600/?sig=186" className="horizontal">
                <img src="https://source.unsplash.com/800x600/?sig=186" />
              </a>

              <a href="https://source.unsplash.com/600x600/?sig=117">
                <img src="https://source.unsplash.com/600x600/?sig=117" />
              </a>
            </div> */}


















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
              <GalleryViewerModal
                selectedPhoto={selectedImg} setSelectedPhoto={setSelectedImg}
                selectedPhotoIndex={selectedImgIndex} setSelectedPhotoIndex={setSelectedImgIndex}
              />
            )}







            {/* <ul className='list'>
                {files.map((url, index) => (
                <li key={index} onMouseEnter={() => setHoverChild(index)}
                  style={{ width: (hoverChild === index ? 'calc(100vw / 4.5)' : "4rem") }}
                >
                  <div className="item">
                    <img src={url} />
                  </div>
                </li>
              ))}
            </ul> */}

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