import './CourseCard.scss';
import React from 'react'
import { Card } from '../../../../components/Cards';
import { iSale, Popularity } from '../Courses';
import { useShoppingBasket } from '../../../../helpers/hooks';
import { formatCurrency, replaceAllNewLineChars } from '../../../../constants/funcs';

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
    const { addToBasket } = useShoppingBasket()


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

                <div className='price-container' data-onsale={sale.active}>
                    <h4 className={`price ${sale.active && "is-on-sale"}`}>{formatCurrency(price)}</h4>
                    {sale.active ?
                        <h4 className='sale-price'>{formatCurrency(sale?.price)}</h4>
                        :
                        null
                    }
                </div>
            </div>

            <div className='app__flex'>
                <button
                    className='border-button join-button'
                    onClick={() => addToBasket("Courses", id.toString(), (sale.active ? sale?.price : price))}
                >Join Now</button>
            </div>
        </Card>
    )
}

export default CourseCard