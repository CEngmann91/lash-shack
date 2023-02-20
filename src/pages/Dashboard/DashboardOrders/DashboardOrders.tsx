import './DashboardOrders.scss'
import React, { useMemo, useState } from 'react'
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import SectionContainerWrapper from '../../../components/SectionContainerWrapper/SectionContainerWrapper'
import { Avatar, LoadingSpinner, MotionButton } from '../../../components'
import { PurchaseOrder } from '../../../types/PurchaseOrder'
import { Col, Container, Row } from 'reactstrap';
import useGetOrders from '../../../hooks/useGetOrders';
import { formatCurrency } from '../../../res/funcs';
import DataTable from 'react-data-table-component';
import { PurchaseOrderItem } from '../../../types/PurchaseOrderItem';


const admin_columns = [
    // {
    //     name: "Date & Time",
    //     selector: (row: any) => `${row.date} ${row.time}`
    // },
    {
        name: "Date & Time",
        selector: (row: PurchaseOrder | any) => `${row.date} ${row.time}`
    },
    {
        name: "Customer",
        selector: (row: PurchaseOrder | any) => row.customerID
    },
    {
        name: "Total Quantity",
        selector: (row: PurchaseOrder | any) => `${row.products.length} item(s)`
    },
    {
        name: "Total",
        selector: (row: PurchaseOrder | any) => formatCurrency(row.total)
    },
];

const columns = [
    {
        name: "Date & Time",
        selector: (row: PurchaseOrder | any) => `${row.date} ${row.time}`
    },
    {
        name: "Total",
        selector: (row: PurchaseOrder | any) => formatCurrency(row.total)
    }
];

const DashboardOrders = () => {
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const isAnAdmin = user.account === "Admin";
    const { orders, loadingOrders, getOrdersError, getOrdersFromCurrentUser } = useGetOrders((isAnAdmin ? null : user.uid));
    type Tab = "NONE" | "Day" | 'Week' | "Month";
    const [selectedTab, setSelectedTab] = useState<Tab>("NONE");







    const ordersList = useMemo(() => {
        if (isAnAdmin)
            return orders;
        return getOrdersFromCurrentUser;
    }, [loadingOrders]);



    const ExpandedOrder = (data: PurchaseOrder | any) => {
        const { products, time, date, total, customerID } = data['data'];
        const orderProducts = products as PurchaseOrderItem[];

        return (
            <Container className=''>
                <Row>
                    {/* <Col lg='12' className='d-flex justify-content-between p-2'>
                        <h5 className='fw-bold'>{customerID}</h5>
                        <h5>{date} {time}</h5>
                    </Col> */}
                    <Col lg='12'>
                        <table className='table mt-3'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-end'>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orderProducts?.map(({ name, price, quantity, imgUrl }, key) => (
                                    <tr key={key}>
                                        <td>
                                            <Avatar url={imgUrl} scale="2.5rem" borderRadius='10px' />
                                        </td>
                                        <td>{name}</td>
                                        <td>{formatCurrency(price)}</td>
                                        <td className='text-center'>{quantity}</td>
                                        <td className='text-end'>{formatCurrency(price * quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                    <Col lg='12' className='d-flex justify-content-between p-2 bg__beige-colour text-black'>
                        <h5 className='fw-bold'>Total</h5>
                        <h5>{formatCurrency(total)}</h5>
                    </Col>
                    {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
                </Row>
            </Container>
        );
    };



    return (
        <SectionContainerWrapper className='dashboard_orders__section'>

            <Col lg='12' className='d-flex justify-content-between'>
                {ordersList?.length > 0 ?
                    <h4 className='fw-bold'>Orders ({ordersList?.length})</h4>
                    :
                    <h4 className='fw-bold'>Empty</h4>
                }

                <div className='d-flex gap-1'>
                    <MotionButton className={`dash__action-button tab ${selectedTab === "NONE" ? "tab-selected" : ""}`}
                        disabled={ordersList?.length === 0}
                        onClick={() => setSelectedTab("NONE")}>
                        NONE
                    </MotionButton>

                    <MotionButton className={`dash__action-button tab ${selectedTab === "Day" ? "tab-selected" : ""}`}
                        disabled={ordersList?.length === 0}
                        onClick={() => setSelectedTab("Day")}>
                        Day
                    </MotionButton>
                    <MotionButton className={`dash__action-button tab ${selectedTab === "Week" ? "tab-selected" : ""}`}
                        disabled={ordersList?.length === 0}
                        onClick={() => setSelectedTab("Week")}>
                        Week
                    </MotionButton>
                    <MotionButton className={`dash__action-button tab ${selectedTab === "Month" ? "tab-selected" : ""}`}
                        disabled={ordersList?.length === 0}
                        onClick={() => setSelectedTab("Month")}>
                        Month
                    </MotionButton>
                </div>
            </Col>


            {loadingOrders ?
                <LoadingSpinner title="Loading Orders" />
                :
                <DataTable
                    columns={(isAnAdmin ? admin_columns : columns)}
                    data={ordersList}
                    expandableRows
                    expandableRowsComponent={ExpandedOrder}
                    pagination
                />
            }
        </SectionContainerWrapper>
    )
}

export default DashboardOrders