const express = require('express');
const router = express.Router();
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Error creating payment intent' });
    }
});

// Process a payment
router.post('/process-payment', async (req, res) => {
    try {
        const { paymentMethodId, paymentIntentId } = req.body;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: paymentIntent.customer,
        });

        await stripe.paymentIntents.confirm(paymentIntentId);

        res.json({ message: 'Payment processed successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Error processing payment' });
    }
});

module.exports = router;