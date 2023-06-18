import React, { useState } from 'react';
import GooglePayButton from '@google-pay/button-react';

export type GPayItem = {
    label: 'Subtotal',
    type: 'SUBTOTAL',
    price: '11.00',
};

export interface GooglePayBtnProps {
    isTesting: boolean;
    amount: number;
    items?: GPayItem[];
    onSuccess: (paymentRequest: google.payments.api.PaymentData) => void;
    onError: (error: google.payments.api.PaymentsError | Error) => void;
    onCancelled: (error: google.payments.api.PaymentsError) => void;
    buttonType?: google.payments.api.ButtonType;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}
const GooglePayBtn = ({ isTesting, items, amount, onSuccess, onCancelled, onError, style, className, disabled, buttonType = "checkout" }: GooglePayBtnProps) => {



    
    
    function handleLoadPaymentData(paymentRequest: google.payments.api.PaymentData) {
        // alert("load payment data: " + JSON.stringify(paymentRequest, null, 2));
        // console.log('load payment data', paymentRequest);
        onSuccess(paymentRequest);
    }

    function handleError(error: google.payments.api.PaymentsError | Error) {
        if (error instanceof Error) {
            console.log('Error', error, error.message, error.stack);
        } else {
            console.log('Error', error.statusCode, error.statusMessage);
        }
        onError(error);
    }

    function handleCancelled(error: google.payments.api.PaymentsError) {
        // alert('Cancelled: ' + error.statusMessage);
        onCancelled(error);
    }

    return (
        <GooglePayButton
            environment={isTesting ? "TEST" : "PRODUCTION"}
            buttonColor="white"
            buttonType={buttonType}
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'square',
                                gatewayMerchantId: '3205-7082-6809',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    // merchantId: '12345678901234567890',
                    // merchantName: 'Demo Merchant',

                    merchantId: 'BCR2DN4T4T5LDX37', //`${process.env.REACT_APP_GOOGLE_PAY_MERCH_ID}`,
                    merchantName: 'Lash Shack',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: amount.toFixed(2),
                    currencyCode: 'GBP',
                    countryCode: 'US',
                },
            }}
            onLoadPaymentData={handleLoadPaymentData}
            onCancel={handleCancelled}
            onError={handleError}
            className={className}
            style={{
                ...style,
                pointerEvents: (disabled ? 'none' : 'all'),
                opacity: (disabled ? 0.5 : 1),
                transition: 'opacity 0.3s ease-out'
            }}
        />
    );
}
export default GooglePayBtn









/*
import GooglePayButton from "@google-pay/button-react";
import { ReactNode } from "react";


export type GPayItem = {
    label: 'Subtotal',
    type: 'SUBTOTAL',
    price: '11.00',
};

export interface GooglePayBtnProps {
    isTesting: boolean;
    onSuccess: () => void;
    onError: (error: google.payments.api.PaymentsError | Error) => void;
    onCancelled: (error: google.payments.api.PaymentsError) => void;
    items: GPayItem[];
}
const GooglePayBtn = ({ isTesting, items, onSuccess, onCancelled, onError }: GooglePayBtnProps) => {


    // google.payments.api.PaymentDataChangedHandler
    // function handlePaymentDataChanged(paymentData: google.payments.api.IntermediatePaymentData) {
    //     if (paymentData.shippingAddress?.countryCode === 'US') {
    //         return {
    //             error: {
    //                 reason: 'SHIPPING_ADDRESS_UNSERVICEABLE',
    //                 message: 'Cannot ship to the United States of America',
    //                 intent: 'SHIPPING_ADDRESS',
    //             },
    //         };
    //     }
    //     return {};
    // }

    function handleError(error: google.payments.api.PaymentsError | Error) {
        if (error instanceof Error) {
            console.log('Error', error, error.message, error.stack);
        } else {
            console.log('Error', error.statusCode, error.statusMessage);
        }
        onError(error);
    }

    function handlePaymentAuthorized(paymentData: google.payments.api.PaymentData) {

    }

    function handleCancelled(error: google.payments.api.PaymentsError) {
        // alert('Cancelled: ' + error.statusMessage);
        onCancelled(error);
    }

    function handleLoadPaymentData(paymentData: google.payments.api.PaymentData) {
        alert("load payment data: " + JSON.stringify(paymentData, null, 2));
    }



    return (
        <GooglePayButton
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    // merchantId: `${process.env.REACT_APP_GOOGLE_PAY_MERCH_ID}`,
                    merchantId: '12345678901234567890',
                    merchantName: 'Lash Shack',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '0',
                    currencyCode: 'GBP',
                    countryCode: 'US',
                    displayItems: items,
                },
                callbackIntents: ['PAYMENT_AUTHORIZATION']
            }}
            onCancel={handleCancelled}
            onLoadPaymentData={handleLoadPaymentData}
            // onPaymentDataChanged={paymentData => {
            //     return {};
            // }}
            onPaymentAuthorized={paymentData =>
            {
                // onSuccess();
                // alert('Payment Authorised Success - ' + JSON.stringify(paymentData, null, 2))
                return {
                    transactionState: 'SUCCESS'
                }
            }


            // ({
            //     transactionState: 'ERROR',
            //     error: {
            //         reason: 'PAYMENT_DATA_INVALID',
            //         message: 'Insufficient funds',
            //         intent: 'PAYMENT_AUTHORIZATION',
            //     },
            // })
            }
            onReadyToPayChange={result => {
                alert('ready to pay change - ' + JSON.stringify(result, null, 2));
                // this.setState({isReadyToPay : result.isReadyToPay});
                return {}
            }}
            existingPaymentMethodRequired={true}
            onError={handleError}
            buttonColor="white"
            buttonType="checkout"
            buttonLocale=""
        />







        // <GooglePayButton
        //     environment={isTesting ? "TEST" : "PRODUCTION"}
        //     paymentRequest={{
        //         apiVersion: 2,
        //         apiVersionMinor: 0,
        //         allowedPaymentMethods: [
        //             {
        //                 type: 'CARD',
        //                 parameters: {
        //                     allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        //                     allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA'],
        //                 },
        //                 tokenizationSpecification: {
        //                     type: 'PAYMENT_GATEWAY',
        //                     parameters: {
        //                         gateway: 'example',
        //                         gatewayMerchantId: 'exampleGatewayMerchantId',
        //                     },
        //                 },
        //             },
        //         ],
        //         merchantInfo: {
        //             merchantId: '12345678901234567890',
        //             merchantName: 'Demo Merchant',
        //         },
        //         transactionInfo: {
        //             totalPriceStatus: 'FINAL',
        //             totalPriceLabel: 'Total',
        //             totalPrice: '0',
        //             currencyCode: 'GBP',
        //             countryCode: 'UK',
        //             // displayItems: items,
        //         },
        //         emailRequired: true,
        //     }}
        //     onCancel={handleCancelled}
        //     onLoadPaymentData={handleLoadPaymentData}
        //     onPaymentDataChanged={paymentData => {
        //         // if (paymentData.shippingAddress?.countryCode === 'US') {
        //         //     return {
        //         //         error: {
        //         //             reason: 'SHIPPING_ADDRESS_UNSERVICEABLE',
        //         //             message: 'Cannot ship to the United States of America',
        //         //             intent: 'SHIPPING_ADDRESS',
        //         //         },
        //         //     };
        //         // }
        //         return {};
        //     }}
        //     onPaymentAuthorized={paymentData => ({
        //       transactionState: 'SUCCESS',

        //     //   // transactionState: 'ERROR',
        //     //   // error: {
        //     //   //   reason: 'PAYMENT_DATA_INVALID',
        //     //   //   message: 'Insufficient funds',
        //     //   //   intent: 'PAYMENT_AUTHORIZATION',
        //     //   // },
        //     })}
        //     // existingPaymentMethodRequired={value => {
        //     //     console.log('SucexistingPaymentMethodRequiredcess', value);
        //     // }}
        //     onError={handleError}
        //     buttonColor={"white"}
        //     buttonType={"buy"}
        //     buttonLocale={""}
        // />
    )
}

export default GooglePayBtn
*/