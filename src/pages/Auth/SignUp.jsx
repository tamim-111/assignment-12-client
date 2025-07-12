import { Link, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload, saveUserInDb } from '../../api/utils'

const SignUp = () => {
    const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const image = form?.image?.files[0]

        const imageUrl = await imageUpload(image)

        try {
            const result = await createUser(email, password)
            await updateUserProfile(name, imageUrl)

            const userData = { name, email, image: imageUrl }
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
            }
            await saveUserInDb(userData)
            navigate('/')
            toast.success('Signup Successful')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25A8D6] bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>Select Image:</label>
                            <input
                                className='bg-gray-200 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#6BDCF6] file:text-white hover:file:bg-[#25A8D6]'
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>Email address</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25A8D6] bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block mb-2 text-sm'>Password</label>
                            <input
                                type='password'
                                name='password'
                                autoComplete='new-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25A8D6] bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] w-full rounded-md py-3 text-white font-semibold hover:brightness-110'
                        >
                            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
                        </button>
                    </div>
                </form>

                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px bg-gray-300'></div>
                    <p className='px-3 text-sm text-gray-500'>Signup with social accounts</p>
                    <div className='flex-1 h-px bg-gray-300'></div>
                </div>

                <div
                    onClick={handleGoogleSignIn}
                    className='flex justify-center items-center space-x-2 border m-3 p-2 rounded-md border-gray-300 cursor-pointer hover:bg-[#6BDCF6]/20 transition duration-200'
                >
                    <FcGoogle size={32} />
                    <p className='font-medium'>Continue with Google</p>
                </div>

                <p className='px-6 text-sm text-center text-gray-500'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-[#25A8D6] text-gray-700 font-medium'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default SignUp
