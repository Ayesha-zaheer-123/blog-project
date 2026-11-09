import React from "react";
export default function Button({
  children,
  type = 'button',
  bgColor = 'bg-indigo-500 hover:bg-indigo-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      className={`rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0 active:scale-95 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}