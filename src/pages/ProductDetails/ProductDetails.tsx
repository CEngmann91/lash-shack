import './ProductDetails.scss';
import { FormEvent, useEffect, useState } from 'react'
import { ArrowMotionButton, LoadingSpinner, MotionButton, PageWrapper } from '../../components'
import { Container, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';
import { clearFormFields, formatCurrency, launchTreatwell } from '../../res/funcs';
import { useDispatch } from 'react-redux';
import { basketActions } from '../../redux/slices/basketSlice';
import { ProductItem } from '../../types/ProductItem';
import StarRating from '../../components/StarRating/StarRating';
import useGetCatalog from '../../hooks/useGetCatalog';
import { Icon_Star } from '../../res/icons';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { catalog, loading, error } = useGetCatalog();
    const product = catalog?.find(item => item.id === id) as ProductItem;
    type Tab = "Description" | "Reviews" | "Topics Covered" | "Itinerary";
    const [selectedTab, setSelectedTab] = useState<Tab>("Description");
    const [reviewRating, setReviewRating] = useState<number>(0);



    // Ensures that we haev in fact found the product before continuing.
    if (!product) {
        return <LoadingSpinner title='Loading Product...' />
    }


    let { title, category, subServiceCategory, shortDesc, description, imgUrl, price, reviews, upcomingDates, courseTopics, courseItinerary } = product;



    function renderServicesTabs() {

        return (
            <div id="services-tabs">
                <main>
                    <input id="tab1" type="radio" name="tabs" checked={selectedTab === "Description"} onChange={() => setSelectedTab("Description")} />
                    <label htmlFor='tab1'>Decription</label>

                    <section id="content1">
                        <p className='text__new-line' id="description">{description}</p>
                    </section>
                </main>
            </div>
        );
    }

    function renderCoursesTabs() {

        return (
            <div id="course-tabs">
                <main>
                    <input id="tab1" type="radio" name="tabs" checked={selectedTab === "Description"} onChange={() => setSelectedTab("Description")} />
                    <label htmlFor='tab1'>Decription</label>

                    <input id="tab2" type="radio" name="tabs" checked={selectedTab === "Topics Covered"} onChange={() => setSelectedTab("Topics Covered")} />
                    <label htmlFor='tab2'>Topics Covered</label>

                    <input id="tab3" type="radio" name="tabs" checked={selectedTab === "Itinerary"} onChange={() => setSelectedTab("Itinerary")} />
                    <label htmlFor='tab3'>Itinerary</label>

                    <section id="content1">
                        <p className='text__new-line'>{description}</p>
                    </section>

                    <section id="content2">
                        <p className='text__new-line'>{courseTopics}</p>
                    </section>

                    <section id="content3">
                        <p className='text__new-line'>{courseItinerary}</p>
                    </section>
                </main>
            </div>
        );
    }


    // description = description.replace(/\*([^*]+?)\*/g, "<b>$1<\/b>");
    // description = description.replace(/\s\*/g, "-");
    // description = description.replace(/\*([^*]+)\*/g , '<i>$1</i>');
    // description = description.replace(/\*\*(.+?)\*\*(?!\*)/g,'<b>$1</b>').replace(/\*([^*><]+)\*/g,'<i>$1</i>');

    function handleFormSubmit(e: FormEvent<EventTarget | HTMLFormElement>) {
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
        reviews.unshift(newReview);

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

        let sum = reviews.reduce<number>((total, item) => {
            return total + item.rating;
        }, 0);
        return Number((sum / reviews?.length).toFixed(2));
    }

    return (
        <PageWrapper title={title}>
            {/* <ImageBanner title={title} /> */}

            <section className='pt-0'>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className='product__details-image'>
                                <img src={imgUrl} alt="" />
                            </div>
                        </Col>

                        <Col lg='6'>
                            <div className="product__details">
                                <h2>{title}</h2>

                                {category === "Services" ? (
                                    <p className='mb-3 font-italic'>{category} - {subServiceCategory}</p>
                                ) : (
                                    <p className='mb-3 font-italic'>{category}</p>
                                )}
                                {avgRatings() === 0 ?
                                    <p className='mb-4'>No Reviews</p>
                                    :
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
                                }

                                <span className='product__price'>{formatCurrency(price)}</span>
                                {/* <p className='mt-3'>{shortDesc}</p> */}
                                <p />

                                {/* {category === "Courses" ? (
                                    <div className='product__upcoming-dates mt-3'>
                                        <span className='product__upcoming-dates-title'>Upcoming Dates</span>
                                        {upcomingDates.length > 0
                                            ?
                                            (upcomingDates.map((date, key) => <p key={key}>{date}</p>))
                                            :
                                            <p>No Upcoming dates. STAY TUNED.</p>
                                        }
                                    </div>
                                ) : null} */}

                                {/* <ArrowMotionButton className='buy__button' onClick={addToBasket}>
                                    Add To Basket
                                </ArrowMotionButton> */}

                                <ArrowMotionButton className='buy__button w-100' onClick={launchTreatwell}>
                                    View {category.slice(0, -1)}
                                </ArrowMotionButton>


                                <div className='mt-3'>
                                    {category === "Services" ? (renderServicesTabs()) : (renderCoursesTabs())}
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>


            {/* <section>
                <Row>
                    <Col lg='12'>
                        {category === "Services" ? ( renderServicesTabs() ) : (renderCoursesTabs())}
                    </Col>

                </Row>
            </section> */}
        </PageWrapper>
    )
}

export default ProductDetails