import './Checkout.scss';
import React from 'react'
import { ImageBanner, MotionButton, PageWrapper } from '../../components'
import { Col, Container, Row, Form, FormGroup } from 'reactstrap';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatCurrency } from '../../res/funcs';

const Checkout = () => {
  const totalQuantity = useReduxSelector((state: RootState) => state.basket.totalQuantity);
  const basketItems = useReduxSelector((state: RootState) => state.basket.basketItems);
  const totalAmount = useReduxSelector((state: RootState) => state.basket.totalAmount);


  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    console.log(checked);

  }

  return (
    <PageWrapper title="Checkout">
      <ImageBanner title={'Checkout'} />

      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form'>
                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter Your Name' />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="email" placeholder='Enter Your Email' />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="number" placeholder='Enter Contact Number' autoComplete="mobile tel" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter First Line of Address' />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='City' />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='Post Code' />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='Country' />
                </FormGroup>

                <label htmlFor="">
                  <input className='' type="checkbox" onChange={handleCheckboxChange} />
                  Save Details
                </label>

              </Form>
            </Col>

            <Col lg='4'>
              <div className="checkout__basket">
                <h6>Total Qty: <span>{totalQuantity} items</span></h6>
                <h6>SubTotal: <span>{formatCurrency(totalAmount)}</span></h6>
                <h4>Total: <span>{formatCurrency(totalAmount)}</span></h4>
                <MotionButton className='buy-button w-100'>
                  Confirm Order
                </MotionButton>
              </div>
            </Col>

          </Row>
        </Container>
      </section>


    </PageWrapper>
  )
}

export default Checkout