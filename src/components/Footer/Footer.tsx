import './Footer.scss';
import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import images from '../../res/images';
import { Link } from 'react-router-dom';
import { Icon_Email, Icon_Location, Icon_Phone } from '../../res/icons';
import { CONTACT } from '../../constants/constants';
import { motion } from 'framer-motion';

const Footer = () => {

  const renderLogoInformation = () => (
    <Col lg="4" md='6' className='mb-4'>
      <div className="logo">
        <div>
          <h1 className=''>Lash Shack</h1>
        </div>
      </div>

      <p className="footer__text mt-4">
        Insert Information About the Company Here!
        Insert Information About the Company Here!
        Insert Information About the Company Here!
        Insert Information About the Company Here!
        Insert Information About the Company Here!
      </p>
    </Col>
  )

  const renderCategoryLinks = () => (
    <Col lg="3" md='3' className='mb-4'>
      <div className="footer__quick-links">
        <h4 className="quick__links-title">Catgories</h4>
        <ListGroup className='mb-3'>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"/courses"}>Courses</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"/services"}>Services</Link>
          </ListGroupItem>
          {/* <ListGroupItem className='ps-0 border-0'>
            <Link to={"#"}>Eyelash Extensions Full Sets</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"#"}>Eyelash Extensions Infills</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"#"}>Eyebrows</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"#"}>Lips</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"#"}>Semi-Permanent Makeup</Link>
          </ListGroupItem> */}
        </ListGroup>
      </div>
    </Col>
  )

  const renderQuickLinks = () => (
    <Col lg="2" md='3' className='mb-4'>
      <div className="footer__quick-links">
        <h4 className="quick__links-title">Useful Links</h4>
        <ListGroup className='mb-3'>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"/shop"}>Shop</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"/news"}>Latest News</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"/gallery"}>Gallery</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"/login"}>Login</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to={"/privacy"}>Privacy Policy</Link>
          </ListGroupItem>
        </ListGroup>
      </div>
    </Col>
  )

  const renderContactInformation = () => (
    <Col lg="3" md='3'>
      <div className="footer__quick-links">
        <h4 className="quick__links-title">Get In Touch</h4>
        <ListGroup className='footer__contact'>

          {CONTACT.LOCATIONS.map(({ ADDRESS, MAP }, key) => (
            <ListGroupItem key={key} className='ps-0 border-0'>
              <a target="_blank" className='d-flex align-items-center gap-2' href={MAP} rel="noopener noreferrer">
                <motion.span whileHover={{ scale: 1.1 }}><Icon_Location /></motion.span>
                <p className='text__new-line'>{ADDRESS}</p>
              </a>
            </ListGroupItem>
          ))}

          <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
            <a target="_blank"
              className=' d-flex align-items-center gap-2'
              rel="noopener noreferrer"
              href={`tel:${CONTACT.PHONE}`}>
              <span><Icon_Phone /></span>
              <p>{CONTACT.PHONE}</p>
            </a>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <a target="_blank"
              className=' d-flex align-items-center gap-2'
              rel="noopener noreferrer"
              href={`mailto:${CONTACT.EMAIL}`}>
              <span><Icon_Email /></span>
              <p>{CONTACT.EMAIL}</p>
            </a>
          </ListGroupItem>
        </ListGroup>
      </div>
    </Col>
  )

  const renderCopyright = () => {
    const year = new Date().getFullYear();

    return (
      <Col lg="12">
        <p className="footer__copyright">
          Copyright &copy; LashShack {year}. All Rights Reserved. Developed By
          <a href="https://www.christianjengmann.com" target="_blank" rel="noopener noreferrer" className='fw-bold'> Christian Engmann</a>
        </p>
      </Col>
    )
  }

  return (
    <footer className='footer'>
      <Container>
        <Row>
          {renderLogoInformation()}

          {renderCategoryLinks()}

          {renderQuickLinks()}

          {renderContactInformation()}

          {renderCopyright()}
        </Row>
      </Container>
    </footer>
  )
}

export default Footer