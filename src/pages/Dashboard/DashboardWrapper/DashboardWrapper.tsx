import './DashboardWrapper.scss';
import { ReactNode } from 'react'
import { PageWrapper } from '../../../components'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import { useMyLocation } from '../../../hooks/useMyLocation';

type DashboardWrapperProps = {
    className?: string;
    children: ReactNode;
}
const DashboardWrapper = ({ className, children }: DashboardWrapperProps) => {
    const { getLocationTitle } = useMyLocation();

    return (
        <PageWrapper title={getLocationTitle()} className={`dash__wrapper__main ${className}`}>
            <DashboardSidebar />
            <div className='content'>{children}</div>
        </PageWrapper>
    )
}

export default DashboardWrapper