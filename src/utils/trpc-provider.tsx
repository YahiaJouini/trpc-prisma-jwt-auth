"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink, getFetch, loggerLink } from "@trpc/client"
import { PropsWithChildren, useState } from "react"
import superjson from "superjson"
import { trpc } from "./trpc"
import queryClient from "./query-client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const TrpcProvider = ({ children }: PropsWithChildren) => {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
        ?
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : `http://localhost:3000/api/trpc`

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                loggerLink({
                    enabled: () => true
                }),
                httpBatchLink({
                    url: url,
                    fetch: async (input, init?) => {
                        console.log(input.toString())
                        const fetch = getFetch();
                        return fetch(input, {
                            ...init,
                            credentials: 'include'
                        });
                    }
                })
            ],
            transformer: superjson
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default TrpcProvider