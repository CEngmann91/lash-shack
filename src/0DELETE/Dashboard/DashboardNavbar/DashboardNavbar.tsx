import './DashboardNavbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import images from '../../../res/images';
import { Avatar, Form_RadioOptionGroup, MotionSpan } from '../../../components';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { UserProfile } from '../../../types/UserProfile';
import { useAuth } from '../../../hooks/useAuth';
import { NAVIGATION } from '../../../constants/constants';
import { useScroller } from '../../../hooks/useScroller';
import { signUserOut } from '../../../firebase/firebaseHelper';
import { useUserActions } from '../../../redux/hooks/useUserActions';
import { useApplicationActions } from '../../../redux/hooks/useApplicationActions';
import { useMyLocation } from '../../../hooks/useMyLocation';
import { Icon_Dash_Exit } from '../../../res/icons';

const DashboardNavbar = () => {
    const navigate = useNavigate();
    const { getLocationTitle } = useMyLocation();

    const scrolledDown = useScroller();
    const { authenticated } = useAuth();
    const { setAsLoading, setAsNotLoading } = useApplicationActions();
    const { logout } = useUserActions();
    const user = useReduxSelector((state: RootState) => state.userAccount.user) as UserProfile;
    const userNotificationCount = useReduxSelector((state: RootState) => state.userAccount.notificationCount);



    function signOut() {
        // setAsLoading();

        // signUserOut(user)
        //     .then(() => {
        //         logout();
        //         setAsNotLoading();
        //         navigate("/");
        //     });
    }

    const getRoutes = () => {
        if (user?.account === "Manager")
            return NAVIGATION.DASHBOARD_ADMIN_ROUTES;
        return NAVIGATION.DASHBOARD_ROUTES;
    }

    const navTitles = () =>
    {
        let titles = [] as string[];
        getRoutes().forEach(item => titles.push(item.title))
        return titles;
    };

    return (
        <header className={`dash__header ${scrolledDown ? "dash__header--scroll" : ""}`}>
            <div className="dash_navbar__wrapper">
                <div className="logo">
                    <Link to={"/"}>
                        <img src={images.LogoNoBG} alt="logo" />
                    </Link>
                </div>

                <h4 className='dash_navbar__title'>{getLocationTitle()}</h4>

                {/* <Form_RadioOptionGroup wrapperClassName='w-50' value={navTitles().indexOf(getLocationTitle())} options={navTitles()} onChange={(value) => navigate(getRoutes()[value].to)} /> */}

                <div className="dash_navbar__icons">
                    <MotionSpan className='avatar_icon'>
                        <Avatar url={user.photoURL} scale="2rem" onClick={() => navigate("dashboard/account")} />
                        <span className="badge" data-quantity={authenticated && userNotificationCount > 0}>{userNotificationCount}</span>
                    </MotionSpan>

                    {/* <button onClick={signOut} className="signout_icon">
                        <Icon_Dash_Exit />
                    </button> */}
                </div>
            </div>
        </header>
    )
}

export default DashboardNavbar