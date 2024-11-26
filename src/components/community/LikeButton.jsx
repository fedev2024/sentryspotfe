import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Constant } from "@/utils/constant/constant";

const LikeButton = ({ post, onLikeUpdate }) => {
  // Use local state that can be immediately updated
  const [localLiked, setLocalLiked] = useState(post.feed_likes && post.feed_likes.id > 0);
  const [localLikesCount, setLocalLikesCount] = useState(post.feed_likes_count || 0);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalLiked(post.feed_likes && post.feed_likes.id > 0);
    setLocalLikesCount(post.feed_likes_count || 0);
  }, [post]);

  const toggleLike = async (postId) => {
    // Immediately update UI (Optimistic UI Update)
    const currentLikedState = localLiked;
    const currentLikesCount = localLikesCount;

    try {
      // Optimistically update UI before API call
      setLocalLiked(!currentLikedState);
      setLocalLikesCount(
        !currentLikedState 
          ? currentLikesCount + 1 
          : Math.max(0, currentLikesCount - 1)
      );

      let response;
      if (currentLikedState) {
        // Unlike - DELETE request
        response = await axios.delete(
          `https://api.sentryspot.co.uk/api/feed/feed/like/${postId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.data.status !== "success") {
          // Rollback if API call fails
          setLocalLiked(currentLikedState);
          setLocalLikesCount(currentLikesCount);
          console.error("Failed to unlike the post.");
        }
      } else {
        // Like - POST request
        response = await axios.post(
          `https://api.sentryspot.co.uk/api/feed/feed/like/${postId}`,
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.data.status !== "success") {
          // Rollback if API call fails
          setLocalLiked(currentLikedState);
          setLocalLikesCount(currentLikesCount);
          console.error("Failed to like the post.");
        }
      }
    } catch (error) {
      // Rollback in case of network error
      setLocalLiked(currentLikedState);
      setLocalLikesCount(currentLikesCount);
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button
      className={`flex items-center ${
        localLiked
          ? "text-red-600 hover:text-red-700"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={() => toggleLike(post.id)}
    >
      <i className={`fas fa-heart mr-2 ${localLiked ? 'text-red-600' : ''}`}></i>
      <span> Likes</span>
    </button>
  );
};

export default LikeButton;