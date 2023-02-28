import './DashboardWrapper.scss';
import { ReactNode } from 'react'
import { PageWrapper } from '../../../components'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';

type DashboardWrapperProps = {
    title: string;
    className?: string;
    children: ReactNode;
}
const DashboardWrapper = ({ title, className, children }: DashboardWrapperProps) => (
    <PageWrapper title={title} className={`dash__wrapper__main ${className}`}>
        <DashboardSidebar />
        <div className='content'>{children}</div>
    </PageWrapper>
)

export default DashboardWrapper