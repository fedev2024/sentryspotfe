// // components/Post.jsx
// import React from 'react';
// import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
// import LikeButton from './LikeButton';
// import CommentList from './CommentList';

// const Post = ({ post, toggleDropdown, openDropdownId, editPost, confirmDeletePost, saveEditedPost, editingPostId, editedContent, setEditedContent }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex">
//           <img src={post.user_photo ? `https://api.sentryspot.co.uk/${post.user_photo}` : "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"} alt="Profile" className="w-10 h-10 rounded-full mr-3 object-cover " />
//           <div>
//             <div className="flex flex-col ">
//               <p className="font-semibold text-gray-800">{post.user_first_name} {post.user_last_name}</p>
//               <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>
//         <div className="relative">
//           <button onClick={() => toggleDropdown(post.id)} className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
//             <FaEllipsisV />
//           </button>
//           {openDropdownId === post.id && (
//             <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
//               {post.is_edit && editingPostId !== post.id && (
//                 <button onClick={() => { editPost(post.id, post.content); }} className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100">
//                   <FaEdit className="mr-2" /> Edit
//                 </button>
//               )}
//               <button onClick={() => confirmDeletePost(post.id)} className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100">
//                 <FaTrash className="mr-2" /> Delete Post
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       {editingPostId === post.id ? (
//         <div className="mb-4">
//           <textarea className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
//           <div className="flex justify-end space-x-2 mt-2">
//             <button onClick={() => setEditingPostId(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
//             <button onClick={() => saveEditedPost(post.id)} className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">Save</button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
//       )}
//       {post.feed_image && <img src={`https://api.sentryspot.co.uk${post.feed_image}`} alt="Post" className="w-full rounded-md mb-4 object-cover max-h-96 " />}
//       <div className="flex items-center justify-between p-2">
//         <LikeButton post={post} />
//         <button className="text-gray-500 hover:text-blue-600 flex items-center" onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}>
//           <i className="fas fa-comment mr-2"></i> Comment
//         </button>
//       </div>
//       <CommentList post={post} />
//     </div>
//   );
// };

// export default Post;

// components/Post.jsx
import React from 'react';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import LikeButton from './LikeButton';
import CommentList from './CommentList';

const Post = ({ post, toggleDropdown, openDropdownId, editPost, confirmDeletePost, saveEditedPost, editingPostId, editedContent, setEditedContent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <img src={post.user_photo ? `https://api.sentryspot.co.uk/${post.user_photo}` : "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"} alt="Profile" className="w-10 h-10 rounded-full mr-3 object-cover " />
          <div>
            <div className="flex flex-col ">
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
              {post.is_edit && editingPostId !== post.id && (
                <button onClick={() => { editPost(post.id, post.content); }} className="flex items-center px-4 py-2 w-full text-left text-blue-600 hover:bg-blue-100">
                  <FaEdit className="mr-2" /> Edit
                </button>
              )}
              <button onClick={() => confirmDeletePost(post.id)} className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100">
                <FaTrash className="mr-2" /> Delete Post
              </button>
            </div>
          )}
        </div>
      </div>
      {editingPostId === post.id ? (
        <div className="mb-4">
          <textarea className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <div className="flex justify-end space-x-2 mt-2">
            <button onClick={() => setEditingPostId(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
            <button onClick={() => saveEditedPost(post.id)} className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">Save</button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
      )}
      {post.feed_image && <img src={`https://api.sentryspot.co.uk${post.feed_image}`} alt="Post" className="w-full rounded-md mb-4 object-cover max-h-96 " />}
      <div className="flex items-center justify-between p-2">
        <LikeButton post={post} />
        <button className="text-gray-500 hover:text-blue-600 flex items-center" onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}>
          <i className="fas fa-comment mr-2"></i> Comment
        </button>
      </div>
      <CommentList post={post} />
    </div>
  );
};

export default Post;