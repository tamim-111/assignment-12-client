import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { imageUpload, saveUserInDb } from '../../api/utils'
import useAuth from '../../hooks/useAuth'
import { getAuth } from 'firebase/auth'

const UpdateProfile = () => {
    const { user, updateUserProfile, setUser } = useAuth()
    const auth = getAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: user?.displayName || '',
        },
    })

    const onSubmit = async (data) => {
        try {
            let imageUrl = user?.photoURL

            // If user uploaded a new image
            if (data.image?.length > 0) {
                imageUrl = await imageUpload(data.image[0])
            }

            // Update Firebase profile
            await updateUserProfile(data.name, imageUrl)

            // Refresh user to ensure UI updates
            await auth.currentUser.reload()
            setUser({ ...auth.currentUser })

            // Optional: Update user in DB
            const updatedUser = {
                name: data.name,
                email: user.email,
                image: imageUrl,
            }
            await saveUserInDb(updatedUser)

            toast.success('Profile updated successfully!')
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error('Failed to update profile')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="flex flex-col max-w-md w-full p-6 rounded-lg shadow-md bg-gray-100 text-gray-900">
                <h1 className="mb-6 text-3xl font-bold text-center">Update Profile</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block mb-2 text-sm">
                            Profile Image (optional)
                        </label>
                        <input
                            type="file"
                            {...register('image')}
                            accept="image/*"
                            className="bg-gray-200 file:bg-[#6BDCF6] file:text-white file:px-4 file:py-2 file:rounded-md file:font-semibold hover:file:bg-[#25A8D6]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] w-full rounded-md py-3 text-white font-semibold hover:brightness-110"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile
