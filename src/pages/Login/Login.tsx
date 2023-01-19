import './Login.scss';
import React, { useState } from 'react'
import { Col, Container, Row, Form, FormGroup } from 'reactstrap'
import { MotionButton, PageWrapper } from '../../components'
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '../../components/Form/Checkbox/Checkbox';

import { signIntoUserAccount, updateUserPhotoURL } from '../../helpers/firebase/firebaseHelper';
import { UserProfile } from '../../types/UserProfile';
import { useUserActions } from '../../redux/hooks/userActionsUtils';

const Login = () => {
    const navigate = useNavigate();
    const { setFullName } = useUserActions();




    const handleFormSubmit = async(e: React.FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            // name property has to match
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;       // typechecks!
        const password = target.password.value; // typechecks!
        if (!email || !password) {
            return;
        }
        // alert(email + " - " + password);
        await login(email, password);
    };

    const login = async(email: string, password: string) =>
    {
        const signInReq = await signIntoUserAccount(email, password)
        if (signInReq)
        {
            console.log(signInReq);
    
            // const url = signInReq?.photoURL as string;
            // await updateUserPhotoURL(signInReq as UserProfile, url);
            // console.log(updatePhoto);
    


            setFullName(signInReq.firstName, signInReq.lastName);


            navigate("/");
        }
        else {

        }
    }



    return (
        <PageWrapper title="Login">
            <section className='login__container'>
                <Container>
                    <Row>
                        <Col lg='6' className='m-auto text-center'>

                            <Form className='login__form' onSubmit={handleFormSubmit}>
                                <h3 className='fw-bold fs-4 mt-2 mb-4 mt-2'>LOGIN</h3>

                                <FormGroup className="form__group">
                                    <input name="email" type="email" placeholder='Enter Your Email' autoComplete='email' />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input name="password" type="password" placeholder='Enter Password' autoComplete='password' />
                                </FormGroup>

                                <Checkbox label='Stay Signed In' onChange={(value) => {}} />

                                <MotionButton className='login-button' type='submit'>
                                    Login
                                </MotionButton>

                                {/* <FormGroup className="">
                                    <Link to='/forgot' className='fw-bold'>Forgot Password?</Link>
                                </FormGroup> */}
                                <p className='mt-3'><Link to='/forgot' className='fw-bold'>Forgot Password?</Link></p>

                                <p>Don't have an account? <Link to='/register' className='fw-bold'>Sign Up</Link></p>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Login