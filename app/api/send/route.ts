import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const data = await resend.emails.send({
            from: 'Sinbad <kyc@sinbadhq.com>',
            to: ['dev.moezzat@gmail.com'],
            subject: 'Hello world',
            text: 'Hello world',
            // react: EmailTemplate({ firstName: 'John' }),
        });
        console.log(data)
        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
