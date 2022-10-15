import './Courses.scss';
import React, { useEffect } from 'react'
import { Page } from '../../components';
import { CardFlip } from '../../components/Cards';

export interface iCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  salePrice: number;
}
const courses: iCourse[] = [
  {
    id: 0,
    title: 'Classic',
    description: 'Classic',
    price: 10.00,
    salePrice: 10.00,
  },
  {
    id: 1,
    title: 'Classic Xtra',
    description: 'Classic Xtra',
    price: 20.00,
    salePrice: 8.00
  },
  {
    id: 2,
    title: 'Hybrid',
    description: 'Hybrid',
    price: 45.00,
    salePrice: 40.00
  },
  {
    id: 3,
    title: 'Russian',
    description: 'Russian',
    price: 35.00,
    salePrice: 27.00
  },
]

const Courses = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  function calculateSalePercentage(price: number, salePrice: number): number {
    if (salePrice > price) return price;

    let value = (salePrice / price);
    value = 1 - value;
    value *= 100;
    value = Math.round(value);
    return value;
  }

  return (
    <Page id='services' className='app__courses' header='Be Your Own Boss'>
      <p>Classic, Classic Xtra, Hybrid, Russian.</p>
      <p>Live Models</p>
      <p>In-depth Manuals</p>
      <p>Ongoing Support</p>
      <p>Fully Accredited</p>
      <p>Over 100 Students Qualified.</p>



      <div className="cards">
        {courses.map((item) => (
          <div className="box">
            <img src='https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=527&q=100' />
            <label>{item.title}</label>
            <label>{item.description}</label>
            <label>{item.price
              .toLocaleString('en-UK', { style: 'currency', currency: 'GBP' })
            }</label>
            <label>{item.salePrice
              .toLocaleString('en-UK', { style: 'currency', currency: 'GBP' })
            }</label>
            <label>{calculateSalePercentage(item.price, item.salePrice)}% off</label>
          </div>
        ))}

        {courses.map((item) => (
          <CardFlip id='0'
            frontClassName='card-item'
            frontChildren={
              <>
                <img src='https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=955&q=80' />
              </>
            }
            backClassName='card-item-back'
            backChildren={
              <>
                <label>{item.title}</label>
                <label>{item.description}</label>
                <label>{item.price
                  .toLocaleString('en-UK', { style: 'currency', currency: 'GBP' })
                }</label>
                <label>{item.salePrice
                  .toLocaleString('en-UK', { style: 'currency', currency: 'GBP' })
                }</label>
                <label>{calculateSalePercentage(item.price, item.salePrice)}% off</label>
              </>
            } />
        ))}



        {/* <div className="box">
          <img src='https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=527&q=100' />
        </div>

        <div className="box">
          <img src='https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=955&q=80' />
        </div> */}



        {/* <CardFlip id='0'
          frontClassName='card-item'
          frontChildren={
            <>
              <img src='https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=527&q=100' />
            </>
          }
          backClassName=''
          backChildren={
            <h1>Back</h1>
          } />


        <CardFlip id='1'
          frontClassName='card-item'
          frontChildren={
            <>
              <img src='https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=955&q=80' />
            </>
          }
          backClassName=''
          backChildren={
            <h1>Back</h1>
          } /> */}
      </div>




    </Page>


    // <div className="app__courses">
    //   <h1 className="head-text title"><span>Be Your Own Boss</span></h1>


    //   <p>Classic, Classic Xtra, Hybrid, Russian.</p>
    //   <p>Live Models</p>
    //   <p>In-depth Manuals</p>
    //   <p>Ongoing Support</p>
    //   <p>Fully Accredited</p>
    //   <p>Over 100 Students Qualified.</p>
    // </div>
  )
}

export default Courses