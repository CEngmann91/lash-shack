import './ShoppingBasketDrawerItem.scss';
import React, { useState } from 'react'
import { formatCurrency } from '../../../constants/funcs';
import { useShoppingBasket } from '../../../helpers/hooks';
import { Bin, DownArrowHead, UpArrowHead } from '../../../util/icons';
import { Card } from '../../Cards';
import { Category } from '../../../context/ShoppingBasketContext';

import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import { SelectInfo } from 'rc-menu/lib/interface';
import { BOOKING } from '../../../constants/constants';

type ShoppingBasketDrawerItemProps = {
    category: Category;
    id: string;
    title: string;
    quantity: number;
    price: number;
    onSale?: boolean;
    salePrice?: number;
    selectedDate?: string;
    dates?: string[];
}
function ShoppingBasketDrawerItem({ category, id, title, quantity, price, onSale, salePrice, selectedDate, dates }: ShoppingBasketDrawerItemProps) {
    const { addToBasket, removeFromBasket, decreaseFromBasket, setDateTimeForBasketItem } = useShoppingBasket();
    // const [selectedDate, setSelectedDate] = useState<string>("");




    function isACourse() {
        return category === "Courses";
    }

    function onSelect(key: SelectInfo) {
        // alert(`${key.selectedKeys} selected`);
        
        const date = key.selectedKeys[0].toString();
        // setSelectedDate(date);
        setDateTimeForBasketItem(category, id, date);
    }

    function onTimeVisibleChange(visible: boolean) {
        // console.log(visible);
    }

    const timeMenuCallback = () => (
        <Menu onSelect={onSelect}>
            {dates?.map(item => <MenuItem key={item} className="time-menu" style={{ padding: '10px 10px', cursor: 'pointer' }}>{item}</MenuItem> )}
        </Menu>
    );

    return (
        <Card className='shopping-basket-card'>
            <section className="bc-info-content">
                <label className='name'>{title}</label>
                <div className='price'>
                    <label className={`${isACourse() ? "text__grey-underline" : null}`}>{formatCurrency(onSale ? salePrice as number : price)}</label>
                    {isACourse() ?
                        <label style={{ paddingLeft: '5px' }}>{formatCurrency(BOOKING.DEPOSIT_FEE)}</label>
                        :
                        null}
                </div>
                {isACourse() ?
                    <div className='bc-time-selector'>
                        <Dropdown trigger={['click']} overlay={timeMenuCallback}
                            animation="slide-up" onVisibleChange={onTimeVisibleChange}
                        >
                            {isACourse() ?
                                <button style={{}}>{selectedDate ? selectedDate : `Select Date`} <DownArrowHead /></button>
                                :
                                <button style={{}}>{selectedDate ? selectedDate : `Select Time Slot`} <DownArrowHead /></button>
                            }
                        </Dropdown>
                    </div>
                    :
                    null}
                {/* <label className='duration'>{formatHrsMins(duration)}</label> */}
            </section>

            <div className='bc-quantity-selector'>
                <button onClick={() => addToBasket(category, id, price)}><UpArrowHead /></button>
                <p>{quantity}</p>
                <button disabled={quantity < 2} onClick={() => decreaseFromBasket(category, id)}><DownArrowHead /></button>
            </div>

            <section className='bc-remove-button'>
                <button className='' onClick={() => removeFromBasket(category, id)}><Bin /></button>
            </section>
        </Card>
    )
}

export default ShoppingBasketDrawerItem