import {z} from "zod"

export const signInScherma = z.object({
    indentifier: z.string(),
    password:z.string()
})