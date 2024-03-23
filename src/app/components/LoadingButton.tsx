import React from 'react'
import { twMerge } from 'tailwind-merge'
import Spinner from './Spinner'

type LoadingButtonProps = {
    loading: boolean,
    btnColor?: string,
    textColor?: string,
    children: React.ReactNode,
}
const LoadingButton = ({
    loading = false,
    btnColor = 'bg-gradient-to-r from-pink-500 to-yellow-500',
    textColor = 'text-white',
    children
}: LoadingButtonProps) => {
    return (
        <button
            type='submit'
            className={twMerge(`w-full py-3 font-semibold rounded-lg outline-none border-none flex justify-center items-center`, `${btnColor} ${loading && 'bg-[#ccc'}`)}
        >

            {
                loading ? (
                    <div className='flex items-center gap-3'>
                        <Spinner />
                        <span className='text-gray-200 inline-block'>Loading ...</span>
                    </div>
                ) : (
                    <span className={`${textColor}`}>
                        {children}
                    </span>
                )
            }

        </button>
    )
}

export default LoadingButton