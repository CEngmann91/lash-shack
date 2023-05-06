import { MouseEventHandler, ReactNode } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../res/colours.scss';
import images from '../res/images';


export function showToast(title: string, id: string, icon: ReactNode = null) {
    toast(title, {
        theme: 'colored',
        toastId: id, // Prevents duplicates
        style: {
            background: '#ec439f',
            color: '#fff',
        },
        icon: ({ theme, type }) => icon, //<img src={images.LogoNoBG} />,
        progressStyle: {
            background: '#fff'
        },
    });
}

export function showLoggedInToast(firstName: string) {
    showToast("Welcome Back " + firstName + " 👋", "Logged In Success");
}

// export function showLoggedOutToast(firstName: string) {
//     showToast("Welcome Back " + firstName + " 👋", "Logged In Success");
// }

export function showSignUpSuccessToast(firstName: string) {
    showToast("Hi " + firstName + " 👋", "Signed Up Success");
}

export function showSignUpUnsuccessToast() {
    showError("Unable to Sign Up, Try Again", false);
}

export function showAccountInactiveToast() {
    showToast("Your Email is Longer Active", "Account Inactive");
}



export function showSubscription() {
    showToast("Thank You for Subscribing 👋", "Subscribe", <img src={images.LogoNoBG} />);
}

export function showError(text: string, icon: boolean = false, bgColour: string = '#ec439f') {
    toast.error(text, {
        icon: icon,
        style: {
            background: bgColour,
            color: '#fff'
        },
        progressStyle: {
            background: '#fff' //'#E8DFD0'
        },
    });
}