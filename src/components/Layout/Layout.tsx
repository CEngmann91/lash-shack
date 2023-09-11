import { useLocation } from 'react-router-dom'
import Routers from '../../routers/Routers'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'
import { useApplicationActions } from '../../redux/hooks/useApplicationActions'
import { DashboardNavbar, DashboardWrapper } from '../../0DELETE/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthModal, GeoStoreModal, SubscribeModal } from '../Modals'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const Layout = () => {
    const location = useLocation();
    const { isLoading, isShowingAuthModal } = useApplicationActions();
    // const [isFirstTime, setIsFirstTime] = useLocalStorage('isFirstTime', true)
    // const [showSubscription, setShowSubscription] = useState(false);


    // useEffect(() => {
    //     let id: NodeJS.Timeout;
    //     if (isFirstTime)
    //     {
    //         id = setTimeout(() => setShowSubscription(true), 7000);
    //         setIsFirstTime(false);
    //     }
    //     return function cleanup() {
    //         clearTimeout(id);
    //     }
    // }, [])


    return (
        location.pathname.includes("dashboard") ? (
            <>
                <DashboardWrapper>
                    <DashboardNavbar />
                    <Routers />
                    <Footer />
                </DashboardWrapper>

                <ToastContainer />
                <LoadingScreen visible={isLoading()} />
            </>
        ) : (
            <>
                <Navbar />
                <Routers />
                <Footer />

                {/* <SubscribeModal visible={showSubscription} onClose={() => setShowSubscription(false)} /> */}
                {/* <GeoStoreModal visible={true} onClose={() => {}} /> */}

                <AuthModal visible={isShowingAuthModal()} />
                <ToastContainer />
                <LoadingScreen visible={isLoading()} />
            </>
        )
    );
}

export default Layout