import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import AuthModal from '../components/AuthModal/AuthModal';
import { useApplicationActions } from '../redux/hooks/useApplicationActions';

const AuthRoute = () => {
    const { authenticated } = useAuth();
    const { toggleAuthModal } = useApplicationActions();

    return authenticated ? (
        <Outlet />
    ) : (
        toggleAuthModal()
    )
        {/* <Navigate to={'/login'} /> */}
}

export default AuthRoute