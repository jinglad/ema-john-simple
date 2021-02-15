import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../SimpleCardForm/SimpleCardForm';
// import SplitForm from '../SplitForm/SplitForm';

const stripePromise = loadStripe('pk_test_51Ha0YMCKWmcHp8RVC4jtjgBdACIga8yhKcsifmibQQin0CaC04bREMzVCAygchNyWSIE7ebU3DTchAko1wqtlZgF00HsI1ngrf');

const ProcessPayment = (props) => {
    const {handlePayment} = props;
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;