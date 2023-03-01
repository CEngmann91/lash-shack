import './Dashboard.scss';
import { PageWrapper } from '../../components';
import { Col, Container, Row } from 'reactstrap';
import useGetUsers from '../../hooks/useGetUsers';
import useGetCourses from '../../hooks/useGetCourses';
import useGetServices from '../../hooks/useGetServices';
import useGetOrders from '../../hooks/useGetOrders';
import { useSelector as useReduxSelector } from 'react-redux';
import { formatCurrency } from '../../res/funcs';
import { RootState } from '../../redux/store';
import { useDate } from '../../hooks/useDate';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';

const Dashboard = () => {
    const { getRelativeTimeString } = useDate();
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const { users, loadingUsers, getUsersError } = useGetUsers();
    const { orders, totalOrderAmount, totalOrderAmountThisMonth, loadingOrders, getOrdersError, getOrdersFromCurrentUser, totalOrderAmountFromCurrentUser } = useGetOrders((user.account === "Manager" ? null : user.uid));
    const { courses, loadingCourses, getCoursesError } = useGetCourses();
    const { services, loadingServices, getServicesError } = useGetServices();




    return (
        <PageWrapper title="Dashboard">
            <section className='dashboard__section'>
                <Container>
                    <Row className='stats-header'>

                        {user.account !== "Manager" ?
                            <>
                                <Col lg='3' md='3'>
                                    <div className="orders__box">
                                        <h5>Total Orders</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{formatCurrency(totalOrderAmountFromCurrentUser)} ({getOrdersFromCurrentUser ? getOrdersFromCurrentUser?.length : 0})</span>
                                        }
                                    </div>
                                </Col>

                                <Col lg='3' md='3'>
                                    <div className="revenue__box">
                                        <h5>Member Since</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{getRelativeTimeString(new Date(user.memberSince.slice(0, -7)))}</span>
                                            // <span>{user.memberSince.slice(0, -7)}</span>
                                        }
                                    </div>
                                </Col>
                            </>
                            :
                            <>
                                <Col lg='3' md='3'>
                                    <div className="revenue__box">
                                        <h5>Total Revenue</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{formatCurrency(totalOrderAmount)}</span>
                                        }
                                    </div>
                                </Col>
                                <Col lg='3' md='3'>
                                    <div className="orders__box">
                                        <h5>Total Orders</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{orders?.length}</span>
                                        }
                                    </div>
                                </Col>
                                <Col lg='3' md='3'>
                                    <div className="users__box">
                                        <h5>Total Users</h5>
                                        {loadingUsers ?
                                            <span>Loading...</span>
                                            :
                                            <span>{users?.length}</span>
                                        }
                                    </div>
                                </Col>

                                <Col lg='3' md='3'>
                                    <div className="catalog__box">
                                        <h5>Catalog Total</h5>
                                        {loadingServices || loadingCourses ?
                                            <span>Loading...</span>
                                            :
                                            <span>{services?.length + courses?.length}</span>
                                        }
                                    </div>
                                </Col>
                            </>
                        }
                    </Row>

                    {/* <Row>
                        <Col lg='3' md='3'>
                            <div className="catalog__box">
                                <h5>Catalog Total</h5>
                                {loadingServices || loadingCourses ?
                                    <span>Loading...</span>
                                    :
                                    <span>{services?.length + courses?.length}</span>
                                }
                            </div>
                        </Col>
                    </Row> */}

                </Container>
            </section>
        </PageWrapper>
    )
}

export default Dashboard