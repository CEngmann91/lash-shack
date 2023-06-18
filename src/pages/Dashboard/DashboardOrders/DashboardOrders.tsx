import './DashboardOrders.scss'
import { useMemo, useState, MouseEvent } from 'react'
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import SectionContainerWrapper from '../../../components/SectionContainerWrapper/SectionContainerWrapper'
import { Avatar, Form_RadioOptionGroup, LoadingSpinner, MotionButton } from '../../../components'
import { PurchaseOrder } from '../../../types/PurchaseOrder'
import { Col, Container, Row } from 'reactstrap';
import useGetOrders from '../../../hooks/useGetOrders';
import { useDate } from '../../../hooks/useDate';
import DataTable from 'react-data-table-component';
import { PurchaseOrderItem } from '../../../types/PurchaseOrderItem';
import { formatCurrency } from '../../../util/formatCurrency';


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
    const { dayNumeric, monthNumeric, fullYear } = useDate();
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const isAnAdmin = user.account === "Manager";
    const { orders, loadingOrders, ordersError, getOrdersFromCurrentUser } = useGetOrders((isAnAdmin ? null : user.uid));
    const tabs = ["ALL", "Day", 'Week', "Month", "Year"];
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);



    const ordersList = useMemo(() => {
        const data = (isAnAdmin ? orders : getOrdersFromCurrentUser);


        if (tabs[selectedTabIndex] === "Day") {
            //Then filter the dates
            return data?.filter(e => {
                const day = e.date.split('/')[0];
                return (+dayNumeric == +day);
            });
        }
        else if (tabs[selectedTabIndex] === "Week") {
            //Then filter the dates
            return data?.filter(e => {
                var char = e.date.charAt(2);//return '/' or '-'
                const sevenDays = new Date().getTime() + (7 * 24 * 60 * 60 * 1000)
                // day hour  min  sec  msec
                const parse = Date.parse(e.date.split(char).reverse().join(char))
                return sevenDays > parse;
            });




            // //Then filter the dates
            // return data?.filter(e => {
            //     const dateTimeSplit = e.date.split(' ');
            //     const itemDate = dateTimeSplit[0];
            //     const day = itemDate.split('/')[0];
            //     const ONE_WEEK = (1000 * 60 * 60 * 24 * 7);
            //     return +day > Date.now() - ONE_WEEK;
            // });
        }
        else if (tabs[selectedTabIndex] === "Month") {
            const date = new Date();
            //Get the fullYear and the currentMonth
            const currentMonth = date.getMonth() + 1;

            //Then filter the dates
            return data?.filter(e => {
                const month = e.date.split('/')[1];
                const year = e.date.split('/')[2];
                return (fullYear === +year) && (currentMonth === +month);
            });
        }
        else if (tabs[selectedTabIndex] === "Year") {
            //Then filter the dates
            return data?.filter(e => {
                var year = e.date.split('/')[2];
                return (fullYear == +year);
            });
        }
        return data;
    }, [loadingOrders, selectedTabIndex]);



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
                <h4 className='fw-bold'>Orders ({ordersList?.length === 0 ? 0 : ordersList?.length})</h4>

                <Form_RadioOptionGroup value={selectedTabIndex} options={tabs} onChange={setSelectedTabIndex} />
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