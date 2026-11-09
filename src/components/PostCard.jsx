import React from 'react'
import { getFilePreview } from '../Appwrite/Configs'
import { Link } from 'react-router-dom'
import { getFileView } from '../Appwrite/Configs'
function PostCard({ Title, image, $id }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-100">
        <div className="aspect-video overflow-hidden bg-slate-100">
          {image && (
            <img
              src={getFileView(image)}
              alt={Title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-5">
          <h2 className="line-clamp-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
            {Title}
          </h2>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-500">
            Read article
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
export default PostCard