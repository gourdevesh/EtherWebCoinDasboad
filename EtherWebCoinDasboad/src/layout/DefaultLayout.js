import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useAuth } from '../views/pages/context/AuthContext'

const DefaultLayout = () => { 
  const {refreshProfile} = useAuth()
  
  useEffect(() => {
    refreshProfile()
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
