import React from 'react'


interface iProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  className?: string;
  path?: string;
  children?: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}
const ALink: React.FC<iProps> = ({ children, path, className, onClick, ...props}: iProps) => {
  
  return (
    <a href={path}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  )
}

export default ALink