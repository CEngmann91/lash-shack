import './Login.scss';
import React from 'react'
import { Col, Container, Row, Form, FormGroup } from 'reactstrap'
import { Checkbox, MotionButton, PageWrapper } from '../../components'
import { Link, useNavigate } from 'react-router-dom';

import { signIntoUserAccount, signUserOut, updateUserDisplayName } from '../../helpers/firebase/firebaseHelper';
import { useUserActions } from '../../redux/hooks/useUserActions';
import { useApplicationActions } from '../../redux/hooks/useApplicationActions';

const Login = () => {
    const navigate = useNavigate();
    const { setAsLoading, setAsNotLoading } = useApplicationActions();
    const { setAsActive, setFullName, setProfile, setAccountType } = useUserActions();




    const handleFormSubmit = async(e: React.FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();

        setAsLoading();

        const target = e.target as typeof e.target & {
            // name property has to match
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;       // typechecks!
        const password = target.password.value; // typechecks!
        if (!email || !password) {
            setAsNotLoading();
            return;
        }
        await login(email, password);
    };

    const login = async(email: string, password: string) =>
    {
        const signInReq = await signIntoUserAccount(email, password)
        if (signInReq)
        {
            if (!signInReq.active) {
                alert(signInReq.email + " is not active");
                await signUserOut(signInReq);
                setAsNotLoading();
                return;
            }
            
            // console.log(signInReq);
            setAsActive(true);
            setAccountType(signInReq.account);
            setFullName(signInReq.firstName, signInReq.lastName);
            setProfile(signInReq.displayName, signInReq.photoURL);

            setAsNotLoading();

            navigate(-1);
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