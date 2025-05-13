// // // import React, { useState } from 'react';
// // // import { X, Camera } from 'lucide-react';

// // // const ImageUpload = ({ profileData }) => {
// // //   const [previewImage, setPreviewImage] = useState(
// // //     `https://api.sentryspot.co.uk${profileData.photo}` || null
// // //   );
// // //   console.log(profileData?.photo,previewImage,"profileData?.photo");

// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setPreviewImage(reader.result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const handleRemoveImage = () => {
// // //     setPreviewImage(null);
// // //   };

// // //   return (
// // //     <div className="form-group col-lg-6 col-md-12 flex justify-center">
// // //       <div className="flex flex-col items-center w-full max-w-sm p-4">
// // //         <div className="relative">
// // //           <div className="w-32 h-32 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
// // //             <input
// // //               type="file"
// // //               id="imageUpload"
// // //               className="hidden"
// // //               accept="image/*"
// // //               onChange={handleImageChange}
// // //             />
// // //             <label
// // //               htmlFor="imageUpload"
// // //               className="cursor-pointer w-full h-full flex items-center justify-center"
// // //               aria-label="Upload profile picture"
// // //             >
// // //               {previewImage ? (
// // //                 <img
// // //                   src={previewImage}
// // //                   alt="Profile Preview"
// // //                   className="w-full h-full object-cover"
// // //                 />
// // //               ) : (
// // //                 <Camera className="w-10 h-10 text-gray-400" />
// // //               )}
// // //             </label>
// // //           </div>

// // //           {previewImage && (
// // //             <button
// // //               onClick={handleRemoveImage}
// // //               className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
// // //               aria-label="Remove image"
// // //             >
// // //               <X className="w-4 h-4 text-white" />
// // //             </button>
// // //           )}
// // //         </div>

// // //         <label
// // //           htmlFor="imageUpload"
// // //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
// // //         >
// // //           Add Picture
// // //         </label>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ImageUpload;


// // // import React, { useState, useEffect } from 'react';
// // // import { X, Camera } from 'lucide-react';

// // // const ImageUpload = ({ profileData, setValue, register }) => {
// // //   const [previewImage, setPreviewImage] = useState(
// // //     profileData?.photo ? `https://api.sentryspot.co.uk${profileData.photo}` : null
// // //   );

// // //   useEffect(() => {
// // //     register('photo'); // Register 'photo' field once
// // //     if (profileData?.photo) {
// // //       setValue('photo', profileData.photo); // Set initial value
// // //     }
// // //   }, [register, setValue, profileData]);

// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setPreviewImage(reader.result);
// // //         setValue('photo', reader.result); // Update form value with Base64
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const handleRemoveImage = () => {
// // //     setPreviewImage(null);
// // //     setValue('photo', null); // Clear the photo field
// // //   };

// // //   return (
// // //     <div className="form-group col-lg-6 col-md-12 flex justify-center">
// // //       <div className="flex flex-col items-center w-full max-w-sm p-4">
// // //         <div className="relative">
// // //           <div className="w-32 h-32 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
// // //             <input
// // //               type="file"
// // //               id="imageUpload"
// // //               className="hidden"
// // //               accept="image/*"
// // //               onChange={handleImageChange}
// // //             />
// // //             <label
// // //               htmlFor="imageUpload"
// // //               className="cursor-pointer w-full h-full flex items-center justify-center"
// // //               aria-label="Upload profile picture"
// // //             >
// // //               {previewImage ? (
// // //                 <img
// // //                   src={previewImage}
// // //                   alt="Profile Preview"
// // //                   className="w-full h-full object-cover"
// // //                 />
// // //               ) : (
// // //                 <Camera className="w-10 h-10 text-gray-400" />
// // //               )}
// // //             </label>
// // //           </div>

// // //           {previewImage && (
// // //             <button
// // //               onClick={handleRemoveImage}
// // //               className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
// // //               aria-label="Remove image"
// // //             >
// // //               <X className="w-4 h-4 text-white" />
// // //             </button>
// // //           )}
// // //         </div>

// // //         <label
// // //           htmlFor="imageUpload"
// // //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
// // //         >
// // //           Add Picture
// // //         </label>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ImageUpload;


// // import React, { useState, useEffect } from 'react';
// // import { X, Camera } from 'lucide-react';

// // const ImageUpload = ({ profileData, setValue, register }) => {
// //   const [previewImage, setPreviewImage] = useState(
// //      `https://api.sentryspot.co.uk${profileData.photo}` || null
// //   );

// //   useEffect(() => {
// //     // Register the photo field with react-hook-form
// //     register('photo');
    
// //     // Set initial value if profileData has a photo
// //     if (profileData?.photo) {
// //       setValue('photo', profileData.photo);
// //     }
// //   }, [register, setValue, profileData]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // Validate file type
// //       if (!file.type.startsWith('image/')) {
// //         alert('Please upload an image file');
// //         return;
// //       }
      
// //       // Validate file size (limit to 5MB)
// //       if (file.size > 5 * 1024 * 1024) {
// //         alert('Image size should be less than 5MB');
// //         return;
// //       }

// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setPreviewImage(reader.result);
// //         // Update form value with the file rather than base64
// //         // This way it can be properly sent in FormData
// //         setValue('photo', file);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleRemoveImage = (e) => {
// //     e.preventDefault(); // Prevent any form submission
// //     setPreviewImage(null);
// //     setValue('photo', null); // Clear the photo field
// //   };

// //   return (
// //     <div className="form-group col-lg-6 col-md-12 flex justify-center">
// //       <div className="flex flex-col items-center w-full max-w-sm p-4">
// //         <div className="relative">
// //           <div className="w-32 h-32 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
// //             <input
// //               type="file"
// //               id="imageUpload"
// //               className="hidden"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //             />
// //             <label
// //               htmlFor="imageUpload"
// //               className="cursor-pointer w-full h-full flex items-center justify-center"
// //               aria-label="Upload profile picture"
// //             >
// //               {previewImage ? (
// //                 <img
// //                   src={previewImage}
// //                   alt="Profile Preview"
// //                   className="w-full h-full object-cover"
// //                 />
// //               ) : (
// //                 <Camera className="w-10 h-10 text-gray-400" />
// //               )}
// //             </label>
// //           </div>
          
// //           {previewImage && (
// //             <button
// //               onClick={handleRemoveImage}
// //               type="button" 
// //               className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
// //               aria-label="Remove image"
// //             >
// //               <X className="w-4 h-4 text-white" />
// //             </button>
// //           )}
// //         </div>
        
// //         <label
// //           htmlFor="imageUpload"
// //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
// //         >
// //           Add Picture
// //         </label>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImageUpload;


// // import React, { useState, useEffect } from 'react';
// // import { X, Camera } from 'lucide-react';

// // const ImageUpload = ({ profileData, setValue, register }) => {
// //   const [previewImage, setPreviewImage] = useState(
// //     profileData?.photo ? `https://api.sentryspot.co.uk${profileData.photo}` : null
// //   );

// //   useEffect(() => {
// //     // Register the photo_upload field with react-hook-form
// //     register('photo_upload');
    
// //     // Set initial value if profileData has a photo (get from photo, but will set to photo_upload)
// //     if (profileData?.photo) {
// //       setValue('photo_upload', null); // Start with null as we don't need to re-upload existing photos
// //     }
// //   }, [register, setValue, profileData]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // Validate file type
// //       if (!file.type.startsWith('image/')) {
// //         alert('Please upload an image file');
// //         return;
// //       }
      
// //       // Validate file size (limit to 5MB)
// //       if (file.size > 5 * 1024 * 1024) {
// //         alert('Image size should be less than 5MB');
// //         return;
// //       }

// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setPreviewImage(reader.result);
// //         console.log(file,reader.result);
// //         // Update form value with the file for photo_upload
// //         setValue('photo_upload', file);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleRemoveImage = (e) => {
// //     e.preventDefault(); // Prevent any form submission
// //     setPreviewImage(null);
// //     setValue('photo_upload', null); // Clear the photo_upload field
// //   };

// //   return (
// //     <div className="form-group col-lg-6 col-md-12 flex justify-center">
// //       <div className="flex flex-col items-center w-full max-w-sm p-4">
// //         <div className="relative">
// //           <div className="w-32 h-32 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
// //             <input
// //               type="file"
// //               id="imageUpload"
// //               className="hidden"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //             />
// //             <label
// //               htmlFor="imageUpload"
// //               className="cursor-pointer w-full h-full flex items-center justify-center"
// //               aria-label="Upload profile picture"
// //             >
// //               {previewImage ? (
// //                 <img
// //                   src={previewImage}
// //                   alt="Profile Preview"
// //                   className="w-full h-full object-cover"
// //                 />
// //               ) : (
// //                 <Camera className="w-10 h-10 text-gray-400" />
// //               )}
// //             </label>
// //           </div>
          
// //           {previewImage && (
// //             <button
// //               onClick={handleRemoveImage}
// //               type="button" 
// //               className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
// //               aria-label="Remove image"
// //             >
// //               <X className="w-4 h-4 text-white" />
// //             </button>
// //           )}
// //         </div>
        
// //         <label
// //           htmlFor="imageUpload"
// //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
// //         >
// //           Add Picture
// //         </label>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImageUpload;

// import React, { useState, useEffect } from 'react';
// import { X, Camera } from 'lucide-react';

// const ImageUpload = ({ profileData, setValue, register }) => {
//   const [previewImage, setPreviewImage] = useState(
//     profileData?.photo ? `https://api.sentryspot.co.uk${profileData.photo}` : null
//   );
  
//   useEffect(() => {
//     // Register the photo_upload field with react-hook-form
//     register('photo_upload');
    
//     // Set initial value if profileData has a photo
//     if (profileData?.photo) {
//       setValue('photo_upload', null); // Start with null as we don't need to re-upload existing photos
//     }
//   }, [register, setValue, profileData]);
  
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         alert('Please upload an image file');
//         return;
//       }
      
//       // Validate file size (limit to 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should be less than 5MB');
//         return;
//       }
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
        
//         // Create a FormData object for the file
//         const formData = new FormData();
//         formData.append('photo_upload', file);
        
//         // Update form value with the file directly
//         // This approach correctly handles the File object for API submission
//         setValue('photo_upload', file);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   const handleRemoveImage = (e) => {
//     e.preventDefault(); // Prevent any form submission
//     setPreviewImage(null);
//     setValue('photo_upload', null); // Clear the photo_upload field
//   };
  
//   return (
//     <div className="form-group col-lg-6 col-md-12 flex justify-center">
//       <div className="flex flex-col items-center w-full max-w-sm p-4">
//         <div className="relative">
//           <div className="w-32 h-32 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
//             <input
//               type="file"
//               id="imageUpload"
//               className="hidden"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             <label
//               htmlFor="imageUpload"
//               className="cursor-pointer w-full h-full flex items-center justify-center"
//               aria-label="Upload profile picture"
//             >
//               {previewImage ? (
//                 <img
//                   src={previewImage}
//                   alt="Profile Preview"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <Camera className="w-10 h-10 text-gray-400" />
//               )}
//             </label>
//           </div>
          
//           {previewImage && (
//             <button
//               onClick={handleRemoveImage}
//               type="button" 
//               className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
//               aria-label="Remove image"
//             >
//               <X className="w-4 h-4 text-white" />
//             </button>
//           )}
//         </div>
        
//         <label
//           htmlFor="imageUpload"
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
//         >
//           Add Picture
//         </label>
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;

import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';

const ImageUpload = ({ profileData, setValue, register }) => {
  const [previewImage, setPreviewImage] = useState(
    profileData?.photo ? `https://api.sentryspot.co.uk${profileData.photo}` : null
  );
  
  useEffect(() => {
    // Register the photo_upload field with react-hook-form
    register('photo_upload');
    
    // Set initial value if profileData has a photo
    if (profileData?.photo) {
      setValue('photo_upload', null); // Start with null as we don't need to re-upload existing photos
    }
  }, [register, setValue, profileData]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        
        // Update form value with the file directly
        setValue('photo_upload', file);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = (e) => {
    e.preventDefault(); // Prevent any form submission
    setPreviewImage(null);
    setValue('photo_upload', null); // Clear the photo_upload field
  };
  
  return (
    <div className="form-group col-lg-6 col-md-12 flex justify-center">
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
              aria-label="Upload profile picture"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
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
              type="button" 
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