import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    localStorage.removeItem('access-token') // ✅ Remove token
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser -->', currentUser?.email)
      if (currentUser?.email) {

        if (!currentUser.photoURL || !currentUser.displayName) {
          await currentUser.reload()
          currentUser = auth.currentUser
        }

        setUser(currentUser)

        // ✅ Store JWT in localStorage
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: currentUser?.email,
          })
          localStorage.setItem('access-token', res.data.token)
        } catch (err) {
          console.error('JWT fetch error:', err)
        }
      } else {
        setUser(null)
        localStorage.removeItem('access-token') // ✅ Remove token on logout
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
