import { resend } from "@/lib/resend";

 import VerificationEmail from "../../emails/VerificationEmail";

 import { ApiResponse } from "@/types/ApiResponse";


 export async function sendVerificationEmail (
  email:string,
  username:string,
  verifycode:string,

 ) : Promise<ApiResponse>{
    try {
        await resend.emails.send({
  from: '<onboarding@resend.dev>',
  to: email,
  subject: 'True Message | Verification code',
  react: VerificationEmail({username,otp:verifycode}),
});  
        return {success:true, message:" Verification email send Successfully"}
    } catch (emailError) {
        console.error ("Error sending verifition", emailError)
        return {success:false, message:"Failed to send verification email"}
    }

 }