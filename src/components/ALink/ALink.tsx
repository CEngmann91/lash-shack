import React from 'react'

interface iProp {
  className?: string;
  path?: string;
  children?: React.ReactNode;
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
const ALink: React.FC<iProp> = ({ children, path, className, onClick, ...props }: iProp) => {
  return (
    <a href={path}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default ALink