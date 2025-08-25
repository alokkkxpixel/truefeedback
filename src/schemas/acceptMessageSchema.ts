import {z} from "zod"

export const aceeptMessageSchema = z.object({
    aceeptMessage: z.boolean(),
})