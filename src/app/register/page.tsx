import Header from "../components/Header"
import Register from "./Register"

const page = () => {
    return (
        <>
            <Header />

            <section className="p-8  bg-gray-950 min-h-screen grid place-content-center">
                <div className="w-full">
                    <h1 className="mb-10 text-center text-2xl">
                        Register Now
                    </h1>
                    <Register />
                </div>
            </section>
        </>
    )
}

export default page