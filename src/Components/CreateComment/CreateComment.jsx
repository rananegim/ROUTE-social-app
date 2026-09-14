import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export default function CreateComment({ postId , queryKey}) {

  const query  = useQueryClient()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      content: ''
    }
  });

  function createCommentPost(content) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      { content }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
  }

  const { data, isPending, error, isError, mutate } = useMutation({
    mutationFn: createCommentPost,
    onSuccess: () => {
      reset();
      console.log('comment is created successfully')
      query.invalidateQueries({queryKey:queryKey})
    },

    onError:() => {
      console.log('comment cannot created')
    }
  });

  //console.log(data)

  function handleCreateComment(formValues) {
    if (!formValues.content) return;
    mutate(formValues.content);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateComment)}>
        <div>
          <div className="w-full px-3 my-2">
            <textarea
              {...register('content', { required: 'Comment cannot be empty' })}
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              placeholder="Type Your Comment"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>
          <div className="w-full flex justify-end px-3">
            <button
              type="submit"
              disabled={isPending}
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
            >
              {isPending ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </form>
      {isError && (
        <p className="text-red-500 text-sm mt-1">
          {error?.response?.data?.message || 'Failed to post comment'}
        </p>
      )}
    </div>
  );
}