import dbConnect from "@/lib/dbConnect";

import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationemails";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const ExistingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (ExistingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });

    const verifycode = Math.floor(10000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 400 }
        );
      } else {
        const hassedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hassedPassword;
        existingUserByEmail.verifyCode = verifycode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hassedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hassedPassword,
        verifyCode: verifycode,
        verifyCodeExpiry: expiryDate,

        isVerified: false,

        isAcceptingMessage: true,

        messages: [],
      });

      await newUser.save();

      //send verification email
      const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifycode
      );

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }
      return Response.json(
        {
          success: true,
          message: "User registered successfully. Please verify email",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "error registering User",
      },
      {
        status: 500,
      }
    );
  }
}
