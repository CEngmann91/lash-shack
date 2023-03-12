import './Basket.scss';
import { RootState } from '../../redux/store';
import { useSelector as useReduxSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { ArrowMotionButton, ImageBanner, MotionButton, PageWrapper } from '../../components'
import { formatCurrency } from '../../res/funcs';
import { Icon_Minus, Icon_Plus, Icon_Trash } from '../../res/icons';
import { useNavigate } from 'react-router-dom';
import { useBasketActions } from '../../redux/hooks/useBasketActions';
import useGetUsers from '../../hooks/useGetUsers';

const Basket = () => {
  const navigate = useNavigate();
  const { addToBasket, removeFromBasket, deleteItemFromBasket, emptyBasket } = useBasketActions();
  const { getAllStaff } = useGetUsers();
  const firstName = useReduxSelector((state: RootState) => state.userAccount.user.firstName);
  const basketItems = useReduxSelector((state: RootState) => state.basket.basketItems);
  const totalAmount = useReduxSelector((state: RootState) => state.basket.totalAmount);


  return (
    <PageWrapper title="Basket">
      <ImageBanner title={!firstName ? 'My Basket' : `${firstName}'s Basket`} />

      <section className='basket__section'>
        <Container>
          {basketItems?.length === 0 ?
            <div className='d-flex flex-column justify-content-center align-items-center'>

              {!firstName ?
                <h2 className='text-center'>No Lashes have been added to the basket.</h2>
                :
                <h2 className='text-center'>No Lashes here {firstName}, add some to the basket?</h2>
              }
              <ArrowMotionButton className='buy-button w-15 mt-4' onClick={() => navigate("/shop")}>
                Shop Now
              </ArrowMotionButton>
            </div>
            :
            <Row>
              <Col lg='8'>
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
              </Col>

              <Col lg='4'>
                {basketItems?.length !== 0 ?
                  <>
                    <div>
                      <h6 className='d-flex align-items-center justify-content-between'>
                        Select Staff
                        <select name="technicians">
                          <option value="select">Please Select</option>
                          {getAllStaff?.map(({ uid, firstName, lastName }, key) =>
                            <option key={key} value={uid}>{firstName} {lastName}</option>
                          )}
                        </select>
                      </h6>


                    </div>


                    <div>
                      <h6 className='d-flex align-items-center justify-content-between'>
                        Subtotal
                        <span className='fs-4 fw-bold'>{formatCurrency(totalAmount)}</span>
                      </h6>
                    </div>

                    <div className='d-flex flex-row gap-2 mt-2'>
                      <MotionButton className='buy-button w-100' onClick={() => navigate(-1)}>
                        Back
                      </MotionButton>

                      <MotionButton className='buy-button w-100' onClick={emptyBasket}>
                        Clear All
                      </MotionButton>
                    </div>

                    <MotionButton className='buy-button w-100 mt-2' disabled={true} onClick={() => navigate("/checkout")}>
                      Checkout
                    </MotionButton>
                  </>
                  : null
                }
              </Col>
            </Row>
          }
        </Container>
      </section>
    </PageWrapper >
  )
}

export default Basket
