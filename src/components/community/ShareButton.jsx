// // LinkedInShareButton.jsx
// import React from 'react';
// import axios from 'axios';

// const LinkedInShareButton = ({ post }) => {
//   const shareOnLinkedIn = async () => {
//     const url = `https://sentryspotfe.vercel.app/${post.id}`; // Your post URL
//     const title = post.content; // Title of the post
//     const imageUrl = post.feed_image ? `https://api.sentryspot.co.uk${post.feed_image}` : null; // Image URL

//     // Replace with your access token obtained through LinkedIn OAuth
//     const accessToken = 'AQUuFBMFkUMR468lvI6-tCtazO5ueF1CYIPLSKjiEVZxFjSvo7wZjjW7fVPd7ij64CoPpDmkcgLo4AJV75j0EVNml1J4W8XmGJHrBTxcXVpIaU8j-Bq3OGTOUAo9spZx-fS9O9ULrB0my_GTPmkovSSjeqNhh9mwB3b4W8z5NBZsaAi-ICV0ulWBNQWqoanRSmFov550vSzpMNhKyYsDbiZ42rJa23GWKDY9RyIHlOt9q22Fbii5HkyHiiTODhGpF8VIdrvzbVvv4dpzKgLhHa8HcFMqiX3aXlZKd7MoHF3VgXza1jZfCj-Xav_5U5KLvoewnV8VQrLiqaFtOnpHTqno0of5rw';

//     const shareData = {
//       content: {
//         title: title,
//         description: 'Check out this post!',
//         submittedUrl: url,
//         submittedImageUrl: imageUrl,
//       },
//       owner: `789f2peeplxoh5`, // Replace with the user's LinkedIn ID
//     };

//     try {
//       const response = await axios.post(
//         'https://api.linkedin.com/v2/shares',
//         shareData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert('Post shared successfully on LinkedIn!');
//       } else {
//         console.error('Error sharing post:', response.data);
//       }
//     } catch (error) {
//       console.error('Error sharing post:', error);
//     }
//   };

//   return (
//     <button
//       onClick={shareOnLinkedIn}
//       className="text-gray-500 hover:text-green-600 flex items-center"
//     >
//       <i className="fas fa-share mr-2"></i>
//       Share
//     </button>
//   );
// };

// export default LinkedInShareButton;

// LinkedInShareButton.jsx
// import React from 'react';

// const LinkedInShareButton = ({ post }) => {
//   const shareOnLinkedIn = () => {
//     const url = `https://sentryspotfe.vercel.app/${post.id}`; // Replace with your post URL
//     const title = post.content; // Title of the post
//     // const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
//     const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${title}&source=${title}`;

//     window.open(linkedInUrl, '_blank');
//   };

//   return (
//     <button
//       onClick={shareOnLinkedIn}
//       className="text-gray-500 hover:text-green-600 flex items-center"
//     >
//       <i className="fas fa-share mr-2"></i>
//       Share
//     </button>
//   );
// };

// export default LinkedInShareButton;

import React, { useState } from 'react';

const LinkedInShareButton = ({ post }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateShareUrl = () => {
    const url = `https://sentryspotfe.vercel.app/community/${post.id}`;
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.content)}&summary=${encodeURIComponent(post.content)}&source=${encodeURIComponent(post.content)}`;
    return url;
  };

  const handleShare = () => {
    setShowPopup(true);
    setCopied(false);
  };

  const handleCopy = () => {
    const url = generateShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="text-gray-500 hover:text-green-600 flex items-center"
      >
        <i className="fas fa-share mr-2"></i>
        Share
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Share Post</h2>
            <div className="flex items-center mb-4">
              <input
                type="text"
                readOnly
                value={generateShareUrl()}
                className="flex-grow p-2 border rounded-l-md bg-gray-100"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="flex justify-end space-x-2">
              {/* <button
                onClick={() => {
                  const url = generateShareUrl();
                  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Share on LinkedIn
              </button> */}
              <button
                onClick={handleClosePopup}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LinkedInShareButton;