import { useLocation } from 'react-router-dom'
import Routers from '../../routers/Routers'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'
import { DashboardNavbar } from '../../pages/Dashboard'
import { useApplicationActions } from '../../redux/hooks/useApplicationActions'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import DashboardSidebar from '../../pages/Dashboard/DashboardSidebar/DashboardSidebar'

const Layout = () => {
    const location = useLocation();
    const { isLoading } = useApplicationActions();


    return (
        <>
            {location.pathname.includes("dashboard") ? <DashboardNavbar /> : <Navbar />}
            <Routers />
            <Footer />

            <LoadingScreen visible={isLoading()} />
        </>
    )
}

export default Layout