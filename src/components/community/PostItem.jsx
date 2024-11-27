
import React, { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash, FaHeart, FaComment, FaShare } from "react-icons/fa";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import LikeButton from "./LikeButton";
import ConfirmationDialog from "./ConfirmationDialog";
import LinkedInShareButton from "./ShareButton";

const PostItem = ({ post, setPosts, setConfirmationDialog }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [editingPostContent, setEditingPostContent] = useState("");
  const [isEditingPost, setIsEditingPost] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const confirmDeletePost = () => {
    setConfirmationDialog({ isOpen: true, type: "post", id: post.id });
  };

  const toggleLike = async () => {
    if (!token) {
      alert("Please log in to like this post.");
      return;
    }

    try {
      const response = await axios.post(`https://api.sentryspot.co.uk/api/feed/toggle-like/${post.id}`, {}, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === post.id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
          )
        );
      } else {
        console.error("Error toggling like:", response.data.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const addComment = async () => {
    if (!token) {
      alert("Please log in to comment on this post.");
      return;
    }

    if (!commentContent.trim()) return;

    try {
      const response = await axios.post("https://api.sentryspot.co.uk/api/feed/feed-comment", {
        feed_id: post.id,
        content: commentContent,
      }, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === post.id ? { ...p, feed_comments: [...(p.feed_comments || []), { content: commentContent }] } : p
          )
        );
        setCommentContent("");
        setActiveCommentPostId(null);
      } else {
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const editComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const saveEditedComment = async (commentId) => {
    if (!token) {
      alert("Please log in to edit this comment.");
      return;
    }

    if (editedCommentContent.trim()) {
      try {
        const response = await axios.put(
          `https://api.sentryspot.co.uk/api/feed/feed-comment/${commentId}`,
          { feed_id: post.id,
            content: editedCommentContent },
          {
            headers: {
              Authorization: token,
            //   "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          setPosts((prevPosts) =>
            prevPosts.map((p) =>
              p.id === post.id
                ? {
                    ...p,
                    feed_comments: p.feed_comments.map((comment) =>
                      comment.id === commentId ? { ...comment, content: editedCommentContent } : comment
                    ),
                  }
                : p
            )
          );
          setEditingCommentId(null);
          setEditedCommentContent("");
        } else {
          console.error("Error editing comment:", response.data.message);
        }
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const confirmDeleteComment = (commentId) => {
    setConfirmationDialog({ isOpen: true, type: "comment", id: post.id, commentId });
  };

  const sharePost = () => {
    navigator.clipboard.writeText(`https://example.com/post/${post.id}`)
      .then(() => alert("Link copied to clipboard"))
      .catch((err) => console.error("Error copying link:", err));
  };

  const startEditingPost = () => {
    setIsEditingPost(true);
    setEditingPostContent(post.content);
  };

  const saveEditedPost = async () => {
    if (!token) {
      alert("Please log in to edit this post.");
      return;
    }

    if (editingPostContent.trim()) {
      try {
        const response = await axios.put(
          `https://api.sentryspot.co.uk/api/feed/feed-edit/${post.id}`,
          { content: editingPostContent },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          setPosts((prevPosts) =>
            prevPosts.map((p) =>
              p.id === post.id ? { ...p, content: editingPostContent } : p
            )
          );
          setIsEditingPost(false);
          setEditingPostContent("");
        } else {
          console.error("Error editing post:", response.data.message);
        }
      } catch (error) {
        console.error("Error editing post:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <img
            src={post.user_photo ? `https://api.sentryspot.co.uk/${post.user_photo}` : "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <div className="flex flex-col">
              <p className="font-semibold text-gray-800">{post.user_first_name} {post.user_last_name}</p>
              <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => toggleDropdown(post.id)} className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <FaEllipsisV />
          </button>
          {openDropdownId === post.id && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              {post.is_edit && (
                <button
                  onClick={startEditingPost}
                  className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
              )}
              <button onClick={confirmDeletePost} className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100">
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {isEditingPost ? (
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            value={editingPostContent}
            onChange={(e) => setEditingPostContent(e.target.value)}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setIsEditingPost(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={saveEditedPost}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
          {post.feed_image && (
            <img src={`https://api.sentryspot.co.uk${post.feed_image}`} alt="Post" className="w-full rounded-md mb-4 object-cover max-h-96" />
          )}
        </>
      )}
      <div className="flex items-center justify-between p-2">
        <LikeButton post={post} />
        <button onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)} className="text-gray-500 hover:text-blue-600 flex items-center">
          <FaComment className="mr-2" />
          Comment
        </button>
        {/* <button onClick={sharePost} className="text-gray-500 hover:text-green-600 flex items-center">
          <FaShare className="mr-2" />
          Share
        </button> */}
        <LinkedInShareButton post={post}/>
      </div>
      {activeCommentPostId === post.id && (
        <div className="mt-6">
          <textarea
            className="w-full p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Join the conversation..."
          />
          <button onClick={addComment} className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 mt-2">
            Post Comment
          </button>
          {/* <div className="mt-4">
            {post.feed_comments && post.feed_comments.length > 0 && (
              <div className="space-y-3 ">
                {post.feed_comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-100   p-3 rounded-lg ">
                    <div className="flex-grow">
                      <p className="font-semibold text-sm text-gray-800">{comment.isAnonymous ? "Anonymous" : "User"}</p>
                      {editingCommentId === comment.id ? (
                        <div className="flex-grow">
                          <textarea
                            className="w-full p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                            value={editedCommentContent}
                            onChange={(e) => setEditedCommentContent(e.target.value)}
                          />
                          <div className="flex justify-end space-x-2 mt-2 ">
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveEditedComment(comment.id)}
                              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-700 text-sm">{comment.content}</p>
                          <div className="relative ">
                            <button onClick={() => toggleDropdown(comment.id)} className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                              <FaEllipsisV />
                            </button>
                            {openDropdownId === comment.id && (
                              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                                {comment.is_edit && (
                                  <button
                                    onClick={() => editComment(comment.id, comment.content)}
                                    className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100"
                                  >
                                    <FaEdit className="mr-2" /> Edit
                                  </button>
                                )}
                                <button
                                  onClick={() => confirmDeleteComment(comment.id)}
                                  className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
                                >
                                  <FaTrash className="mr-2" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div> */}
          <div className="mt-4">
  {post.feed_comments && post.feed_comments.length > 0 && (
    <div className="space-y-3">
      {post.feed_comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-col gap-2 shadow-sm relative" // Added `relative`
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-gray-800">
              {comment.isAnonymous ? "Anonymous" : "User"}
            </p>
            <button
              onClick={() => toggleDropdown(comment.id)}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaEllipsisV />
            </button>
          </div>
          {editingCommentId === comment.id ? (
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                value={editedCommentContent}
                onChange={(e) => setEditedCommentContent(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveEditedComment(comment.id)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
              {openDropdownId === comment.id && (
                <div className="absolute top-full right-0 w-40 bg-white border rounded shadow-lg z-10"> {/* Adjusted placement */}
                  {comment.is_edit && (
                    <button
                      onClick={() => editComment(comment.id, comment.content)}
                      className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                  )}
                  <button
                    onClick={() => confirmDeleteComment(comment.id)}
                    className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>

        </div>
      )}
      <ConfirmationDialog
        isOpen={setConfirmationDialog.isOpen}
        onClose={() => setConfirmationDialog({ ...setConfirmationDialog, isOpen: false })}
        onConfirm={() => {
          // Handle delete confirmation logic here
          // Check if it's a post or comment and delete accordingly
        }}
        title={setConfirmationDialog.type === "post" ? "Delete Post" : "Delete Comment"}
        message={setConfirmationDialog.type === "post" ? "Are you sure you want to delete this post? This action cannot be undone." : "Are you sure you want to delete this comment? This action cannot be undone."}
      />
    </div>
  );
};

export default PostItem;