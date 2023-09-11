import React from 'react'
import { Col, Container, NavLink, Row } from 'reactstrap';
import { NAVIGATION } from '../../../constants/constants';
import './DashboardSidebar.scss';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { UserProfile } from '../../../types/UserProfile';
import { motion } from 'framer-motion';
import { useUserActions } from '../../../redux/hooks/useUserActions';
import { useApplicationActions } from '../../../redux/hooks/useApplicationActions';
import { signUserOut } from '../../../firebase/firebaseHelper';
import { useNavigate } from 'react-router-dom';
import { Avatar, MotionSpan } from '../../../components';
import NavbarItem from '../../../components/navbar/NavbarItem/NavbarItem';

const DashboardSidebar = () => {
    const navigate = useNavigate();
    const user = useReduxSelector((state: RootState) => state.userAccount.user) as UserProfile;
    const { setAsLoading, setAsNotLoading } = useApplicationActions();
    const { logout } = useUserActions();



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
        <div className='dash-sidebar'>
            <div className="dash_sidebar__wrapper">
                <div className="avatar_wrapper app__device-hide-mobile">
                    <MotionSpan className='avatar_icon'>
                        <Avatar className='profile-photo' url={user.photoURL} scale="3rem" onClick={() => navigate("dashboard/account")} />
                        {/* <span className="badge" data-quantity={authenticated && userNotificationCount > 0}>{userNotificationCount}</span> */}
                    </MotionSpan>

                    <div className='avatar__details'>
                        <label className='title'>{user.displayName}</label>
                        <label className='sub-title'>{user.account}</label>
                    </div>

                    {/* <label className='avatar__details'>{user.displayName}</label>
                    <label className='avatar__details'>{user.email}</label> */}

                    {/* <div className='avatar__details'>{user.displayName}</div>
                    <div className='avatar__details'>{user.email}</div> */}
                </div>


                <div className="navigation">
                    <ul className="sidebar-nav--links">
                        {user.account === "Manager" ?
                            (NAVIGATION.DASHBOARD_ADMIN_ROUTES.map(({ id, title, icon, to }) => (
                                <li key={id}>
                                    <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{icon}</NavbarItem>
                                    {/* <label>{title}</label> */}
                                </li>
                            )))
                            :
                            (NAVIGATION.DASHBOARD_ROUTES.map(({ id, title, icon, to }) => (
                                <li key={id}>
                                    <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{icon}</NavbarItem>
                                    {/* <label>{title}</label> */}
                                </li>
                            )))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )


    // return (
    //     <Container className='dash-sidebar'>
    //         <Row>
    //             <Col sm='3' md='2' className="sidebar" id="Navbar">

    //                 <ul className="nav nav-sidebar d-inline">
    //                     {NAVIGATION.DASHBOARD_ADMIN_ROUTES.map(({id, title, to}) => (
    //                     <li className='nav--link-item' key={id}>
    //                         <NavLink to={to}>{title}</NavLink>
    //                         {/* <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{title}</NavbarItem> */}
    //                     </li>
    //                     ))}



    //                     {/* {NAVIGATION.DASHBOARD_ADMIN_ROUTES.map(({ id, title, to }) => {
    //                         const split = to.split('/');
    //                         return (
    //                             <li className='active' key={id}>
    //                                 <NavbarItem to={
    //                                     // split.length > 0 ? split[1] : '/'
    //                                     to
    //                                     } activeClassName="active" idleClassName=''>{title}</NavbarItem>
    //                             </li>
    //                         )
    //                     })} */}

    //                     {/* <li className='active'><a href="/">Home</a></li>
    //                 <li><a href="../notes">Notes</a></li>
    //                 <li><a href="../chat">Chat</a></li>
    //                 <li><a href="../rss">RSS</a></li> */}
    //                 </ul>
    //                 {/* <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">\</div> */}
    //             </Col>

    //         </Row>
    //     </Container>
    // )
}

export default DashboardSidebar