
import React, { useState, useEffect } from 'react'
import { getPosts } from '../Appwrite/Configs'
import PostCard from './PostCard'

function PostList() {
  const [post, setpost] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    getPosts()
      .then((res) => {
        if (res) {
          setpost(res.rows)
        }
      })
      .finally(() => {
        setloading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[250px] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        <p className="text-sm font-medium text-slate-500">
          Loading posts...
        </p>
      </div>
    )
  }

  if (post.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          No posts yet
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          There are no posts to display right now. New articles will appear here once they are available.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {post.map((posts) => (
        <PostCard key={posts.$id} {...posts} />
      ))}
    </div>
  )
}

export default PostList
