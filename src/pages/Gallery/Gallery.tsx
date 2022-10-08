import './Gallery.scss';
import React from 'react'


interface iImage {
  id: number;
  source: string;
}

const images: iImage[] = [
  {
    id: 0,
    source: 'https://source.unsplash.com/VWcPlbHglYc',
  },
  {
    id: 1,
    source: 'https://source.unsplash.com/e6FMMambeO4'
  },
  {
    id: 2,
    source: 'https://source.unsplash.com/klCiPmzUw0Y'
  },
  {
    id: 3,
    source: 'https://source.unsplash.com/IdNOTjPeHrE'
  },
  {
    id: 4,
    source: 'https://source.unsplash.com/O0N9MF--hK4'
  },
  {
    id: 5,
    source: 'https://source.unsplash.com/FV3GConVSss'
  },
  {
    id: 6,
    source: 'https://source.unsplash.com/0ESjL-Nw22Y'
  },
  {
    id: 7,
    source: 'https://source.unsplash.com/KTVn62x6fFw'
  },
  {
    id: 8,
    source: 'https://source.unsplash.com/VSeVhmW4_JQ'
  }
]

const Gallery = () => {

  return (
    <div className='app__gallery'>
      {/* Gallery */}
      <div className="container">
        <p>Gallery</p>

        <ul className="image-gallery">
          {images.map(({ id, source }) => (
            <li id={id.toString()}>
              <img src={source} alt="" />
              {/* <div className="overlay"><span>Image title</span></div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Gallery