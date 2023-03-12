import './ExpertCard.scss';
import React from 'react'
import { Col, Container, Row } from 'reactstrap';

type ExpertCardProps = {
    firstName: string;
    lastName: string;
    imgURL: string;
    message: string;
}
const ExpertCard = ({ firstName, lastName, imgURL, message }: ExpertCardProps) => {
    
    return (
        <Col lg='3' md='3' className='expert__card'>
            <h1>{firstName} {lastName}</h1>
            <h2>{message}</h2>
            <img src={imgURL} alt="" />
        </Col>
    )
}

export default ExpertCard