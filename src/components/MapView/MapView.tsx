import './MapView.scss';
import React, { useEffect, useState } from 'react'
import MyIFrame from '../MyIFrame/MyIFrame';

interface iProps {
  source: string;
  className?: string;
}
const MapView: React.FC<iProps> = ({ source, className, ...props }: iProps) => {

  return (
    <MyIFrame mainClassName={`map-responsive ${className}`} source={source} />
  );
}

export default MapView