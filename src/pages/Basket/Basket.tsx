import React from 'react';
import './Basket.scss';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector as useReduxSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { ArrowMotionButton, ImageBanner, MotionButton, PageWrapper } from '../../components'
import { Icon_Minus, Icon_Plus, Icon_Trash } from '../../res/icons';
import { useBasketActions } from '../../redux/hooks/useBasketActions';
import useGetUsers from '../../hooks/useGetUsers';
import { formatCurrency } from '../../util/formatCurrency';
import { BASKET_TEXT } from '../../constants/text';

const Basket = () => {
  const navigate = useNavigate();
  const { addToBasket, removeFromBasket, deleteItemFromBasket, emptyBasket } = useBasketActions();
  const { getAllStaff, getAllMembersOfLashShack } = useGetUsers();
  const firstName = useReduxSelector((state: RootState) => state.userAccount.user.firstName);
  const basketItems = useReduxSelector((state: RootState) => state.basket.basketItems);
  const totalAmount = useReduxSelector((state: RootState) => state.basket.totalAmount);

  return (
    <PageWrapper title="Basket">
      <ImageBanner title={!firstName ? BASKET_TEXT.TITLE : `${firstName}'s ${BASKET_TEXT.TITLE}`} />

      <section className='basket__section'>
        <Container>
          {basketItems.length === 0 ?
            <div className='d-flex flex-column justify-content-center align-items-center'>

              {!firstName ?
                <h2 className='text-center'>{BASKET_TEXT.EMPTY_BASKET}</h2>
                :
                <h2 className='text-center'>{BASKET_TEXT.EMPTY_BASKET_FOR_USER(firstName)}</h2>
              }
              <ArrowMotionButton className='buy-button w-15 mt-4' onClick={() => navigate("/services")}>
                {BASKET_TEXT.SHOP_NOW}
              </ArrowMotionButton>
            </div>
            :
            <Row>
              <Col lg='8'>
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>{BASKET_TEXT.IMAGE}</th>
                      <th>{BASKET_TEXT.TITLE}</th>
                      <th>{BASKET_TEXT.PRICE}</th>
                      <th className='text-center'>{BASKET_TEXT.QUANTITY}</th>
                      <th className='text-center'>{BASKET_TEXT.DELETE}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {basketItems.map(({ id, imgUrl, title, price, quantity, totalPrice }, key) => (
                      <tr key={key}>
                        <td>
                          <img src={imgUrl} alt="" className="product-image" />
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
                        <td className='text-center'>
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
                {basketItems.length !== 0 &&
                  <>
                    <div>
                      <h6 className='d-flex align-items-center justify-content-between'>
                        {BASKET_TEXT.SELECT_STAFF}
                        <select name="technicians">
                          <option value="select">{BASKET_TEXT.PLEASE_SELECT}</option>
                          {getAllMembersOfLashShack.map(({ uid, firstName, lastName }, key) =>
                            <option key={key} value={uid}>{firstName} {lastName}</option>
                          )}
                        </select>
                      </h6>
                    </div>

                    <div>
                      <h6 className='d-flex align-items-center justify-content-between'>
                        {BASKET_TEXT.SUBTOTAL}
                        <span className='fs-4 fw-bold'>{formatCurrency(totalAmount)}</span>
                      </h6>
                    </div>

                    <div className='d-flex flex-row gap-2 mt-2'>
                      <MotionButton className='buy-button w-100' onClick={() => navigate(-1)}>
                        {BASKET_TEXT.BACK}
                      </MotionButton>

                      <MotionButton className='buy-button w-100' onClick={emptyBasket}>
                        {BASKET_TEXT.CLEAR_ALL}
                      </MotionButton>
                    </div>

                    <MotionButton className='buy-button w-100 mt-2' disabled={true} onClick={() => navigate("/checkout")}>
                      {BASKET_TEXT.CHECKOUT}
                    </MotionButton>
                  </>
                }
              </Col>
            </Row>
          }
        </Container>
      </section>
    </PageWrapper >
  )
}

export default React.memo(Basket);