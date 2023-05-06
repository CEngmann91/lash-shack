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