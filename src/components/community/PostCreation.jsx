import React, { useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const PostCreation = ({ token, setLoginModal, setPosts }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const addPost = async () => {
    if (!token) {
      setLoginModal(true);
      return;
    }
    if (content.trim()) {
      try {
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
          const imageBlob = await fetch(image).then((r) => r.blob());
          formData.append("image_upload", imageBlob, "uploaded-image.jpg");
        }

        const response = await axios.post("https://api.sentryspot.co.uk/api/feed/feed-create", formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && response.data.status === "success") {
          const newPost = response.data.data;
          setPosts((prevPosts) => [newPost, ...prevPosts]);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
      <textarea
        className="w-full p-3 text-lg text-gray-800 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ask anything (even anonymously)..."
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label htmlFor="file-upload" className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors">
            <span className="text-sm">Upload Image</span>
            <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <div className="flex items-center">
            <input type="checkbox" id="anonymous" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="hidden" />
            <label htmlFor="anonymous" className="flex items-center cursor-pointer text-gray-700 hover:text-blue-900">
              <span className={`w-5 h-5 mr-2 border rounded ${isAnonymous ? "bg-blue-900 border-blue-900" : "border-gray-300"}`}>
                {isAnonymous && <i className="fas fa-check text-white text-xs"></i>}
              </span>
              Anonymous Post
            </label>
          </div>
        </div>
        <button onClick={addPost} className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
          Post
        </button>
      </div>
      {image && (
        <div className="mt-4 relative">
          <img src={image} alt="Uploaded" className="max-w-full h-auto rounded-md shadow-sm" />
          <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCreation;