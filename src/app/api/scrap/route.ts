"use server"
import { NextRequest, NextResponse } from "next/server";
import getMetaData from 'metadata-scraper';

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    console.log("Scrap url details :-",data);
    if (data && data.url !== '') {
        try {
            console.log("Backend Test 1")
            const response = await getMetaData(data.url);
            console.log("Scrap Response :-", response);
            return NextResponse.json({ status: 200, message: response });
        } catch (error) {
            console.log("Backend Test 2", error);
            return NextResponse.json({ status: 400, message: error });
        }
    } else {
        return NextResponse.json({ status: 500, message: "No URL Present" });
    }


}
