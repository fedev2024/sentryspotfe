import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import {
  FaRegCopy,
  FaEdit,
  FaTimes,
  FaEllipsisV,
  FaTrash,
} from "react-icons/fa";
import { Constant } from "@/utils/constant/constant";
import LikeButton from "./LikeButton";
import ConfirmationDialog from "./ConfirmationDialog";

const FeedSection = ({
  loginModal,
  setLoginModal,
  token = localStorage.getItem(Constant.USER_TOKEN),
}) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
  const [activeSharePostId, setActiveSharePostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [editingCommentPostId, setEditingCommentPostId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    type: null, // 'post' or 'comment'
    id: null,
    commentId: null,
  });
  // ... [keep all previous methods like handleImageUpload, toggleLike, addPost, etc.]

  const editComment = (commentId, content, postId) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
    setEditingCommentPostId(postId);
  };
  const toggleDropdown = (postId) => {
    setOpenDropdownId((prevId) => (prevId === postId ? null : postId));
  };

  const saveEditedComment = async () => {
    if (!token) {
      setLoginModal(true);
      return;
    }

    if (editedCommentContent.trim()) {
      try {
        const response = await axios.put(
          `https://api.sentryspot.co.uk/api/feed/feed-comment/${editingCommentId}`,
          {
            feed_id: editingCommentPostId,
            content: editedCommentContent,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          // Update the comment in the posts state
          setPosts(
            posts.map((post) => {
              if (post.id === editingCommentPostId) {
                return {
                  ...post,
                  feed_comments: post.feed_comments.map((comment) =>
                    comment.id === editingCommentId
                      ? { ...comment, content: editedCommentContent }
                      : comment
                  ),
                };
              }
              return post;
            })
          );

          // Reset editing states
          setEditingCommentId(null);
          setEditedCommentContent("");
          setEditingCommentPostId(null);
        } else {
          console.error("Error editing comment:", response.data.message);
        }
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const cancelCommentEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
    setEditingCommentPostId(null);
  };

  // ... [keep all existing methods from the previous implementation]

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const toggleLike = async (postId) => {
    if (!token) {
      setLoginModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/feed/toggle-like/${postId}`,
        {},
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.status === "success") {
        setPosts(
          posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  liked: !post.liked,
                  likes: post.liked ? post.likes - 1 : post.likes + 1,
                }
              : post
          )
        );
      } else {
        console.error("Error toggling like:", response.data.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const addPost = async () => {
    if (!token) {
      setLoginModal(true);
      return;
    }
    if (content.trim()) {
      try {
        const formData = new FormData();
        formData.append("content", content);
        // formData.append('isAnonymous', isAnonymous);
        if (image) {
          const imageBlob = await fetch(image).then((r) => r.blob());
          formData.append("image_upload", imageBlob, "uploaded-image.jpg");
        }

        const response = await axios.post(
          "https://api.sentryspot.co.uk/api/feed/feed-create",
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          const newPost = response.data.data;
          setPosts([newPost, ...posts]);
          setContent("");
          setIsAnonymous(false);
          setImage(null);
        } else {
          console.error("Error creating post:", response.data.message);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/feed/pro/feeds",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data && Array.isArray(response.data.data.feed_data)) {
        setPosts(response.data.data.feed_data);
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [posts.length]);

  const addComment = (postId) => {
    if (!token) {
      setLoginModal(true);
      return;
    }

    if (!commentContent.trim()) return;

    axios
      .post(
        "https://api.sentryspot.co.uk/api/feed/feed-comment",
        {
          feed_id: postId,
          content: commentContent,
          //   isAnonymous: isCommentAnonymous
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.status === "success") {
          const newComment = {
            content: commentContent,
            isAnonymous: isCommentAnonymous,
          };
           fetchPosts()
          setPosts(
            posts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    comments: [...(post.comments || []), newComment],
                  }
                : post
            )
          );
          setCommentContent("");
          setIsCommentAnonymous(false);
          setActiveCommentPostId(null);
        } else {
          console.error("Error adding comment:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleCopyLink = (postId) => {
    navigator.clipboard
      .writeText(`https://example.com/post/${postId}`)
      .then(() => alert("Link copied to clipboard"))
      .catch((err) => console.error("Error copying link:", err));
  };

  const sharePost = (postId) => {
    setActiveSharePostId(activeSharePostId === postId ? null : postId);
    setCommentContent("");
  };

  const editPost = (postId, currentContent) => {
    setEditingPostId(postId);
    setEditedContent(currentContent);
  };
  // const deletePost = async (feed_id, comment_id) => {
  //   try {
  //     let endpoint;

  //     // Set the endpoint based on whether a comment is being deleted
  //     if (comment_id) {
  //       endpoint = `https://api.sentryspot.co.uk/api/feed/feed/comment/${feed_id}/${comment_id}`;
  //     } else {
  //       endpoint = `https://api.sentryspot.co.uk/api/feed/feed/${feed_id}`;
  //     }

  //     // Send the DELETE request
  //     const response = await axios.delete(endpoint, {
  //       headers: {
  //         Authorization: `${token}`, // Ensure token is defined
  //       },
  //     });

  //     // Check for a successful response (HTTP status 200)
  //     if (response.status === "status" || response.code == 200) {
  //       fetchPosts(); // Refresh the posts

  //       // Update feeds based on whether it's a feed or comment
  //       setFeeds((prevFeeds) => {
  //         if (!comment_id) {
  //           return prevFeeds.filter((feed) => feed._id !== feed_id); // Remove feed
  //         } else {
  //           return prevFeeds.map((feed) =>
  //             feed._id === feed_id
  //               ? {
  //                   ...feed,
  //                   comments: feed.comments.filter((comment) => comment._id !== comment_id), // Remove comment
  //                 }
  //               : feed
  //           );
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error deleting:', error);
  //     alert('There was an error deleting the post or comment.');
  //   }
  // };
  const deletePost = async () => {
    const { type, id, commentId } = confirmationDialog;

    try {
      let endpoint;

      // Set the endpoint based on whether a comment is being deleted
      if (commentId) {
        endpoint = `https://api.sentryspot.co.uk/api/feed/feed/comment/${id}/${commentId}`;
      } else {
        endpoint = `https://api.sentryspot.co.uk/api/feed/feed/${id}`;
      }

      // Send the DELETE request
      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // Check for a successful response
      if (response.data && response.data.status === "success") {
        fetchPosts();
        if (commentId) {
          // Remove specific comment from the post
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === id
                ? {
                    ...post,
                    feed_comments: post.feed_comments.filter(
                      (comment) => comment.id !== commentId
                    ),
                  }
                : post
            )
          );
        } else {
          // Remove entire post
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        }

        // Close confirmation dialog
        setConfirmationDialog({
          isOpen: false,
          type: null,
          id: null,
          commentId: null,
        });
      } else {
        console.error("Error deleting:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting:", error);
      // alert("There was an error deleting the post or comment.");
    }
  };

  // Method to initiate delete confirmation for a post
  // const confirmDeletePost = (postId) => {
  //   setConfirmationDialog({
  //     isOpen: true,
  //     type: "post",
  //     id: postId,
  //     commentId: null,
  //   });
  // };
const confirmDeletePost = (postId) => {
  console.log('Confirm Delete Post:', postId);
  setConfirmationDialog({
    isOpen: true,
    type: "post",
    id: postId,
    commentId: null,
  });
  console.log('Confirmation Dialog State:', confirmationDialog);
};
  // Method to initiate delete confirmation for a comment
  const confirmDeleteComment = (postId, commentId) => {
    setConfirmationDialog({
      isOpen: true,
      type: "comment",
      id: postId,
      commentId: commentId,
    });
  };

  // Close confirmation dialog
  const closeConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: false,
      type: null,
      id: null,
      commentId: null,
    });
  };

  const saveEditedPost = async (postId) => {
    if (!token) {
      setLoginModal(true);
      return;
    }
    if (editedContent.trim()) {
      try {
        const response = await axios.put(
          `https://api.sentryspot.co.uk/api/feed/feed-edit/${postId}`,
          { content: editedContent },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          setPosts(
            posts.map((post) =>
              post.id === postId ? { ...post, content: editedContent } : post
            )
          );
          setEditingPostId(null);
          setEditedContent("");
        } else {
          console.error("Error editing post:", response.data.message);
        }
      } catch (error) {
        console.error("Error editing post:", error);
      }
    }
  };

  const toggleShowComments = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, showAllComments: !post.showAllComments }
          : post
      )
    );
  };
  return (
    <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
      {/* Post Creation Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
        <textarea
          className="w-full p-3 text-lg text-gray-800 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ask anything (even anonymously)..."
        />

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <label
              htmlFor="file-upload"
              className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
            >
              <i className="fas fa-camera mr-2"></i>
              <span className="text-sm">Upload Image</span>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="hidden"
              />
              <label
                htmlFor="anonymous"
                className="flex items-center cursor-pointer text-gray-700 hover:text-blue-900"
              >
                <span
                  className={`w-5 h-5 mr-2 border rounded ${
                    isAnonymous
                      ? "bg-blue-900 border-blue-900"
                      : "border-gray-300"
                  }`}
                >
                  {isAnonymous && (
                    <i className="fas fa-check text-white text-xs"></i>
                  )}
                </span>
                Anonymous Post
              </label>
            </div>
          </div>

          <button
            onClick={addPost}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Post
          </button>
        </div>

        {image && (
          <div className="mt-4 relative ">
            <img
              src={image}
              alt="Uploaded"
              className="max-w-full h-auto rounded-md shadow-sm"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow-md">
            No posts available. Be the first to post!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow "
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex">
                  <img
                    src={
                      post.user_photo
                        ? `https://api.sentryspot.co.uk/${post.user_photo}`
                        : "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 object-cover "
                  />
                  <div>
                    <div className="flex flex-col ">
                      <p className="font-semibold text-gray-800">
                        {post.user_first_name} {post.user_last_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}

                <div className="relative">
                  {/* Three Dots Icon */}
                  <button
                    onClick={() => toggleDropdown(post.id)}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FaEllipsisV />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdownId === post.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                      {post.is_edit && editingPostId !== post.id && (
                        <button
                          onClick={() => {
                            editPost(post.id, post.content);
                            setOpenDropdownId(null); // Close dropdown
                          }}
                          className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100"
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                      )}
                      <button
                        onClick={() => {
                          confirmDeletePost(post.id);
                          setOpenDropdownId(null); // Close dropdown
                        }}
                        className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
                      >
                        <FaTrash className="mr-2" /> Delete Post
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Post Content */}
              {editingPostId === post.id ? (
                <div className="mb-4">
                  <textarea
                    className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setEditingPostId(null)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEditedPost(post.id)}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>
              )}

              {/* Post Image */}
              {post.feed_image && (
                <img
                  src={`https://api.sentryspot.co.uk${post.feed_image}`}
                  alt="Post"
                  className="w-full rounded-md mb-4 object-cover max-h-96 "
                />
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between p-2">
                {/* <button
                  className={`flex items-center ${
                    post.liked 
                      ? "text-pink-600 hover:text-pink-700" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => toggleLike(post.id)}
                >
                  <i className="fas fa-heart mr-2"></i>
                  <span>{post.likes} Likes</span>
                </button> */}
                <LikeButton post={post} />

                <button
                  className="text-gray-500 hover:text-blue-600 flex items-center"
                  onClick={() =>
                    setActiveCommentPostId(
                      activeCommentPostId === post.id ? null : post.id
                    )
                  }
                >
                  <i className="fas fa-comment mr-2"></i>
                  Comment
                </button>

                <button
                  className="text-gray-500 hover:text-green-600 flex items-center"
                  onClick={() => sharePost(post.id)}
                >
                  <i className="fas fa-share mr-2"></i>
                  Share
                </button>
              </div>

              {/* Comments Section */}
              {activeCommentPostId === post.id && (
                <div className="mt-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <textarea
                      className="w-full p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Join the conversation..."
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`comment-anonymous-${post.id}`}
                          checked={isCommentAnonymous}
                          onChange={(e) =>
                            setIsCommentAnonymous(e.target.checked)
                          }
                          className="hidden"
                        />
                        <label
                          htmlFor={`comment-anonymous-${post.id}`}
                          className="flex items-center cursor-pointer text-gray-700"
                        >
                          <span
                            className={`w-5 h-5 mr-2 border rounded ${
                              isCommentAnonymous
                                ? "bg-blue-900 border-blue-900"
                                : "border-gray-300"
                            }`}
                          >
                            {isCommentAnonymous && (
                              <i className="fas fa-check text-white text-xs"></i>
                            )}
                          </span>
                          Comment Anonymously
                        </label>
                      </div>
                      <button
                        onClick={() => addComment(post.id)}
                        className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>

                  {/* Comment List */}
                  {post.feed_comments && post.feed_comments.length > 0 && (
                    <div className="space-y-3">
                      {/* {post.feed_comments.map((comment, index) => (
                        <div key={index} className="bg-gray-100 p-3 rounded-lg flex items-start">
                          <img
                            src={
                              comment.isAnonymous
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
                                : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full mr-3 mt-1 object-cover"
                          />
                          <div>
                            <p className="font-semibold text-sm text-gray-800">
                              {comment.isAnonymous ? "Anonymous" : "User"}
                            </p>
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                            {/* Edit Button for Comments 
                            {comment.is_edit && (
                              <button
                                onClick={() => editComment(comment.id, comment.content)}
                                className="text-blue-600 hover:text-blue-800 text-sm ml-2"
                              >
                                Edit
                              </button>
                            )}
                            
                          </div>
                        </div>
                      ))} */}
                      {post.feed_comments && post.feed_comments.length > 0 && (
                        <div className="space-y-3">
                          {post.feed_comments.map((comment, index) => (
                            <div
                              key={index}
                              className="bg-white p-3 rounded-lg flex items-start "
                            >
                              <img
                                src={
                                  comment.isAnonymous
                                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
                                    : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
                                }
                                alt="Profile"
                                className="w-8 h-8 rounded-full mr-3 mt-1 object-cover"
                              />
                              {editingCommentId === comment.id ? (
                                <div className="flex-grow">
                                  <textarea
                                    className="w-full p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                    value={editedCommentContent}
                                    onChange={(e) =>
                                      setEditedCommentContent(e.target.value)
                                    }
                                  />
                                  <div className="flex justify-end space-x-2 mt-2">
                                    <button
                                      onClick={cancelCommentEdit}
                                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={saveEditedComment}
                                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-between items-center w-full ">
                                  <div className="flex flex-col ">
                                    <p className="font-semibold text-sm text-gray-800">
                                      {comment.isAnonymous
                                        ? "Anonymous"
                                        : "User"}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                      {comment.content}
                                    </p>
                                  </div>
                                  {/* Edit Button for Comments */}
                                  {/* {comment.is_edit && (
                        <button
                          onClick={() => editComment(comment.id, comment.content, post.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
                        >
                          <FaEdit className="mr-2" />
                        </button>
                      )} */}
                                  <div className="relative">
                                    {/* Three Dots Icon */}
                                    <button
                                      onClick={() => toggleDropdown(comment.id)}
                                      className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                      <FaEllipsisV />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openDropdownId === comment.id && (
                                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                                        {comment.is_edit &&
                                          editingCommentId !== comment.id && (
                                            <button
                                              onClick={() => {
                                                editComment(
                                                  comment.id,
                                                  comment.content,
                                                  post.id
                                                );
                                                setOpenDropdownId(null); // Close dropdown
                                              }}
                                              className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100"
                                            >
                                              <FaEdit className="mr-2" /> Edit
                                            </button>
                                          )}
                                        <button
                                          onClick={() => {
                                            confirmDeleteComment(
                                              post.id,
                                              comment.id
                                            );
                                            setOpenDropdownId(null); // Close dropdown
                                          }}
                                          className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
                                        >
                                          <FaTrash className="mr-2" /> Delete
                                          comment
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          <ConfirmationDialog
                            isOpen={confirmationDialog.isOpen}
                            onClose={closeConfirmationDialog}
                            onConfirm={deletePost}
                            title={
                              confirmationDialog.type === "post"
                                ? "Delete Post"
                                : "Delete Comment"
                            }
                            message={
                              confirmationDialog.type === "post"
                                ? "Are you sure you want to delete this post? This action cannot be undone."
                                : "Are you sure you want to delete this comment? This action cannot be undone."
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedSection;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant";
// import PostCreation from "./PostCreation"; // New component for post creation
// import PostList from "./PostList"; // New component for post list
// import ConfirmationDialog from "./ConfirmationDialog";

// const FeedSection = ({ loginModal, setLoginModal, token = localStorage.getItem(Constant.USER_TOKEN) }) => {
//   const [posts, setPosts] = useState([]);
//   const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, type: null, id: null, commentId: null });

//   // Fetch posts function
//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get("https://api.sentryspot.co.uk/api/feed/pro/feeds", {
//         headers: {
//           Authorization: token,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data.feed_data)) {
//         setPosts(response.data.data.feed_data);
//       } else {
//         console.error("Unexpected API response:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [posts.length]);

//   // Confirmation dialog handling
//   const closeConfirmationDialog = () => {
//     setConfirmationDialog({ isOpen: false, type: null, id: null, commentId: null });
//   };

//   // const deletePost = async () => {
//   //   const { type, id, commentId } = confirmationDialog;

//   //   try {
//   //     let endpoint;
//   //      console.log(commentId,endpoint,"endpoint");
//   //     // Set the endpoint based on whether a comment is being deleted
//   //     if (commentId) {
//   //       endpoint = `https://api.sentryspot.co.uk/api/feed/feed/comment/${id}/${commentId}`;
//   //     } else {
//   //       endpoint = `https://api.sentryspot.co.uk/api/feed/feed/${id}`;
//   //     }

//   //     // Send the DELETE request
//   //     const response = await axios.delete(endpoint, {
//   //       headers: {
//   //         Authorization: `${token}`,
//   //       },
//   //     });

//   //     // Check for a successful response
//   //     if (response.data && response.data.status === "success") {
//   //       fetchPosts();
//   //       if (commentId) {
//   //         // Remove specific comment from the post
//   //         setPosts((prevPosts) =>
//   //           prevPosts.map((post) =>
//   //             post.id === id
//   //               ? {
//   //                   ...post,
//   //                   feed_comments: post.feed_comments.filter((comment) => comment.id !== commentId),
//   //                 }
//   //               : post
//   //           )
//   //         );
//   //       } else {
//   //         // Remove entire post
//   //         setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
//   //       }

//   //       // Close confirmation dialog
//   //       closeConfirmationDialog();
//   //     } else {
//   //       console.error("Error deleting:", response.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error deleting:", error);
//   //   }
//   // };
//   const deletePost = async () => {
//     const { type, id, commentId } = confirmationDialog;
//    console.log(commentId,"endpoint");
//     try {
//       let endpoint;
//       // Set the endpoint based on whether a comment is being deleted
//       if (commentId) {
//         endpoint = `https://api.sentryspot.co.uk/api/feed/feed-comment/${id}/${commentId}`; // Ensure this endpoint is correct
//       } else {
//         endpoint = `https://api.sentryspot.co.uk/api/feed/feed/${id}`;
//       }
  
//       // Send the DELETE request
//       const response = await axios.delete(endpoint, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
  
//       // Check for a successful response
//       if (response.data && response.data.status === "success") {
//         fetchPosts();
//         if (commentId) {
//           // Remove specific comment from the post
//           setPosts((prevPosts) =>
//             prevPosts.map((post) =>
//               post.id === id
//                 ? {
//                     ...post,
//                     feed_comments: post.feed_comments.filter((comment) => comment.id !== commentId),
//                   }
//                 : post
//             )
//           );
//         } else {
//           // Remove entire post
//           setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
//         }
  
//         // Close confirmation dialog
//         closeConfirmationDialog();
//       } else {
//         console.error("Error deleting:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting:", error);
//     }
//   };
//   return (
//     <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
//       <PostCreation token={token} setLoginModal={setLoginModal} setPosts={setPosts} />
//       {/* <PostList posts={posts} setPosts={setPosts} setConfirmationDialog={setConfirmationDialog} /> */}
//       <PostList posts={posts} setPosts={setPosts} setConfirmationDialog={setConfirmationDialog} deletePost={deletePost} />
//       <ConfirmationDialog
//         isOpen={confirmationDialog.isOpen}
//         onClose={closeConfirmationDialog}
//         onConfirm={deletePost}
//         title={confirmationDialog.type === "post" ? "Delete Post" : "Delete Comment"}
//         message={confirmationDialog.type === "post" ? "Are you sure you want to delete this post? This action cannot be undone." : "Are you sure you want to delete this comment? This action cannot be undone."}
//       />
//     </div>
//   );
// };

// export default FeedSection;