import './MeetExperts.scss';
import React from 'react'
import useGetUsers from '../../hooks/useGetUsers';
import { LoadingSpinner, PageWrapper } from '../../components';
import { Col, Container, Row } from 'reactstrap';
import ExpertCard from './ExpertCard/ExpertCard';

const MeetExperts = () => {
    const { getAllStaff, loadingUsers } = useGetUsers();



    return (
        <PageWrapper title="experts">
            <section className="experts__section">

                <h1 className="text-center">Our Team</h1>


                {loadingUsers ?
                    <LoadingSpinner title="Loading..." />
                    :
                    <Container>
                        <Row className='d-flex gap-3 justify-content-center list-container'>
                            {getAllStaff?.map(({ firstName, lastName, photoURL }, key) =>
                                <ExpertCard key={key}
                                            firstName={firstName}
                                            lastName={lastName}
                                            imgURL={photoURL}
                                            message={`${key}`}
                                />
                            )}
                        </Row>
                    </Container>
                }
            </section>
        </PageWrapper>
    )
}

export default MeetExperts