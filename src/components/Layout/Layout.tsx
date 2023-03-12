import { useLocation } from 'react-router-dom'
import Routers from '../../routers/Routers'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'
import { useApplicationActions } from '../../redux/hooks/useApplicationActions'
import { DashboardNavbar, DashboardWrapper } from '../Dashboard'

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