import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 px-10 md:px-20 lg:px-32">
      <div className="container mx-auto flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center mb-2 md:mb-0">
          <img src="/ocr.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-white font-bold text-lg md:text-xl">OCRXpert</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 md:space-x-10 "> {/* Links in the middle */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-red-500 font-medium text-lg md:text-xl md:hover:text-red-400' : 'text-gray-300 font-medium text-lg md:text-xl md:hover:text-white')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) => (isActive ? 'text-red-500 font-medium text-lg md:text-xl md:hover:text-red-400' : 'text-gray-300 font-medium text-lg md:text-xl md:hover:text-white')}
            >
              Pricing
            </NavLink>
          </li>
        </ul>
        <div className="flex "> {/* Sign in button on the right */}
          <button className="bg-indigo-700 md:hover:bg-indigo-500 text-white font-medium py-1 px-3 md:py-2 md:px-4 rounded-md">
            <NavLink to="/signin">Sign In</NavLink>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
