import React, { ReactNode } from 'react'
import './FAQs.scss';
import { Accordion, ImageBanner, PageWrapper } from '../../components';

const FAQs = () => {
    return (
        <PageWrapper title="FAQs">
            <ImageBanner title="FAQs" subtitle="Find Answers to Frequenty Asked questions" />

            <section className='faqs__section'>
                <Accordion id='1' title="How does the billing work?" content="Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method." />
                <Accordion id='2' title='What is the refund policy?' content='Springerdata offers a 30-day money-back guarantee on all services. If you are not satisfied with your purchase for any reason, you can request a full refund within 30 days of your purchase. Refunds are typically processed within 3-5 business days.' />
            </section>
        </PageWrapper>
    )
}

export default FAQs