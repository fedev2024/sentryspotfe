// import React, { useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
// import ConfirmationDialog from "./ConfirmationDialog"; // Import the confirmation dialog

// const CommentSection = ({ post, setPosts, token }) => {
//   const [commentContent, setCommentContent] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editedCommentContent, setEditedCommentContent] = useState("");
//   const [showComments, setShowComments] = useState(false); // State to toggle comment visibility
//   const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, commentId: null });

//   const addComment = async () => {
//     if (!token) {
//       alert("Please log in to comment on this post.");
//       return;
//     }

//     if (!commentContent.trim()) return;

//     try {
//       const response = await axios.post("https://api.sentryspot.co.uk/api/feed/feed-comment", {
//         feed_id: post.id,
//         content: commentContent,
//       }, {
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data && response.data.status === "success") {
//         setPosts((prevPosts) =>
//           prevPosts.map((p) =>
//             p.id === post.id ? { ...p, feed_comments: [...(p.feed_comments || []), { content: commentContent, id: response.data.data.id }] } : p
//           )
//         );
//         setCommentContent("");
//       } else {
//         console.error("Error adding comment:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const editComment = (comment) => {
//     setEditingCommentId(comment.id);
//     setEditedCommentContent(comment.content);
//   };

//   const saveEditedComment = async (commentId) => {
//     if (!token) {
//       alert("Please log in to edit this comment.");
//       return;
//     }

//     if (editedCommentContent.trim()) {
//       try {
//         const response = await axios.put(`https://api.sentryspot.co.uk/api/feed/feed-comment/${commentId}`, {
//           content: editedCommentContent,
//         }, {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.data && response.data.status === "success") {
//           setPosts((prevPosts) =>
//             prevPosts.map((p) =>
//               p.id === post.id
//                 ? {
//                     ...p,
//                     feed_comments: p.feed_comments.map((comment) =>
//                       comment.id === commentId ? { ...comment, content: editedCommentContent } : comment
//                     ),
//                   }
//                 : p
//             )
//           );
//           setEditingCommentId(null);
//           setEditedCommentContent("");
//         } else {
//           console.error("Error editing comment:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error editing comment:", error);
//       }
//     }
//   };

//   const deleteComment = (commentId) => {
//     setConfirmationDialog({ isOpen: true, commentId });
//   };

//   const confirmDeleteComment = async () => {
//     if (!token) {
//       alert("Please log in to delete this comment.");
//       return;
//     }

//     try {
//       const response = await axios.delete(`https://api.sentryspot.co.uk/api/feed/feed/comment/${post.id}/${confirmationDialog.commentId}`, {
//         headers: {
//           Authorization: token,
//         },
//       });

//       if (response.data && response.data.status === "success") {
//         setPosts((prevPosts) =>
//           prevPosts.map((p) =>
//             p.id === post.id
//               ? { ...p, feed_comments: p.feed_comments.filter((comment) => comment.id !== confirmationDialog.commentId) }
//               : p
//           )
//         );
//         setConfirmationDialog({ isOpen: false, commentId: null });
//       } else {
//         console.error("Error deleting comment:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   return (
//     <div className="mt-6">
//       <textarea
//         className="w-full p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
//         value={commentContent}
//         onChange={(e) => setCommentContent(e.target.value)}
//         placeholder="Join the conversation..."
//       />
//       <button onClick={addComment} className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 mt-2">
//         Post Comment
//       </button>
//       <button onClick={() => setShowComments(!showComments)} className="text-gray-500 hover:text-blue-600 flex items-center mt-2">
//         {showComments ? "Hide Comments" : "Show Comments"}
//       </button>
//       {showComments && (
//         <div className="mt-4">
//           {post.feed_comments && post.feed_comments.length > 0 ? (
//             <div className="space-y-3">
//               {post.feed_comments.map((comment) => (
//                 <div key={comment.id} className="bg-gray-100 p-3 rounded-lg flex items-start">
//                   <div className="flex-grow">
//                     <p className="font-semibold text-sm text-gray-800">{comment.isAnonymous ? "Anonymous" : "User"}</p>
//                     <p className="text-gray-700 text-sm">{comment.content}</p>
//                   </div>
//                   <div className="relative">
//                     <button onClick={() => editComment(comment)} className="text-blue-600 hover:text-blue-800 text-sm ml-2">
//                       <FaEdit />
//                     </button>
//                     <button onClick={() => deleteComment(comment.id)} className="text-red-600 hover:text-red-800 text-sm ml-2">
//                       <FaTrash />
//                     </button>
//                     <button onClick={() => toggleDropdown(comment.id)} className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
//                       <FaEllipsisV />
//                     </button>
//                     {editingCommentId === comment.id && (
//                       <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
//                         <button onClick={() => saveEditedComment(comment.id)} className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100">
//                           Save
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 py-2">No comments yet.</div>
//           )}
//         </div>
//       )}
//       <ConfirmationDialog
//         isOpen={confirmationDialog.isOpen}
//         onClose={() => setConfirmationDialog({ isOpen: false, commentId: null })}
//         onConfirm={confirmDeleteComment}
//         title="Delete Comment"
//         message="Are you sure you want to delete this comment? This action cannot be undone."
//       />
//     </div>
//   );
// };

// export default CommentSection;

import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the confirmation dialog

const CommentSection = ({ post, setPosts, token }) => {
  const [commentContent, setCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, commentId: null });

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
            p.id === post.id ? { ...p, feed_comments: [...(p.feed_comments || []), { content: commentContent, id: response.data.data.id }] } : p
          )
        );
        setCommentContent("");
      } else {
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const editComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  const saveEditedComment = async () => {
    if (!token) {
      alert("Please log in to edit this comment.");
      return;
    }

    if (editedCommentContent.trim()) {
      try {
        const response = await axios.put(`https://api.sentryspot.co.uk/api/feed/feed-comment/${editingCommentId}`, {
          content: editedCommentContent,
        }, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (response.data && response.data.status === "success") {
          setPosts((prevPosts) =>
            prevPosts.map((p) =>
              p.id === post.id
                ? {
                    ...p,
                    feed_comments: p.feed_comments.map((comment) =>
                      comment.id === editingCommentId ? { ...comment, content: editedCommentContent } : comment
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
    setConfirmationDialog({ isOpen: true, commentId });
  };

  const deleteComment = async () => {
    const { commentId } = confirmationDialog;

    try {
      const response = await axios.delete(`https://api.sentryspot.co.uk/api/feed/feed/comment/${post.id}/${commentId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data && response.data.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === post.id
              ? { ...p, feed_comments: p.feed_comments.filter((comment) => comment.id !== commentId) }
              : p
          )
        );
        setConfirmationDialog({ isOpen: false, commentId: null });
      } else {
        console.error("Error deleting comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog({ isOpen: false, commentId: null });
  };

  return (
    <div className="mt-6">
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <textarea
          className="w-full p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Join the conversation..."
        />
        <button
          onClick={addComment}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 mt-2"
        >
          Post Comment
        </button>
      </div>

      {/* Comment List */}
      {post.feed_comments && post.feed_comments.length > 0 && (
        <div className="space-y-3">
          {post.feed_comments.map((comment) => (
            <div key={comment.id} className="bg-white p-3 rounded-lg flex items-start">
              <img
                src={
                  comment.isAnonymous
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
                    : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full mr-3 mt-1 object-cover"
              />
              <div className="flex-grow">
                <p className="font-semibold text-sm text-gray-800">
                  {comment.isAnonymous ? "Anonymous" : "User"}
                </p>
                <p className="text-gray-700 text-sm">{comment.content}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => editComment(comment)}
                    className="text-blue-600 hover:text-blue-800 text-sm mr-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmationDialog}
        onConfirm={deleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
      />
    </div>
  );
};

export default CommentSection;