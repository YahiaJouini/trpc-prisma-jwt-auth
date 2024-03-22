import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from '@/lib/primsa'

export const getUserFromCookie = async () => {
    const cookieStore = cookies()
    try {
        let token;
        const unAuthorized = {
            user: null
        }

        if (cookieStore.get('token')) {
            token = cookieStore.get('token')?.value
        }

        if (!token) return unAuthorized

        const secret = process.env.JWT_SECRET!

        const validJwt = jwt.verify(token, secret) as { sub: string }

        if (!validJwt) return unAuthorized

        const user = await prisma.user.findUnique({ where: { id: validJwt.sub } })

        if (!user) {
            return unAuthorized
        }

        const { password, ...userWithoutPassword } = user

        return {
            user: userWithoutPassword
        }


    } catch (err: any) {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message
        })
    }

}