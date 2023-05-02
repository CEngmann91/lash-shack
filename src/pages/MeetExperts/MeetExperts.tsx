import './MeetExperts.scss';
import React from 'react'
import useGetUsers from '../../hooks/useGetUsers';
import { LoadingSpinner, PageWrapper } from '../../components';
import { Col, Container, Row } from 'reactstrap';
import ExpertCard from './ExpertCard/ExpertCard';

const MeetExperts = () => {
    const { getAllMembersOfLashShack, loadingUsers } = useGetUsers();





    return (
        // <PageWrapper title="Experts">
        <section className="experts__section">

            <h5 className="text-center mb-2">Meet The Experts</h5>
            <h1 className="text-center mb-4">Our professional team</h1>


            {loadingUsers ?
                <LoadingSpinner title="Loading..." />
                :
                <div className="list">
                    {getAllMembersOfLashShack?.map(({ firstName, position, photoURL, summary }, key) => {

                        return (
                            <ExpertCard
                                key={key}
                                id={key}
                                firstName={firstName}
                                position={position}
                                photoURL={photoURL}
                                message={summary}
                            />
                        );
                    })}
                </div>



                // <Container>
                //     <Row className='d-flex gap-4 justify-content-center list-container'>
                //         {getAllAtLashShack?.map(({ firstName, position, photoURL, summary }, key) =>
                //             <Col lg='3' md='3' key={key}>
                //                 <ExpertCard
                //                     id={key}
                //                     firstName={firstName}
                //                     position={position}
                //                     photoURL={photoURL}
                //                     message={summary}
                //                 />
                //             </Col>
                //         )}
                //     </Row>
                // </Container>
            }
        </section>
        // </PageWrapper>
    )
}

export default MeetExperts