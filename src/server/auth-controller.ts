import { CreateUserInput, LoginUserInput } from "@/lib/user-schema";

const bcrypt = require('bcrypt');
import { prisma } from '@/lib/primsa'
import { TRPCError } from "@trpc/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export const registerHandler = async ({
    input
}: {
    input: CreateUserInput
}) => {
    try {
        const hashedPassword = await bcrypt.hash(input.password, 12)

        const user = await prisma.user.create({
            data: {
                email: input.email,
                name: input.name,
                password: hashedPassword
            }
        })

        const { password, ...userWithoutPassword } = user

        return {
            status: "success",
            data: {
                user: userWithoutPassword
            }
        }
    } catch (err: any) {
        if (err.code === 'P2002') {
            throw new TRPCError({
                code: "CONFLICT",
                message: "Email already exists"
            })
        }

        throw err
    }
}

export const loginHandler = async ({
    input
}: {
    input: LoginUserInput
}) => {

    const invalid = new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password"
    })

    try {
        const user = await prisma.user.findUnique({
            where: { email: input.email }
        })

        // user.password to check if he used a provider to login 
        if (!user || !user.password) throw invalid

        if (!await bcrypt.compare(input.password, user?.password)) {
            throw invalid
        }

        const secret = process.env.JWT_SECRET!

        const token = jwt.sign({ sub: user.id }, secret, {
            expiresIn: 60 * 60
        })

        const cookieOptions = {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60
        }

        cookies().set('token', token, cookieOptions)

        return {
            status: "success",
            token
        }
    } catch (err: any) {
        throw err
    }
}


export const logoutHandler = async () => {
    try {
        cookies().set('token', '', {
            maxAge: -1
        })

        return { status: 'success' }
    } catch (err) {
        throw err
    }
}