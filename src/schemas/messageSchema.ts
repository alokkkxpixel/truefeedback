import {z} from "zod"

export const aceeptMessageSchema = z.object({
    content: z.string().min(10,{message:"Content must be minium 10 characters"}).max(300,{message:"Content must be not more than 300 characters"})
})