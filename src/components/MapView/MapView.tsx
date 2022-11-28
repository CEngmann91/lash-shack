import './MapView.scss';
import React, { useEffect, useState } from 'react'
import MyIFrame from '../MyIFrame/MyIFrame';

interface iProps {
  source: string;
}
const MapView: React.FC<iProps> = ({ source, ...props }: iProps) => {

  return (
    <MyIFrame mainClassName="map-responsive" source={source} />
  );
}

export default MapView