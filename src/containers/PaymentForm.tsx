/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,

} from '@stripe/react-stripe-js';

import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { createPaymentIntent } from '../apis';
import AuthContext from '../contexts/AuthContext';

interface PaymentFormProps {
    amount: number
    items: any
    onDone: any
}

const PaymentForm:React.FC<PaymentFormProps> = ({ amount, items, onDone }) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);
  const params = useParams<any>();

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setLoading(true);
      const json = await createPaymentIntent({
        payment_method: paymentMethod,
        amount,
        place: params.id,
        table: params.table,
        detail: items,
      }, auth.token);

      if (json?.success) {
        toast(`Your order #${json.order} is processing`, { type: 'success' });
        onDone();
        setLoading(false);
      } else if (json?.error) {
        toast(json.error, { type: 'error' });
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button variant="standard" className="mt-4" block type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </Button>
    </Form>
  );
};

const stripePromise = loadStripe('process.env.STRIPE_PUBLIC_API_KEY');
const stripeContext = (props: any) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default stripeContext;
