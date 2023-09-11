// https://codepen.io/chriiss/pen/GRdgzdg
import './Parallax.scss';
import { ReactNode } from 'react'

export interface ParallaxProps {
  className?: string;
  id?: string;
  backgroundUrl?: string;
  blurAmount?: number;
  children: ReactNode;
}
const Parallax = ({ className, id, backgroundUrl, blurAmount = 3, children }: ParallaxProps) => {

  return (
    <div className={`parallax-container ${className}`} id={id} >
      <section
        className="section-background"
        // style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {children}
      </section>
    </div>
  );
}

export default Parallax