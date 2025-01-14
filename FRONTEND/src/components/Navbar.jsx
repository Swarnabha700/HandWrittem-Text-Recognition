import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 px-10 md:px-20 lg:px-32">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    {/* Logo and Name */}
    <div className="flex items-center mb-4 md:mb-0">
      <img src="/ocr.png" alt="Logo" className="h-8 w-8 mr-2" />
      <span className="text-white font-bold text-lg md:text-xl">OCRXpert</span>
    </div>

    {/* Navigation Links */}
    <ul className="flex space-x-6 md:space-x-10">
      <li>
        <NavLink 
          to={"/"} 
          className={({ isActive }) => (isActive ? 'text-red-500 font-medium text-lg md:text-xl hover:text-red-400' : 'text-gray-300 font-medium text-lg md:text-xl hover:text-white')}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to={"/pricing"} 
          className={({ isActive }) => (isActive ? 'text-red-500 font-medium text-lg md:text-xl hover:text-red-400' : 'text-gray-300 font-medium text-lg md:text-xl hover:text-white')}
        >
          Pricing
        </NavLink>
      </li>
    </ul>
  </div>
</nav>
  )
}

export default Navbar
