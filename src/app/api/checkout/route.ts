import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MOCK_USER_ID } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-01-28.clover',
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { priceId } = body;

        if (!priceId) {
            return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
        }

        // Validate Product IDs strictly to what we expect (Frontend sends these as priceId)
        const validProductIds = ['prod_U2IInuH6bGDZdS', 'prod_U2IIzNy62XYos4'];
        if (!validProductIds.includes(priceId)) {
            return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
        }

        // Use the mock user ID to pass through the session
        // In reality this would be pulled from the auth session token
        const userId = MOCK_USER_ID;

        // Determine the base URL dynamically from the request headers
        const url = new URL(req.url);
        const baseUrl = `${url.protocol}//${req.headers.get("host") || url.host}`;

        // Create dynamic price_data based on the Product ID
        let lineItem: Stripe.Checkout.SessionCreateParams.LineItem;
        if (priceId === 'prod_U2IInuH6bGDZdS') { // $49 one-time
            lineItem = {
                price_data: {
                    currency: 'usd',
                    product: priceId,
                    unit_amount: 4900,
                },
                quantity: 1,
            };
        } else { // prod_U2IIzNy62XYos4 - $150/mo subscription
            lineItem = {
                price_data: {
                    currency: 'usd',
                    product: priceId,
                    unit_amount: 15000,
                    recurring: {
                        interval: 'month',
                    }
                },
                quantity: 1,
            };
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [lineItem],
            mode: priceId === 'prod_U2IIzNy62XYos4' ? 'subscription' : 'payment',
            success_url: `${baseUrl}/dashboard/welcome`,
            cancel_url: `${baseUrl}/pricing`,
            metadata: {
                userId: userId,
                tierMapping: priceId === 'prod_U2IIzNy62XYos4' ? 'pro' : 'one_time'
            },
        });

        return NextResponse.json({ sessionId: session.id }, { status: 200 });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
