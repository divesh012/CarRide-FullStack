import React, { useState } from 'react'
import { assets, menuLinks } from "../assets/assets"
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import axios from "axios";
import toast from 'react-hot-toast';
import {motion} from 'motion/react'

const Navbar = () => {

  const{setShowLogin,user,logout,isOwner,axios,setIsOwner} = useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const changeRole = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      "/api/owner/change-role",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.success) {
      setIsOwner(true);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  return (
    <motion.div
      initial = {{y:-20,opacity:0}}
      animate = {{y:0,opacity:1}}
      transition = {{duration:0.5}}


     className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-700 border-b border-gray-200 relative transition-all 
    ${location.pathname === '/' ? 'bg-blue-50' : 'bg-blue-50'}`}>
      
      <Link to="/">
        <motion.img whileHover={{scale:1.05}} src={assets.logo} alt="Logo" className="h-8" />
      </Link>

      <button 
        className="sm:hidden text-2xl text-gray-700"
        onClick={() => setOpen(!open)}
      >
        
      </button>

      <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-gray-200 right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 bg-blue-50
      ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}`}>

        {menuLinks.map((link, index) => (
          <Link 
            key={index} 
            to={link.path} 
            className="text-gray-700 hover:text-black transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        ))}

          <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
            <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500' placeholder='Search Cars...' />
            <img src={assets.search_icon} alt="Search" />
          </div>

<div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
  <button onClick={() => isOwner ? navigate('/owner') : changeRole()} className='cursor-pointer text-gray-700 hover:text-black font-medium transition-colors duration-200'>{isOwner ? 'Dashboard' : 'List cars'}</button>

  <button onClick={() =>{ user ? logout() : setShowLogin(true)}} className='cursor-pointer px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white rounded-lg shadow-md hover:shadow-lg'>{user ? 'logout' : 'Login'}</button>
</div>
      </div>
          <button className='sm:hidden cursor-pointer' aria-label='Menu' onClick={() => setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt={open ? "close" : "menu"} />
          </button>
    </motion.div>
  )
}

export default Navbar