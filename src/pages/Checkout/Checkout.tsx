import './Checkout.scss';
import { FormEvent, useState } from 'react'
import { GooglePayBtn, ImageBanner, InputField, MotionButton, PageWrapper } from '../../components'
import { Col, Container, Row, Form, FormGroup } from 'reactstrap';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearFormFields } from '../../res/funcs';
import { useNavigate } from 'react-router-dom';
import { useUserActions } from '../../redux/hooks/useUserActions';
import { addOrder } from '../../firebase/firebaseHelper';
import { PurchaseOrder } from '../../types/PurchaseOrder';
import { PurchaseOrderItem } from '../../types/PurchaseOrderItem';
import { useBasketActions } from '../../redux/hooks/useBasketActions';
import GooglePayButton from "@google-pay/button-react";
import { GPayItem } from '../../components/Payments/GooglePayBtn/GooglePayBtn';
import { showToast } from '../../util/toasts';
import { formatCurrency } from '../../util/formatCurrency';

const Checkout = () => {
  const navigate = useNavigate();
  const { setBillingAddress, } = useUserActions();
  const { emptyBasket } = useBasketActions();
  const user = useReduxSelector((state: RootState) => state.userAccount.user);
  const totalQuantity = useReduxSelector((state: RootState) => state.basket.totalQuantity);
  const basketItems = useReduxSelector((state: RootState) => state.basket.basketItems);
  const totalAmount = useReduxSelector((state: RootState) => state.basket.totalAmount);

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    firstLine: "",
    city: "",
    postcode: "",
    country: "",
    saveDetails: false,


    payment: {
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    billing: {
      name: "",
      firstLine: "",
      city: "",
      postCode: "",
      country: "",
    }
  });

  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [number, setNumber] = useState("")
  // const [firstLine, setFirstLine] = useState("")
  // const [city, setCity] = useState("")
  // const [postcode, setPostcode] = useState("")
  // const [country, setCountry] = useState("");
  // const [saveDetails, setSaveDetails] = useState(false);




  const createOrder = async () => {
    const dateTime =
      new Date().toLocaleString("en-GB");
    // new Date().toLocaleString() + '';
    const split = dateTime.split(" ");
    // Get the date and remove the ',' char at the end of the string.
    const date = split[0].slice(0, -1);
    const time = split[1];
    const orderID = `${user.uid}__${dateTime.replaceAll("/", "_")}`;

    let products: PurchaseOrderItem[] = [];
    basketItems.forEach(({ id, title, price, quantity, imgUrl }) => {
      products = [...products, { id, name: title, price, quantity, imgUrl }]
    });

    // Create a new order and add the props needed.
    const newOrder: PurchaseOrder = {
      id: orderID,
      customerID: user.uid,
      products: products,
      date: date,
      time: time,
      total: 0
    };
    newOrder.total = newOrder.products?.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);


    // console.log( JSON.stringify(newTestOrder, null, 2) );

    // addPurchaseOrder(newTestOrder);

    // console.log( JSON.stringify(user, null, 2) );

    await addOrder(user, newOrder);

    emptyBasket();
    clearFormFields();
  }

  const handleFormSubmit = async (e: FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();

    // const target = e.target as typeof e.target & {
    //     // name property has to match
    //     name: { value: string };
    //     email: { value: string };
    //     number: { value: string };
    //     oneLine: { value: string };
    //     city: { value: string };
    //     postCode: { value: string };
    //     country: { value: string };
    // };
    // const email = target.email.value;       // typechecks!
    // const name = target.name.value;       // typechecks!
    // const number = target.number.value;       // typechecks!
    // const oneLine = target.oneLine.value;       // typechecks!
    // const city = target.city.value;       // typechecks!
    // const postCode = target.postCode.value;       // typechecks!
    // const country = target.country.value; // typechecks!
    // if (!email || !name || !number) {
    //     return;
    // }
    await createOrder();
  };


  function handleDiscountFormSubmit(e: FormEvent<EventTarget | HTMLFormElement>) {
    e.preventDefault();
  }



  return (
    <PageWrapper title="Checkout">
      <ImageBanner title={'Checkout'} />

      <section className='checkout__section'>
        <Container>
          <Row>
            <Col lg='8'>
              <div className='fastPayment mb-4'>
                <h3 className='mb-3 fw-bold'>Pay With</h3>
                <GooglePayBtn
                  isTesting={false}
                  amount={totalAmount}
                  items={[{
                    label: 'Subtotal',
                    type: 'SUBTOTAL',
                    price: '11.00',
                  },
                  {
                    label: 'Tax',
                    type: 'TAX',
                    price: '1.00',
                  },
                  {
                    label: 'Shipping',
                    type: 'LINE_ITEM',
                    price: '0',
                    status: 'PENDING',
                  }] as GPayItem[]}
                  onSuccess={(paymentRequest: google.payments.api.PaymentData) => 
                    // console.log('load payment data', paymentRequest)
                    showToast("Thanks For Purchasing 💋", "Checkout purchase")
                  }
                  onError={error => alert("onError: " + JSON.stringify(error, null, 2))}
                  onCancelled={error => 
                    // alert("onCancelled: " + JSON.stringify(error, null, 2))
                    showToast("Purchase Cancelled 😞", "Purchase cancelled")
                  }
                  
                />
              </div>


              <p className='app_text__headingWithLine'><span className='fw-bold'>OR</span></p>
              {/* <h6 className='headingLine mb-3 fw-bold'>Or</h6> */}

              <div className='mb-4'>
                <h3 className='mb-3 fw-bold'>Payment Info</h3>

                <Form className='payment__form mt-3'>
                  <FormGroup className="form__group">
                    {/* <label className='fw-bold'>Name on Card</label> */}
                    <InputField name="nameOnCard" placeholder="Enter Name" type="text" required autoComplete='cc-name' />
                    {/* <input className='' name="nameOnCard" type="text" placeholder='Enter Name' //onChange={(e) => setForm({ ...form, name: e.target.value })}
                    /> */}
                  </FormGroup>

                  {/* <h6 className='fw-bold'>Card Information</h6> */}
                  <FormGroup className="form__group">
                    <InputField name="cardNumber" placeholder="Card Number" type="number" required autoComplete='cc-number' />
                    {/* <input className='' name="cardNumber" type="text" placeholder='1234 1234 1234 1234' //onChange={(e) => setForm({ ...form, name: e.target.value })}
                    /> */}
                  </FormGroup>

                  <FormGroup className="form__group d-flex flex-row gap-3">
                    {/* <input className='w-100' name="expiry" type="text" placeholder='MM / YY' //onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input className='w-100' name="cvv" type="text" placeholder='CVV' //onChange={(e) => setForm({ ...form, name: e.target.value })}
                    /> */}

                    <InputField className='w-50' name="expiry" placeholder="Expiry" type="text" required autoComplete='cc-exp' />
                    <InputField className='w-50' name="cvv" placeholder="CVV" type="number" required autoComplete='cc-csc' />
                  </FormGroup>
                </Form>
              </div>

              <div className='d-flex flex-column'>
                <h3 className='fw-bold'>Billing Address</h3>
                <Form className='billing__form'>
                  <FormGroup className="form__group">
                    <InputField className='w-100' name="name" placeholder="Enter Your Name" type="text" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <InputField className='w-100' name="oneLine" placeholder="Enter First Line of Address" type="text" required autoComplete='address-line1' onChange={(e) => setForm({ ...form, firstLine: e.target.value })} />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <InputField className='w-100' name="city" placeholder="City" type="text" required autoComplete='address-line2' onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <InputField className='w-100' name="postCode" placeholder="Post Code" type="text" required autoComplete='address-level1' onChange={(e) => setForm({ ...form, postcode: e.target.value })} />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <InputField className='w-100' name="country" placeholder="Country" type="text" required autoComplete='country-name' onChange={(e) => setForm({ ...form, country: e.target.value })} />
                  </FormGroup>
                </Form>
              </div>
            </Col>

            <Col lg='4'>
              <div className="checkout__basket">
                <h6>Total Qty: <span>{totalQuantity} items</span></h6>
                {/* <h6>SubTotal: <span>{formatCurrency(totalAmount)}</span></h6> */}
                <h4 className="line"></h4>
                <h5 className='text-center'><span>Discount Code</span></h5>
                <div className='discount__code d-flex flex-row gap-2 mb-2'>
                  <form id="discountForm" onSubmit={handleDiscountFormSubmit}>
                    <input type="email" id="discount-field" placeholder="Enter Code" />
                    <input type="submit" value="Apply" id="btn-apply" />
                  </form>
                </div>
                <h4 className="line"></h4>
                <h4>Total: <span>{formatCurrency(totalAmount)}</span></h4>

                <div className='d-flex flex-row gap-2'>
                  <MotionButton className='buy-button w-100' onClick={() => navigate(-1)}>
                    BACK
                  </MotionButton>
                  <MotionButton className='buy-button w-100' type='submit' onClick={handleFormSubmit}>
                    CONFIRM
                  </MotionButton>
                </div>
              </div>
            </Col>


          </Row>
        </Container>
      </section>


    </PageWrapper>
  )
}

export default Checkout