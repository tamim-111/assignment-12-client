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
            const result = await signInWithGoogle();

            const userData = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                role: 'user', // 
            };

            await saveUserInDb(userData);

            toast.success('Login Successful');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };


    return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md w-full p-6 rounded-lg shadow-md bg-gray-100 text-gray-900'>
                <h1 className='mb-6 text-4xl font-bold text-center'>Log In</h1>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='email' className='block mb-2 text-sm'>Email address</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            required
                            placeholder='example@email.com'
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block mb-2 text-sm'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            required
                            placeholder='********'
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                        />
                        <div className='text-xs mt-1 text-gray-400 hover:underline hover:text-[#25A8D6] cursor-pointer'>
                            Forgot password?
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='cursor-pointer bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] w-full rounded-md py-3 text-white font-semibold hover:brightness-110'
                    >
                        {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Log In'}
                    </button>
                </form>

                <div className='flex items-center my-4 space-x-2'>
                    <div className='flex-1 h-px bg-gray-300'></div>
                    <span className='text-gray-500 text-sm'>Or</span>
                    <div className='flex-1 h-px bg-gray-300'></div>
                </div>

                <div
                    onClick={handleGoogleSignIn}
                    className='flex justify-center items-center space-x-2 border p-2 rounded-md border-gray-300 cursor-pointer hover:bg-[#6BDCF6]/20 transition duration-200'
                >
                    <FcGoogle size={24} />
                    <p className='font-medium'>Continue with Google</p>
                </div>

                <p className='mt-4 text-sm text-center text-gray-500'>
                    Don&apos;t have an account?{' '}
                    <Link to='/signup' className='font-medium text-[#25A8D6] hover:underline'>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
