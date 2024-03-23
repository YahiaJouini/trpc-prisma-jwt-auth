import authRouter from "@/server/auth-route";
import { getUserHandler } from "@/server/user-controller";
import { createContext } from "@/utils/trpc-context";
import { protectedProcedure, publicProcedure, t } from "@/utils/trpc-server";



const statusCheckRouter = t.router({
    statusChecker: publicProcedure.query(() => {
        return {
            status: "success",
            message: "Server is running"
        }
    })
})

const userRouter = t.router({
    getUser: protectedProcedure.query(({ ctx }) => getUserHandler({ ctx }))
})


//unified app router for all routes

export const appRouter = t.mergeRouters(
    statusCheckRouter,
    authRouter,
    userRouter
)

export const createCaller = t.createCallerFactory(appRouter)

export const createAsyncCaller = async () => {
    const context = await createContext()
    return createCaller(context)
}

export type AppRouter = typeof appRouter