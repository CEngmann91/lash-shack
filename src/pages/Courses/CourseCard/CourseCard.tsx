import './CourseCard.scss';
import React from 'react'
import { CardFlip } from '../../../components/Cards';
import { aurora, photography } from '../../../util/images';
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
                    <img src={aurora} />

                    {popularity === Popularity.MostPopular &&
                        <div className='most-popular-banner'>
                            <p>Most Popular</p>
                        </div>
                    }
                    {popularity === Popularity.GreatDeal &&
                        <div className='most-popular-banner'>
                            <p>Great Deal</p>
                        </div>
                    }

                    <div className="title-banner">
                        <label>{title}</label>
                    </div>
                </>
            }
            backClassName='card-item-back'
            backChildren={
                <>
                    {(salePrice < price) &&
                        <div className='sale-sticker'>
                            <label className="new-line">{calculateSalePercentage(price, salePrice)}{"%\nOFF"}</label>
                        </div>
                    }
                    {/* <div className="circle" /> */}

                    <div className="info">
                        <h1 className="title">{title}</h1>
                        <h3 className='description'>{description}</h3>
                    </div>

                    
                    {/* <label>{title}</label> */}
                    {/* <div className='description'></div> */}
                    {/* <label className='description'>{description}</label> */}
                    {/* <label>{toCurrency(price)}</label> */}
                    {/* <label>{toCurrency(salePrice)}</label> */}



                    <div className="buttons">
                        <button className="enroll-button">Enroll Now</button>
                    </div>
                </>
            } />
    )
}

export default CourseCard