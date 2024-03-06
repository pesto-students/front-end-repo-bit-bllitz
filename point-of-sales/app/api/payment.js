import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount, // Amount in cents
        currency: 'usd',
      });

      res.status(200).json({ sessionId: paymentIntent.id });
    } catch (error) {
      res.status(500).json({ error: { message: error.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
