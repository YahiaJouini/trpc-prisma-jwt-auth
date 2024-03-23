import { error } from 'console';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
    label: string,
    name: string,
    type?: string
}

const FormInput = ({ label, name, type = 'text' }: FormInputProps) => {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div>
            <label htmlFor={name} className='mb-1'>
                {label}
            </label>
            <input
                type={type}
                placeholder={label}
                className='w-full rounded-2xl appearance-none outline-none py-2 px-4 text-black mb-5'
                {...register(name)}
            />

            {
                errors[name] && (
                    <span className='text-red-500 text-xs pt-1 block'>
                        {errors[name]?.message as string}
                    </span>
                )
            }
        </div>
    )
}
export default FormInput