import './Navbar.scss';
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import images from '../../res/images';
import { NAVIGATION } from '../../constants/constants';
import { motion, useScroll, useSpring } from 'framer-motion';
import NavbarItem from './NavbarItem/NavbarItem';
import { Icon_ShoppingBasket, Icon_WishList } from '../../res/icons';
import DrawerMenu from '../DrawerMenu/DrawerMenu';
import Avatar from '../Avatar/Avatar';
import { useScroller } from '../../hooks/useScroller';
import DrawerMenuButton from '../DrawerMenu/DrawerMenuButton/DrawerMenuButton';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useToggle } from '../../hooks/useToggle';
import { useAuth } from '../../hooks/useAuth';
import { signUserOut } from '../../firebase/firebaseHelper';
import { useUserActions } from '../../redux/hooks/useUserActions';
import { UserProfile } from '../../types/UserProfile';
import MotionSpan from '../Motion/MotionSpan/MotionSpan';
import { toggleBodyZoomOut, toggleDrawerOpened } from '../../res/funcs';
import { useApplicationActions } from '../../redux/hooks/useApplicationActions';

const Navbar = () => {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const { logout } = useUserActions();
  const user = useReduxSelector((state: RootState) => state.userAccount.user) as UserProfile;
  const userNotificationCount = useReduxSelector((state: RootState) => state.userAccount.notificationCount);
  const totalBasketQuantity = useReduxSelector((state: RootState) => state.basket.totalQuantity);
  const totalWishListQuantity = useReduxSelector((state: RootState) => state.wishList.totalQuantity);
  const scrolledDown = useScroller();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    // stiffness: 100,
    // damping: 30,
    restDelta: 0.001
  });
  // const profileActionsRef = useRef<HTMLDivElement>(null);
  const [showingProfileActions, setShowingProfileActions] = useState<boolean>(false);
  const { isOpen, toggle } = useToggle(false);
  const { toggleAuthModal } = useApplicationActions();




  const toggleProfileActions = () => {
    if (!authenticated) {
      // navigate('/login')
      toggleAuthModal();
      return;
    }

    setShowingProfileActions(p => !p)
  }

  function signOut() {
    toggleProfileActions();
    signUserOut(user)
      .then(() => {
        logout();
        navigate("/");
      });
  }


  const toggleMenu = () => {
    toggleDrawerOpened();
    toggle();
  }


  const renderMenuIcons = () => (
    <div className="navbar-nav--icons">
      <MotionSpan className="wishlist_icon">
        <Link to={"/wishlist"}>
          <Icon_WishList />
          <span className="badge" data-quantity={totalWishListQuantity > 0}>{totalWishListQuantity}</span>
        </Link>
      </MotionSpan>
      <MotionSpan className="basket_icon">
        <Link to={"/basket"}>
          <Icon_ShoppingBasket />
          <span className="badge" data-quantity={totalBasketQuantity > 0}>{totalBasketQuantity}</span>
        </Link>
      </MotionSpan>

      {showingProfileActions && <div className="avatar_icon-actions--overlay" onClick={() => setShowingProfileActions(false)} />}
      <div className='profile'>
        <MotionSpan className="avatar_icon">
          <Avatar url={user.photoURL} onClick={toggleProfileActions} />
          {/* <span className="badge" data-quantity={totalBasketQuantity > 0}>{totalBasketQuantity}</span> */}
          <span className="badge" data-quantity={authenticated && userNotificationCount > 0}>{userNotificationCount}</span>
        </MotionSpan>

        <div className="avatar_icon-actions" style={{ display: (showingProfileActions ? "flex" : "none") }}
        // ref={profileActionsRef}
        >
          {authenticated ?
            <>
              <Link to="/dashboard" onClick={toggleProfileActions}>Dashboard</Link>
              <Link to="/dashboard/account" onClick={toggleProfileActions}>My Account</Link>
              <Link to="/dashboard/orders" onClick={toggleProfileActions}>Orders</Link>
              {user.account === "Manager" &&
                <Link to="/dashboard/users" onClick={toggleProfileActions}>Users</Link>}
              {user.account === "Manager" &&
                <Link to="/dashboard/catalog" onClick={toggleProfileActions}>Catalog</Link>}
              <Link to="/dashboard/messages" onClick={toggleProfileActions}>Messages</Link>
              <Link to="/dashboard/settings" onClick={toggleProfileActions}>Settings</Link>
              <Link to="" onClick={signOut}>Logout</Link>
            </>
            : null}
        </div>
      </div>


      <DrawerMenuButton isOpen={isOpen} onClick={toggleMenu} />
    </div>
  )


  const renderMenuItems = () => (
    <div className="navigation app__device-hide-mobile">
      <ul className="navbar-nav--links">
        {NAVIGATION.MAIN_ROUTES.map(({ title, to }, key) => (
          <li className='nav--link-item' key={key}>
            <NavbarItem to={to} activeClassName="app__bottom-circle link-item-active" idleClassName='link-item'>{title}</NavbarItem>
          </li>
        ))}
      </ul>
    </div>
  )



  return (
    <header className={`header ${scrolledDown ? "header--scroll" : ""}`}>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="app_navbar__wrapper">
        <div className="logo">
          <Link to={"/"}>
            <img src={images.LogoNoBG} alt="logo" />
          </Link>
        </div>

        {renderMenuItems()}

        {renderMenuIcons()}
      </div>
      <DrawerMenu isOpen={isOpen} onClose={toggle} />
    </header>
  )
}

export default Navbar