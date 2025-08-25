import dbConnect from "@/lib/dbConnect";

import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationemails";
import bcrypt from "bcryptjs"
import { success } from "zod";
import { Faculty_Glyphic } from "next/font/google";

export async function POST(request:Request){
   await dbConnect()

   try {
    const {username,email,password}=   await request.json()
   } catch (error) {
     console.error("Error registering user",error)
     return Response.json(
        {
            success:false,
            message:"error registering User"
        },
        {
            status:500
        }
     )
   }
}