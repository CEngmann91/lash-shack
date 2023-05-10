import './ProductDetails.scss';
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ArrowMotionButton, Form_RadioOptionGroup, LoadingSpinner, MotionButton, PageWrapper, SelectDropdown } from '../../components'
import { Container, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';
import { clearFormFields, formatCurrency } from '../../res/funcs';
import { useDispatch } from 'react-redux';
import { basketActions } from '../../redux/slices/basketSlice';
import { ProductItem } from '../../types/ProductItem';
import StarRating from '../../components/StarRating/StarRating';
import useGetCatalog from '../../hooks/useGetCatalog';
import { Icon_Star } from '../../res/icons';
import { launchTreatwell } from '../../util/util';
import { CONTACT } from '../../constants/constants';
import { UpcomingDate } from '../../types/UpcomingDate';
import useGetUsers from '../../hooks/useGetUsers';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { catalog, loading, error } = useGetCatalog();
    const { getAllStaffInRomford, getAllStaffInHackney, getAllStaffInRomfordNames, getAllStaffInHackneyNames } = useGetUsers();
    const product = catalog?.find(item => item.id === id) as ProductItem;
    type Tab = "Description" | "Reviews" | "Topics Covered" | "Itinerary";
    const [selectedTab, setSelectedTab] = useState<Tab>("Description");
    const [reviewRating, setReviewRating] = useState<number>(0);

    const locations = ["Romford", "Hackney"]
    const [selectedLocation, setSelectedLocation] = useState<string>("")
    const [selectedTabIndex, setSelectedTabIndex] = useState(-1);
    const [selectedCourseDate, setSelectedCourseDate] = useState<UpcomingDate>({} as UpcomingDate);
    const [selectedTechnician, setSelectedTechnician] = useState("");



    const selectLocTrainingDates = useMemo(() => {
        if (!product || !selectedLocation || !product?.upcomingDates)
            return [] as UpcomingDate[];

        const now = new Date().getTime();

        const upcoming = product?.upcomingDates
            .reduce((result, { capacity, date, location, maxCapacity }) =>
                location?.toLowerCase() === selectedLocation?.toLowerCase()   // Compare and match
                    && (new Date(date).getTime() - now) > 0    // Ensures only relavent dates are present.
                    // && Number(capacity) < Number(maxCapacity)   // Make sure there is enough space left.
                    ?
                    result.push({ capacity, date, location, maxCapacity }) && result :
                    result,
                []) as UpcomingDate[];
        return upcoming;
    }, [selectedLocation, product?.upcomingDates]);


    const selectLocActualDates = useMemo(() => {
        let list: string[] = [];
        selectLocTrainingDates.map(item => list.push(item.date));
        return list;
    }, [selectedLocation, product?.upcomingDates]);





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

    const onLocationChanged = (value: string) => {
        setSelectedLocation(value);
        setSelectedTabIndex(-1);
        setSelectedCourseDate(selectLocTrainingDates[0]);
        setSelectedTechnician("");
    };

    const onDateChanged = (value: number) => {
        setSelectedTabIndex(value);
        setSelectedCourseDate(selectLocTrainingDates[value]);
        setSelectedTechnician("");
    }

    const onTechnicianChanged = (value: string) => {
        setSelectedTechnician(value);
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

            <section className='productDetails__section pt-0'>
                <Container>
                    <Row>
                        <Col lg='6' md='6' className='product__details d-flex justify-content-center'>
                            <figure className="td-figure">
                                <img src={imgUrl} alt="Image description" />
                            </figure>
                        </Col>

                        <Col lg='6'>
                            <div className="product__details">
                                <h2>{title}</h2>

                                {category === "Services" ? (
                                    <p className='mb-3 font-italic text-muted'>{category} - {subServiceCategory}</p>
                                ) : (
                                    <p className='mb-3 font-italic text-muted'>{category}</p>
                                )}
                                {/* {avgRatings() === 0 ?
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
                                } */}

                                <span className='product__price'>{formatCurrency(price)}</span>
                                {/* <p className='mt-3'>{shortDesc}</p> */}
                                <p />

                                {category === "Courses" ? (
                                    <div className='product__upcoming-dates animation_slideUp'>
                                        <span className='product__upcoming-dates-title'>
                                            <i style={{ color: '#ec439f' }}>* </i>Location</span>

                                        <SelectDropdown
                                            className='w-100 mt-0'
                                            name="subject"
                                            placeholder='Please Select'
                                            selected={selectedLocation}
                                            options={locations}
                                            onChange={onLocationChanged}
                                        />

                                        {selectedLocation && selectLocTrainingDates?.length > 0 ? (
                                            <>
                                                <span className='product__upcoming-dates-title'>
                                                    <i style={{ color: '#ec439f' }}>* </i>Dates</span>
                                                <Form_RadioOptionGroup
                                                    wrapperClassName='radio-group-section w-100 animation_slideUp'
                                                    value={selectedTabIndex} options={selectLocActualDates}
                                                    onChange={onDateChanged}
                                                />

                                                {selectedTabIndex != -1 && (
                                                    <div className='text-center mt-3'>
                                                        {selectedCourseDate && selectedCourseDate?.maxCapacity - selectedCourseDate?.capacity == 0 ? (
                                                            <h4>Sold Out!</h4>
                                                        ) : (
                                                            selectedCourseDate && selectedCourseDate?.maxCapacity - selectedCourseDate?.capacity == 1 ? (
                                                                <h4 className="text-danger limited-availability">ONLY 1 AVAILABLE! BE QUICK</h4>
                                                            ) : (
                                                                <h4>Only {selectedCourseDate && selectedCourseDate?.maxCapacity - selectedCourseDate?.capacity} space(s) left</h4>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            selectedLocation && (
                                                <h4 className='text-center'>No Training Dates Yet!</h4>
                                            )
                                        )}
                                    </div>
                                ) : null}


                                {/* {selectedLocation && (
                                    selectedLocation === CONTACT.LOCATIONS[0].BOROUGH_SUB ?
                                        getAllStaffInRomford?.map((item) => <p>{item.firstName}</p>)
                                        :
                                        getAllStaffInHackney?.map((item) => <p>{item.firstName}</p>)
                                )} */}


                                {/* {selectedTabIndex != -1 && (
                                    <div className='animation_slideUp'>
                                        <span className='product__upcoming-dates-title'>
                                            <i style={{ color: '#ec439f' }}>* </i>Technician</span>

                                        <SelectDropdown
                                            className='w-100 mt-0'
                                            name="subject"
                                            placeholder='Please Select'
                                            selected={selectedTechnician}
                                            options={(selectedLocation === "Romford" ? getAllStaffInRomfordNames : getAllStaffInHackneyNames)}
                                            onChange={onTechnicianChanged}
                                        />
                                    </div>
                                )} */}



                                {/* <ArrowMotionButton className='buy__button' onClick={addToBasket}>
                                    Add To Basket
                                </ArrowMotionButton> */}

                                {/* {category === "Courses" ? ( */}
                                <ArrowMotionButton className='buy__button w-100'
                                    disabled={
                                        selectLocTrainingDates?.length > 0 ? (
                                            !selectedLocation
                                            || selectedTabIndex == -1
                                            || selectedCourseDate !== null && selectedCourseDate?.maxCapacity - selectedCourseDate?.capacity == 0
                                        ) : (
                                            !selectedLocation
                                        )
                                    }
                                    onClick={() => launchTreatwell(selectedLocation)}
                                >
                                    Book Now
                                </ArrowMotionButton>
                                {/* ) : (
                                    <ArrowMotionButton className='buy__button w-100' onClick={() => launchTreatwell('Romford')}>
                                        View Service
                                    </ArrowMotionButton>
                                )} */}


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