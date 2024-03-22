import { getUserFromCookie } from "@/server/auth-middleware";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = async () => getUserFromCookie()

export type Context = inferAsyncReturnType<typeof createContext>