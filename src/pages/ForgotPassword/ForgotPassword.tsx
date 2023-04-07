import './ForgotPassword.scss';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Row, Form, FormGroup } from 'reactstrap'
import { InputField, MotionButton, PageWrapper } from '../../components'

const ForgotPassword = () => {
    const navigate = useNavigate();

    
    return (
        <PageWrapper title="Fogot Password?">
            <section>
                <Container>
                    <Row>
                        <Col lg='6' className='m-auto text-center'>

                            <Form className='forgot-password__form'>
                                <h3 className='mb-4'>Forgot Password</h3>

                                <InputField placeholder="Enter Your Email" type="email" />


                                {/* <FormGroup className="form__group">
                                    <input type="email" placeholder='Enter Email' autoComplete='email' />
                                </FormGroup> */}

                                <FormGroup className="">
                                    <MotionButton className='forgot-button' type='button' onClick={() => navigate('/login')}>
                                        Cancel
                                    </MotionButton>

                                    <MotionButton className='forgot-button' type='submit'>
                                        Confirm
                                    </MotionButton>
                                </FormGroup>

                            </Form>





                            {/* <Form className='forgot-password__form'>
                                <FormGroup className="form__group">
                                    <input type="email" placeholder='Enter Your Email' autoComplete='email' />
                                </FormGroup>

                                <FormGroup className="">
                                    <MotionButton className='forgot-button' type='button' onClick={() => navigate(-1)}>
                                        Cancel
                                    </MotionButton>

                                    <MotionButton className='login-button' type='submit' onClick={() => { }}>
                                        Confirm
                                    </MotionButton>
                                </FormGroup>
                            </Form> */}




                        </Col>
                    </Row>
                </Container>
            </section>
        </PageWrapper>

    )
}

export default ForgotPassword