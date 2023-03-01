import './DashboardUsers.scss';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Col } from 'reactstrap';
import { Avatar, Checkbox, LoadingSpinner, MotionButton } from '../../../components';
import { UserProfile } from '../../../types/UserProfile';
import { updateUserActiveStatus } from '../../../helpers/firebase/firebaseHelper';
import { Icon_ArrowHeadUp, Icon_Bell, Icon_Calendar, Icon_Chess_Pawn, Icon_Chess_QueenCrown, Icon_Email, Icon_Trash } from '../../../res/icons';
import SectionContainerWrapper from '../../../components/SectionContainerWrapper/SectionContainerWrapper';
import useGetUsers from '../../../hooks/useGetUsers';
import { useDate } from '../../../hooks/useDate';

const DashboardUsers = () => {
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const { users, loadingUsers, getUsersError } = useGetUsers();
    const { getRelativeTimeString } = useDate();




    const handleActiveChange = async (checked: boolean, profile: UserProfile) => {
        await updateUserActiveStatus(profile, checked);
    }

    const renderData = () => (
        users?.map((item, key) => {
            // if (item.uid === user.uid)
            //     return null;


            return (
                <tr key={key}>
                    <td>{item.account === "Manager" ?
                        // <label>&#9819;</label>
                        <Icon_Chess_QueenCrown />
                        :
                        (item.account === "Staff" ?
                            // <label>&#9822;{key + 1}</label>
                            <Icon_Chess_Pawn />
                            : (key + 1))
                        }
                    </td>
                    {/* {item.account === "Manager" ?
                        <td>&#9819;</td>
                        :
                        (item.account === "Staff"
                            ?
                            <td>&#9822;</td>
                            :
                            <td>{key + 1}</td>
                        )
                    } */}
                    <td>
                        {/* <Checkbox label='' isSelected={item.active} onChange={checked => handleActiveChange(checked, item)} /> */}
                        <MotionButton className='dash__action-button' onClick={() => handleActiveChange(!item.active, item)}>
                            {item.active ? "Disable" : "Enable"}
                        </MotionButton>
                    </td>
                    <td><Avatar url={item.photoURL} scale="2.5rem" /></td>
                    <td>{item.firstName} {item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{getRelativeTimeString(new Date(item.memberSince))}</td>
                    <td>{getRelativeTimeString(new Date(item.lastLoggedIn))}</td>
                    <td className='d-flex gap-2'>
                        {item.account === "Manager" || item.account === "Staff" ?
                            <MotionButton className='dash__action-button' onClick={() => { }}>
                                <Icon_Calendar className='text-white' />
                            </MotionButton>
                            :
                            <MotionButton className='dash__action-button' onClick={() => { }}>
                                <Icon_Bell className='text-white' />
                            </MotionButton>
                        }

                        <MotionButton className='dash__action-button' onClick={() => { }}>
                            <Icon_Email className='text-white' />
                        </MotionButton>

                        {user.account === "Manager" &&
                            <MotionButton className='dash__action-button' onClick={() => { }}>
                                <Icon_Trash className='text-white' />
                            </MotionButton>
                        }
                    </td>
                </tr >
            )
        })
    )

    return (
        <SectionContainerWrapper className='dashboard_users__section'>

            <Col lg='12'>
                <h4 className='fw-bold'>Users ({users?.length})</h4>
            </Col>

            <Col lg='12'>
                <table className='table mt-3'>
                    <thead>
                        <tr className=''>
                            <th>#</th>
                            <th>Account</th>
                            <th>Photo</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Member Since</th>
                            <th>Last Active</th>
                            <th>Actions</th>

                            {/* <th>#</th>
                            <th>Active<Icon_ArrowHeadUp /></th>
                            <th>Photo<Icon_ArrowHeadUp /></th>
                            <th>Full Name<Icon_ArrowHeadUp /></th>
                            <th>Email<Icon_ArrowHeadUp /></th>
                            <th>Member Since<Icon_ArrowHeadUp /></th>
                            <th>Last Active<Icon_ArrowHeadUp /></th>
                            <th>Actions</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            loadingUsers ? <LoadingSpinner title="Loading Users" /> : renderData()
                        }
                    </tbody>
                </table>
            </Col>
        </SectionContainerWrapper>
    )
}

export default DashboardUsers