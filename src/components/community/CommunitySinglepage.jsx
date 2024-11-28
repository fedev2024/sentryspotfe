
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async"; // import Helmet
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
//         ? post.content.length > 155
//           ? post.content.substring(0, 152) + '...'
//           : post.content
//         : "Check out this post on our community",
//       image: post.feed_image
//         ? `https://api.sentryspot.co.uk${post.feed_image}`
//         : "https://play-lh.googleusercontent.com/9cStI0kHWmjALUEVwZwkuPhkwtuesVwSgQeHUA4YEqGRzF31yXYjjdpAQkW5DGqp2dE"
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
//   console.log("Meta Content:", metaContent);
//   console.log("Meta Content:", metaContent.image);

//   return (
//     <>
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

//         {/* Additional Meta Tags */}
//         <meta name="keywords" content="candidates, career, employment, indeed, job board, job listing, job portal, job postings, job search, job seeker, jobs, recruiters, recruiting, recruitment, resume" />
//         <meta name="description" content={metaContent.description} />
//         <meta name="sentryspot" content="ATFN" />
//         <meta property="title" content={metaContent.title} />
//         <meta property="image" content={metaContent.image} />
//         <meta property="og:image:type" content="image/jpeg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />

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
import { Helmet } from "react-helmet-async"; // import Helmet
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
        : "https://play-lh.googleusercontent.com/9cStI0kHWmjALUEVwZwkuPhkwtuesVwSgQeHUA4YEqGRzF31yXYjjdpAQkW5DGqp2dE"
    };
  };

  // Prepare meta content
  const metaContent = prepareMetaContent();
  console.log("Meta Content:", metaContent); // Log here to see the content every render

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

        {/* Additional Meta Tags */}
        <meta name="keywords" content="candidates, career, employment, indeed, job board, job listing, job portal, job postings, job search, job seeker, jobs, recruiters, recruiting, recruitment, resume" />
        <meta name="og:description" content={metaContent.description} />
        <meta name="sentryspot" content="ATFN" />
        <meta property="og:title" content={metaContent.title} />
        <meta property="og:image" content={metaContent.image} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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