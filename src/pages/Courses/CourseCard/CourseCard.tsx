import './CourseCard.scss';
import React from 'react'
import { CardFlip } from '../../../components/Cards';
import { photography } from '../../../util/images';
import { Popularity } from '../Courses';

interface iProps {
    id: number;
    title: string;

    // Front
    frontImg: string;

    // Back
    description: string;
    price: number;
    salePrice: number;
    popularity?: Popularity;
}
const CourseCard: React.FC<iProps> = ({ id, title, frontImg, description, price, salePrice, popularity, ...props }: iProps) => {


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
            frontClassName={`card-item ${popularity === Popularity.MostPopular ? "most-popular" : ""}`}
            frontChildren={
                <>
                    {/* <img src={frontImg} /> */}
                    <img src={photography} />

                    {popularity === Popularity.MostPopular &&
                        <div className='most-popular-banner'>
                            <p>Most Popular</p>
                        </div>
                    }

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
                    {/* <div className='description'></div> */}
                    <label className='description'>{description}</label>
                    <label>{toCurrency(price)}</label>
                    <label>{toCurrency(salePrice)}</label>
                    {(salePrice < price) &&
                        <div className='sale-sticker'>
                            <label>{calculateSalePercentage(price, salePrice)}% off</label>
                        </div>
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