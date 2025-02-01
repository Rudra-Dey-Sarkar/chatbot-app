"use server"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { ConnectDB } from "../../../../actions/db";

const companySchema = new mongoose.Schema({
    userId: String,
    name: String,
    url: String,
    description: String,
    icon: String,
    image: String,
    provider: String,
}, { collection: 'companies' });

const companyModel = mongoose.models.companies || mongoose.model('companies', companySchema);

export const POST = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();

    try {
        const response = await companyModel.find({ userId: data?.userId });

        if (response.length > 0) {
            return NextResponse.json({ status: 200, message: response });
        } else {
            return NextResponse.json({ status: 400, message: "No Company found" });
        }

    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
