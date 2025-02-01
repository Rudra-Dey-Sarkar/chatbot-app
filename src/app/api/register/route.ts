"use server"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { ConnectDB } from "../../../../actions/db";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verified: { type: Boolean, default: false }
}, { collection: 'users' });

const userModel = mongoose.models.users || mongoose.model('users', userSchema);

export const POST = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    const allData = {
        name: data.name,
        email: data.email,
        password: data.password,
        verified: data.verified
    }

    try {
        const response = await userModel.find({ email: data?.email });

        if (response.length > 0) {
            console.log("User already exists");
            if(response?.[0]?.verified ===false){
                return NextResponse.json({ status: 201, message: response });
            }else{ 
                return NextResponse.json({ status: 404, message: "User already exists" });
            }
        } else {
            const response = await userModel.insertMany([allData]);
            if (response.length > 0) {
                console.log("User added");
                return NextResponse.json({ status: 200, message: response });
            } else {
                console.log("Cannot insert data");
                return NextResponse.json({ status: 400, message: "Cannot insert data" });
            }
        }

    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
