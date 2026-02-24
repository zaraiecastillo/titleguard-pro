import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateUserTier, UserTier } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-01-28.clover',
});

// Next.js config to allow raw body for Stripe signature verification
// This is required, but app router in Next 15 handles it differently.
// Using standard request array buffer for raw body processing
export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock_secret";

    let event: Stripe.Event;

    try {
        const bodyBuffer = await req.arrayBuffer();
        const rawBody = Buffer.from(bodyBuffer);

        if (webhookSecret === "whsec_mock_secret") {
            // Bypass strict signature validation for demo if we don't have a real secret
            const payloadString = rawBody.toString('utf8');
            event = JSON.parse(payloadString) as Stripe.Event;
        } else if (sig) {
            event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
        } else {
            return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
        }
    } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Fulfill the purchase...
        const userId = session.metadata?.userId;
        const tierStr = session.metadata?.tierMapping as UserTier;

        if (userId && tierStr) {
            console.log(`Fulfilling checkout session ${session.id} for user ${userId}, granting tier ${tierStr}`);
            const success = updateUserTier(userId, tierStr);
            if (!success) {
                console.error(`Failed to update DB for user ${userId}`);
            }
        } else {
            console.error("Missing metadata (userId or tierMapping) on checkout session");
        }
    } else {
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true }, { status: 200 });
}
