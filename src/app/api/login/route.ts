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
        email: data.email,
        password: data.password
    }

    try {
        const response = await userModel.find({ email: data?.email });

        if (response.length > 0) {
            console.log("User added");
            if(response?.[0]?.verified ===false){
                return NextResponse.json({ status: 201, message: response });
            }else{ 
                return NextResponse.json({ status: 200, message: response });
            }
        } else {
            return NextResponse.json({ status: 404, message: "no user found" });
        }


    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
