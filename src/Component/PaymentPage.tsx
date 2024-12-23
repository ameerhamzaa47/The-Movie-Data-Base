import { FC } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';

const stripePromise = loadStripe("pk_test_51QPfwVABp1KJlVmplqeMwqN8TLAjkI0fJy2bhdS89zrY4yXWG5ABtUTEDOz5AUfvTY4HW9SOOof8pUbdDqZhA7iA00GXu1zBgb");



const PaymentPage: FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="w-full h-screen">
        <Payment />
      </div>
    </Elements>
  );
};

export default PaymentPage;
