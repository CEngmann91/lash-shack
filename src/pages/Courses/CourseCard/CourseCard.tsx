import './CourseCard.scss';
import React from 'react'
import { CardFlip } from '../../../components/Cards';
import { iSale, Popularity } from '../Courses';

interface iProps {
    id: number;
    title: string;

    // Front
    frontImg: string;

    // Back
    description: string;
    price: number;
    sale: iSale;
    popularity?: Popularity;
}
const CourseCard: React.FC<iProps> = ({ id, title, frontImg, description, price, sale, popularity, ...props }: iProps) => {


    function isOnSale(): boolean {
        return (sale?.price < price);
    }

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
        <div className="course-card">
            <img src={frontImg} />

            {/* <div className="circle">
                
            </div> */}

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

            {isOnSale() &&
                <div className='sale-sticker'>
                    <label className="new-line">{"Save\n"}{calculateSalePercentage(price, sale?.price)}%</label>
                </div>
            }


            <div className="info">
                <h1 className="title">{title}</h1>
                <h3 className='description'>{description}</h3>

                <div className='price-container'>
                    <h4 className={`price ${isOnSale() && "is-on-sale"}`}>{toCurrency(price)}</h4>
                    {isOnSale() &&
                        <h4 className='sale-price'>{toCurrency(sale?.price)}</h4>
                    }
                </div>
            </div>

            <div className="buttons">
                <button className="enroll-button">Enroll Now</button>
            </div>

        </div>


        // <CardFlip id={id}
        //     frontClassName={`card-item ${popularity === Popularity.MostPopular ? "most-popular" : ""}`}
        //     frontChildren={
        //         <>
        //             <img src={frontImg} />

        //             {popularity === Popularity.MostPopular &&
        //                 <div className='most-popular-banner'>
        //                     <p>Most Popular</p>
        //                 </div>
        //             }
        //             {popularity === Popularity.GreatDeal &&
        //                 <div className='most-popular-banner'>
        //                     <p>Great Deal</p>
        //                 </div>
        //             }

        //             <div className="title-banner">
        //                 <label>{title}</label>
        //             </div>
        //         </>
        //     }
        //     backClassName='card-item-back'
        //     backChildren={
        //         <>
        //             {isOnSale() &&
        //                 <div className='sale-sticker'>
        //                     <label className="new-line">{calculateSalePercentage(price, sale?.price)}{"%\nOFF"}</label>
        //                 </div>
        //             }
        //             {/* <div className="circle" /> */}

        //             <div className="info">
        //                 <h1 className="title">{title}</h1>
        //                 <h3 className='description'>{description}</h3>

        //                 <div className='price-container'>
        //                     <h4 className={`price ${isOnSale() && "is-on-sale"}`}>{toCurrency(price)}</h4>
        //                     {isOnSale() &&
        //                         <h4 className='sale-price'>{toCurrency(sale?.price)}</h4>
        //                     }
        //                 </div>
        //             </div>

        //             <div className="buttons">
        //                 <button className="enroll-button">Enroll Now</button>
        //             </div>
        //         </>
        //     } />
    )
}

export default CourseCard