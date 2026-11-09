import React, { useId } from 'react'
function Input({
  label,
  type = "text",
  className = '',
  ref,
  ...props
}) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 inline-block pl-1 text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        {...props}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100 ${className}`}
      />
    </div>
  )
}
export default Input