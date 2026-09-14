import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../PostCard/PostCard'


export default function PostDetails() {

  const { id } = useParams()

  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['getSinglePost', id],
    queryFn: getPostDetails
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <PostCard isSinglePost={true} post={data?.data?.data?.post} />
    </>
  )
}