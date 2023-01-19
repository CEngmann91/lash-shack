import './ProductDetails.scss';
import React, { useEffect, useState } from 'react'
import { MotionButton, PageWrapper } from '../../components'
import { Container, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';
import { productListing } from '../../assets/listing';
import { calculateDaysFromTodayString, clearFormFields, formatCurrency } from '../../res/funcs';
import { Icon_Star } from '../../res/icons';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { basketActions } from '../../redux/slices/basketSlice';
import { ProductItem } from '../../types/ProductItem';
import StarRating from '../../components/StarRating/StarRating';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    type Tab = "Description" | "Reviews";
    const product = productListing.find(item => item.id === id) as ProductItem;
    const { title, category, subServiceCategory, shortDesc, description, imgUrl, price, reviews, upcomingDates } = product;
    const [selectedTab, setSelectedTab] = useState<Tab>("Description");
    const [reviewRating, setReviewRating] = useState<number>(0);





    function handleFormSubmit(e: React.FormEvent<EventTarget | HTMLFormElement>) {
        // We don't want our page to refresh
        e.preventDefault();

        const target = e.target as typeof e.target & {
            // name property has to match
            name: { value: string };
            message: { value: string };
        };
        const name = target.name.value;       // typechecks!
        const message = target.message.value; // typechecks!
        if (!name || !message || reviewRating === 0) {
            return;
        }

        const newReview = {
            name,
            rating: reviewRating,
            message,
            date: new Date().toLocaleDateString('en-GB')
        };
        reviews.push(newReview);

        setReviewRating(0);
        clearFormFields();
    }

    function addToBasket() {
        dispatch(basketActions.addToBasket({
            id, title, imgUrl, price
        }));
    }

    function avgRatings() {
        if (reviews?.length === 0)
            return 0;

        let sum = 0;
        reviews?.forEach(element => sum += element.rating);
        return Number((sum / reviews?.length).toFixed(2));
    }


    return (
        <PageWrapper title={title}>
            <ImageBanner title={title} />

            <section className='pt-0'>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <img src={imgUrl} alt="" />
                        </Col>

                        <Col lg='6'>
                            <div className="product__details">
                                <h2>{title}</h2>

                                {category === "Services" ?
                                    <p className='mb-3'>{category} - {subServiceCategory}</p>
                                    :
                                    <p className='mb-3'>{category}</p>
                                }
                                <div className='product__rating d-flex align-items-center gap-1 mb-4'>
                                    
                                    {[...Array(Math.floor(avgRatings()))].map((i) =>
                                        <div key={i}>
                                            <span><Icon_Star /></span>
                                        </div>
                                    )}
                                    <p>
                                        ({<span>{avgRatings()}</span>} out of 5)
                                    </p>
                                </div>

                                <span className='product__price'>{formatCurrency(price)}</span>
                                <p className='mt-3'>{shortDesc}</p>

                                {category === "Courses" ?
                                    <div className='product__upcoming-dates mt-3'>
                                        <span className='product__upcoming-dates-title'>Upcoming Dates</span>
                                        {upcomingDates.length > 0
                                            ?
                                            (upcomingDates.map((date, key) => {
                                                const daysPast = calculateDaysFromTodayString(date);
                                                // Ensures that we only show dates that havent yet passed.
                                                if (daysPast < 0)
                                                    return null;

                                                return (
                                                    <p key={key}>{date}</p>
                                                )
                                            }
                                            ))
                                            :
                                            <p>No Upcoming dates. STAY TUNED.</p>
                                        }
                                    </div>
                                    : null}

                                <MotionButton className='buy__button' onClick={addToBasket}>
                                    Add To Basket
                                </MotionButton>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>


            <section>
                <Row>
                    <Col lg='12'>
                        <div className="tab__wrapper d-flex align-items-center gap-5">
                            <h6 className={`tab ${selectedTab === "Description" ? "active__tab" : ""}`} onClick={() => setSelectedTab("Description")}>Description</h6>
                            <h6 className={`tab ${selectedTab === "Reviews" ? "active__tab" : ""}`} onClick={() => setSelectedTab("Reviews")}>Reviews ({reviews.length})</h6>
                        </div>

                        {selectedTab === "Description"
                            ?
                            <div className="tab__content mt-4">
                                <p className='new-line'>{description}</p>
                            </div>
                            :
                            <div className="product__review mt-4">
                                <div className="review__wrapper">
                                    <ul>
                                        {reviews?.map(({ name, message, date, rating }, key) => (
                                            <li key={key} className="mt-4">
                                                <h6>{name}</h6>
                                                <span>{rating} (rating)</span>
                                                <p>{date}</p>
                                                <p>{message}</p>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="review__compose-form">
                                        <h4>Leave a Review</h4>
                                        <form action="" onSubmit={handleFormSubmit}>
                                            <div className="form__group">
                                                <input type="text" name="name" placeholder='Enter Name' required />
                                            </div>
                                            <div className="form__group d-flex align-items-center gap-5">
                                                <StarRating initialValue={5} onChange={value => setReviewRating(value)}/>
                                            </div>
                                            <div className="form__group">
                                                <textarea rows={4} name="message" placeholder='Message Content' required />
                                            </div>

                                            <MotionButton className='buy__button' type="submit">
                                                Send
                                            </MotionButton>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        }
                    </Col>
                </Row>
            </section>
        </PageWrapper>
    )
}

export default ProductDetails