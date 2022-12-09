import './MapView.scss';
import React, { useEffect, useState } from 'react'
import MyIFrame from '../MyIFrame/MyIFrame';

type MapViewProps = {
  source: string
  className?: string
}
function MapView({ source, className }: MapViewProps) {

  return (
    <MyIFrame mainClassName={`map-responsive ${className}`} source={source} />
  );
}
export default MapView;