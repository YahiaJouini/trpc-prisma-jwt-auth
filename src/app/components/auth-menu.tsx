"use client"
import queryClient from "@/utils/query-client"
import { trpc } from "@/utils/trpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'
const AuthMenu = () => {

    const router = useRouter()

    const { mutate: LogoutFn } = trpc.logoutUser.useMutation(
        {
            onError(err) {
                toast.error(err.message)
            },
            onSuccess() {
                queryClient.clear()
                toast.success("Logged out successfully")
                router.push('/login')
            }
        }
    )
    return (
        <>
            <li>
                <Link href="/proPage" className="text-white font-semibold hover:text-pink-300">
                    Pro Page
                </Link>
            </li>

            <li className="text-white font-semibold hover:text-pink-300" onClick={() => LogoutFn()}>

                Logout

            </li>
        </>
    )
}

export default AuthMenu