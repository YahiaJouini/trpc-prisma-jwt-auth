import { createAsyncCaller } from "@/app/api/trpc/trpc-router";
import { redirect } from 'next/navigation'

export const getAuthUser = async ({ shouldRedirect = true }: { shouldRedirect?: boolean } = {}) => {
    const caller = await createAsyncCaller()
    return (
        caller.getUser(undefined)
            .then(result => result.data.user)
            .catch(err => {
                if (err.code === "UNAUTHENTICATED" && shouldRedirect) {
                    redirect('/login')
                }

            }))
}