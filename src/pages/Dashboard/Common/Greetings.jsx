import React from 'react'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const Greetings = () => {
    const [role, isRoleLoading] = useRole()

    if (isRoleLoading) return <LoadingSpinner />

    return (
        <div className='text-center mt-10'>
            <h1 className='text-3xl font-bold text-lime-700 mb-4'>
                Welcome to Your Dashboard!
            </h1>
            <p className='text-lg text-gray-600'>
                You are logged in as a <span className='font-semibold'>{role}</span>.
            </p>
            <p className='mt-4 text-gray-500'>
                Use the sidebar to navigate through your dashboard features like viewing orders, managing inventory, or checking stats based on your role.
            </p>
        </div>
    )
}

export default Greetings
