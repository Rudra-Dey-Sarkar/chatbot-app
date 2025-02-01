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

export const PUT = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    
    console.log(data);

    try {
        const response = await userModel.findOneAndUpdate({ email: data?.email },{verified:data?.verified},{new:true});
            if (response || response.length > 0) {
                return NextResponse.json({ status: 200, message: response });
            } else {
                return NextResponse.json({ status: 400, message: "Cannot verify account" });
            }
    

    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
