import { FC, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";

const Payment: FC = () => {
  const elements = useElements();
  const stripe = useStripe();
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [isCardComplete, setIsCardComplete] = useState(false);

  // Handle confirm order
  const handleConfirmOrder = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
  
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded.");
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement is not available.");
      setPaymentError("CardElement is not available.");
      return;
    }
  
    try {
      setLoading(true);
      setPaymentError(null); // Reset error state before starting the payment flow
  
      // Create Payment Intent
      const response = await axios.post('http://localhost:3001/create-payment-intent', {
        amount: 20 * 100, // Amount in cents
      });
  
      const { client_secret } = response.data;
      if (!client_secret) {
        console.error("client_secret missing in the response.");
        setPaymentError("Something went wrong, please try again.");
        return;
      }
  
      // Confirm Card Payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: fullName,
          },
        },
      });
  
      if (error) {
        console.error("Error confirming payment:", error);
        setPaymentError(error.message || "An error occurred during payment confirmation.");
        return;
      }
  
      if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment confirmed:", paymentIntent);
  
        // Update user's subscription status in Firestore
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            isSubscribed: true,
          });
  
          console.log("User subscription status updated successfully.");
          Navigate("/"); // Navigate to a success page or dashboard
        } else {
          console.error("User is not logged in.");
          setPaymentError("You need to log in to complete the payment.");
        }
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error creating order:", error);
      setPaymentError("An error occurred while processing your payment.");
      setLoading(false);
    }
  };


  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form
              onSubmit={handleConfirmOrder}
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
            >
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="full_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="card-number-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Card number*
                  </label>
                  <CardElement
                    id="card-number-input"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    onChange={(event) => setIsCardComplete(event.complete)}
                  />
                </div>
              </div>

              {/* Payment Error Message */}
              {paymentError && (
                <div className="text-red-500 text-sm mt-4">{paymentError}</div>
              )}

              <button
                type="submit"
                disabled={loading || !fullName || !isCardComplete}
                className={`flex w-full items-center justify-center bg-gray-300 hover:bg-gray-400 transition rounded-lg px-5 py-2.5 text-sm font-medium text-black ${
                  loading || !fullName || !isCardComplete
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                }`}
              >
                {loading ? "Processing..." : "Pay now"}
              </button>
            </form>

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              {/* Your summary or other content */}
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $20.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">0.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $0
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $0
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">$20.00</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;