import Link from "next/link"
import AuthMenu from "./auth-menu"
import { getAuthUser } from "@/utils/get-auth-user"
const Header = async () => {

    const user = await getAuthUser({ shouldRedirect: false })
    return (
        <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-0 border-b border-gray-200">
            <div className="max-w-7xl mx-auto p-4">
                <div className="w-full flex justify-between">
                    <Link href="/" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white bg-clip-text text-transparent text-2xl font-bolm">All Star </Link>


                    <div className="flex items-center gap-4">
                        <ul className="flex items-center gap-4">
                            <li>
                                <Link href="/" className="text-white font-semibold hover:text-pink-300">
                                    Home
                                </Link>
                            </li>
                            {
                                !user ? (
                                    <>
                                        <li>
                                            <Link href="/login" className="text-white font-semibold hover:text-pink-300">
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/register" className="text-white font-semibold hover:text-pink-300">
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                ) : <AuthMenu />
                            }
                        </ul>

                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Header