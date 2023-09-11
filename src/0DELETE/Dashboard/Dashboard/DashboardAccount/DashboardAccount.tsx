import './DashboardAccount.scss';
import { ChangeEvent } from 'react'
import { updateUserPhotoURL, uploadPhoto } from '../../../../firebase/firebaseHelper';
import { UserProfile } from '../../../../types/UserProfile';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Col } from 'reactstrap';
import { Avatar } from '../../../../components';
import { useUserActions } from '../../../../redux/hooks/useUserActions';
import UploadInput from '../../../../components/Form/UploadInput/UploadInput';
import { Icon_CloudUpload } from '../../../../res/icons';
import SectionContainerWrapper from '../../../SectionContainerWrapper/SectionContainerWrapper';
import DashboardSchedule from '../DashboardSchedule/DashboardSchedule';

const DashboardAccount = () => {
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const { setProfile } = useUserActions();







    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files?.length > 0) {
            updateProfilePhoto(user, files[0])
        }
    }

    const updateProfilePhoto = async (userProfile: UserProfile, photoFile: File) => {
        try {
            await uploadPhoto(photoFile, "profilePhotos", userProfile.uid,
                (state, progress) => {

                    console.log('state', state, "progress", progress);
                },
                async (url) => {
                    setProfile(user.displayName, url)
                    await updateUserPhotoURL(user, url);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <SectionContainerWrapper className='dashboard_account__section'>
            <Col lg='2' className=''>


                <div className='profile__photo-wrapper'>
                    <Avatar className='profile__photo' url={user.photoURL} scale='10rem' />
                    <UploadInput className='profile__photo-picker' accept="image/*" onChange={handleFileChange}>
                        <Icon_CloudUpload />
                    </UploadInput>
                </div>

                <span>
                    {/* <p>{user.uid}</p> */}
                    <p>{user.firstName} {user.lastName}</p>
                    <p>{user.email}</p>
                </span>
            </Col>


            <Col lg='10' md="5" className=''>
                <span><p>Test</p></span>
            </Col>

            {/* <Col lg='12' className='bg-success'>
                <p>Danger Zone</p>

            </Col>

            <Col lg='12' className='bg-danger'>
                <p>Danger Zone</p>
            </Col> */}




            <Col lg='12' className='mt-4'>
                <DashboardSchedule />
            </Col>

        </SectionContainerWrapper>
    )
}

export default DashboardAccount