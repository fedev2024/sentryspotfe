// LinkedInShareButton.jsx
import React from 'react';
import axios from 'axios';

const LinkedInShareButton = ({ post }) => {
  const shareOnLinkedIn = async () => {
    const url = `https://sentryspotfe.vercel.app/${post.id}`; // Your post URL
    const title = post.content; // Title of the post
    const imageUrl = post.feed_image ? `https://api.sentryspot.co.uk${post.feed_image}` : null; // Image URL

    // Replace with your access token obtained through LinkedIn OAuth
    const accessToken = 'AQUuFBMFkUMR468lvI6-tCtazO5ueF1CYIPLSKjiEVZxFjSvo7wZjjW7fVPd7ij64CoPpDmkcgLo4AJV75j0EVNml1J4W8XmGJHrBTxcXVpIaU8j-Bq3OGTOUAo9spZx-fS9O9ULrB0my_GTPmkovSSjeqNhh9mwB3b4W8z5NBZsaAi-ICV0ulWBNQWqoanRSmFov550vSzpMNhKyYsDbiZ42rJa23GWKDY9RyIHlOt9q22Fbii5HkyHiiTODhGpF8VIdrvzbVvv4dpzKgLhHa8HcFMqiX3aXlZKd7MoHF3VgXza1jZfCj-Xav_5U5KLvoewnV8VQrLiqaFtOnpHTqno0of5rw';

    const shareData = {
      content: {
        title: title,
        description: 'Check out this post!',
        submittedUrl: url,
        submittedImageUrl: imageUrl,
      },
      owner: `789f2peeplxoh5`, // Replace with the user's LinkedIn ID
    };

    try {
      const response = await axios.post(
        'https://api.linkedin.com/v2/shares',
        shareData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Post shared successfully on LinkedIn!');
      } else {
        console.error('Error sharing post:', response.data);
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <button
      onClick={shareOnLinkedIn}
      className="text-gray-500 hover:text-green-600 flex items-center"
    >
      <i className="fas fa-share mr-2"></i>
      Share
    </button>
  );
};

export default LinkedInShareButton;