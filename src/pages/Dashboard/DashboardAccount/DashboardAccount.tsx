import './DashboardAccount.scss';
import React, { useState } from 'react'
import { updateUserPhotoURL, uploadProfilePhoto } from '../../../helpers/firebase/firebaseHelper';
import { UserProfile } from '../../../types/UserProfile';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Col, Container, Row } from 'reactstrap';
import { Avatar } from '../../../components';
import { useUserActions } from '../../../redux/hooks/userActionsUtils';
import UploadInput from '../../../components/Form/UploadInput/UploadInput';

const DashboardAccount = () => {
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const { setProfile } = useUserActions();
    const [file, setFile] = useState<File>();


    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files?.length > 0) {
            setFile(files[0]);

            updateProfilePhoto(user, files[0])
        }
    }


    const updateProfilePhoto = async (userProfile: UserProfile, photoFile: File) => {
        try {
            let photoURL: string = "";
            await uploadProfilePhoto(photoFile, "profilePhotos", userProfile.uid, (url) => {
                photoURL = url
                setProfile(user.displayName, url);
                setFile(undefined);
            });



            // alert(photoURL)

            // const uploadPhoto = await uploadProfilePhoto(photoFile, "profilePhotos", userProfile.uid);
            // if (uploadPhoto)
            // {
            // await updateUserPhotoURL(userProfile, userProfile.displayName)
            //     .then(() => {
            //         dispatch_updateUserURL(photoURL);
            //     });
            // }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='dashboard_account__section'>
            <Container>
                <Row>
                    <Col lg='2' className=''>


                        <div className=''>
                            <Avatar url={user.photoURL} scale='10rem' className='profile__photo' />
                        </div>

                        <span>
                            <p>{user.firstName} {user.lastName}</p>
                            <p>{user.email}</p>
                        </span>
                        <UploadInput className='profile__photo-picker' accept="image/*" onChange={handleFileChange}>
                            Change Photo
                        </UploadInput>

                    </Col>


                    <Col lg='10' md="5" className=''>

                    </Col>
                </Row>
            </Container>
        </section >


    )
}

export default DashboardAccount