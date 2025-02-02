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

export const DELETE = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    try {
        const response = await companyModel.findOneAndDelete({ _id: data?.Id });
        if (response || response.length > 0) {
            return NextResponse.json({ status: 200, message: response });
        } else {
            return NextResponse.json({ status: 400, message: "Cannot remove company" });
        }

    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
