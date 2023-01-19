import './Register.scss';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Row, Form, FormGroup } from 'reactstrap'
import { MotionButton, PageWrapper } from '../../components'

import { createAUser } from '../../helpers/firebase/firebaseHelper';
import { useUserActions } from '../../redux/hooks/userActionsUtils';

const Register = () => {
    const navigate = useNavigate();
    const { setFullName, setProfile } = useUserActions();

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);



    
    function handlePasswordBlur(e: React.FocusEvent<HTMLInputElement>) {
        e.preventDefault();

        setPassword(e.target.value);
    }

    function handleFormSubmit(e: React.FormEvent<EventTarget | HTMLFormElement>) {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            // name property has to match
            firstName: { value: string };
            lastName: { value: string };
            email: { value: string };
            password: { value: string };
            confirm: { value: string };
        };
        const firstName = target.firstName.value; // typechecks!
        const lastName = target.lastName.value; // typechecks!
        const email = target.email.value;       // typechecks!
        const password = target.password.value; // typechecks!
        const confirm = target.confirm.value; // typechecks!
        if (!firstName || !lastName || !email || !password || !confirm) {
            return;
        }
        if (password !== confirm) {
            return;
        }
        register(firstName, lastName, email, password);
    };

    const register = async (firstName: string, lastName: string, email: string, password: string) => {
        // setLoading(true)

        const displayName = `${firstName} ${lastName}`;
        setFullName(firstName, lastName);
        const userReq = await createAUser(firstName, lastName, email, password, displayName);
        if (userReq)
        {
            const photoURL = userReq?.photoURL as string;
            setProfile(displayName, photoURL);
            // setLoading(false);
    
            // console.log("photoURL - '" + photoURL + "'.");
            console.log("Done creating user.");
    
            navigate('/');
        }
    }

    function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (value === password)
            setPasswordsMatch(true)
        else
            setPasswordsMatch(false)
        // console.log(value);
    }

    return (
        <PageWrapper title="Register">
            <section className='register__container'>
                <Container>
                    <Row>
                        <Col lg='6' className='m-auto text-center'>

                            <Form className='register__form' onSubmit={handleFormSubmit}>
                                <h3 className='fw-bold fs-4 mt-2 mb-4 mt-2'>REGISTER</h3>

                                <FormGroup className="form__group">
                                    <input name="firstName" type="text" placeholder='Enter First Name' />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input name="lastName" type="text" placeholder='Enter Surname' />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input name="email" type="email" placeholder='Enter Email' autoComplete='email' />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input id="password-field" name="password" type="password" placeholder='Enter Password' onBlur={handlePasswordBlur} autoComplete='current-password' />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input name="confirm" type="password" onChange={handleConfirmPasswordChange} placeholder='Confirm Password' autoComplete='current-password' />
                                    {/* {!passwordsMatch ? <label className='text-danger'>Passwords Do Not Match</label> : <label className='text-success'>&nbsp; Passwords Match</label>} */}
                                </FormGroup>

                                <p>I agree to the <Link to='/terms' className='fw-bold'>Terms and Conditions</Link></p>

                                <FormGroup className="">
                                    <MotionButton className='register-button' type='button' onClick={() => navigate('/login')}>
                                        Cancel
                                    </MotionButton>

                                    <MotionButton className='register-button' type='submit'>
                                        Confirm
                                    </MotionButton>
                                </FormGroup>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Register