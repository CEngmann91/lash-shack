import './Dashboard.scss';
import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components';
import { Col, Container, Row } from 'reactstrap';

const Dashboard = () => {
    // const navigate = useNavigate();
    // const { currentUser } = useAuth();


    useEffect(() => {

    }, [])


    return (
        <PageWrapper title="Dashboard">

            <section className='dashboard__section'>
                <Container>
                    <Row>
                        <Col lg='2' md="2" className='bg-danger'>
                            <h1>Left</h1>
                        </Col>


                        <Col lg='10' md="5" className='bg-success'>
                            <h1>right</h1>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Dashboard */}
        </PageWrapper>
    )
}

export default Dashboard