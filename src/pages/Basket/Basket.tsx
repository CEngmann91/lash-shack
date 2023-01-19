import './Basket.scss';
import React from 'react'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { basketActions } from '../../redux/slices/basketSlice';
import { Col, Container, Row } from 'reactstrap';
import { ImageBanner, MotionButton, PageWrapper } from '../../components'
import { formatCurrency } from '../../res/funcs';
import { Icon_Minus, Icon_Plus, Icon_Trash } from '../../res/icons';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstName = useReduxSelector((state: RootState) => state.userAccount.user.firstName);
  const basketItems = useReduxSelector((state: RootState) => state.basket.basketItems);
  const totalAmount = useReduxSelector((state: RootState) => state.basket.totalAmount);

  // const basketCount = 0;


  function addToBasket(id: string, title: string, imgUrl: string, price: number) {
    dispatch(basketActions.addToBasket({
      id, title, imgUrl, price
    }));
  }

  function removeFromBasket(id: string, title: string, imgUrl: string, price: number) {
    dispatch(basketActions.removeFromBasket({
      id, price
    }));
  }

  function deleteItemFromBasket(id: string) {
    dispatch(basketActions.deleteItem(id));
  }

  return (
    <PageWrapper title="Basket">
      <ImageBanner title={!firstName ? 'My Basket' : `${firstName}'s Basket`} />

      <section className='basket__section'>
        <Container>
          <Row>
            <Col lg='9'>
              {basketItems?.length === 0 ?
                <div className=''>
                  <h2 className='text-center'>No Lashes have been added to the basket.</h2>
                  <MotionButton className='buy-button' onClick={() => navigate("/shop")}>
                    Shop Now
                  </MotionButton>
                </div>
                :
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th className='text-center'>Quantity</th>
                      <th className='text-center'>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {basketItems?.map(({ id, imgUrl, title, price, quantity, totalPrice }, key) => (
                      <tr key={key}>
                        <td>
                          <img src={imgUrl} alt="" style={{ width: '40px', height: '40px' }} />
                        </td>
                        <td>{title}</td>
                        <td>{formatCurrency(price)}</td>
                        <td className='text-center'>
                          <div className='d-flex justify-content-center gap-2'>
                            <MotionButton className='product__increase' disabled={quantity === 1} onClick={e => removeFromBasket(id, title, imgUrl, price)}>
                              <Icon_Minus />
                            </MotionButton>

                            {quantity}

                            <MotionButton className='product__decrease' onClick={e => addToBasket(id, title, imgUrl, price)}>
                              <Icon_Plus />
                            </MotionButton>
                          </div>
                        </td>
                        {/* <td className='text-center'>x{quantity}</td> */}
                        <td className='text-center'>
                          {/* <MotionButton className='product__remove' onClick={e => removeFromBasket(id, title, imgUrl, price)}> */}
                          <MotionButton className='product__delete' onClick={e => deleteItemFromBasket(id)}>
                            <Icon_Trash />
                          </MotionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              }
            </Col>

            <Col lg='3'>
              {basketItems?.length === 0 ?
                <></>
                :
                <>
                  <div>
                    <h6 className='d-flex align-items-center justify-content-between'>
                      Subtotal
                      <span className='fs-4 fw-bold'>{formatCurrency(totalAmount)}</span>
                    </h6>
                  </div>

                  <div>
                    <MotionButton className='basket__checkout w-100' onClick={() => navigate("/checkout")}>
                      Checkout
                    </MotionButton>

                    <MotionButton className='basket__shop w-100 mt-3' onClick={() => navigate("/shop")}>
                      Continue Shopping
                    </MotionButton>
                  </div>
                </>
              }
            </Col>
          </Row>
        </Container>
      </section>
    </PageWrapper >
  )
}

export default Basket
