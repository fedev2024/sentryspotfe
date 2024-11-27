
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import { Constant } from "@/utils/constant/constant";

// // const CommunitySinglepage = () => {
// //   const { postId } = useParams();
// //   const [post, setPost] = useState(null);
// //   const [error, setError] = useState(null);
// //   const token = localStorage.getItem(Constant.USER_TOKEN);

// //   const fetchPost = async () => {
// //     try {
// //       const response = await axios.get(`https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`, {
// //         headers: {
// //           Authorization: token,
// //         },
// //       });

// //       if (response.data && response.data.status === "success") {
// //         setPost(response.data.data);
// //       } else {
// //         setError(response.data.message || "Failed to fetch post");
// //         console.error("Error fetching post:", response.data.message);
// //       }
// //     } catch (error) {
// //       setError("An error occurred while fetching the post");
// //       console.error("Error fetching post:", error);
// //     }
// //   };

// //   // Dynamic Meta Tag Management
// //   useEffect(() => {
// //     if (post) {
// //       // Truncate content for meta tags
// //       const ogTitle = post.content ? post.content.substring(0, 60) : "Community Post";
// //       const ogDescription = post.content 
// //         ? (post.content.length > 155 ? post.content.substring(0, 152) + '...' : post.content)
// //         : "Check out this post on our community";
// //       const ogImage = post.feed_image 
// //         ? `https://api.sentryspot.co.uk${post.feed_image}` 
// //         : "https://yourwebsite.com/default-og-image.jpg";

// //       // Update document meta tags
// //       document.title = ogTitle;
      
// //       // Remove existing meta tags first
// //       const metaTags = [
// //         'og:title', 'og:description', 'og:image', 'og:url', 
// //         'og:type', 'twitter:card'
// //       ];
      
// //       metaTags.forEach(name => {
// //         const existingTag = document.querySelector(`meta[property="${name}"]`);
// //         if (existingTag) existingTag.remove();
// //       });

// //       // Create and append new meta tags
// //       const metaTagsToAdd = [
// //         { property: 'og:title', content: ogTitle },
// //         { property: 'og:description', content: ogDescription },
// //         { property: 'og:image', content: ogImage },
// //         { property: 'og:url', content: window.location.href },
// //         { property: 'og:type', content: 'article' },
// //         { name: 'twitter:card', content: 'summary_large_image' }
// //       ];

// //       metaTagsToAdd.forEach(tag => {
// //         const metaTag = document.createElement('meta');
// //         if (tag.property) {
// //           metaTag.setAttribute('property', tag.property);
// //         }
// //         if (tag.name) {
// //           metaTag.setAttribute('name', tag.name);
// //         }
// //         metaTag.setAttribute('content', tag.content);
// //         document.head.appendChild(metaTag);
// //       });
// //     }
// //   }, [post]);

// //   useEffect(() => {
// //     fetchPost();
// //   }, [postId]);

// //   // If no post is loaded, show loading or error state
// //   if (!post) {
// //     return error ? (
// //       <div className="text-red-500 text-center py-6">{error}</div>
// //     ) : (
// //       <div className="text-center py-6">Loading...</div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-xl mx-auto px-4 py-6 bg-gray-50">
// //       <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
// //         <h2 className="font-semibold text-lg">{post.content}</h2>
// //         {post.feed_image && (
// //           <img 
// //             src={`https://api.sentryspot.co.uk${post.feed_image}`} 
// //             alt="Post" 
// //             className="w-full rounded-md mb-4 object-cover max-h-96" 
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CommunitySinglepage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Helmet } from 'react-helmet-async'; // Recommended for meta tag management
// import { Constant } from "@/utils/constant/constant";

// const CommunitySinglepage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

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

//   // Prepare meta tag content
//   const prepareMetaContent = () => {
//     if (!post) return {
//       title: "Community Post",
//       description: "Check out this post on our community",
//       image: "https://yourwebsite.com/default-og-image.jpg"
//     };

//     return {
//       title: post.content ? post.content.substring(0, 60) : "Community Post",
//       description: post.content 
//         ? (post.content.length > 155 
//           ? post.content.substring(0, 152) + '...' 
//           : post.content)
//         : "Check out this post on our community",
//       image: post.feed_image
//         ? `https://api.sentryspot.co.uk${post.feed_image}`
//         : "https://yourwebsite.com/default-og-image.jpg"
//     };
//   };

//   // If no post is loaded, show loading or error state
//   if (!post) {
//     return error ? (
//       <>
//         {/* Meta tags for error state */}
//         <Helmet>
//           <title>Error Loading Post</title>
//           <meta name="description" content="Unable to load the requested post" />
//         </Helmet>
//         <div className="text-red-500 text-center py-6">{error}</div>
//       </>
//     ) : (
//       <>
//         {/* Meta tags for loading state */}
//         <Helmet>
//           <title>Loading Post</title>
//         </Helmet>
//         <div className="text-center py-6">Loading...</div>
//       </>
//     );
//   }

//   // Prepare meta content
//   const metaContent = prepareMetaContent();

//   return (
//     <>
//       {/* Dynamic Meta Tags */}
//       <Helmet>
//         <title>{metaContent.title}</title>
        
//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={metaContent.title} />
//         <meta property="og:description" content={metaContent.description} />
//         <meta property="og:image" content={metaContent.image} />
//         <meta property="og:url" content={window.location.href} />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={metaContent.title} />
//         <meta name="twitter:description" content={metaContent.description} />
//         <meta name="twitter:image" content={metaContent.image} />
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Helmet } from 'react-helmet-async';
// import { Constant } from "@/utils/constant/constant";

// const CommunitySinglepage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

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

//   // Prepare meta tag content
//   const prepareMetaContent = () => {
//     if (!post) return {
//       title: "Community Post",
//       description: "Check out this post on our community",
//       image: "https://yourwebsite.com/default-og-image.jpg"
//     };

//     return {
//       title: post.content ? post.content.substring(0, 60) : "Community Post",
//       description: post.content 
//         ? (post.content.length > 155 
//           ? post.content.substring(0, 152) + '...' 
//           : post.content)
//         : "Check out this post on our community",
//       image: post.feed_image
//         ? `https://api.sentryspot.co.uk${post.feed_image}`
//         : "https://yourwebsite.com/default-og-image.jpg"
//     };
//   };

//   // If no post is loaded, show loading or error state
//   if (!post) {
//     return error ? (
//       <>
//         <Helmet>
//           <title>Error Loading Post</title>
//           <meta name="description" content="Unable to load the requested post" />
//         </Helmet>
//         <div className="text-red-500 text-center py-6">{error}</div>
//       </>
//     ) : (
//       <>
//         <Helmet>
//           <title>Loading Post</title>
//         </Helmet>
//         <div className="text-center py-6">Loading...</div>
//       </>
//     );
//   }

//   // Prepare meta content
//   const metaContent = prepareMetaContent();

//   return (
//     <>
//       <Helmet>
//         <title>{metaContent.title}</title>
        
//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={metaContent.content} />
//         <meta property="og:description" content={metaContent.description} />
//         <meta property="og:image" content={metaContent.image} />
//         <meta property="og:url" content={window.location.href} />

//         {/* Twitter Card */}
//         {/* <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={metaContent.title} />
//         <meta name="twitter:description" content={metaContent.description} />
//         <meta name="twitter:image" content={metaContent.image} /> */}
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Constant } from "@/utils/constant/constant";

const CommunitySinglepage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/feed/pro/feed/${postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

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

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // Prepare meta tag content
  const prepareMetaContent = () => {
    if (!post) return {
      title: "Community Post",
      description: "Check out this post on our community",
      image: "https://yourwebsite.com/default-og-image.jpg"
    };

    return {
      title: post.content ? post.content.substring(0, 60) : "Community Post",
      description: post.content
        ? post.content.length > 155
          ? post.content.substring(0, 152) + '...'
          : post.content
        : "Check out this post on our community",
      image: post.feed_image
        ? `https://api.sentryspot.co.uk${post.feed_image}`
        : "https://yourwebsite.com/default-og-image.jpg"
    };
  };

  // If no post is loaded, show loading or error state
  if (!post) {
    return error ? (
      <>
        <Helmet>
          <title>Error Loading Post</title>
          <meta name="description" content="Unable to load the requested post" />
        </Helmet>
        <div className="text-red-500 text-center py-6">{error}</div>
      </>
    ) : (
      <>
        <Helmet>
          <title>Loading Post</title>
        </Helmet>
        <div className="text-center py-6">Loading...</div>
      </>
    );
  }

  // Prepare meta content
  const metaContent = prepareMetaContent();

  return (
    <>
      <Helmet>
        <title>{metaContent.title}</title>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaContent.title} />
        <meta property="og:description" content={metaContent.description} />
        <meta property="og:image" content={metaContent.image} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaContent.title} />
        <meta name="twitter:description" content={metaContent.description} />
        <meta name="twitter:image" content={metaContent.image} />
      </Helmet>

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
    </>
  );
};

export default CommunitySinglepage;
