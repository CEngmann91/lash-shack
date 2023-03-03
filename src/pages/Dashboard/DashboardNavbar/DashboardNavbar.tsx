import './DashboardNavbar.scss';
import { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import images from '../../../res/images';
import { Avatar } from '../../../components';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { UserProfile } from '../../../types/UserProfile';
import { useAuth } from '../../../hooks/useAuth';
import { NAVIGATION } from '../../../constants/constants';
import NavbarItem from '../../../components/navbar/NavbarItem/NavbarItem';
import { useScroller } from '../../../hooks/useScroller';
import { signUserOut } from '../../../helpers/firebase/firebaseHelper';
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
        setAsLoading();

        signUserOut(user)
            .then(() => {
                logout();
                setAsNotLoading();
                navigate("/");
            });
    }


    return (
        <header className={`dash__header ${scrolledDown ? "dash__header--scroll" : ""}`}>
            <Container>
                <Row>
                    <Col>
                        <div className="dash_navbar__wrapper">
                            <div className="logo">
                                <Link to={"/"}>
                                    <img src={images.LogoNoBG} alt="logo" />
                                </Link>
                            </div>


                            {/* <div className="navigation app__device-hide-mobile">
                                <ul className="navbar-nav--links">
                                    {user.account === "Manager" ?
                                        (NAVIGATION.DASHBOARD_ADMIN_ROUTES.map(({ id, title, icon, to }) => (
                                            <li key={id}>
                                                <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{icon}</NavbarItem>
                                            </li>
                                        )))
                                        :
                                        (NAVIGATION.DASHBOARD_ROUTES.map(({ id, title, icon, to }) => (
                                            <li key={id}>
                                                <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{icon}</NavbarItem>
                                            </li>
                                        )))
                                    }
                                </ul>
                            </div> */}


                            <h4 className='dash_navbar__title'>{getLocationTitle()}</h4>


                            <div className="dash_navbar__icons">
                                <motion.span className="avatar_icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Avatar url={user.photoURL} scale="2rem" />
                                    <span className="badge" data-quantity={authenticated && userNotificationCount > 0}>{userNotificationCount}</span>
                                </motion.span>

                                <button onClick={signOut} className="signout_icon">
                                    <Icon_Dash_Exit />
                                </button>


                                {/* <motion.span className="agenda_icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Icon_CheckupList />
                                </motion.span> */}
                                
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default DashboardNavbar