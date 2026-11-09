import React from 'react'
import { deleteFile, deletePost, getFileView, getPost } from '../Appwrite/Configs'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import parse from "html-react-parser"
import Button from './Button'
function Post() {
  const [post, setpost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    getPost(slug)
      .then((res) => {
        if (res) {
          setpost(res)
        } else {
          navigate("/")
        }
      })
  }, [slug])
  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-500" />
        <p className="animate-pulse text-sm font-medium text-slate-500">Loading post...</p>
      </div>
    )
  }
  async function deletedPost() {
    const deleted = await deletePost(slug);
    if (deleted) {
      if (post.image) await deleteFile(post.image);
      navigate("/");
    }
  }
  const content = Array.isArray(post.content) ? post.content[0] : post.content;
  const isOwner = userData ? userData.$id === post.userId : false;
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/" className="mb-6 inline-flex animate-fade-in items-center gap-1 text-sm font-medium text-slate-500 transition-all duration-200 hover:-translate-x-1 hover:text-indigo-600">
        ← Back to Home
      </Link>
      {post.image && (
        <div className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <img src={getFileView(post.image)} alt={post.Title} className="max-h-[420px] w-full object-cover" />
        </div>
      )}
      <h1 className="mt-8 animate-fade-up text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        {post.Title}
      </h1>
      <div className="post-content mt-6 animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {parse(content || "")}
      </div>
      {isOwner && (
        <div className="mt-6 flex animate-fade-up flex-wrap gap-3">
          <Link to={`/edit-post/${post.$id}`}>
            <Button>Edit post</Button>
          </Link>
          <Button
            onClick={deletedPost}
            bgColor="bg-red-50 hover:bg-red-100"
            textColor="text-red-600"
            className="hover:shadow-red-100"
          >
            Delete post
          </Button>
        </div>
      )}
    </article>
  )
}
export default Post