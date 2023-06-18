import './Dashboard.scss';
import { CircleProgressBar, PageWrapper } from '../../components';
import { Col, Container, Row } from 'reactstrap';
import useGetUsers from '../../hooks/useGetUsers';
import useGetCourses from '../../hooks/useGetCourses';
import useGetServices from '../../hooks/useGetServices';
import useGetOrders from '../../hooks/useGetOrders';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDate } from '../../hooks/useDate';
import { useEffect } from 'react';
import { Icon_ArrowDown, Icon_ArrowUp } from '../../res/icons';
import { formatCurrency } from '../../util/formatCurrency';

const Dashboard = () => {
    const { getRelativeTimeString, fullDateUK } = useDate();
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const { users, loadingUsers, usersError } = useGetUsers();
    const { orders, totalOrderAmount, totalOrderAmountThisMonth, totalOrderAmountLastMonth, totalOrderPercentileFromLastMonth, loadingOrders, ordersError, getOrdersFromCurrentUser, totalOrderAmountFromCurrentUser } = useGetOrders((user.account === "Manager" ? null : user.uid));
    const { courses, loadingCourses, coursesError } = useGetCourses();
    const { services, loadingServices, servicesError } = useGetServices();





    const testPercentages = [
        {
            value: 9,
            barColour: "rgb(232, 222, 209)",
            backgroundColour: "green"
        },
        {
            value: 2,
            barColour: "rgb(7, 76, 79)",
        },
        {
            value: 8,
            barColour: "hsl(356, 55%, 85%)",
        },

        {
            value: 100,
            barColour: "rgb(255, 76, 79)",
        },
    ];


    return (
        <PageWrapper title="Dashboard">
            <section className='dashboard__section'>
                <Container>
                    <h1 className='text-center mb-4'>{fullDateUK}</h1>

                    <Row className='stats-header'>
                        {user.account !== "Manager" ?
                            <>
                                {/* <Col lg='3' md='3'>
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
                                </Col> */}



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
                                        }
                                    </div>
                                </Col>
                            </>
                            :
                            <>
                                <Col lg='3' md='3'>
                                    <div className="revenue__box">
                                        <div className='d-flex flex-row'>
                                            <h5>Total Revenue</h5>
                                            <span className='percentage'>{totalOrderPercentileFromLastMonth >= 0 ? <Icon_ArrowUp className='success' /> : <Icon_ArrowDown className='failure' />}{totalOrderPercentileFromLastMonth}%</span>
                                        </div>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{formatCurrency(totalOrderAmount)}</span>
                                        }
                                    </div>
                                </Col>
                                <Col lg='3' md='3'>
                                    <div className="orders__box">
                                        <div className='d-flex flex-row'>
                                            <h5>Total Orders</h5>
                                        </div>
                                        {loadingOrders ?
                                            <span>Loading...</span>
                                            :
                                            <span>{orders?.length}</span>
                                        }
                                    </div>
                                </Col>
                                <Col lg='3' md='3'>
                                    <div className="users__box">
                                        <div className='d-flex flex-row'>
                                            <h5>Total Users</h5>
                                        </div>
                                        {loadingUsers ?
                                            <span>Loading...</span>
                                            :
                                            <span>{users?.length}</span>
                                        }
                                    </div>
                                </Col>

                                <Col lg='3' md='3'>
                                    <div className="catalog__box">
                                        <div className='d-flex flex-row'>
                                            <h5>Catalog Total</h5>
                                        </div>
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

                    <Row>
                        {testPercentages.map(({value, barColour, backgroundColour}, key) => (
                            <Col key={key} lg='3' md='3' className='d-flex justify-content-center'>
                                <CircleProgressBar id={`${key}`} progress={value} barColour={barColour} backgroundColour={backgroundColour}>
                                    <h1>{value * 10}%</h1>
                                </CircleProgressBar>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Dashboard