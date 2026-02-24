import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key_for_build");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, company, agents, requirements } = body;

        // Basic validation
        if (!name || !company || !agents || !requirements) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // If no RESEND_API_KEY is found (e.g. they haven't set it up yet), just simulate success
        if (!process.env.RESEND_API_KEY) {
            console.log('[Mock Email Sent]', { name, company, agents, requirements });
            return NextResponse.json({ success: true, mock: true }, { status: 200 });
        }

        // Send email using Resend
        // onboarding@resend.dev is the default testing sender for Resend
        const { data, error } = await resend.emails.send({
            from: 'TitleGuard Pro <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL ? [process.env.CONTACT_EMAIL] : ['delivered@resend.dev'],
            subject: `New Enterprise Inquiry from ${company}`,
            html: `
                <h2>Enterprise Inquiry: ${company}</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Number of Agents:</strong> ${agents}</p>
                <p><strong>Special Requirements:</strong></p>
                <p>${requirements}</p>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
