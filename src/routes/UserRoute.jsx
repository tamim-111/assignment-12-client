// // src/routes/UserRoute.jsx
// import { Navigate, useLocation } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'
// import useRole from '../hooks/useRole'
// import LoadingSpinner from '../components/Shared/LoadingSpinner'

// const UserRoute = ({ children }) => {
//     const { user, loading } = useAuth()
//     const { role, roleLoading } = useRole(user?.email)
//     const location = useLocation()

//     if (loading || roleLoading) return <LoadingSpinner />

//     if (user && role === 'user') {
//         return children
//     }

//     return <Navigate to="/login" state={{ from: location }} replace />
// }

// export default UserRoute
