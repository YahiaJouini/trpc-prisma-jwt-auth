import { PrismaClient } from "@prisma/client";

const primsaClientInstance = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof primsaClientInstance>
}

const prisma = globalThis.prisma ?? primsaClientInstance()

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

export { prisma }