import './CourseCard.scss';
import React from 'react'
import { Card, CardFlip } from '../../../components/Cards';
import { iSale, Popularity } from '../Courses';
import { ABT } from '../../../util/images';
import { useShoppingBasket } from '../../../helpers/hooks';
import { Category } from '../../../context/ShoppingBasketContext';
import { formatCurrency, replaceAllNewLineChars } from '../../../constants/funcs';

type CourseCardProps = {
    id: number;
    title: string;

    // Front
    imgSrc: string;

    // Back
    description: string;
    price: number;
    sale: iSale;
    duration: string;
    popularity?: Popularity;
}
const CourseCard: React.FC<CourseCardProps> = ({ id, title, imgSrc, description, price, sale, duration, popularity }: CourseCardProps) => {
    const { addToBasket } = useShoppingBasket();


    function isOnSale(): boolean {
        return (sale?.price < price);
    }

    // function formatCurrency(value: number): string {
    //     return value.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
    // }

    /*function calculateSalePercentage(price: number, salePrice: number): number {
        if (salePrice > price) return price;

        let value = (salePrice / price);
        value = 1 - value;
        value *= 100;
        value = Math.round(value);
        return value;
    }

    const renderBanner = (popularity: Popularity) => {
        switch (popularity) {
            case Popularity.MostPopular:
                return (
                    <div className='top-banner'>
                        <p>Most Popular</p>
                    </div>
                );
            case Popularity.GreatDeal:
                return (
                    <div className='top-banner'>
                        <p>Great Deal</p>
                    </div>
                );
        }
    }*/


    return (
        <Card className="course-card border-white border-white-shadow">
            <div className="photo">
                <img className='background' src={imgSrc} />
            </div>

            <div className="info"
            // style={{ padding: (popularity === Popularity.Normal ? '1rem 0.5rem' : '4rem 0.5rem') }}
            >
                <h1 className='title'>{title}</h1>

                <div className="description-container">
                    <label className='new-line'>{description}</label>
                </div>

                <div className='price-container' data-onsale={isOnSale()}>
                    <h4 className={`price ${isOnSale() && "is-on-sale"}`}>{formatCurrency(price)}</h4>
                    {isOnSale() &&
                        <h4 className='sale-price'>{formatCurrency(sale?.price)}</h4>
                    }
                </div>
            </div>

            <div className='app__flex'>
                <button
                    className='border-button join-button'
                    onClick={() =>
                        {
                            const category : Category = "Courses";
                            addToBasket(category, id.toString(), (isOnSale() ? sale?.price : price))
                        }
                    }
                >Join Now</button>
            </div>
        </Card>








        // <div className="course-card">
        //     <img className='background' src={ frontImg } />

            /* <div className="circle">
                
            </div> * / }


            { renderBanner(popularity as Popularity) }


            <div className="title-banner">
                <label>{title}</label>
            </div>

            {isOnSale() &&
                <div className='sale-sticker'>
                    <label className="new-line">{"Save\n"}{calculateSalePercentage(price, sale?.price)}%</label>
                </div>
            }

            <div className="info" style={{ padding: (popularity === Popularity.Normal ? '1rem 0.5rem' : '4rem 0.5rem') }}>
                <h1 className="title">{title}</h1>
                <h3 className='description new-line'>{description}</h3>
                <h3 className='duration'>{duration}</h3>

                <div className='price-container'>
                    <h4 className={`price ${isOnSale() && "is-on-sale"}`}>{formatCurrency(price)}</h4>
                    {isOnSale() &&
                        <h4 className='sale-price'>{formatCurrency(sale?.price)}</h4>
                    }
                </div>
            </div>

            <img className="abt" src={ABT} />


            <div className="buttons">
                <button className="enroll-button">Enroll Now</button>
            </div>

        </div>*/







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
        //                     <h4 className={`price ${isOnSale() && "is-on-sale"}`}>{formatCurrency(price)}</h4>
        //                     {isOnSale() &&
        //                         <h4 className='sale-price'>{formatCurrency(sale?.price)}</h4>
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