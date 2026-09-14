import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PostCard from '../PostCard/PostCard';
import CommentCard from '../CommentCard/CommentCard';
import { useQuery } from '@tanstack/react-query';
import CreatePostCrad from '../CreatePostCrad/CreatePostCrad';

export default function Feed() {

   function getAllPosts() {
   return axios.get('https://route-posts.routemisr.com/posts', {
      params:{
        sort: '-createdAt'
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   }

    const {data , isLoading ,isError ,error } = useQuery({
    queryKey:['getPosts'] ,
    queryFn: getAllPosts ,
    staleTime: 10000
  })
  
  //console.log(data?.data.data.posts)

  if(isError) {
    return <div className='h-screen flex justify-center items-center'>
      <h2>{error.message}</h2>
    </div>
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto flex pt-4 px-4 md:px-0 space-x-4">

        {/* Left Sidebar */}
        <aside className="hidden md:block w-60 space-y-3">
          <NavLink to='/feed' className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
            <i className="fas fa-user fa-lg text-blue-600" />
            <span>Feed</span>
          </NavLink>

          <NavLink to=' ' className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
            <i className="fas fa-user fa-lg text-blue-600" />
            <span>My posts</span>
          </NavLink>

          <NavLink to=' ' className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
            <i className="fas fa-user fa-lg text-blue-600" />
            <span>Community</span>
          </NavLink>

          <NavLink to=' ' className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
            <i className="fas fa-user fa-lg text-blue-600" />
            <span>Saved</span>
          </NavLink>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-2xl space-y-4">
          <CreatePostCrad/>
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {data?.data.data.posts?.map((post) => (
            <PostCard isSinglePost={false} key={post._id} post={post} />
          ))}
        </main>

        {/* Right Sidebar*/}
        <aside className="hidden lg:block w-60 space-y-4">
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Suggest Friends</h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 rounded p-2">
                <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Contact" className="h-8 w-8 rounded-full" />
                <span>Mike Johnson</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />
              </li>
            </ul>
          </section>
        </aside>

      </div>
    </div>
  );
}