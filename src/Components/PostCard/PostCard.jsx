import React, { useContext } from "react";
import Feed from "../Feed/Feed";
import { Link, NavLink } from "react-router-dom";
import CommentCard from "../CommentCard/CommentCard";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateComment from "../CreateComment/CreateComment";
import Controls from "../Controls/Controls";
import { AuthContext } from "../../context/Authcontext";
export default function PostCard({ post, isSinglePost = false }) {
  const { userData } = useContext(AuthContext);

  const query = useQueryClient();

  function getPostComment() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${post.id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const { data } = useQuery({
    queryKey: ["getPostComment"],
    queryFn: getPostComment,
    enabled: isSinglePost,
  });

  //console.log(data?.data.data.comments);

  function LikePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const {
    data: likeData,
    isPending: likePending,
    mutate: handleLikePost,
  } = useMutation({
    mutationFn: LikePost,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["getPosts"] });
      query.invalidateQueries({ queryKey: ["getProfilePosts"] });
      query.invalidateQueries({ queryKey: ["getSinglePost", post.id] });
    },
  });

  // console.log(likeData?.data.data.liked)

  return (
    <div>
      {/* Example Post */}
      <div className="bg-white p-4 rounded shadow-lg mx-auto mb-5 mt-3">
        <div className="flex items-center justify-between">
          <Link to={`/postDetails/${post.id}`}>
            <header className="flex items-center space-x-3 mb-3">
              <img
                src={post.user.photo}
                className="h-10 w-10 rounded-full"
                alt={post.user.name}
              />
              <div>
                <p className="font-semibold">{post.user.name}</p>
                <p className="hidden">{post.id}</p>
                <p className="text-xs text-gray-500">{post.createdAt}</p>
              </div>
            </header>
          </Link>

          {/* controls */}
          {userData?._id === post.user._id && (
            <div>
              <Controls post={post} />
            </div>
          )}
        </div>
        {post.body && <p className="mb-3"> {post.body}</p>}
        {post.image && (
          <img
            src={post.image}
            alt={post.pody}
            className="rounded max-h-96 w-full object-cover mb-3"
          />
        )}
        <div className="flex justify-between text-gray-600 text-sm font-semibold">
          <button
            onClick={handleLikePost}
            className={`flex items-center space-x-1 hover:text-blue-300 ${likeData?.data.data.liked ? "text-blue-500" : " "}`}
          >
            <i className={`fas fa-thumbs-up  `} />
            <span>{post.likesCount <= 0 ? "" : post.likesCount} Like</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <i className="fas fa-comment" />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <i className="fas fa-share" />
            <span>{post.sharesCount <= 0 ? "" : post.sharesCount} Share</span>
          </button>
        </div>

        {/* create comment */}
        <CreateComment
          postId={post.id}
          queryKey={isSinglePost ? ["getPostComment"] : ["getPosts"]}
        />

        {/* one  */}
        {isSinglePost == false && post.topComment && (
  <CommentCard
    comment={post.topComment}
    postId={post.id}
    queryKey={["getPosts"]}
  />
)}
        {/* alll */}
        {isSinglePost &&
          data?.data.data.comments.map((comment) => {
            return (
              <CommentCard
                key={comment._id}
                comment={comment}
                postId={post.id}
                queryKey={["getPostComment"]}
              />
            );
          })}
      </div>
    </div>
  );
}
