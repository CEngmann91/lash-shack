import './SectionedCard.scss';
import React from 'react'
import Card from '../Card/Card';

type SectionedCardProps = {
  id?: number;
  className?: string;
  reversed?: boolean;
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
  // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
  // onClick?: () => void;
}
function SectionedCard({ id, className, leftChildren, rightChildren, reversed }: SectionedCardProps) {

  return (
    <Card className={`app__sectioned-card ${className}`}>
      {!reversed ?
        <>
          <div className="left-side">{leftChildren}</div>
          <div className="right-side">{rightChildren}</div>
        </>
        :
        <>
          <div className="left-side">{rightChildren}</div>
          <div className="right-side">{leftChildren}</div>
        </>
      }
    </Card>
  )
}

export default SectionedCard