import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload, saveUserInDb } from '../../api/utils'

const SignUp = () => {
    const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const onSubmit = async data => {
        const image = data.image[0]
        const imageUrl = await imageUpload(image)

        try {
            const result = await createUser(data.email, data.password)
            await updateUserProfile(data.name, imageUrl)

            const userData = {
                name: data.name,
                email: data.email,
                image: imageUrl,
                role: data.role || 'user',
            }
            await saveUserInDb(userData)

            toast.success('Signup Successful')
            navigate('/')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle()
            const userData = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                role: 'user',
            }
            await saveUserInDb(userData)
            toast.success('Signup Successful')
            navigate('/')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md w-full p-6 rounded-lg shadow-md bg-gray-100 text-gray-900'>
                <h1 className='mb-6 text-4xl font-bold text-center'>Sign Up</h1>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <div>
                        <label htmlFor='name' className='block mb-2 text-sm'>Name</label>
                        <input
                            type='text'
                            {...register('name', { required: true })}
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            placeholder='Your Name'
                        />
                    </div>

                    <div>
                        <label htmlFor='image' className='block mb-2 text-sm'>Profile Image</label>
                        <input
                            type='file'
                            {...register('image', { required: true })}
                            accept='image/*'
                            className='bg-gray-200 file:bg-[#6BDCF6] file:text-white file:px-4 file:py-2 file:rounded-md file:font-semibold hover:file:bg-[#25A8D6]'
                        />
                    </div>

                    <div>
                        <label htmlFor='email' className='block mb-2 text-sm'>Email address</label>
                        <input
                            type='email'
                            {...register('email', { required: true })}
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            placeholder='example@email.com'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block mb-2 text-sm'>Password</label>
                        <input
                            type='password'
                            {...register('password', { required: true })}
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            placeholder='********'
                        />
                    </div>

                    <div>
                        <label htmlFor='role' className='block mb-2 text-sm'>Select Role</label>
                        <select
                            {...register('role', { required: true })}
                            className='w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-200 focus:ring-2 focus:ring-[#25A8D6]'
                        >
                            <option value='user'>User</option>
                            <option value='seller'>Seller</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='cursor-pointer bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] w-full rounded-md py-3 text-white font-semibold hover:brightness-110'
                    >
                        {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Sign Up'}
                    </button>
                </form>

                <div className='flex items-center my-4 space-x-2'>
                    <div className='flex-1 h-px bg-gray-300'></div>
                    <span className='text-gray-500 text-sm'>Or</span>
                    <div className='flex-1 h-px bg-gray-300'></div>
                </div>

                <div
                    onClick={handleGoogleSignIn}
                    className='flex justify-center items-center space-x-2 border p-2 rounded-md border-gray-300 cursor-pointer hover:bg-[#6BDCF6]/20'
                >
                    <FcGoogle size={24} />
                    <p className='font-medium'>Continue with Google</p>
                </div>

                <p className='mt-4 text-sm text-center text-gray-500'>
                    Already have an account?{' '}
                    <Link to='/login' className='font-medium text-[#25A8D6] hover:underline'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
