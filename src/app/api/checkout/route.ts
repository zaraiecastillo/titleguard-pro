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
        const validPriceIds = ['prod_U2IInuH6bGDZdS', 'prod_U2IIzNy62XYos4'];
        if (!validPriceIds.includes(priceId)) {
            return NextResponse.json({ error: 'Invalid Price ID' }, { status: 400 });
        }

        // Use the mock user ID to pass through the session
        // In reality this would be pulled from the auth session token
        const userId = MOCK_USER_ID;

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: priceId === 'prod_U2IIzNy62XYos4' ? 'subscription' : 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/welcome`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing`,
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
