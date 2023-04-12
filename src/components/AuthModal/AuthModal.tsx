import './AuthModal.scss';
import React, { useState } from 'react'
import InputField from '../Form/Input/InputField';
import { Checkbox, Form_RadioOptionGroup, MotionButton } from '..';
import { Link } from 'react-router-dom';
import images from '../../res/images';

const AuthModal = () => {
    const tabs = ['Log In', 'Sign Up'];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);


    const renderLogin = () => {

        return (
            <div id="pageWrapper">
                <form>
                    {/* <input type="text" id="login" name="login" placeholder="login" />
                    <input type="text" id="password" name="login" placeholder="password" /> */}

                    <InputField placeholder="Enter Your Email" type="text" required autoComplete='email' />
                    <InputField placeholder="Enter Password" type="password" required autoComplete='password' />
                    <Checkbox label='Stay Signed In' onChange={(value) => { }} />
                    {/* <input type="submit" className="" value="Log In" /> */}
                    <MotionButton type='submit' className='submitButton'>
                        Log In
                    </MotionButton>
                </form>

                {/* <!-- Remind Passowrd --> */}
                <div id="formFooter w-100">
                    <a className="underlineHover" href="#"><strong>Forgot Password?</strong></a>
                </div>
            </div>
        );
    }

    const renderSignUp = () => {

        return (
            <div id="pageWrapper">
                <form>
                    {/* <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required autoComplete='name' />
                    <input type="text" id="lasttName" name="lasttName" placeholder="Enter Last Name" required autoComplete='name' />
                    <input type="email" id="email" name="email" placeholder="Enter Email" required autoComplete='email' />
                    <input type="password" id="password" name="password" placeholder="Enter Your Password" required autoComplete='password' />
                    <input type="password" id="password" name="password" placeholder="Confirm Password" required /> */}


                    <InputField placeholder="Enter First Name" type="text" required autoComplete='given-name' />
                    <InputField placeholder="Enter Surname" type="text" required autoComplete='family-name' />
                    <InputField placeholder="Enter Your Email" type="email" required autoComplete='email' />
                    <InputField placeholder="Enter Password" type="password" required autoComplete='password'/>
                    <InputField placeholder="Confirm Password" type="password" required />
                    {/* <input type="submit" className="" value="Sign Up" /> */}
                    <MotionButton type='submit' className='submitButton'>
                        Sign Up
                    </MotionButton>
                </form>

                <div id="formFooter w-100">
                    <p>I agree to the <Link to='/terms' className='underlineHover fw-bold'><strong>Terms and Conditions</strong></Link></p>
                </div>
            </div>
        );
    }

    return (
        <div id='authModal'>
            <div className="wrapper">
                <div id="formContent">
                    <Form_RadioOptionGroup wrapperClassName='auth-tabs' value={selectedTabIndex} options={["Sign In", "Sign Up"]} onChange={setSelectedTabIndex} />
                    <h2>Welcome</h2>

                    <div className="">
                        {/* <img src={images.LogoNoBG} /> */}
                    </div>
                    {selectedTabIndex == 0 ? renderLogin() : renderSignUp()}
                </div>
            </div>
        </div>
    );
}

export default AuthModal