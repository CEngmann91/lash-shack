import './Footer.scss';
import React, { FormEvent, ReactNode, memo } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import images from '../../res/images';
import { Link, NavLink } from 'react-router-dom';
import { Icon_Location } from '../../res/icons';
import { CONTACT } from '../../constants/constants';
import MotionSpan from '../Motion/MotionSpan/MotionSpan';
import 'react-toastify/dist/ReactToastify.css';
import { showError, showSubscription } from '../../util/toasts';
import { addANewSubscriber } from '../../firebase/firebaseHelper';
import { openWindow } from '../../util/util';

export interface ListGroupItemLinkProps {
  to: string;
  children: ReactNode;
}
const ListGroupItemLink = ({ to, children }: ListGroupItemLinkProps) => (
  <ListGroupItem className='ps-0 border-0'>
    <NavLink to={to} className='app__border-bottom'>{children}</NavLink>
  </ListGroupItem>
);

const Footer = () => {

  const handleSubscribeFormSubmit = async (e: FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();


    const target = e.target as typeof e.target & {
      // name property has to match
      email: { value: string };
    };
    const email = target.email.value;       // typechecks!
    if (!email) {
      return;
    }

    await addANewSubscriber(email.toLowerCase())
      .then(res => showSubscription())
      .catch(error => showError("You Have Already Subscribed 🥳"))
  }

  const handleLocationClick = (map: string) => () => {
    openWindow(map);
  };

  // const renderCategoryLinks = () => (
  //   <Col lg="2" md='3' className='mb-4'>
  //     <div className="footer__quick-links">
  //       <h4 className="quick__links-title"><strong>Categories</strong></h4>
  //       <ListGroup className='mb-3'>
  //         <ListGroupItemLink to={"/courses"}>Courses</ListGroupItemLink>
  //         <ListGroupItemLink to={"/services"}>Services</ListGroupItemLink>
  //         <ListGroupItemLink to={"/policies"}>Policies</ListGroupItemLink>
  //         <ListGroupItemLink to={"/faqs"}>FAQS</ListGroupItemLink>
  //       </ListGroup>
  //     </div>
  //   </Col>
  // );

  // const renderQuickLinks = () => (
  //   <Col lg="2" md='3' className='mb-4'>
  //     <div className="footer__quick-links">
  //       <h4 className="quick__links-title">Quick Links</h4>
  //       <ListGroup className='mb-3'>
  //         <ListGroupItemLink to={"/"}>Home</ListGroupItemLink>



  //         {/* <ListGroupItem className='ps-0 border-0'>
  //           <Link to={"/shop"} className='app__border-bottom'>Shop</Link>
  //         </ListGroupItem> */}
  //         <ListGroupItemLink to={"/gallery"}>Gallery</ListGroupItemLink>
  //         {/* <ListGroupItem className='ps-0 border-0'>
  //           <Link to={"/privacy"}>Privacy Policy</Link>
  //         </ListGroupItem> */}
  //       </ListGroup>
  //     </div>
  //   </Col>
  // )



  const renderCompanyLinks = () => (
    <Col lg="2" md='3' className='mb-4'>
      <div className="footer__quick-links">
        <h4 className="quick__links-title">Company</h4>
        <ListGroup className='mb-3'>
          <ListGroupItemLink to={"/#about"}>About Us</ListGroupItemLink>
          <ListGroupItemLink to={"/#team"}>Meet The Experts</ListGroupItemLink>
          <ListGroupItemLink to={"/#hours"}>Operating Hours</ListGroupItemLink>
          <ListGroupItemLink to={"/contact"}>Get In Touch</ListGroupItemLink>
        </ListGroup>
      </div>
    </Col>
  )

  const renderLegalHelpfulLinks = () => (
    <Col lg="2" md='3' className='mb-4'>
      <div className="footer__quick-links">
        <h4 className="quick__links-title">Legal</h4>
        <ListGroup className='mb-3'>
          <ListGroupItemLink to={"/terms"}>Terms of Service</ListGroupItemLink>
          {/* <ListGroupItemLink to={"/slavery"}>Modern Slavery Statement</ListGroupItemLink> */}
          {/* <ListGroupItemLink to={"/faqs"}>FAQs</ListGroupItemLink> */}
        </ListGroup>
      </div>
    </Col>
  )

  const renderCopyright = () => {
    const year = new Date().getFullYear();

    return (
      <Col lg="12" className='footer__copyright'>
        <img className='ABT' src={images.ABT} alt="" />

        <p className="footer__copyright--text">
          Copyright &copy; LashShack {year}. Developed By
          <a href="https://www.christianjengmann.com" target="_blank" rel="noopener noreferrer" className='fw-bold'> Christian Engmann</a>
        </p>

      </Col>
    )
  }

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg="4" md='6' className='mb-4'>
            {/* <h1>Lash Shack</h1> */}
            <div className="logo">
              <Link to={"/"}>
                <img src={images.LogoNoBG} alt="logo" />
              </Link>
            </div>

            <p className="footer__text">
              Lash Shack was founded in 2019 by Emma who has years of experience working within the lash industry providing an impeccable service to clients and delivering 5 star training to students.
            </p>


            <div className="social-links">
              <a href={`mailto:${CONTACT.EMAIL}`} target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-envelope" />
              </a>
              <a href={`tel:${CONTACT.PHONE}`} target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-phone" />
              </a>
              <a href={CONTACT.INSTAGRAM} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram" />
              </a>
              <a href={CONTACT.TIKTOK} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok" />
              </a>
            </div>
          </Col>


          {renderCompanyLinks()}
          {renderLegalHelpfulLinks()}
          {/* {renderCategoryLinks()} */}
          {/* {renderQuickLinks()} */}


          <Col lg="3" md='4'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Stay Connected</h4>
              <ListGroup className='footer__subscribe'>
                <ListGroupItem className='ps-0 border-0'>
                  <form id="subscribe" onSubmit={handleSubscribeFormSubmit}>
                    <input name="email" type="email" id="subscriber-email" placeholder="Your Email" />
                    <input type="submit" value="Subscribe" id="btn-scribe" />
                  </form>
                </ListGroupItem>
                <p className='sub-text'>Join our newsletter to stay up to date</p>
              </ListGroup>


              <h4 className="quick__links-title mt-4">{CONTACT.LOCATIONS?.length > 1 ? 'Locations' : 'Location'}</h4>

              {CONTACT.LOCATIONS.map(({ ADDRESS, MAP }, key) => (
                <ListGroupItem key={key} className='ps-0 border-0'>
                  <a target="_blank" className='d-flex align-items-center gap-2' onClick={handleLocationClick(MAP)}>
                    <MotionSpan hoverScale={1.1}><Icon_Location /></MotionSpan>
                    <p className='text__new-line'>{ADDRESS}</p>
                  </a>
                </ListGroupItem>
              ))}
            </div>
          </Col >


          {renderCopyright()}



          {/* <Col lg="12" md='12'>
            <div className="hero">
              <div className="socials-links">
                <a href=""><i className="fab fa-facebook-f"></i></a>
                <a href=""><i className="fab fa-instagram"></i></a>
                <a href=""><i className="fab fa-twitter"></i></a>
                <a href=""><i className="fab fa-github"></i></a>
                <a href=""><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </Col> */}
        </Row>
      </Container>
    </footer>
  )
}

export default Footer