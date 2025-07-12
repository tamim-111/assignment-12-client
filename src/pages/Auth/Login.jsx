import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { saveUserInDb } from '../../api/utils'

const Login = () => {
    const { signIn, signInWithGoogle, loading, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    if (user) return <Navigate to={from} replace={true} />
    if (loading) return <LoadingSpinner />

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value

        try {
            const result = await signIn(email, password)
            const userData = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
            }
            await saveUserInDb(userData)
            toast.success('Login Successful')
            navigate(from, { replace: true })
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
            toast.success('Login Successful')
            navigate(from, { replace: true })
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-4'>
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
                                autoComplete='current-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25A8D6] bg-gray-200 text-gray-900'
                            />
                            <div className='space-y-1 mt-1'>
                                <button
                                    type='button'
                                    className='text-xs hover:underline hover:text-[#25A8D6] cursor-pointer text-gray-400'
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] hover:brightness-110 transition'
                        >
                            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
                        </button>
                    </div>
                </form>

                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px bg-gray-300'></div>
                    <p className='px-3 text-sm text-gray-500'>Login with social accounts</p>
                    <div className='flex-1 h-px bg-gray-300'></div>
                </div>

                <div
                    onClick={handleGoogleSignIn}
                    className='flex justify-center items-center space-x-2 border m-3 p-2 rounded-md border-[#25A8D6] cursor-pointer hover:bg-[#6BDCF6]/20 transition duration-200'
                >
                    <FcGoogle size={32} />
                    <p className='font-medium'>Continue with Google</p>
                </div>

                <p className='px-6 text-sm text-center text-gray-500'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-[#25A8D6] text-gray-700 font-medium'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login
