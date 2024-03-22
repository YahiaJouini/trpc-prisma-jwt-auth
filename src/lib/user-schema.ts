import z from "zod"

export const createUserSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).min(1, "Name is required"),

    email: z.string().email('Email Invalid'),
    password: z.string().min(5, 'Password is required'),
    confirmPassword: z.string()
}).refine(data => {
    data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Passwords dont match",
    }
})

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, 'Password is required'),
})


export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>