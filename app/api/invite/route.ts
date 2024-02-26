import nodemailer from 'nodemailer';
import {NextRequest} from "next/server";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});



export async function POST(req: NextRequest) {

    // get the body from the request
    const {email: emailTo, teamId}: {email: string, teamId: string} = await req.json();
    const url = new URL(req.url);
    console.log(url)
    console.log(emailTo);

    let mailOptions = {
        from: 'Sinbad invitation <dev.moezzat@gmail.com>', // Sender address
        to: emailTo, // List of recipients
        subject: 'Join to my team', // Subject line
        text: `${url.origin}/invite/${teamId}` // Plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Message sent successfully!');
        console.log('Message ID:', info.messageId);
    });

    return Response.json({ message: 'Email sent successfully!' });
}