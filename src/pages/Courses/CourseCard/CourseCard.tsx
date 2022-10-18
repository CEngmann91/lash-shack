import './CourseCard.scss';
import React from 'react'
import { CardFlip } from '../../../components/Cards';
import { photography } from '../../../util/images';

interface iProps {
    id: number;
    title: string;

    // Front
    frontImg: string;

    // Back
    description: string;
    price: number;
    salePrice: number;
}
const CourseCard: React.FC<iProps> = ({ id, title, frontImg, description, price, salePrice, ...props }: iProps) => {


    function toCurrency(value: number): string {
        return value.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
    }

    function calculateSalePercentage(price: number, salePrice: number): number {
        if (salePrice > price) return price;

        let value = (salePrice / price);
        value = 1 - value;
        value *= 100;
        value = Math.round(value);
        return value;
    }


    return (
        <CardFlip id={id}
            frontClassName='card-item'
            frontChildren={
                <>
                    {/* <img src={frontImg} /> */}
                    <img src={photography} />

                    <div className="title-container">
                        <label>{title}</label>
                    </div>
                </>
            }
            backClassName='card-item-back'
            backChildren={
                <>
                    <div className="circle" />
                    <label>{title}</label>
                    <label className='description'>{description}</label>
                    <label>{toCurrency(price)}</label>
                    <label>{toCurrency(salePrice)}</label>
                    { (salePrice < price) &&
                        <label>{calculateSalePercentage(price, salePrice)}% off</label>
                    }

                    <div className="buttons">
                        <button className="border-button enroll-button">
                            Enroll Now
                        </button>
                    </div>
                </>
            } />
    )
}

export default CourseCard