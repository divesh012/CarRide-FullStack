import React, { useEffect } from 'react'
import NavbarOwner from '../../components/Owner/NavbarOwner'
import Sidebar from '../../components/Owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner,navigate} = useAppContext()

  useEffect(() =>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])


  return (
    <div className='flex flex-col min-h-screen'>
      <NavbarOwner />

      <div className='flex flex-1'>
        <Sidebar />

        <div className='flex-1 p-6 bg-gray-50'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout