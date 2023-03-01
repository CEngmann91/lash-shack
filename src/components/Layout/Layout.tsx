import { useLocation } from 'react-router-dom'
import Routers from '../../routers/Routers'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'
import { DashboardNavbar, DashboardWrapper } from '../../pages/Dashboard'
import { useApplicationActions } from '../../redux/hooks/useApplicationActions'
import DashboardSidebar from '../../pages/Dashboard/DashboardSidebar/DashboardSidebar'
import NavbarItem from '../navbar/NavbarItem/NavbarItem'
import { NAVIGATION } from '../../constants/constants'

const Layout = () => {
    const location = useLocation();
    const { isLoading } = useApplicationActions();


    return (
        location.pathname.includes("dashboard")
            ?
            <>
                <DashboardWrapper>
                    <DashboardNavbar />
                    <Routers />
                    <Footer />
                </DashboardWrapper>


                <LoadingScreen visible={isLoading()} />
            </>
            :
            <>
                <Navbar />
                <Routers />
                <Footer />

                <LoadingScreen visible={isLoading()} />
            </>



        // <>
        //     {location.pathname.includes("dashboard") ? <DashboardNavbar /> : <Navbar />}
        //     <Routers />
        //     <Footer />

        //     <LoadingScreen visible={isLoading()} />
        // </>
    )
}

export default Layout