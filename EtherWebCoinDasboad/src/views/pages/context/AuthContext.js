import React, { createContext, useContext, useState } from 'react'
import { getProfile } from '../../../Services/profileService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Error parsing stored user:', error)
      return null
    }
  })

  const refreshProfile = async () => {
    try {
      const profile = await getProfile()
      setAuthUser(profile)
    } catch (err) {
      console.error('Failed to refresh profile:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ authUser, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
