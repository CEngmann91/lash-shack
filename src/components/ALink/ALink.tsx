import React from 'react'

type ALinkProp = {
  className?: string;
  path?: string;
  children?: React.ReactNode;
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
function ALink({ children, path, className, onClick }: ALinkProp) {
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