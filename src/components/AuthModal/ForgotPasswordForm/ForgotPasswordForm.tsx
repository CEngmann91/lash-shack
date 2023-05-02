import './ForgotPasswordForm.scss';
import { InputField, MotionButton } from '../..'

const ForgotPasswordForm = () => {
    
    return (
        <div id="pageWrapper" className='fadeIn'>
            <h2>Forgot Your Password?</h2>
            <form>
                <InputField placeholder="Enter Your Email" type="text" required autoComplete='email' />
                {/* <input type="submit" className="" value="Log In" /> */}


                {/* <MotionButton type='submit' className='submitButton'>
                    Confrim
                </MotionButton> */}
            </form>
        </div>
    )
}

export default ForgotPasswordForm