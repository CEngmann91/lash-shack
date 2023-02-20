import './Dashboard.scss';
import React from 'react'
import { PageWrapper } from '../../components';
import { Col, Container, Row } from 'reactstrap';
import useGetUsers from '../../hooks/useGetUsers';
import useGetCourses from '../../hooks/useGetCourses';
import useGetServices from '../../hooks/useGetServices';
import useGetOrders from '../../hooks/useGetOrders';
import { useSelector as useReduxSelector } from 'react-redux';
import { formatCurrency } from '../../res/funcs';
import { RootState } from '../../redux/store';

const Dashboard = () => {
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const { users, getActiveUsersTodayCount, loadingUsers, getUsersError } = useGetUsers();
    const { orders, totalOrderAmount, totalOrderAmountThisMonth, loadingOrders, getOrdersError, getOrdersFromCurrentUser, totalOrderAmountFromCurrentUser } = useGetOrders((user.account === "Admin" ? null : user.uid));
    const { courses, loadingCourses, getCoursesError } = useGetCourses();
    const { services, loadingServices, getServicesError } = useGetServices();






    return (
        <PageWrapper title="Dashboard">

            <section className='dashboard__section'>
                <Container>
                    <Row>

                        {user.account !== "Admin" ?
                            <>
                                <Col className="lg-3">
                                    <div className="orders__box">
                                        <h5>Total Orders</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{getOrdersFromCurrentUser ? getOrdersFromCurrentUser?.length : 0} / {formatCurrency(totalOrderAmountFromCurrentUser)}</span>
                                        }
                                    </div>
                                </Col>

                                <Col className="lg-3">
                                    <div className="revenue__box">
                                        <h5>Member Since</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{user.memberSince}</span>
                                        }
                                    </div>
                                </Col>
                            </>
                            :
                            <>
                                <Col className="lg-3">
                                    <div className="revenue__box">
                                        <h5>Total Sales</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{formatCurrency(totalOrderAmountThisMonth)} / {formatCurrency(totalOrderAmount)}</span>
                                        }
                                    </div>
                                </Col>
                                <Col className="lg-3">
                                    <div className="orders__box">
                                        <h5>Total Orders</h5>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{orders?.length}</span>
                                        }
                                    </div>
                                </Col>
                                <Col className="lg-3">
                                    <div className="users__box">
                                        <h5>Total Users</h5>
                                        {loadingUsers ?
                                            <span>Loading...</span>
                                            :
                                            <span>{getActiveUsersTodayCount} / {users?.length}</span>
                                        }
                                    </div>
                                </Col>

                                <Col className="lg-3">
                                    <div className="catalog__box">
                                        <h5>Total Catalog</h5>
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
                </Container>
            </section>

            {/* Dashboard */}
        </PageWrapper>
    )
}

export default Dashboard