import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';

const ImageUpload = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  return (
   <div className='form-group col-lg-6 col-md-12 flex justify-center'>
     <div className="flex flex-col items-center w-full max-w-sm p-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer w-full h-full flex items-center justify-center"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-10 h-10 text-gray-400" />
            )}
          </label>
        </div>
        
        {previewImage && (
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      <label
        htmlFor="imageUpload"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
      >
        Add Picture
      </label>
    </div>
   </div>
  );
};

export default ImageUpload;