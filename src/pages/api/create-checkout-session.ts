import { Request, Response } from 'express';
import stripe from 'stripe';
const stripeSecretKey = 'sk_test_51NRavWKg82trmtxxLGOWXNJulDfXc1dOw9sQC1LieODEjnzGoiEKfxA0PF0xXA47eHsx8jgfqtfV0YLoTyZAhzz300M6oZAlIq';
const stripeInstance = new stripe(stripeSecretKey as string, { apiVersion: "2022-11-15" });
export default async function handler(req: Request, res: Response) {
    const { price } = req.body;
    try {
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Trade Mark Today Subscription',
                        },
                        unit_amount: price * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://localhost/success',
            cancel_url: 'https://localhost/cancel',
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}