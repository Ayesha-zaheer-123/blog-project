import React from 'react'
import { useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RTE from './RTE'
import Input from './Input'
import Button from './Button'
import { getPost } from '../Appwrite/Configs'
import { deleteFile, updatePost, uploadFile } from '../Appwrite/Configs'
function EditPost() {
    const navigate=useNavigate();
     const {slug} =useParams();
const [posts,setposts]=useState(null)
const {register,handleSubmit,reset,control}=useForm();
useEffect(()=>{
getPost(slug).then((res)=>{
    if(res) {
        setposts(res);
        const content=Array.isArray(res.content)?res.content[0]:res.content;
    reset({title: res.Title, status: res.status, content})
    }else {
navigate("/");
    }
})
},[slug])
async function submit(data) {
const file=posts.image;
let imageId=posts.image;
if(data.image&&data.image[0]) {
    const newImage=await uploadFile(data.image[0]);
    if(!newImage) return;
imageId=newImage.$id;
}
const updated=await updatePost(slug,{
     title: data.title,
      content: data.content,
      featuredImage: imageId,
      status: data.status,
})
if(updated) {
    if(imageId!==file&&file) {
    await deleteFile(file);
}
    navigate(`/post/${slug}`)
}
}
if(!posts) return <p>Loading....</p>
const oldContent=Array.isArray(posts.content)?posts.content[0]:posts.content;
  return (
    <>
<form onSubmit={handleSubmit(submit)}>
   <Input label="Title" {...register("title",{required:true})}/>
   <RTE label="Content" name="content" control={control} defaultValue={oldContent}/>
   <Input label="Image" type="file" accept="image/*"/>
<select {...register("status")}>
    <option value="active">Active</option>
    <option value="inactive">inactive</option>
</select>
    <Button type="submit">Update</Button>
</form>
    </>
  )
}

export default EditPost