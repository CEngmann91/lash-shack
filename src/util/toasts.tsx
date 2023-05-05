import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function showSubscription() {
    toast("Thank You for Subscribing 👋", {
        theme: 'colored',
        toastId: "Subscribe", // Prevents duplicates
        style: {
            background: '#ec439f',
            color: '#fff'
        },
        // icon: ({ theme, type }) => <img src={images.LogoNoBG} />,
        progressStyle: {
            background: '#fff' //'#E8DFD0'
        },
    });
}

export function showError(text: string, bgColour: string = '#ec439f') {
    toast.error(text, {
        icon: false,
        style: {
            background: bgColour,
            color: '#fff'
        },
        progressStyle: {
            background: '#fff' //'#E8DFD0'
        },
    });
}