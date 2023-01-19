import './Navbar.scss';
import React, { useRef, useState } from 'react'
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
import { signUserOut } from '../../helpers/firebase/firebaseHelper';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userPhotoURL = useReduxSelector((state: RootState) => state.userAccount.user.photoURL);
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




  const toggleProfileActions = () => {
    if (!currentUser)
    {
      navigate('/login')
      return;
    }

    if (!showingProfileActions) {
      // profileActionsRef.current?.classList.add("show__profile-actions");
      setShowingProfileActions(true);
    }
    else {
      // profileActionsRef.current?.classList.remove("show__profile-actions");
      setShowingProfileActions(false);
    }

    // console.log(profileActionsRef.current);
  }

  function signOut() {
    toggleProfileActions();
    signUserOut()
      .then(() => {
        navigate("/");
      });
  }



  const renderMenuIcons = () => (
    <div className="navbar-nav--icons">
      <motion.span className="wishlist_icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to={"/wishlist"}>
          <Icon_WishList />
          <span className="badge" data-quantity={totalWishListQuantity > 0}>{totalWishListQuantity}</span>
        </Link>
      </motion.span>
      <motion.span className="basket_icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to={"/basket"}>
          <Icon_ShoppingBasket />
          <span className="badge" data-quantity={totalBasketQuantity > 0}>{totalBasketQuantity}</span>
        </Link>
      </motion.span>

      <div className='profile'>
        <motion.span className="avatar_icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Avatar url={userPhotoURL} onClick={toggleProfileActions} />
          {/* <span className="badge" data-quantity={totalBasketQuantity > 0}>{totalBasketQuantity}</span> */}
          <span className="badge" data-quantity={userNotificationCount > 0}>{userNotificationCount}</span>
        </motion.span>

        <div className="avatar_icon-actions" style={{ display: (showingProfileActions ? "flex" : "none") }}
        // ref={profileActionsRef}
        >
          {currentUser ? 
            <>
              <Link to="/dashboard" onClick={toggleProfileActions}>Dashboard</Link>
              <Link to="/dashboard/account" onClick={toggleProfileActions}>My Account</Link>
              <Link to="" onClick={signOut}>Logout</Link>
            </>
            :
            <></>
            // <>
            //   <Link to="/login" onClick={toggleProfileActions}>Login</Link>
            //   <Link to="/register" onClick={toggleProfileActions}>Sign Up</Link>
            // </>
          }
        </div>
      </div>


      <DrawerMenuButton isOpen={isOpen} onClick={toggle} />
    </div>
  )

  const renderMenuItems = () => (
    <div className="navigation app__device-hide-mobile">
      <ul className="navbar-nav--links">
        {NAVIGATION.ROUTEs.map(({ title, to }, key) => (
          <li className='nav--link-item' key={key}>
            <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{title}</NavbarItem>
          </li>
        ))}
      </ul>
    </div>
  )



  return (
    <header className={`header ${scrolledDown ? "header--scroll" : ""}`}>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Container>
        <Row>
          <div className="app_navbar__wrapper">
            <div className="logo">
              <Link to={"/"}>
                <img src={images.LogoNoBG} alt="logo" />
              </Link>
            </div>

            {renderMenuItems()}

            {renderMenuIcons()}

            <DrawerMenu isOpen={isOpen} onClose={toggle} />
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Navbar