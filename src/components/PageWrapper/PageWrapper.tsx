import React from 'react'

type PageWrapperProps = {
  title: string;
  children: React.ReactNode;
}
const PageWrapper = ({ title, children }: PageWrapperProps) => {
  document.title = "Lash Shack - " + title;
  return <div className='w-100'>{children}</div>
}

export default PageWrapper