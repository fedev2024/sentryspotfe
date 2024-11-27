import React from "react";
import PostItem from "./PostItem"; // New component for individual post

const PostList = ({ posts, setPosts, setConfirmationDialog }) => {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow-md">
          No posts available. Be the first to post!
        </div>
      ) : (
        posts.map((post) => (
            <PostItem key={post.id} post={post} setPosts={setPosts} setConfirmationDialog={setConfirmationDialog} deletePost={deletePost} />

            //   <PostItem key={post.id} post={post} setPosts={setPosts} setConfirmationDialog={setConfirmationDialog} />
        ))
      )}
    </div>
  );
};

export default PostList;