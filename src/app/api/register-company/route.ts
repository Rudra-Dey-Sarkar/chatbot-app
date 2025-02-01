"use server"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { ConnectDB } from "../../../../actions/db";

const companySchema = new mongoose.Schema({
    userId: String,
    name: String,
    title: String,
    description: String,
    url: String,
    logo: String,
    image: String,
}, { collection: 'companies' });

const companyModel = mongoose.models.companies || mongoose.model('companies', companySchema);

export const POST = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    const allData = {
        userId: data?.userId,
        name: data?.name,
        title: data?.title,
        description: data?.description,
        url: data?.url,
        logo: data?.logo,
        image: data?.image,
    }

    try {
        const response = await companyModel.find({ url: data?.url });

        if (response.length > 0) {
            console.log("Company details already exists");
            return NextResponse.json({ status: 404, message: "Company details already exists" });
        } else {
            const response = await companyModel.insertMany([allData]);
            if (response.length > 0) {
                return NextResponse.json({ status: 200, message: response });
            } else {
                return NextResponse.json({ status: 400, message: "Cannot insert data" });
            }
        }

    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
