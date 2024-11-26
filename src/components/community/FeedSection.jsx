// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
// import { FaRegCopy } from "react-icons/fa";
// import { Constant } from "@/utils/constant/constant";

// const FeedSection = ({ 
//   loginModal, 
//   setLoginModal, 
//   token = localStorage.getItem(Constant.USER_TOKEN) 
// }) => {
//   const [posts, setPosts] = useState([]);
//   const [content, setContent] = useState("");
//   const [isAnonymous, setIsAnonymous] = useState(false);
//   const [image, setImage] = useState(null);
//   const [activeCommentPostId, setActiveCommentPostId] = useState(null);
//   const [commentContent, setCommentContent] = useState("");
//   const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
//   const [activeSharePostId, setActiveSharePostId] = useState(null);
//   const [showAllComments, setShowAllComments] = useState(false);
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [editedContent, setEditedContent] = useState("");

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);
//     }
//   };

//   const toggleLike = async (postId) => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://api.sentryspot.co.uk/api/feed/toggle-like/${postId}`,
//         {},
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data && response.data.status === "success") {
//         setPosts(
//           posts.map((post) =>
//             post.id === postId
//               ? {
//                   ...post,
//                   liked: !post.liked,
//                   likes: post.liked ? post.likes - 1 : post.likes + 1,
//                 }
//               : post
//           )
//         );
//       } else {
//         console.error("Error toggling like:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error toggling like:", error);
//     }
//   };

//   const addPost = async () => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }
//     if (content.trim()) {
//       try {
//         const formData = new FormData();
//         formData.append('content', content);
//         formData.append('isAnonymous', isAnonymous);
//         if (image) {
//           const imageBlob = await fetch(image).then(r => r.blob());
//           formData.append('image', imageBlob, 'uploaded-image.jpg');
//         }

//         const response = await axios.post(
//           "https://api.sentryspot.co.uk/api/feed/feed-create",
//           formData,
//           {
//             headers: {
//               Authorization: token,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         if (response.data && response.data.status === "success") {
//           const newPost = response.data.data;
//           setPosts([newPost, ...posts]);
//           setContent("");
//           setIsAnonymous(false);
//           setImage(null);
//         } else {
//           console.error("Error creating post:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error creating post:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.sentryspot.co.uk/api/feed/feeds"
//         );
//         if (response.data && Array.isArray(response.data.data.feed_data)) {
//           setPosts(response.data.data.feed_data);
//         } else {
//           console.error("Unexpected API response:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const addComment = (postId) => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }

//     if (!commentContent.trim()) return;

//     axios
//       .post(
//         "https://api.sentryspot.co.uk/api/feed/feed-comment",
//         {
//           feed_id: postId,
//           content: commentContent,
//           isAnonymous: isCommentAnonymous
//         },
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data && response.data.status === "success") {
//           const newComment = {
//             content: commentContent,
//             isAnonymous: isCommentAnonymous
//           };
          
//           setPosts(
//             posts.map((post) =>
//               post.id === postId
//                 ? {
//                     ...post,
//                     comments: [...(post.comments || []), newComment],
//                   }
//                 : post
//             )
//           );
//           setCommentContent("");
//           setIsCommentAnonymous(false);
//           setActiveCommentPostId(null);
//         } else {
//           console.error("Error adding comment:", response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding comment:", error);
//       });
//   };

//   const handleCopyLink = (postId) => {
//     navigator.clipboard
//       .writeText(`https://example.com/post/${postId}`)
//       .then(() => alert("Link copied to clipboard"))
//       .catch((err) => console.error("Error copying link:", err));
//   };

//   const sharePost = (postId) => {
//     setActiveSharePostId(activeSharePostId === postId ? null : postId);
//     setCommentContent("");
//   };

//   const editPost = (postId, currentContent) => {
//     setEditingPostId(postId);
//     setEditedContent(currentContent);
//   };

//   const saveEditedPost = async (postId) => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }
//     if (editedContent.trim()) {
//       try {
//         const response = await axios.put(
//           `https://api.sentryspot.co.uk/api/feed/feed-edit/${postId}`,
//           { content: editedContent },
//           {
//             headers: {
//               Authorization: token,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data && response.data.status === "success") {
//           setPosts(
//             posts.map((post) =>
//               post.id === postId ? { ...post, content: editedContent } : post
//             )
//           );
//           setEditingPostId(null);
//           setEditedContent("");
//         } else {
//           console.error("Error editing post:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error editing post:", error);
//       }
//     }
//   };

//   const toggleShowComments = (postId) => {
//     setPosts(
//       posts.map((post) =>
//         post.id === postId
//           ? { ...post, showAllComments: !post.showAllComments }
//           : post
//       )
//     );
//   };

//   return (
//     <div className="max-w-xl mp-4">
//       <div className="mb-4 bg-white p-3 border-t-8 rounded-t-md border-blue-900">
//         <textarea
//           className="w-full p-3 font-medium text-xl bg-gray-100 text-black h-28 border-0"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Ask anything (even anonymously)..."
//         />
//         <button
//           onClick={addPost}
//           className="my-2 bg-blue-900 w-full text-lg text-white px-4 py-2.5 rounded hover:bg-blue-700"
//         >
//           Post
//         </button>

//         {content && (
//           <>
//             <div className="mt-2">
//               <label
//                 htmlFor="file-upload"
//                 className="flex items-center cursor-pointer mt-4 ms-2"
//               >
//                 <i className="fas fa-camera text-blue-600 mr-2 text-2xl"></i>
//                 <span className="text-gray-700">Upload Image</span>
//                 <input
//                   type="file"
//                   id="file-upload"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>
//               {image && (
//                 <div className="mb-2 border-2 my-2">
//                   <img
//                     src={image}
//                     alt="Uploaded"
//                     className="max-w-full h-auto rounded"
//                   />
//                 </div>
//               )}
//               <div className="flex items-center mt-4 ms-1">
//                 <input
//                   type="checkbox"
//                   id="anonymous"
//                   checked={isAnonymous}
//                   onChange={(e) => setIsAnonymous(e.target.checked)}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="anonymous"
//                   className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border border-gray-900 ${
//                     isAnonymous ? "bg-blue-900 text-white" : ""
//                   }`}
//                 >
//                   <i className={`fas fa-${isAnonymous ? "check" : ""}`}></i>
//                 </label>
//                 <label htmlFor="anonymous" className="ml-2 text-gray-700">
//                   Post as Anonymous
//                 </label>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <div>
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <div key={post.id} className="bg-white shadow rounded-lg p-4 mb-2">
//               <div className="flex items-center">
//                 {post.isAnonymous && (
//                   <img
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
//                     alt="Anonymous"
//                     className="w-10 h-10 rounded-full mr-3"
//                   />
//                 )}
//                 <img
//                   src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
//                   alt="Anonymous"
//                   className="w-10 h-10 rounded-full mr-3"
//                 />
//                 <h4 className="font-bold m-0 flex-col">
//                   {post.isAnonymous ? " Anonymous" : post.user || "User"}
//                   <p className="text-xs">{post.updated_at.split("T")[0]}</p>
//                 </h4>
//               </div>
              
//               {editingPostId === post.id ? (
//                 <div>
//                   <textarea
//                     className="w-full p-3 border-1 text-lg bg-slate-200 border-gray-400 rounded h-32"
//                     value={editedContent}
//                     onChange={(e) => setEditedContent(e.target.value)}
//                   />
//                   <button
//                     onClick={() => saveEditedPost(post.id)}
//                     className="my-2 bg-blue-900 text-lg text-white px-4 py-1 rounded hover:bg-blue-700"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingPostId(null)}
//                     className="my-2 bg-gray-300 text-lg text-black px-4 py-1 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <p className="text-gray-700 break-all my-2 p-2 py-4">
//                     {post.content}
//                   </p>
//                   {post.is_edit && (
//                     <button
//                       onClick={() => editPost(post.id, post.content)}
//                       className="mr-4 text-gray-500 hover:text-blue-500 text-base"
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </div>
//               )}
//               {post.image && (
//                 <div className="mt-2">
//                   <img
//                     src={
//                       post.image ||
//                       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
//                     }
//                     alt="Uploaded"
//                     className="max-w-full h-auto rounded"
//                   />
//                 </div>
//               )}
//               <div className="flex items-center gap-3 mt-2 mb-4">
//                 <button
//                   className={`mr-4 ${
//                     post.liked
//                       ? "text-pink-600 text-base"
//                       : "text-gray-500 text-base"
//                   }`}
//                   onClick={() => toggleLike(post.id)}
//                 >
//                   <i className="fas fa-heart"></i> {post.likes} Likes{" "}
//                 </button>
//                 <button
//                   className="mr-4 text-gray-500 hover:text-blue-500 text-base"
//                   onClick={() =>
//                     setActiveCommentPostId(
//                       activeCommentPostId === post.id ? null : post.id
//                     )
//                   }
//                 >
//                   <i className="fas fa-comment"></i> Comment
//                 </button>
//                 <button
//                   className="mr-4 text-gray-500 hover:text-blue-500 text-base"
//                   onClick={() => sharePost(post.id)}
//                 >
//                   <i className="fas fa-share"></i> Share
//                 </button>
//                 {activeSharePostId === post.id && (
//                   <div className="absolute ms-56 mt-48 text-lg p-2 bg-white border  shadow-lg z-10">
//                     <button
//                       onClick={() =>
//                         window.open(
//                           `https://www.facebook.com/sharer/sharer.php?u=https://example.com/post/${post.id}`,
//                           "_blank"
//                         )
//                       }
//                       className="flex items-center text-blue-600 hover:text-blue-800 border-b p-2"
//                     >
//                       <AiFillFacebook className="text-xl mr-2" /> Facebook
//                     </button>
//                     <button
//                       onClick={() =>
//                         window.open(
//                           `https://www.linkedin.com/shareArticle?mini=true&url=https://example.com/post/${post.id}`,
//                           "_blank"
//                         )
//                       }
//                       className="flex items-center text-sky-700 hover:text-blue-900 mt-2 border-b p-2"
//                     >
//                       <AiFillLinkedin className="text-xl mr-2" /> LinkedIn
//                     </button>
//                     <button
//                       onClick={() => handleCopyLink(post.id)}
//                       className="flex items-center text-gray-600 hover:text-gray-800 mt-2 p-2"
//                     >
//                       <FaRegCopy className="text-xl mr-2" /> Copy Link
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {activeCommentPostId === post.id && (
//                 <div className="mt-4">
//                   <textarea
//                     className="w-full p-3 border-1 text-lg bg-slate-200 border-gray-400 rounded h-32"
//                     value={commentContent}
//                     onChange={(e) => setCommentContent(e.target.value)}
//                     placeholder="Join the conversation..."
//                   />
//                   <div className="flex justify-between items-center mt-2">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="comment-anonymous"
//                         checked={isCommentAnonymous}
//                         onChange={(e) => setIsCommentAnonymous(e.target.checked)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor="comment-anonymous"
//                         className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border border-gray-900 ${
//                           isCommentAnonymous ? "bg-blue-900 text-white" : ""
//                         }`}
//                       >
//                         <i className={`fas fa-${isCommentAnonymous ? "check" : ""}`}></i>
//                       </label>
//                       <label htmlFor="comment-anonymous" className="ml-2 text-gray-700">
//                         Comment Anonymously
//                       </label>
//                     </div>
//                     <button
//                       onClick={() => addComment(post.id)}
//                       className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                       Post Comment
//                     </button>
//                   </div>

//                   {/* Comments Section */}
//                   <div className="mt-4">
//                     {post.comments && post.comments.length > 0 && (
//                       <div>
//                         {(post.showAllComments ? post.comments : post.comments.slice(0, 2)).map((comment, index) => (
//                           <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
//                             <div className="flex items-center mb-2">
//                               <img
//                                 src={
//                                   comment.isAnonymous
//                                     ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
//                                     : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
//                                 }
//                                 alt="Profile"
//                                 className="w-8 h-8 rounded-full mr-2"
//                               />
//                               <span className="font-bold text-sm">
//                                 {comment.isAnonymous ? "Anonymous" : "User"}
//                               </span>
//                             </div>
//                             <p className="text-gray-700 text-sm">{comment.content}</p>
//                           </div>
//                         ))}
                        
//                         {post.comments.length > 2 && (
//                           <button
//                             onClick={() => toggleShowComments(post.id)}
//                             className="text-blue-600 hover:text-blue-800 text-sm"
//                           >
//                             {post.showAllComments ? "Show Less" : `View All ${post.comments.length} Comments`}
//                           </button>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 py-4">
//             No posts available. Be the first to post!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeedSection;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
// import { FaRegCopy, FaEdit, FaTimes } from "react-icons/fa";
// import { Constant } from "@/utils/constant/constant";

// const FeedSection = ({ 
//   loginModal, 
//   setLoginModal, 
//   token = localStorage.getItem(Constant.USER_TOKEN) 
// }) => {
//   const [posts, setPosts] = useState([]);
//   const [content, setContent] = useState("");
//   const [isAnonymous, setIsAnonymous] = useState(false);
//   const [image, setImage] = useState(null);
//   const [activeCommentPostId, setActiveCommentPostId] = useState(null);
//   const [commentContent, setCommentContent] = useState("");
//   const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
//   const [activeSharePostId, setActiveSharePostId] = useState(null);
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [editedContent, setEditedContent] = useState("");

//   // ... [keep all existing methods from the previous implementation]
  
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);
//     }
//   };

//   const toggleLike = async (postId) => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://api.sentryspot.co.uk/api/feed/toggle-like/${postId}`,
//         {},
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data && response.data.status === "success") {
//         setPosts(
//           posts.map((post) =>
//             post.id === postId
//               ? {
//                   ...post,
//                   liked: !post.liked,
//                   likes: post.liked ? post.likes - 1 : post.likes + 1,
//                 }
//               : post
//           )
//         );
//       } else {
//         console.error("Error toggling like:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error toggling like:", error);
//     }
//   };

//   const addPost = async () => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }
//     if (content.trim()) {
//       try {
//         const formData = new FormData();
//         formData.append('content', content);
//         // formData.append('isAnonymous', isAnonymous);
//         if (image) {
//           const imageBlob = await fetch(image).then(r => r.blob());
//           formData.append('image', imageBlob, 'uploaded-image.jpg');
//         }

//         const response = await axios.post(
//           "https://api.sentryspot.co.uk/api/feed/feed-create",
//           {content},
//           {
//             headers: {
//               Authorization: token,
//             //   "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         if (response.data && response.data.status === "success") {
//           const newPost = response.data.data;
//           setPosts([newPost, ...posts]);
//           setContent("");
//           setIsAnonymous(false);
//           setImage(null);
//         } else {
//           console.error("Error creating post:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error creating post:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.sentryspot.co.uk/api/feed/pro/feeds",{
//             headers:{
//                 Authorization:token
//             }
//           }
//         );
//         if (response.data && Array.isArray(response.data.data.feed_data)) {
//           setPosts(response.data.data.feed_data);
//         } else {
//           console.error("Unexpected API response:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const addComment = (postId) => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }

//     if (!commentContent.trim()) return;

//     axios
//       .post(
//         "https://api.sentryspot.co.uk/api/feed/feed-comment",
//         {
//           feed_id: postId,
//           content: commentContent,
//         //   isAnonymous: isCommentAnonymous
//         },
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data && response.data.status === "success") {
//           const newComment = {
//             content: commentContent,
//             isAnonymous: isCommentAnonymous
//           };
          
//           setPosts(
//             posts.map((post) =>
//               post.id === postId
//                 ? {
//                     ...post,
//                     comments: [...(post.comments || []), newComment],
//                   }
//                 : post
//             )
//           );
//           setCommentContent("");
//           setIsCommentAnonymous(false);
//           setActiveCommentPostId(null);
//         } else {
//           console.error("Error adding comment:", response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding comment:", error);
//       });
//   };

//   const handleCopyLink = (postId) => {
//     navigator.clipboard
//       .writeText(`https://example.com/post/${postId}`)
//       .then(() => alert("Link copied to clipboard"))
//       .catch((err) => console.error("Error copying link:", err));
//   };

//   const sharePost = (postId) => {
//     setActiveSharePostId(activeSharePostId === postId ? null : postId);
//     setCommentContent("");
//   };

//   const editPost = (postId, currentContent) => {
//     setEditingPostId(postId);
//     setEditedContent(currentContent);
//   };

//   const saveEditedPost = async (postId) => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }
//     if (editedContent.trim()) {
//       try {
//         const response = await axios.put(
//           `https://api.sentryspot.co.uk/api/feed/feed-edit/${postId}`,
//           { content: editedContent },
//           {
//             headers: {
//               Authorization: token,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data && response.data.status === "success") {
//           setPosts(
//             posts.map((post) =>
//               post.id === postId ? { ...post, content: editedContent } : post
//             )
//           );
//           setEditingPostId(null);
//           setEditedContent("");
//         } else {
//           console.error("Error editing post:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error editing post:", error);
//       }
//     }
//   };

//   const toggleShowComments = (postId) => {
//     setPosts(
//       posts.map((post) =>
//         post.id === postId
//           ? { ...post, showAllComments: !post.showAllComments }
//           : post
//       )
//     );
//   };
//   return (
//     <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
//       {/* Post Creation Section */}
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
//         <textarea
//           className="w-full p-3 text-lg text-gray-800 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Ask anything (even anonymously)..."
//         />
        
//         <div className="mt-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <label 
//               htmlFor="file-upload" 
//               className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
//             >
//               <i className="fas fa-camera mr-2"></i>
//               <span className="text-sm">Upload Image</span>
//               <input
//                 type="file"
//                 id="file-upload"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="anonymous"
//                 checked={isAnonymous}
//                 onChange={(e) => setIsAnonymous(e.target.checked)}
//                 className="hidden"
//               />
//               <label
//                 htmlFor="anonymous"
//                 className="flex items-center cursor-pointer text-gray-700 hover:text-blue-900"
//               >
//                 <span 
//                   className={`w-5 h-5 mr-2 border rounded ${
//                     isAnonymous ? 'bg-blue-900 border-blue-900' : 'border-gray-300'
//                   }`}
//                 >
//                   {isAnonymous && <i className="fas fa-check text-white text-xs"></i>}
//                 </span>
//                 Anonymous Post
//               </label>
//             </div>
//           </div>

//           <button
//             onClick={addPost}
//             className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
//           >
//             Post
//           </button>
//         </div>

//         {image && (
//           <div className="mt-4 relative">
//             <img
//               src={image}
//               alt="Uploaded"
//               className="max-w-full h-auto rounded-md shadow-sm"
//             />
//             <button 
//               onClick={() => setImage(null)}
//               className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//             >
//               <FaTimes />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Posts Section */}
//       <div className="space-y-4">
//         {posts.length === 0 ? (
//           <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow-md">
//             No posts available. Be the first to post!
//           </div>
//         ) : (
//           posts.map((post) => (
//             <div 
//               key={post.id} 
//               className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//             >
//               {/* Post Header */}
//               <div className="flex items-center mb-4">
//                 <img
//                   src={
//                     post.isAnonymous
//                       ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
//                       : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
//                   }
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full mr-3 object-cover"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">
//                     {post.isAnonymous ? "Anonymous" : post.user || "User"}
//                   </h4>
//                   <p className="text-xs text-gray-500">
//                     {new Date(post.updated_at).toLocaleDateString()}
//                   </p>
//                 </div>
                
//                 {/* Edit Button */}
//                 {post.is_edit && editingPostId !== post.id && (
//                   <button
//                     onClick={() => editPost(post.id, post.content)}
//                     className="ml-auto text-blue-600 hover:text-blue-800 transition-colors flex items-center"
//                   >
//                     <FaEdit className="mr-2" /> Edit
//                   </button>
//                 )}
//               </div>

//               {/* Post Content */}
//               {editingPostId === post.id ? (
//                 <div className="mb-4">
//                   <textarea
//                     className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
//                     value={editedContent}
//                     onChange={(e) => setEditedContent(e.target.value)}
//                   />
//                   <div className="flex justify-end space-x-2 mt-2">
//                     <button
//                       onClick={() => setEditingPostId(null)}
//                       className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={() => saveEditedPost(post.id)}
//                       className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
//               )}

//               {/* Post Image */}
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="w-full rounded-md mb-4 object-cover max-h-96"
//                 />
//               )}

//               {/* Post Actions */}
//               <div className="flex items-center space-x-4 border-t pt-4">
//                 <button
//                   className={`flex items-center ${
//                     post.liked 
//                       ? "text-pink-600 hover:text-pink-700" 
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                   onClick={() => toggleLike(post.id)}
//                 >
//                   <i className="fas fa-heart mr-2"></i>
//                   <span>{post.likes} Likes</span>
//                 </button>

//                 <button
//                   className="text-gray-500 hover:text-blue-600 flex items-center"
//                   onClick={() => 
//                     setActiveCommentPostId(
//                       activeCommentPostId === post.id ? null : post.id
//                     )
//                   }
//                 >
//                   <i className="fas fa-comment mr-2"></i>
//                   Comment
//                 </button>

//                 <button
//                   className="text-gray-500 hover:text-green-600 flex items-center"
//                   onClick={() => sharePost(post.id)}
//                 >
//                   <i className="fas fa-share mr-2"></i>
//                   Share
//                 </button>
//               </div>

//               {/* Comments Section */}
//               {activeCommentPostId === post.id && (
//                 <div className="mt-6">
//                   <div className="bg-gray-100 rounded-lg p-4 mb-4">
//                     <textarea
//                       className="w-full p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
//                       value={commentContent}
//                       onChange={(e) => setCommentContent(e.target.value)}
//                       placeholder="Join the conversation..."
//                     />
//                     <div className="flex justify-between items-center mt-4">
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`comment-anonymous-${post.id}`}
//                           checked={isCommentAnonymous}
//                           onChange={(e) => setIsCommentAnonymous(e.target.checked)}
//                           className="hidden"
//                         />
//                         <label
//                           htmlFor={`comment-anonymous-${post.id}`}
//                           className="flex items-center cursor-pointer text-gray-700"
//                         >
//                           <span 
//                             className={`w-5 h-5 mr-2 border rounded ${
//                               isCommentAnonymous ? 'bg-blue-900 border-blue-900' : 'border-gray-300'
//                             }`}
//                           >
//                             {isCommentAnonymous && <i className="fas fa-check text-white text-xs"></i>}
//                           </span>
//                           Comment Anonymously
//                         </label>
//                       </div>
//                       <button
//                         onClick={() => addComment(post.id)}
//                         className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
//                       >
//                         Post Comment
//                       </button>
//                     </div>
//                   </div>

//                   {/* Comment List */}
//                   {post.comments && post.comments.length > 0 && (
//                     <div className="space-y-3">
//                       {(post.showAllComments 
//                         ? post.comments 
//                         : post.comments.slice(0, 2)).map((comment, index) => (
//                           <div 
//                             key={index} 
//                             className="bg-gray-100 p-3 rounded-lg flex items-start"
//                           >
//                             <img
//                               src={
//                                 comment.isAnonymous
//                                   ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
//                                   : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
//                               }
//                               alt="Profile"
//                               className="w-8 h-8 rounded-full mr-3 mt-1 object-cover"
//                             />
//                             <div>
//                               <p className="font-semibold text-sm text-gray-800">
//                                 {comment.isAnonymous ? "Anonymous" : "User"}
//                               </p>
//                               <p className="text-gray-700 text-sm">{comment.content}</p>
//                             </div>
//                           </div>
//                         ))}
                      
//                       {post.comments.length > 2 && (
//                         <button
//                           onClick={() => toggleShowComments(post.id)}
//                           className="text-blue-600 hover:text-blue-800 text-sm"
//                         >
//                           {post.showAllComments 
//                             ? "Show Less" 
//                             : `View All ${post.comments.length} Comments`}
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeedSection;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { FaRegCopy, FaEdit, FaTimes } from "react-icons/fa";
import { Constant } from "@/utils/constant/constant";

const FeedSection = ({ 
  loginModal, 
  setLoginModal, 
  token = localStorage.getItem(Constant.USER_TOKEN) 
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

  // ... [keep all previous methods like handleImageUpload, toggleLike, addPost, etc.]

  const editComment = (commentId, content, postId) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
    setEditingCommentPostId(postId);
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
            content: editedCommentContent 
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
          setPosts(posts.map(post => {
            if (post.id === editingCommentPostId) {
              return {
                ...post,
                feed_comments: post.feed_comments.map(comment => 
                  comment.id === editingCommentId 
                    ? { ...comment, content: editedCommentContent } 
                    : comment
                )
              };
            }
            return post;
          }));

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
        formData.append('content', content);
        // formData.append('isAnonymous', isAnonymous);
        if (image) {
          const imageBlob = await fetch(image).then(r => r.blob());
          formData.append('image_upload', imageBlob, 'uploaded-image.jpg');
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/feed/pro/feeds",{
            headers:{
                Authorization:token
            }
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
            isAnonymous: isCommentAnonymous
          };
          
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
                    isAnonymous ? 'bg-blue-900 border-blue-900' : 'border-gray-300'
                  }`}
                >
                  {isAnonymous && <i className="fas fa-check text-white text-xs"></i>}
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
              <div className="flex items-center mb-4">
                {console.log(`https://api.sentryspot.co.uk${post.user_photo}`,"user photo")}
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
                  <h4 className="font-semibold text-gray-800">
                    { post.user_first_name}{" "}{post.user_last_name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Edit Button */}
                {post.is_edit && editingPostId !== post.id && (
                  <button
                    onClick={() => editPost(post.id, post.content)}
                    className="ml-auto text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                )}
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
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
              )}

              {/* Post Image */}
              {post.user_image && (
                <img
                  src={post.user_image}
                  alt="Post"
                  className="w-full rounded-md mb-4 object-cover max-h-96 "
                />
              )}

              {/* Post Actions */}
              <div className="flex items-center space-x-4 border-t pt-4">
                <button
                  className={`flex items-center ${
                    post.liked 
                      ? "text-pink-600 hover:text-pink-700" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => toggleLike(post.id)}
                >
                  <i className="fas fa-heart mr-2"></i>
                  <span>{post.likes} Likes</span>
                </button>

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
                          onChange={(e) => setIsCommentAnonymous(e.target.checked)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`comment-anonymous-${post.id}`}
                          className="flex items-center cursor-pointer text-gray-700"
                        >
                          <span 
                            className={`w-5 h-5 mr-2 border rounded ${
                              isCommentAnonymous ? 'bg-blue-900 border-blue-900' : 'border-gray-300'
                            }`}
                          >
                            {isCommentAnonymous && <i className="fas fa-check text-white text-xs"></i>}
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
                <div key={index} className="bg-white p-3 rounded-lg flex items-start ">
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
                        onChange={(e) => setEditedCommentContent(e.target.value)}
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
                        {comment.isAnonymous ? "Anonymous" : "User"}
                      </p>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                     </div>
                      {/* Edit Button for Comments */}
                      {comment.is_edit && (
                        <button
                          onClick={() => editComment(comment.id, comment.content, post.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
                        >
                          <FaEdit className="mr-2" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
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
// import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
// import { FaRegCopy, FaEdit, FaTimes } from "react-icons/fa";
// import { Constant } from "@/utils/constant/constant";

// const FeedSection = ({ 
//   loginModal, 
//   setLoginModal, 
//   token = localStorage.getItem(Constant.USER_TOKEN) 
// }) => {
//   const [posts, setPosts] = useState([]);
//   const [content, setContent] = useState("");
//   const [isAnonymous, setIsAnonymous] = useState(false);
//   const [image, setImage] = useState(null);
//   const [activeCommentPostId, setActiveCommentPostId] = useState(null);
//   const [commentContent, setCommentContent] = useState("");
//   const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
//   const [activeSharePostId, setActiveSharePostId] = useState(null);
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [editedContent, setEditedContent] = useState("");
  
//   // New state for comment editing
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editedCommentContent, setEditedCommentContent] = useState("");
//   const [editingCommentPostId, setEditingCommentPostId] = useState(null);

//   // ... [keep all previous methods like handleImageUpload, toggleLike, addPost, etc.]

//   const editComment = (commentId, content, postId) => {
//     setEditingCommentId(commentId);
//     setEditedCommentContent(content);
//     setEditingCommentPostId(postId);
//   };

//   const saveEditedComment = async () => {
//     if (!token) {
//       setLoginModal(true);
//       return;
//     }
    
//     if (editedCommentContent.trim()) {
//       try {
//         const response = await axios.put(
//           `https://api.sentryspot.co.uk/api/feed/feed-comment/${editingCommentId}`,
//           { 
//             feed_id: editingCommentPostId,
//             content: editedCommentContent 
//           },
//           {
//             headers: {
//               Authorization: token,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data && response.data.status === "success") {
//           // Update the comment in the posts state
//           setPosts(posts.map(post => {
//             if (post.id === editingCommentPostId) {
//               return {
//                 ...post,
//                 feed_comments: post.feed_comments.map(comment => 
//                   comment.id === editingCommentId 
//                     ? { ...comment, content: editedCommentContent } 
//                     : comment
//                 )
//               };
//             }
//             return post;
//           }));

//           // Reset editing states
//           setEditingCommentId(null);
//           setEditedCommentContent("");
//           setEditingCommentPostId(null);
//         } else {
//           console.error("Error editing comment:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error editing comment:", error);
//       }
//     }
//   };

//   const cancelCommentEdit = () => {
//     setEditingCommentId(null);
//     setEditedCommentContent("");
//     setEditingCommentPostId(null);
//   };

//   // Update the comments rendering section with edit functionality
//   {posts.map((post) => (
//     <div 
//       key={post.id} 
//       className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//     >
//       {/* ... previous post rendering code ... */}

//       {activeCommentPostId === post.id && (
//         <div className="mt-6">
//           {/* ... previous comment input section ... */}

//           {/* Comment List */}
//           {post.feed_comments && post.feed_comments.length > 0 && (
//             <div className="space-y-3">
//               {post.feed_comments.map((comment, index) => (
//                 <div key={index} className="bg-gray-100 p-3 rounded-lg flex items-start">
//                   <img
//                     src={
//                       comment.isAnonymous
//                         ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
//                         : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
//                     }
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full mr-3 mt-1 object-cover"
//                   />
//                   {editingCommentId === comment.id ? (
//                     <div className="flex-grow">
//                       <textarea
//                         className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
//                         value={editedCommentContent}
//                         onChange={(e) => setEditedCommentContent(e.target.value)}
//                       />
//                       <div className="flex justify-end space-x-2 mt-2">
//                         <button
//                           onClick={cancelCommentEdit}
//                           className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={saveEditedComment}
//                           className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
//                         >
//                           Save
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex-grow">
//                       <p className="font-semibold text-sm text-gray-800">
//                         {comment.isAnonymous ? "Anonymous" : "User"}
//                       </p>
//                       <p className="text-gray-700 text-sm">{comment.content}</p>
//                       {/* Edit Button for Comments */}
//                       {comment.is_edit && (
//                         <button
//                           onClick={() => editComment(comment.id, comment.content, post.id)}
//                           className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
//                         >
//                           <FaEdit className="mr-2" /> Edit
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   ))}

//   return (
//     // ... rest of the component remains the same
//   );
// };

// export default FeedSection;