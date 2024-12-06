// // import { Link } from "react-router-dom";
// // import jobs from "../../../../../data/job-featured.js";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Constant } from "@/utils/constant/constant.js";

// // const JobAlertsTable = () => {
// //   const token = localStorage.getItem(Constant.USER_TOKEN);

// // const[saved,setsaved]=useState([]);


// // useEffect(()=>{

// // axios.get(`https://api.sentryspot.co.uk/api/jobseeker/view-favorite-jobs?is_favorite=1`,{
// //   headers:{
// // Authorization: token
// //   }})
// //   .then((response)=>{
// //     setsaved(response.data.data)
    
// //   })

// //   .catch((err)=>{
// //     console.log(err)
// //   })

// // },[])






// //   return (
// //     <div className="tabs-box">
// //     <div className="widget-title">
// //       <h4>Saved Jobs</h4>
// //       <div className="chosen-outer">
// //         <select className="chosen-single form-select">
// //           <option>Last 6 Months</option>
// //           <option>Last 12 Months</option>
// //           <option>Last 16 Months</option>
// //           <option>Last 24 Months</option>
// //           <option>Last 5 years</option>
// //         </select>
// //       </div>
// //     </div>
// //     {/* End filter top bar */}
  
// //     {/* Start bar widget content */}
// //     <div className="widget-content">
// //       <div className="bar-outer px-10">
// //         {saved.length === 0 ? (
// //           <p className="text-center text-xl">
// //             No Saved jobs available at the moment. Please Save jobs & check back later.
// //           </p>
// //         ) : (
// //           saved.map((item) => (
// //             <div key={item.id} className="job-bar flex items-center p-4  mb-4 border-1 border-sky-500 rounded-lg">
// //               <div className="absolute left-8 company-logo mr-4">
// //                 <img
// //                   className="rounded-lg h-14 w-20"
// //                   src={item.logo || "https://i.pinimg.com/564x/76/e3/2a/76e32aac67331df783916caaadd9a448.jpg"}
// //                   alt="logo"
// //                 />
// //               </div>
// //               <div className="job-info flex-grow px-8">
// //                 <h4>
// //                   <Link to={`/job-single-v3/${item.id}`} className="text-xl font-bold">
// //                     {item.job_title}
// //                   </Link>
// //                 </h4>
// //                 <ul className="flex space-x-8 text-gray-600">
// //                   <li>
// //                     <span className="icon flaticon-briefcase"> </span>
// //                     {item.specialisms}
// //                   </li>
// //                   <li>
// //                     <span className="icon flaticon-map-locator"> </span>
// //                     {item.complete_address}
// //                   </li>
// //                   <li>
// //                     <span className="icon flaticon-map-locator"> </span>
// //                     {item.qualification}
// //                   </li>
// //                   <li>
// //                     <span className="icon flaticon-email"> </span>
// //                     {item.email_address_of_job_poster}
// //                   </li>
// //                 </ul>
// //               </div>
// //               <div className="job-actions flex items-center">
// //                 <a href={`mailto:${item.email_address}`} className="mr-4 text-blue-500">
// //                   {item.email_address}
// //                 </a>
// //                 {/*<div className="option-box flex space-x-2">
// //                   <button className="py-1 px-2 text-white bg-blue-500 rounded-full" data-text="View Application">
// //                     <span className="la la-eye"></span>
// //                   </button>
// //                   <button className="py-1 px-2 text-white bg-red-500 rounded-full" data-text="Delete Application">
// //                     <span className="la la-trash"></span>
// //                   </button>
// //                 </div> */}
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //     {/* End bar widget content */}
// //   </div>
  
// //   );
// // };

// // export default JobAlertsTable;
// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";
// import { Heart } from 'lucide-react';

// const JobAlertsTable = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState("6");

//   useEffect(() => {
//     fetchSavedJobs();
//   }, []);

//   const fetchSavedJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         'https://api.sentryspot.co.uk/api/jobseeker/view-favorite-jobs?is_favorite=1',
//         {
//           headers: {
//             Authorization: token
//           }
//         }
//       );
      
//       if (response.data.status === "success") {
//         setSavedJobs(response.data.data);
//         setError(null);
//       } else {
//         setError("Failed to fetch saved jobs");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching saved jobs");
//       console.error("Error fetching saved jobs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveFromFavorites = async (jobId) => {
//     // Implement remove from favorites functionality here
//     console.log("Remove from favorites:", jobId);
//   };
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       // year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };
//   const DefaultImage =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";

//   return (
//     // <div className="bg-white rounded-lg shadow-lg">
//     //   {/* Header Section */}
//     //   <div className="border-b border-gray-200">
//     //     <div className="px-6 py-4 flex justify-between items-center">
//     //       <h2 className="text-2xl font-bold text-gray-800">Saved Jobs</h2>
//     //       <div className="relative">
//     //         <select 
//     //           className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm"
//     //           value={timeFilter}
//     //           onChange={(e) => setTimeFilter(e.target.value)}
//     //         >
//     //           <option value="6">Last 6 Months</option>
//     //           <option value="12">Last 12 Months</option>
//     //           <option value="16">Last 16 Months</option>
//     //           <option value="24">Last 24 Months</option>
//     //           <option value="60">Last 5 Years</option>
//     //         </select>
//     //         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//     //           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//     //             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//     //           </svg>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   {/* Content Section */}
//     //   <div className="p-6">
//     //     {loading ? (
//     //       <div className="flex justify-center items-center py-12">
//     //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//     //       </div>
//     //     ) : error ? (
//     //       <div className="text-center py-8 text-red-600">
//     //         <p>{error}</p>
//     //       </div>
//     //     ) : savedJobs.length === 0 ? (
//     //       <div className="text-center py-12">
//     //         <div className="mb-4">
//     //           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//     //           </svg>
//     //         </div>
//     //         <p className="text-xl text-gray-600 mb-2">No Saved Jobs Found</p>
//     //         <p className="text-gray-500">Start saving jobs you're interested in to view them here.</p>
//     //       </div>
//     //     ) : (
//     //       <div className="space-y-6">
//     //         {savedJobs.map((job) => (
//     //           <div 
//     //             key={job.id} 
//     //             className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 p-6"
//     //           >
//     //             <div className="flex items-center justify-center gap-6">
//     //               {/* Company Logo */}
//     //               <div className="flex-shrink-0">
//     //                 <img
//     //                   src={job.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"}
//     //                   alt={`${job.job_title} logo`}
//     //                   className="h-16 w-16 rounded-lg object-cover"
//     //                 />
//     //               </div>

//     //               {/* Job Details */}
//     //               <div className="flex-grow">
//     //                 <Link 
//     //                   to={`/job-single-v3/${job.id}`}
//     //                   className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2 block"
//     //                 >
//     //                   {job.job_title}
//     //                 </Link>

//     //                 {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//     //                   {job.specialisms && (
//     //                     <div className="flex items-center text-gray-600">
//     //                       <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     //                       </svg>
//     //                       <span>{job.specialisms || 'Not specified'}</span>
//     //                     </div>
//     //                   )}

//     //                   {job.qualification && (
//     //                     <div className="flex items-center text-gray-600">
//     //                       <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
//     //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0L3 9m9 5l9-5" />
//     //                       </svg>
//     //                       <span>{job.qualification}</span>
//     //                     </div>
//     //                   )}

//     //                   {job.complete_address && (
//     //                     <div className="flex items-center text-gray-600">
//     //                       <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//     //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//     //                       </svg>
//     //                       <span>{job.complete_address || job.city || 'Location not specified'}</span>
//     //                     </div>
//     //                   )}

//     //                   {job.email_address_of_job_poster && (
//     //                     <div className="flex items-center text-gray-600">
//     //                       <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     //                       </svg>
//     //                       <span>{job.email_address_of_job_poster}</span>
//     //                     </div>
//     //                   )}
//     //                 </div> */}
//     //               </div>

//     //               {/* Actions */}
//     //               <div className="flex-shrink-0 flex flex-col items-end gap-2">
//     //                 <button
//     //                   onClick={() => handleRemoveFromFavorites(job.id)}
//     //                   className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
//     //                   title="Remove from favorites"
//     //                 >
//     //                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//     //                     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//     //                   </svg>
//     //                 </button>
//     //                 {job.email_address && (
//     //                   <a
//     //                     href={`mailto:${job.email_address}`}
//     //                     className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
//     //                   >
//     //                     Contact
//     //                   </a>
//     //                 )}
//     //               </div>
//     //             </div>
//     //           </div>
//     //         ))}
//     //       </div>
//     //     )}
//     //   </div>
//     // </div>

//     <div className="bg-gray-100 min-h-screen py-3 px-3">
//     <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg">
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">
//             My Saved Jobs
//           </h2>
//           <select
//             className="px-4 py-2 border rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={timeFilter}
//             onChange={(e) => setTimeFilter(e.target.value)}
//           >
//             <option value="6">Last 6 Months</option>
//             <option value="12">Last 12 Months</option>
//             <option value="16">Last 16 Months</option>
//             <option value="24">Last 24 Months</option>
//             <option value="60">Last 5 Years</option>
//           </select>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//             <p className="mt-4 text-gray-500">Loading...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 text-lg">{error}</div>
//         ) : savedJobs.length === 0 ? (
//           <div className="text-center py-16 text-gray-500 text-lg">
//             No Saved jobs available at the moment. Please apply to jobs and
//             check back later.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-blue-100">
//                   <th className="px-6 py-4 text-left text-gray-700 font-semibold">
//                     Job Title
//                   </th>
//                   <th className="px-6 py-4 text-left text-gray-700 font-semibold">
//                     Posted At
//                   </th>
//                   <th className="px-6 py-4 text-left text-gray-700 font-semibold">
//                     Location
//                   </th>
//                   <th className="px-6 py-4 text-center text-gray-700 font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savedJobs.map((job) => (
//                   <tr
//                     key={job.id}
//                     className="border-t hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-6">
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={job.logo || DefaultImage}
//                           alt={`${job.job_title} logo`}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                           <Link
//                             to={`/job-single-v3/${job.id}`}
//                             className="font-medium text-black hover:text-blue-800"
//                           >
//                             {job.job_title}
//                           </Link>
//                           {job.specialisms && (
//                             <p className="text-sm text-gray-600 mt-1">
//                               {job.specialisms}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-6 text-gray-600">
//                       {formatDate(job.created_at)}
//                     </td>
//                     <td className="px-6 py-6 text-gray-600">
//                       {job.complete_address ||
//                         job.city ||
//                         "Location not specified"}{" "}
//                       {job.country ? "," : ""} {job.country}
//                     </td>
//                     <td className="px-6 py-6">
//                       <div className="flex justify-center gap-2">
//                         <Link to={`/job-single-v3/${job.id}`}>
//                           <button
//                             className="p-2 text-Red-600 hover:text-Red-800 hover:bg-blue-50 rounded-full transition-colors"
//                             // title="View Application"
//                           >
//                             Remove
//                           </button>
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
//   );
// };


// export default JobAlertsTable;


import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { Trash2, Eye } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const JobAlertsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("6");

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://api.sentryspot.co.uk/api/jobseeker/view-favorite-jobs?is_favorite=1',
        {
          headers: {
            Authorization: token
          }
        }
      );
      
      if (response.data.status === "success") {
        setSavedJobs(response.data.data);
        setError(null);
      } else {
        setError("Failed to fetch saved jobs");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching saved jobs");
      console.error("Error fetching saved jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (jobId) => {
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      if (response.data.status === "success") {
        // Remove the job from the list
        const updatedJobs = savedJobs.filter(job => job.id !== jobId);
        setSavedJobs(updatedJobs);
        
        // Show success toast
        toast.success('Job removed from favorites', {
          position: 'top-right',
          duration: 3000,
        });
      } else {
        // Show error toast if removal fails
        toast.error('Failed to remove job from favorites', {
          position: 'top-right',
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error removing job from favorites:", err);
      toast.error('An error occurred while removing the job', {
        position: 'top-right',
        duration: 3000,
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const DefaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";

  return (
    <div className="bg-gray-100 min-h-screen py-3 px-3">
      <Toaster />
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              My Saved Jobs
            </h2>
            <select
              className="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="6">Last 6 Months</option>
              <option value="12">Last 12 Months</option>
              <option value="16">Last 16 Months</option>
              <option value="24">Last 24 Months</option>
              <option value="60">Last 5 Years</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-500">Loading saved jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-600 text-lg">
              {error}
            </div>
          ) : savedJobs.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6l1-5m-5 5h5" 
                />
              </svg>
              <p className="text-xl mb-2">No Saved Jobs</p>
              <p>Explore and save jobs you're interested in.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">Job Title</th>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">Posted At</th>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">Location</th>
                    <th className="px-6 py-4 text-center text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={job.logo || DefaultImage}
                            alt={`${job.job_title} logo`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <Link
                              to={`/job-single-v3/${job.id}`}
                              className="font-semibold text-gray-900 hover:text-blue-600"
                            >
                              {job.job_title}
                            </Link>
                            {job.specialisms && (
                              <p className="text-sm text-gray-500 mt-1">
                                {job.specialisms}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(job.created_at)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {job.complete_address || job.city || "Location N/A"}{" "}
                        {job.country && `, ${job.country}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center ">
                          <Link 
                            to={`/job-single-v3/${job.id}`}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleRemoveFromFavorites(job.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobAlertsTable;