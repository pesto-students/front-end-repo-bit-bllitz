import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const handlePayment = async () => {
    const stripe = await stripePromise;

    // Create a payment intent on the server
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Replace with the actual payment amount
    });

    const data = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
