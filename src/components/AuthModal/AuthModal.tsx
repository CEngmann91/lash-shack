import './AuthModal.scss';
import React, { useState } from 'react'
import InputField from '../Form/Input/InputField';
import { Checkbox, Form_RadioOptionGroup } from '..';
import { Link } from 'react-router-dom';
import images from '../../res/images';

const AuthModal = () => {
    const tabs = ['Log In', 'Sign Up'];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);


    const renderLogin = () => {

        return (
            <div id="pageWrapper">
                {/* <h1>Login</h1> */}
                <form className='d-flex flex-column'>
                    <InputField className="" placeholder="Enter Your Email" type="text" required autoComplete='email' />
                    <InputField className="" placeholder="Enter Password" type="password" required autoComplete='password' />
                    <Checkbox label='Stay Signed In' onChange={(value) => { }} />
                    <input type="submit" className="" value="Log In" />
                </form>

                {/* <!-- Remind Passowrd --> */}
                <div id="formFooter w-100">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>
            </div>
        );
    }

    const renderSignUp = () => {

        return (
            <div id="pageWrapper">
                {/* <h1>Sign Up</h1> */}
                <form>
                    <InputField className='' placeholder="Enter First Name" type="text" required autoComplete='name' />
                    <InputField placeholder="Enter Surname" type="text" required autoComplete='name' />
                    <InputField placeholder="Enter Your Email" type="email" required autoComplete='email' />
                    <InputField placeholder="Enter Password" type="password" required autoComplete='password'/>
                    <InputField placeholder="Confirm Password" type="password" required />
                    <input type="submit" className="" value="Sign Up" />
                </form>

                <div id="formFooter w-100">
                    <p>I agree to the <Link to='/terms' className='fw-bold'>Terms and Conditions</Link></p>
                    {/* <a className="underlineHover" href="#">Forgot Password?</a> */}
                </div>
            </div>
        );
    }

    return (
        <div id='authModal'>
            <div className="wrapper">
                <div id="formContent">
                    {/* <!-- Tabs Titles --> */}
                    <Form_RadioOptionGroup wrapperClassName='auth-tabs' value={selectedTabIndex} options={["Sign In", "Sign Up"]}
                        onChange={setSelectedTabIndex}
                    />

                    <h2>Welcome</h2>

                    {/* <h2 className="active"> Sign In </h2>
                    <h2 className="inactive underlineHover">Sign Up </h2> */}

                    {/* <!-- Icon --> */}
                    <div className="">
                        {/* <img src={images.LogoNoBG} /> */}
                    </div>

                    {/* <!-- Login Form --> */}
                    {selectedTabIndex == 0 ? renderLogin() : renderSignUp()}
                </div>
            </div>
        </div>
    );
}

export default AuthModal