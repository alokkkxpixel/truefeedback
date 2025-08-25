import { z} from "zod"

export const usernameValidation = z.string().min(2,"USername atleast 2 characters").max(20,"Username must be no morethan 20 letters").regex(/^[a-zA-Z0-9]+$/,"USername must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email:z.string().email({message:"Invaild email Address"}),
    password:z.string().min(6,{message:"password must be atleast 6 character"})

})