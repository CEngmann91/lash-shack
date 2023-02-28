import React from 'react'
import { Col, Container, NavLink, Row } from 'reactstrap';
import NavbarItem from '../../../components/navbar/NavbarItem/NavbarItem';
import { NAVIGATION } from '../../../constants/constants';
import './DashboardSidebar.scss';

const DashboardSidebar = () => {

    return (
        <Container className='dash-sidebar'>
            <Row>
                <Col sm='3' md='2' className="sidebar" id="Navbar">

                    <ul className="nav nav-sidebar d-inline">
                        {NAVIGATION.DASHBOARD_ADMIN_ROUTES.map(({id, title, to}) => (
                        <li className='nav--link-item' key={id}>
                            <NavLink to={to}>{title}</NavLink>
                            {/* <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{title}</NavbarItem> */}
                        </li>
                        ))}



                        {/* {NAVIGATION.DASHBOARD_ADMIN_ROUTES.map(({ id, title, to }) => {
                            const split = to.split('/');
                            return (
                                <li className='active' key={id}>
                                    <NavbarItem to={
                                        // split.length > 0 ? split[1] : '/'
                                        to
                                        } activeClassName="active" idleClassName=''>{title}</NavbarItem>
                                </li>
                            )
                        })} */}

                        {/* <li className='active'><a href="/">Home</a></li>
                    <li><a href="../notes">Notes</a></li>
                    <li><a href="../chat">Chat</a></li>
                    <li><a href="../rss">RSS</a></li> */}
                    </ul>
                    {/* <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">\</div> */}
                </Col>

            </Row>
        </Container>
    )
}

export default DashboardSidebar