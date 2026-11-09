import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostList from './PostList'
function Home() {
  const authStatus = useSelector((state) => state.auth.login)
  if (authStatus) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Latest Posts</h1>
          <p className="mt-2 text-slate-500">Read what everyone is writing about.</p>
        </div>
        <PostList />
      </div>
    )
  } else {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-6xl items-center px-4 py-10 sm:px-6">
        <div className="grid w-full items-center gap-10 md:grid-cols-2">
          <div className="animate-fade-up text-center md:text-left">
            <span className="inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600">
              Welcome to BlogSpace
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Read write and share your <span className="text-indigo-500">stories</span>
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-500">
              Login to read posts from other writers and publish your own articles in a clean, simple space.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                to="/login"
                className="rounded-full bg-indigo-500 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600"
              >
                Create account
              </Link>
            </div>
          </div>
          <div className="relative mx-auto h-[360px] w-full max-w-sm animate-fade-in">
  <div className="absolute inset-0 rounded-full bg-indigo-100/70 blur-3xl"></div>
  <div className="absolute left-0 top-4 w-56 -rotate-6 animate-float rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
    <div className="h-24 rounded-xl bg-gradient-to-br from-indigo-200 to-violet-300"></div>
    <div className="mt-3 h-3 w-3/4 rounded-full bg-slate-800/80"></div>
    <div className="mt-2 h-2 w-full rounded-full bg-slate-200"></div>
    <div className="mt-1.5 h-2 w-2/3 rounded-full bg-slate-200"></div>
  </div>
  <div className="absolute right-0 top-24 w-56 rotate-6 animate-float rounded-2xl border border-slate-200 bg-white p-3 shadow-xl" style={{ animationDelay: '1s' }}>
    <div className="h-24 rounded-xl bg-gradient-to-br from-sky-200 to-indigo-300"></div>
    <div className="mt-3 h-3 w-2/3 rounded-full bg-slate-800/80"></div>
    <div className="mt-2 h-2 w-full rounded-full bg-slate-200"></div>
    <div className="mt-1.5 h-2 w-1/2 rounded-full bg-slate-200"></div>
  </div>
  <div className="absolute bottom-0 left-8 w-56 animate-float rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-indigo-200" style={{ animationDelay: '2s' }}>
    <div className="h-20 rounded-xl bg-gradient-to-br from-violet-200 to-pink-200"></div>
    <div className="mt-3 h-3 w-4/5 rounded-full bg-slate-800/80"></div>
    <div className="mt-2 h-2 w-full rounded-full bg-slate-200"></div>
    <span className="mt-3 inline-block rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-semibold text-white">Read article →</span>
  </div>
</div>
        </div>
      </div>
    )
  }
}
export default Home