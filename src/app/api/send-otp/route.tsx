import { NextRequest, NextResponse } from "next/server";
import fetch from 'node-fetch';

export const POST = async (req: NextRequest) => {
    const datas = await req.json();
    const { to } = datas;


    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY as string,
            },
            body: JSON.stringify({
                sender: { name: "Rudra Dey Sarkar", email: "rudradeysarkar2002@gmail.com" },
                to: [{ email: to }],
                subject: "Account Verification OTP",
                htmlContent: `<p>OTP is:- 123</p>`,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data)
            return NextResponse.json({ status: 400, message: 'Error sending email' });
        } else {
            return NextResponse.json({ status: 200, success: "Email Send" });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: error });
    }

}

