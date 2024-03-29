import './Wishlist.scss';
import { PageWrapper, ImageBanner, ArrowMotionButton } from '../../components';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const Wishlist = () => {
    const navigate = useNavigate();
    const firstName = useReduxSelector((state: RootState) => state.userAccount.user.firstName);
    const wishListItems = useReduxSelector((state: RootState) => state.wishList.wishListItems);


    return (
        <PageWrapper title="Wish List">
            <ImageBanner title={!firstName ? 'Wish List' : `${firstName}'s Wish List`} />

            <section className='wishlist__section'>
                <Container>
                    <Row>
                        <Col>
                            {wishListItems?.length === 0 ?
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <>
                                        <h2 className='text-center'>
                                            {firstName ?
                                                `${firstName}, blow ` : `Blow `}
                                            a lash and make a wish.</h2>
                                    </>
                                    <ArrowMotionButton className='buy-button w-15 mt-4' onClick={() => navigate("/services")}>
                                        Shop Now
                                    </ArrowMotionButton>
                                </div>
                                :
                                <div>
                                    {JSON.stringify(wishListItems, null, 2)}
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Wishlist