import './DashboardNavbar.scss';
import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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

const DashboardNavbar = () => {
    const navigate = useNavigate();
    const scrolledDown = useScroller();
    const { authenticated } = useAuth();
    const { setAsLoading, setAsNotLoading } = useApplicationActions();
    const { logout } = useUserActions();
    const user = useReduxSelector((state: RootState) => state.userAccount.user) as UserProfile;
    const userNotificationCount = useReduxSelector((state: RootState) => state.userAccount.notificationCount);
    const [showingProfileActions, setShowingProfileActions] = useState<boolean>(false);



    const toggleProfileActions = () => setShowingProfileActions(p => !p);

    function signOut() {
        setAsLoading();

        toggleProfileActions();
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


                            <div className="navigation app__device-hide-mobile">
                                <ul className="navbar-nav--links">
                                    {user.account === "Admin" ?
                                        (NAVIGATION.DASHBOARD_ADMIN_ROUTES.map(({ title, to }, key) => (
                                            <li className='nav--link-item' key={key}>
                                                <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{title}</NavbarItem>
                                            </li>
                                        )))
                                        :
                                        (NAVIGATION.DASHBOARD_ROUTES.map(({ title, to }, key) => (
                                            <li className='nav--link-item' key={key}>
                                                <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{title}</NavbarItem>
                                            </li>
                                        )))
                                    }
                                </ul>
                            </div>


                            {showingProfileActions && <div className="dash_navbar__icons-actions--overlay" onClick={() => setShowingProfileActions(false)} />}
                            <div className="dash_navbar__icons">
                                <motion.span className="avatar_icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Avatar url={user.photoURL} scale="2rem" onClick={toggleProfileActions} />
                                    <span className="badge" data-quantity={authenticated && userNotificationCount > 0}>{userNotificationCount}</span>
                                </motion.span>

                                {/* <motion.span className="agenda_icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Icon_CheckupList />
                                </motion.span> */}



                                <div className="avatar_icon-actions app__device-hide-desktop" style={{ display: (showingProfileActions ? "flex" : "none") }}
                                // ref={profileActionsRef}
                                >
                                    <>
                                        <Link to="/dashboard" onClick={toggleProfileActions}>Dashboard</Link>
                                        <Link to="/dashboard/account" onClick={toggleProfileActions}>My Account</Link>
                                        <Link to="/dashboard/orders" onClick={toggleProfileActions}>Orders</Link>
                                        {user.account === "Admin" &&
                                            <Link to="/dashboard/users" onClick={toggleProfileActions}>Users</Link>}
                                        {user.account === "Admin" &&
                                            <Link to="/dashboard/catalog" onClick={toggleProfileActions}>Catalog</Link>}
                                        <Link to="/dashboard/messages" onClick={toggleProfileActions}>Messages</Link>
                                        <Link to="/dashboard/settings" onClick={toggleProfileActions}>Settings</Link>
                                        <Link to="" onClick={signOut}>Logout</Link>
                                    </>
                                </div>


                                <div className='app__device-hide-mobile'>
                                    <Link to="" onClick={signOut}>Logout</Link>
                                </div>


                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default DashboardNavbar