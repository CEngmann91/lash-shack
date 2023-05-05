import { useLocation } from 'react-router-dom'
import Routers from '../../routers/Routers'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'
import { useApplicationActions } from '../../redux/hooks/useApplicationActions'
import { DashboardNavbar, DashboardWrapper } from '../Dashboard'
import AuthModal from '../AuthModal/AuthModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    const location = useLocation();
    const { isLoading, isShowingAuthModal } = useApplicationActions();
    


    return (
        location.pathname.includes("dashboard")
            ?
            <>
                <DashboardWrapper>
                    <DashboardNavbar />
                    <Routers />
                    <Footer />
                </DashboardWrapper>

                <ToastContainer />
                <LoadingScreen visible={isLoading()} />
            </>
            :
            <>
                <Navbar />
                <Routers />
                <Footer />

                <AuthModal visible={isShowingAuthModal()} />
                <ToastContainer />
                <LoadingScreen visible={isLoading()} />
            </>
    )
}

export default Layout