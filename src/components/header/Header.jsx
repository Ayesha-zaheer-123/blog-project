import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logoutbtn from './Logoutbtn'
function Header() {
  const authStatus = useSelector((state) => state.auth.login)
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`
  return (
    <header className="sticky top-0 z-50 animate-fade-in border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500 text-sm text-white">B</span>
          BlogSpace
        </Link>
        {authStatus ? (
          <ul className="flex items-center gap-1 sm:gap-2">
            <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/add-post" className={linkClass}>Add Post</NavLink></li>
            <li><Logoutbtn /></li>
          </ul>
        ) : (
          <ul className="flex items-center gap-1 sm:gap-2">
            <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
            <li><NavLink to="/signup" className={linkClass}>Signup</NavLink></li>
          </ul>
        )}
      </nav>
    </header>
  )
}
export default Header