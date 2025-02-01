"use server"
import { NextRequest, NextResponse } from "next/server";
import getMetaData from 'metadata-scraper';

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    if (data && data.url !== '') {
        try {
            const response = await getMetaData(data.url);
            return NextResponse.json({ status: 200, message: response });
        } catch (error) {
            return NextResponse.json({ status: 400, message: error });
        }
    } else {
        return NextResponse.json({ status: 500, message: "No URL Present" });
    }


}
