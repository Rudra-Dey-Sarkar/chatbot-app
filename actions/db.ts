"use server"
import mongoose from "mongoose"
const DB = process.env.NEXT_PUBLIC_DB!;
export const ConnectDB = async ()=>{
await mongoose.connect(DB).then(()=>{
    console.log("Database connected");
}).catch((error)=>{
    console.log(error);
})
}