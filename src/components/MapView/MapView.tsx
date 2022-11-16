import './MapView.scss';
import React from 'react'

interface iProps {
  // height?: string | number;
}
const MapView: React.FC<iProps> = ({ ...props }: iProps) => {
  
  return (
    <div className="map-responsive">
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.2194368048818!2d0.1739251796953675!3d51.57855856568328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a4b87d9ae185%3A0x86c325f6401e3d5b!2sSun%20Chasers!5e1!3m2!1sen!2suk!4v1668589047803!5m2!1sen!2suk"
              // width="600"
              // height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen={false}
              aria-hidden="false"
              tabIndex={0}
            />
    </div>
  )
}

export default MapView