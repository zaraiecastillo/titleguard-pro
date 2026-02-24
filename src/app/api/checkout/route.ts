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

        // Validate Price IDs strictly to what we expect
        const validPriceIds = ['price_1T4D9X0K6xSYeASO1w2thYki', 'price_1T4DAi0K6xSYeASOZRKLkpkW'];
        if (!validPriceIds.includes(priceId)) {
            return NextResponse.json({ error: 'Invalid Price ID' }, { status: 400 });
        }

        // Use the mock user ID to pass through the session
        // In reality this would be pulled from the auth session token
        const userId = MOCK_USER_ID;

        // Determine the base URL dynamically from the request headers
        const url = new URL(req.url);
        const baseUrl = `${url.protocol}//${req.headers.get("host") || url.host}`;

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            mode: priceId === 'price_1T4DAi0K6xSYeASOZRKLkpkW' ? 'subscription' : 'payment',
            success_url: `https://titleguard-pro.vercel.app/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://titleguard-pro.vercel.app/pricing`,
            metadata: {
                userId: userId,
                tierMapping: priceId === 'price_1T4DAi0K6xSYeASOZRKLkpkW' ? 'pro' : 'one_time'
            },
        });

        return NextResponse.json({ sessionId: session.id }, { status: 200 });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
