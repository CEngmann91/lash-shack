import './Dashboard.scss';
import React, { useEffect } from 'react';
import { useAuthContext } from '../../../providers/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { Avatar, DropDown } from '../../../components';
import { Exit, LeftArrow } from '../../../util/icons';

const Dashboard = () => {    
    const { profile, isAuthenticated, signOut } = useAuthContext();
    const navigate = useNavigate();
    const { updatePhotoURL } = useAuthContext()



    useEffect(() => {
        // If we are not authenticated then go back.
        if ( !isAuthenticated() )
        {
            navigate('/');
            return;
        }
        // updatePhotoURL(
        //     // "https://e0.pxfuel.com/wallpapers/165/534/desktop-wallpaper-earth-now-icon-space-earth-iphone-media-file-amazing-earth.jpg"
        //     "https://pbs.twimg.com/media/EsQs3c0XYAAsRQw.jpg"
        //     );
    }, [isAuthenticated()])
    


    const renderNavbar = () => {

        return (
            <nav className='dashboard-navbar-container'>
                <button className='dashboard-navbar-container--return' onClick={() => navigate('/')}>
                    {/* <img src={logo} /> */}
                    <LeftArrow />
                </button>

                <div className='dashboard-navbar-container-options'>
                    <div className="h-content user-info">
                        <Avatar url={profile?.photo_URL} onClick={() => {}} />
                        <div>
                            <p className='name'>{`${profile?.display_name}`}</p>
                            <p className='email'>{`${profile?.email_address}`}</p>
                        </div>
                    </div>

                    <button className='exit-button' onClick={() => signOut(() => navigate('/'))}>
                        <Exit />
                    </button>
                </div>
            </nav>
        );
    }

    return (
        <div className="app__account-dashboard">
            {renderNavbar()}
            <div className="container">
                {/* <label>{JSON.stringify(profile, null, 2)}</label> */}
            </div>
        </div>
    );
}

export default Dashboard;