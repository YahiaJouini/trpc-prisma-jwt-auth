"use client"
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { CreateUserInput, createUserSchema } from '@/lib/user-schema'
import { trpc } from '@/utils/trpc'
import FormInput from '../components/FormInput'
import LoadingButton from '../components/LoadingButton'

const Register = () => {

    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const methods = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema)
    })


    const { reset, handleSubmit } = methods

    const { mutate: RegisterFn } = trpc.registerUser.useMutation({
        onMutate() {
            setSubmitting(true)
        },
        onSettled() {
            setSubmitting(false)
        },
        onError(error) {
            reset({ confirmPassword: '', password: '' })
            toast.error(error.message)
        },
        onSuccess() {
            toast.success('Account created successfully')
            router.push('/login')
        }
    })

    const onSubmmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const testData = {
            name: "test",
            email: "test@gmail.com",
            password: "string",
            confirmPassword: "string",
        }
        RegisterFn(testData)
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmmitHandler}>
                <FormInput label='Full Names' type='text' name='name' />
                <FormInput label='Email' type='email' name='email' />
                <FormInput label='Password' type='password' name='password' />
                <FormInput label='Confirm Password' type='password' name='confirmPassword' />

                <div className='text-white mb-4'>
                    Already have an account?{' '}
                    <Link href='/login'>Login</Link>
                </div>

                <LoadingButton loading={submitting} textColor='text-white' >Register</LoadingButton>
            </form>
        </FormProvider>
    )
}

export default Register