// // // path/to/SinglePost.jsx
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom"; // Import useParams to get the post ID from the URL
// // import { Constant } from "@/utils/constant/constant";

// // const CommunitySinglepage = () => {
// //   const { postId } = useParams(); // Get the post ID from the URL
// //   const [post, setPost] = useState(null);
// //   const token = localStorage.getItem(Constant.USER_TOKEN);

// //   const fetchPost = async () => {
// //     try {
// //       const response = await axios.get(`https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`, {
// //         headers: {
// //           Authorization: token,
// //         },
// //       });
// //       if (response.data && response.data.status === "success") {
// //         setPost(response.data.data); // Set the post data
// //       } else {
// //         console.error("Error fetching post:", response.data.message);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching post:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPost();
// //   }, [postId]);

// //   if (!post) return <div>Loading...</div>; // Show loading state

// //   return (
// //     <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
// //       <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
// //         <h2 className="font-semibold text-lg">{post.content}</h2>
// //         {post.feed_image && (
// //           <img src={`https://api.sentryspot.co.uk${post.feed_image}`} alt="Post" className="w-full rounded-md mb-4 object-cover max-h-96" />
// //         )}
// //         {/* Add more post details here, like comments, likes, etc. */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CommunitySinglepage;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async"; // We'll use react-helmet-async for managing meta tags
// import { Constant } from "@/utils/constant/constant";

// const CommunitySinglepage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(`https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`, {
//         headers: {
//           Authorization: token,
//         },
//       });

//       if (response.data && response.data.status === "success") {
//         setPost(response.data.data);
//       } else {
//         setError(response.data.message || "Failed to fetch post");
//         console.error("Error fetching post:", response.data.message);
//       }
//     } catch (error) {
//       setError("An error occurred while fetching the post");
//       console.error("Error fetching post:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [postId]);

//   // If no post is loaded, show loading or error state
//   if (!post) {
//     return error ? (
//       <div className="text-red-500 text-center py-6">{error}</div>
//     ) : (
//       <div className="text-center py-6">Loading...</div>
//     );
//   }

//   // Construct Open Graph meta tag details
//   const ogTitle = post.content ? post.content.substring(0, 60) : "Community Post";
//   const ogDescription = post.content ? 
//     (post.content.length > 155 ? post.content.substring(0, 152) + '...' : post.content) 
//     : "Check out this post on our community";
//   const ogImage = post.feed_image 
//     ? `https://api.sentryspot.co.uk${post.feed_image}` 
//     : "https://yourwebsite.com/default-og-image.jpg"; // Replace with your default OG image

//   return (
//     <>
//       {/* Helmet component for managing meta tags */}
//       <Helmet>
//         <meta property="og:title" content={ogTitle} />
//         <meta property="og:description" content={ogDescription} />
//         <meta property="og:image" content={ogImage} />
//         <meta property="og:url" content={window.location.href} />
//         <meta property="og:type" content="article" />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Helmet>

//       <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
//           <h2 className="font-semibold text-lg">{post.content}</h2>
//           {post.feed_image && (
//             <img 
//               src={`https://api.sentryspot.co.uk${post.feed_image}`} 
//               alt="Post" 
//               className="w-full rounded-md mb-4 object-cover max-h-96" 
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CommunitySinglepage;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom"; // Import useParams to get the post ID from the URL
// // import { Helmet } from "react-helmet-async"; // For setting meta tags dynamically
// // import { Constant } from "@/utils/constant/constant";

// // const CommunitySinglepage = () => {
// //   const { postId } = useParams(); // Get the post ID from the URL
// //   const [post, setPost] = useState(null);
// //   const token = localStorage.getItem(Constant.USER_TOKEN);

// //   const fetchPost = async () => {
// //     try {
// //       const response = await axios.get(`https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`, {
// //         headers: {
// //           Authorization: token,
// //         },
// //       });
// //       if (response.data && response.data.status === "success") {
// //         setPost(response.data.data); // Set the post data
// //       } else {
// //         console.error("Error fetching post:", response.data.message);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching post:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPost();
// //   }, [postId]);

// //   if (!post) return <div>Loading...</div>; // Show loading state

// //   const { user_first_name, user_last_name, user_photo, content, created_at, feed_image, feed_comments } = post;

// //   return (
// //     <>
// //       {/* Dynamically set meta tags */}
// //       <Helmet>
// //         <meta property="og:title" content={content || "Post"} />
// //         <meta property="og:description" content={`${user_first_name} ${user_last_name}'s post`} />
// //         <meta property="og:image" content={`https://api.sentryspot.co.uk${feed_image || user_photo}`} />
// //         <meta property="og:url" content={`https://yourwebsite.com/post/${postId}`} />
// //         <meta property="og:type" content="article" />
// //       </Helmet>

// //       <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
// //         <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
// //           <div className="flex items-center mb-4">
// //             <img
// //               src={`https://api.sentryspot.co.uk${user_photo}`}
// //               alt={`${user_first_name} ${user_last_name}`}
// //               className="w-12 h-12 rounded-full mr-4"
// //             />
// //             <div>
// //               <h3 className="text-lg font-semibold">{`${user_first_name} ${user_last_name}`}</h3>
// //               <p className="text-sm text-gray-500">{new Date(created_at).toLocaleString()}</p>
// //             </div>
// //           </div>
// //           <h2 className="font-semibold text-lg mb-4">{content}</h2>
// //           {feed_image && (
// //             <img
// //               src={`https://api.sentryspot.co.uk${feed_image}`}
// //               alt="Post"
// //               className="w-full rounded-md mb-4 object-cover max-h-96"
// //             />
// //           )}
// //           {feed_comments?.length > 0 && (
// //             <div className="mt-6">
// //               <h3 className="font-semibold text-lg mb-2">Comments</h3>
// //               {feed_comments.map((comment) => (
// //                 <div key={comment.id} className="bg-gray-100 p-3 rounded-lg mb-2">
// //                   <p className="text-sm">{comment.content}</p>
// //                   <p className="text-xs text-gray-500">
// //                     {new Date(comment.created_at).toLocaleString()} {comment.is_edit && "(edited)"}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default CommunitySinglepage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Constant } from "@/utils/constant/constant";

const CommunitySinglepage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data && response.data.status === "success") {
        setPost(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch post");
        console.error("Error fetching post:", response.data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching the post");
      console.error("Error fetching post:", error);
    }
  };

  // Dynamic Meta Tag Management
  useEffect(() => {
    if (post) {
      // Truncate content for meta tags
      const ogTitle = post.content ? post.content.substring(0, 60) : "Community Post";
      const ogDescription = post.content 
        ? (post.content.length > 155 ? post.content.substring(0, 152) + '...' : post.content)
        : "Check out this post on our community";
      const ogImage = post.feed_image 
        ? `https://api.sentryspot.co.uk${post.feed_image}` 
        : "https://yourwebsite.com/default-og-image.jpg";

      // Update document meta tags
      document.title = ogTitle;
      
      // Remove existing meta tags first
      const metaTags = [
        'og:title', 'og:description', 'og:image', 'og:url', 
        'og:type', 'twitter:card'
      ];
      
      metaTags.forEach(name => {
        const existingTag = document.querySelector(`meta[property="${name}"]`);
        if (existingTag) existingTag.remove();
      });

      // Create and append new meta tags
      const metaTagsToAdd = [
        { property: 'og:title', content: ogTitle },
        { property: 'og:description', content: ogDescription },
        { property: 'og:image', content: ogImage },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ];

      metaTagsToAdd.forEach(tag => {
        const metaTag = document.createElement('meta');
        if (tag.property) {
          metaTag.setAttribute('property', tag.property);
        }
        if (tag.name) {
          metaTag.setAttribute('name', tag.name);
        }
        metaTag.setAttribute('content', tag.content);
        document.head.appendChild(metaTag);
      });
    }
  }, [post]);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // If no post is loaded, show loading or error state
  if (!post) {
    return error ? (
      <div className="text-red-500 text-center py-6">{error}</div>
    ) : (
      <div className="text-center py-6">Loading...</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
        <h2 className="font-semibold text-lg">{post.content}</h2>
        {post.feed_image && (
          <img 
            src={`https://api.sentryspot.co.uk${post.feed_image}`} 
            alt="Post" 
            className="w-full rounded-md mb-4 object-cover max-h-96" 
          />
        )}
      </div>
    </div>
  );
};

export default CommunitySinglepage;