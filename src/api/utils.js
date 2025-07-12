import axios from 'axios'

// Upload image and return image URL
export const imageUpload = async imageData => {
    const imageFormData = new FormData()
    imageFormData.append('image', imageData)

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imageFormData
    )
    return data?.data?.display_url
}

// Save or update user in DB
export const saveUserInDb = async user => {
    const token = localStorage.getItem('access-token')
    const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        user,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    console.log('Saved user:', data)
}
