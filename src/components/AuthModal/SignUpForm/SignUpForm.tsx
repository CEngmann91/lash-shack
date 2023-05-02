import './SignUpForm.scss';
import { Link } from 'react-router-dom';
import { InputField, MotionButton } from '../..';

const SignUpForm = () => {
    
    return (
        <div id="pageWrapper" className='fadeIn'>
            <h2>Join Us</h2>
            <form>
                {/* <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required autoComplete='name' />
                    <input type="text" id="lasttName" name="lasttName" placeholder="Enter Last Name" required autoComplete='name' />
                    <input type="email" id="email" name="email" placeholder="Enter Email" required autoComplete='email' />
                    <input type="password" id="password" name="password" placeholder="Enter Your Password" required autoComplete='password' />
                    <input type="password" id="password" name="password" placeholder="Confirm Password" required /> */}


                <InputField placeholder="Enter First Name" type="text" required autoComplete='given-name' />
                <InputField placeholder="Enter Surname" type="text" required autoComplete='family-name' />
                <InputField placeholder="Enter Your Email" type="email" required autoComplete='email' />
                <InputField placeholder="Enter Password" type="password" required autoComplete='password' />
                <InputField placeholder="Confirm Password" type="password" required />
                {/* <input type="submit" className="" value="Sign Up" /> */}
                <MotionButton type='submit' className='submitButton'>
                    Sign Up
                </MotionButton>
            </form>

            <div id="formFooter w-100">
                <p>I agree to the <Link to='/terms' className='app__underlineHover fw-bold'><strong>Terms and Conditions</strong></Link></p>
            </div>
        </div>
    )
}

export default SignUpForm