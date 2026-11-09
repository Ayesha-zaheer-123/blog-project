import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  const linkClass = "inline-block text-base font-medium text-slate-700 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
  const headingClass = "mb-6 text-xs font-semibold uppercase tracking-wider text-slate-400"
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-slate-200 bg-white py-12">
      <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm text-slate-500">
                @ Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className={headingClass}>Company</h3>
              <ul>
                <li className="mb-4"><Link className={linkClass} to="/">Features</Link></li>
                <li className="mb-4"><Link className={linkClass} to="/">Pricing</Link></li>
                <li className="mb-4"><Link className={linkClass} to="/">Affiliate Program</Link></li>
                <li><Link className={linkClass} to="/">Press Kit</Link></li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className={headingClass}>Support</h3>
              <ul>
                <li className="mb-4"><Link className={linkClass} to="/">Account</Link></li>
                <li className="mb-4"><Link className={linkClass} to="/">Help</Link></li>
                <li className="mb-4"><Link className={linkClass} to="/">Contact Us</Link></li>
                <li><Link className={linkClass} to="/">Customer Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className={headingClass}>Legals</h3>
              <ul>
                <li className="mb-4"><Link className={linkClass} to="/">Terms & Conditions</Link></li>
                <li className="mb-4"><Link className={linkClass} to="/">Privacy Policy</Link></li>
                <li><Link className={linkClass} to="/">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer