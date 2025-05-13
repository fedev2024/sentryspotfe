// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Phone, Share2, Calendar } from 'lucide-react';

// const UserProfilePage = () => {
//   // Get user info from Redux state
//   const { userInfo } = useSelector(state => state.auth);
//   console.log(userInfo,"frpm public");
//   // Default values in case some data is missing
//   const defaultUser = {
//     name: "User Name",
//     currentLocation: "Location",
//     preferredLocation: "Preferred Location",
//     experience: "0y 0m",
//     currentSalary: "0 LPA",
//     lastLogin: "DD-MM-YYYY",
//     profileImage: "/api/placeholder/100/100",
//     hasResume: false
//   };
  
//   // Merge default values with actual user data
//   const user = { ...defaultUser, ...userInfo };
  
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Profile Header */}
//       <div className="w-full">
//         {/* Background banner with low-poly pattern */}
//         <div className="h-32 bg-blue-900 bg-opacity-30"></div>
        
//         {/* Profile section */}
//         <div className="px-4 relative">
//           {/* Profile picture */}
//           <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
//             <div className="rounded-full h-32 w-32 border-4 border-white bg-blue-600 overflow-hidden">
//               <img
//                 src={`https://api.sentryspot.co.uk${user.photo}` || "/api/placeholder/100/100"}
//                 alt={user.name}
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </div>
          
//           {/* User name and actions */}
//           <div className="pt-20 pb-4 text-center">
//             <h1 className="text-2xl font-semibold text-blue-900">{user.first_name} {" "} {user.last_name}</h1>
            
//             <div className="flex justify-center mt-4 mb-6 space-x-4">
//               <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">
//                 <Phone className="mr-2 h-5 w-5" />
//                 <span>Call</span>
//               </button>
              
//               <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md">
//                 <Share2 className="mr-2 h-5 w-5" />
//                 <span>Share</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* User details */}
//       <div className="px-4 py-4 border-t border-b border-gray-200">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <p className="text-gray-500 text-sm">Current Location</p>
//             <p className="font-medium text-blue-900">{user?.location}</p>
//           </div>
          
//           <div className="text-center">
//             <p className="text-gray-500 text-sm">Preferred Location</p>
//             <p className="font-medium text-blue-900">{user?.preferredLocation}</p>
//           </div>
          
//           <div className="text-center">
//             <p className="text-gray-500 text-sm">Experience</p>
//             <p className="font-medium text-blue-900">{user?.experience}</p>
//           </div>
          
//           <div className="text-center">
//             <p className="text-gray-500 text-sm">Current Salary</p>
//             <p className="font-medium text-blue-900">{user?.currentSalary}</p>
//           </div>
//         </div>
        
//         <div className="flex justify-end mt-4">
//           <div className="flex items-center text-gray-500 text-sm">
//             <Calendar className="h-4 w-4 mr-1" />
//             <span>Joined On: {new Date(user.created_at).toLocaleDateString('en-GB')}</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Tabs */}
//       <div className="px-4 border-b border-gray-200">
//         <div className="flex">
//           <button className="px-4 py-3 font-medium text-blue-600 border-b-2 border-blue-600">
//             RESUME
//           </button>
//           <button className="px-4 py-3 font-medium text-gray-500">
//             PROFILE
//           </button>
//         </div>
//       </div>
      
//       {/* Content area */}
//       <div className="p-4 bg-gray-200">
//         <div className="p-6 bg-white rounded shadow-sm">
//           {user.hasResume ? (
//             <div className="resume-content">
//               {/* Resume content would go here */}
//               <p>Resume content</p>
//             </div>
//           ) : (
//             <div className="text-center py-4 text-gray-600">
//               No Resume Found!
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Floating call button */}
//       <div className="fixed bottom-6 right-6">
//         <button className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
//           <Phone className="h-6 w-6" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Phone, Share2, Calendar, User, FileText } from 'lucide-react';

const UserProfilePage = () => {
  // Get user info from Redux state
  const { userInfo } = useSelector(state => state.auth);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('resume');
  
  // Format name (combine first_name and last_name if both exist)
  const getFullName = () => {
    if (userInfo?.first_name) {
      return userInfo.last_name ? `${userInfo.first_name} ${userInfo.last_name}` : userInfo.first_name;
    }
    return "User";
  };
  
  // Format location (city, state, country)

  
  // Get preferred location (default to Noida as shown in your example)

  
  // Format experience
  const getExperience = () => {
    if (userInfo?.experience_in_month) {
      const years = Math.floor(parseInt(userInfo.experience_in_month) / 12);
      const months = parseInt(userInfo.experience_in_month) % 12;
      return `${years}y ${months}m`;
    }
    return "1y 6m"; // Default fallback 
  };
  
  // Format salary
  const getCurrentSalary = () => {
    if (userInfo?.current_salary && userInfo.current_salary !== "") {
      return userInfo.current_salary;
    }
    return "4 LPA"; // Default fallback
  };
  
  // Format last login date
  const getLastLoginDate = () => {
    if (userInfo?.updated_at) {
      const date = new Date(userInfo.updated_at);
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    }
    return "27-04-2025"; // Default fallback
  };
  
  // Get profile photo URL
  const getProfilePhoto = () => {
    if (userInfo?.photo && !userInfo.photo.includes("user_dummy.png")) {
      return userInfo.photo;
    }
    return "/api/placeholder/100/100"; // Placeholder if no photo or default photo
  };
  
  // Check if user has a resume
  const hasResume = () => {
    return userInfo?.ai_resume_parse_data?.resume_html && 
           userInfo.ai_resume_parse_data.resume_html !== '';
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="w-full">
        {/* Background banner with low-poly pattern */}
        <div className="h-32 bg-blue-900 bg-opacity-30"></div>
        
        {/* Profile section */}
        <div className="px-4 relative">
          {/* Profile picture */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="rounded-full h-32 w-32 border-4 border-white bg-blue-600 overflow-hidden">
              <img
                src={getProfilePhoto()}
                alt={getFullName()}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          {/* User name and actions */}
          <div className="pt-20 pb-4 text-center">
            <h1 className="text-2xl font-semibold text-blue-900">{getFullName()}</h1>
            
            <div className="flex justify-center mt-4 mb-6 space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">
                <Phone className="mr-2 h-5 w-5" />
                <span>Call</span>
              </button>
              
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md">
                <Share2 className="mr-2 h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* User details */}
      <div className="px-4 py-4 border-t border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Current Location</p>
            <p className="font-medium text-blue-900">{userInfo?.locations || "N.A"}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 text-sm">Preferred Location</p>
            <p className="font-medium text-blue-900">{userInfo?.locations || "N.A"}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 text-sm">Experience</p>
            <p className="font-medium text-blue-900">{getExperience()}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 text-sm">Current Salary</p>
            <p className="font-medium text-blue-900">{getCurrentSalary()}</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Last Login: {getLastLoginDate()}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="px-4 border-b border-gray-200">
        <div className="flex">
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'resume' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('resume')}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              RESUME
            </div>
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              PROFILE
            </div>
          </button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-4 bg-gray-200">
        <div className="p-6 bg-white rounded shadow-sm">
          {activeTab === 'resume' && (
            <div>
              {hasResume() ? (
                <div 
                  className="resume-content" 
                  dangerouslySetInnerHTML={{ __html: userInfo.ai_resume_parse_data.resume_html }}
                />
              ) : (
                <div className="text-center py-4 text-gray-600">
                  No Resume Found!
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-900">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userInfo?.email || "Not provided"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userInfo?.phone || "Not provided"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{userInfo?.dob || "Not provided"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Job Seeker ID</p>
                  <p className="font-medium">{userInfo?.job_seeker_uuid || "Not provided"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Professional Title</p>
                  <p className="font-medium">{userInfo?.proffesional_title || "Not provided"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Skills</p>
                  <p className="font-medium">{userInfo?.jobsapplyer_skills || "Not provided"}</p>
                </div>
              </div>
              
              {userInfo?.description && (
                <div>
                  <h3 className="text-lg font-medium text-blue-900 mt-6">About</h3>
                  <p className="mt-2">{userInfo.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Floating call button */}
      <div className="fixed bottom-6 right-6">
        <button className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
          <Phone className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;