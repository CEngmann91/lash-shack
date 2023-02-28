import { ReactNode } from 'react'

type PageWrapperProps = {
  title: string;
  className?: string;
  children: ReactNode;
}
const PageWrapper = ({ title, className, children }: PageWrapperProps) => {
  document.title = "Lash Shack - " + title;
  return <div className={`${className} w-100`}>{children}</div>
}

export default PageWrapper