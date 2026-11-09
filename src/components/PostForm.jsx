
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import RTE from './RTE'
import { useForm } from 'react-hook-form'
import { createPost, uploadFile } from '../Appwrite/Configs'

function PostForm() {
  const userdata = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      status: 'active',
    },
  })

  function slugTransform(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 36)
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title || ''))
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, setValue])

  async function submithandler(data) {
    const file = await uploadFile(data.image[0])

    if (!file) {
      return
    }

    const post = await createPost({
      title: data.title,
      slug: data.slug,
      content: data.content,
      featuredImage: file.$id,
      status: data.status,
      userId: userdata.$id,
    })

    if (post) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Form Heading */}
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Your Blog Workspace
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Create a New Post
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Share your thoughts, ideas, and stories with your readers.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit(submithandler)} className="space-y-7">

            {/* Title */}
            <div>
              <Input
                label="Post Title"
                placeholder="Enter an engaging title"
                {...register('title', { required: true })}
              />
              <p className="mt-2 text-xs text-slate-500">
                Choose a clear title for your article.
              </p>
            </div>
            <div>
              <Input
                label="Post Slug"
                placeholder="your-post-slug"
                {...register('slug', { required: true })}
              />
              <p className="mt-2 text-xs text-slate-500">
                This is generated automatically from your title.
              </p>
            </div>

            <div>
              <div className="mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Post Content
                </label>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <RTE
                  label="Content"
                  name="content"
                  control={control}
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Featured Image
              </label>

              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 transition-colors hover:border-blue-400 sm:p-6">
                <Input
                  label=""
                  type="file"
                  accept="image/*"
                  {...register('image', { required: true })}
                />

                <p className="mt-2 text-xs text-slate-500">
                  Choose an image to represent your post.
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="post-status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Post Status
              </label>
              <select
                id="post-status"
                {...register('status')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="active"> Published</option>
                <option value="inactive">Draft</option>
              </select>

              <p className="mt-2 text-xs text-slate-500">
                Choose whether your post should be active or inactive.
              </p>
            </div>

            {/* Submit */}
            <div className="border-t border-slate-100 pt-6">
              <Button
                type="submit"
                className="w-full"
              >
                Publish Post
              </Button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Review your content before publishing.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default PostForm
