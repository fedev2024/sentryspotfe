
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";
// import { Eye } from "lucide-react";

// const JobListingsTable = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState("6");

//   useEffect(() => {
//     fetchAppliedJobs();
//   }, [timeFilter]);

//   const fetchAppliedJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1",
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         setAppliedJobs(response.data.data);
//         setError(null);
//       } else {
//         setError("Failed to fetch jobs");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching jobs");
//       console.error("Error fetching jobs:", err);
//     } finally {
//       setLoading(false);
//     }
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
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";

//   return (
//     <div className="bg-gray-100 min-h-screen py-3 px-3">
//       <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               My Applied Jobs
//             </h2>
//             <select
//               className="px-4 py-2 border rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={timeFilter}
//               onChange={(e) => setTimeFilter(e.target.value)}
//             >
//               <option value="6">Last 6 Months</option>
//               <option value="12">Last 12 Months</option>
//               <option value="16">Last 16 Months</option>
//               <option value="24">Last 24 Months</option>
//               <option value="60">Last 5 Years</option>
//             </select>
//           </div>

//           {loading ? (
//             <div className="text-center py-16">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//               <p className="mt-4 text-gray-500">Loading...</p>
//             </div>
//           ) : error ? (
//             <div className="text-center py-16 text-red-600 text-lg">{error}</div>
//           ) : appliedJobs.length === 0 ? (
//             <div className="text-center py-16 text-gray-500 text-lg">
//               No applied jobs available at the moment. Please apply to jobs and
//               check back later.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-100">
//                     <th className="px-6 py-4 text-left text-gray-700 font-semibold">
//                       Job Title
//                     </th>
//                     <th className="px-6 py-4 text-left text-gray-700 font-semibold">
//                       Posted At
//                     </th>
//                     <th className="px-6 py-4 text-left text-gray-700 font-semibold">
//                       Location
//                     </th>
//                     <th className="px-6 py-4 text-center text-gray-700 font-semibold">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appliedJobs.map((job) => (
//                     <tr
//                       key={job.id}
//                       className="border-t hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-6">
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={job.logo || DefaultImage}
//                             alt={`${job.job_title} logo`}
//                             className="w-12 h-12 rounded-full object-cover"
//                           />
//                           <div>
//                             <Link
//                               to={`/job-single-v3/${job.id}`}
//                               className="font-medium text-black hover:text-blue-800"
//                             >
//                               {job.job_title}
//                             </Link>
//                             {job.specialisms && (
//                               <p className="text-sm text-gray-600 mt-1">
//                                 {job.specialisms}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-6 text-gray-600">
//                         {formatDate(job.created_at)}
//                       </td>
//                       <td className="px-6 py-6 text-gray-600">
//                         {job.complete_address ||
//                           job.city ||
//                           "Location not specified"}{" "}
//                         {job.country ? "," : ""} {job.country}
//                       </td>
//                       <td className="px-6 py-6">
//                         <div className="flex justify-center gap-2">
//                           <Link to={`/job-single-v3/${job.id}`}>
//                             <button
//                               className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
//                               title="View Application"
//                             >
//                               <Eye />
//                             </button>
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobListingsTable;





// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";
// import { FiTrash2, FiEye, FiMoreVertical } from 'react-icons/fi';
// import { BsBriefcase } from 'react-icons/bs';
// import toast, { Toaster } from 'react-hot-toast';
// import ConfirmationDialog from '@/components/community/ConfirmationDialog';

// const JobListingsTable = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState("6");
//    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//     const [jobToRemove, setJobToRemove] = useState(null);

//   useEffect(() => {
//     fetchSavedJobs();
//   }, []);

//   const fetchSavedJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         'https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1',
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

//   const handleRemoveClick = (job) => {
//     setJobToRemove(job);
//     setShowConfirmDialog(true);
//   };

//   const handleRemoveFromFavorites = async (jobId) => {
//     try {
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
//         {
//           headers: {
//             Authorization: token
//           }
//         }
//       );

//       if (response.data.status === "success") {
//         const updatedJobs = savedJobs.filter(job => job.id !== jobId);
//         setSavedJobs(updatedJobs);
//         toast.success('Job removed from favorites', {
//           position: 'top-right',
//           duration: 3000,
//         });
//       } else {
//         toast.error('Failed to remove job from favorites', {
//           position: 'top-right',
//           duration: 3000,
//         });
//       }
//     } catch (err) {
//       console.error("Error removing job from favorites:", err);
//       toast.error('An error occurred while removing the job', {
//         position: 'top-right',
//         duration: 3000,
//       });
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const DefaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";

//   const JobCard = ({ job }) => (
//     <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6 mb-4 hover:shadow-md transition-shadow">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
//         <div className="flex-grow">
//           <div className="flex flex-col sm:flex-row items-start gap-4">
//             <Link to={`/job-single-v3/${job.id}`} className="flex-grow w-full">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2 line-clamp-2">
//                 {job.job_title}
//               </h3>
//               <div className="flex items-center space-x-2 mb-2">
//                 <BsBriefcase className="text-gray-600 flex-shrink-0" />
//                 <p className="text-gray-600 font-medium text-sm sm:text-base line-clamp-1">
//                   {job.company_name || "Company Name"}
//                 </p>
//               </div>
//               <p className="text-gray-500 text-sm mb-2 line-clamp-1">
//                 {job.complete_address || job.city || "Location N/A"}{" "}
//                 {job.country && `, ${job.country}`}
//               </p>
//               <div className="flex items-center text-gray-500 text-sm mb-3 sm:mb-0">
//                 <span>Posted {formatDate(job.created_at)}</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
//           <Link 
//             to={`/job-single-v3/${job.id}`}
//             className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors p-2 text-sm"
//           >
//             <FiEye className="w-5 h-5" />
//             <span className="sm:hidden">View</span>
//           </Link>
//           <button
//              onClick={() => handleRemoveClick(job)}
//             className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors p-2 text-sm"
//           >
//             <FiTrash2 className="w-5 h-5" />
//             <span className="sm:hidden">Remove</span>
//           </button>
//         </div>
//       </div>
      
//       <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
//         <Link
//           to={`/apply/${job.id}`}
//           className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//         >
//           Quick apply
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
//       <Toaster />
//       <div className="max-w-5xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//            Applied Jobs
//           </h2>
//           <select
//             className="w-full sm:w-auto px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
//             <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading applied jobs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 text-base sm:text-lg">
//             {error}
//           </div>
//         ) : savedJobs.length === 0 ? (
//           <div className="text-center py-12 sm:py-16 text-gray-500">
//             <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
//             <p className="text-lg sm:text-xl mb-2">No Applied Jobs</p>
//             <p className="text-sm sm:text-base">Explore and save jobs you're interested in.</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {savedJobs.map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))}
//           </div>
//         )}

// <ConfirmationDialog
//           isOpen={showConfirmDialog}
//           onClose={() => {
//             setShowConfirmDialog(false);
//             setJobToRemove(null);
//           }}
//           onConfirm={handleRemoveFromFavorites}
//           title="Remove from Applied Jobs"
//           description={`Are you sure you want to remove "${jobToRemove?.job_title}" from your saved jobs?`}
//           confirmLabel="Remove"
//           cancelLabel="Cancel"
//           variant="destructive"
//         />
//       </div>
//     </div>
//   );
// };

// export default JobListingsTable;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { FiTrash2, FiEye, FiMoreVertical } from 'react-icons/fi';
import { BsBriefcase } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmationDialog from '../../job-alerts/components/ConformationBox';

// const JobListingsTable = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState("6");
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [jobToRemove, setJobToRemove] = useState(null);

//   useEffect(() => {
//     fetchSavedJobs();
//   }, []);

//   const fetchSavedJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         'https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1',
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

//   const handleRemoveClick = (job) => {
//     setJobToRemove(job);
//     setShowConfirmDialog(true);
//   };

//   const handleConfirmRemove = async () => {
//     if (!jobToRemove) return;

//     try {
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobToRemove.id}`,
//         {
//           headers: {
//             Authorization: token
//           }
//         }
//       );

//       if (response.data.status === "success") {
//         const updatedJobs = savedJobs.filter(job => job.id !== jobToRemove.id);
//         setSavedJobs(updatedJobs);
//         toast.success('Job removed from applied jobs', {
//           position: 'top-right',
//           duration: 3000,
//         });
//       } else {
//         toast.error('Failed to remove job from applied jobs', {
//           position: 'top-right',
//           duration: 3000,
//         });
//       }
//     } catch (err) {
//       console.error("Error removing job from applied jobs:", err);
//       toast.error('An error occurred while removing the job', {
//         position: 'top-right',
//         duration: 3000,
//       });
//     } finally {
//       setShowConfirmDialog(false);
//       setJobToRemove(null);
//     }
//   };

//   const handleCloseDialog = () => {
//     setShowConfirmDialog(false);
//     setJobToRemove(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const JobCard = ({ job }) => (
//     <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6 mb-4 hover:shadow-md transition-shadow">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
//         <div className="flex-grow">
//           <div className="flex flex-col sm:flex-row items-start gap-4">
//             <Link to={`/job-single-v3/${job.id}`} className="flex-grow w-full">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2 line-clamp-2">
//                 {job.job_title}
//               </h3>
//               <div className="flex items-center space-x-2 mb-2">
//                 <BsBriefcase className="text-gray-600 flex-shrink-0" />
//                 <p className="text-gray-600 font-medium text-sm sm:text-base line-clamp-1">
//                   {job.company_name || "Company Name"}
//                 </p>
//               </div>
//               <p className="text-gray-500 text-sm mb-2 line-clamp-1">
//                 {job.complete_address || job.city || "Location N/A"}{" "}
//                 {job.country && `, ${job.country}`}
//               </p>
//               <div className="flex items-center text-gray-500 text-sm mb-3 sm:mb-0">
//                 <span>Posted {formatDate(job.created_at)}</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
//           <Link 
//             to={`/job-single-v3/${job.id}`}
//             className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors p-2 text-sm"
//           >
//             <FiEye className="w-5 h-5" />
//             <span className="sm:hidden">View</span>
//           </Link>
//           <button
//             onClick={() => handleRemoveClick(job)}
//             className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors p-2 text-sm"
//           >
//             <FiTrash2 className="w-5 h-5" />
//             <span className="sm:hidden">Remove</span>
//           </button>
//         </div>
//       </div>
      
//       {/* <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
//         <Link
//           to={`/apply/${job.id}`}
//           className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//         >
//           Quick apply
//         </Link>
//       </div> */}
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
//       <Toaster />
//       <div className="max-w-5xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//             Applied Jobs
//           </h2>
//           <select
//             className="w-full sm:w-auto px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
//             <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading applied jobs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 text-base sm:text-lg">
//             {error}
//           </div>
//         ) : savedJobs.length === 0 ? (
//           <div className="text-center py-12 sm:py-16 text-gray-500">
//             <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
//             <p className="text-lg sm:text-xl mb-2">No Applied Jobs</p>
//             <p className="text-sm sm:text-base">Explore and apply to jobs you're interested in.</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {savedJobs.map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))}
//           </div>
//         )}

//         <ConfirmationDialog
//           isOpen={showConfirmDialog}
//           onClose={handleCloseDialog}
//           onConfirm={handleConfirmRemove}
//           title="Remove from Applied Jobs"
//           description={`Are you sure you want to remove "${jobToRemove?.job_title}" from your applied jobs? This action cannot be undone.`}
//           confirmLabel="Remove"
//           cancelLabel="Cancel"
//           variant="destructive"
//         />
//       </div>
//     </div>
//   );
// };
const JobListingsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("6");
  const [sortOrder, setSortOrder] = useState("desc"); // default to newest first
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [jobToRemove, setJobToRemove] = useState(null);

  useEffect(() => {
    fetchSavedJobs();
  }, [timeFilter, sortOrder]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1&filter_by=date&order_by=${sortOrder}`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      
      if (response.data.status === "success") {
        // Filter jobs based on selected time period
        const now = new Date();
        const filteredJobs = response.data.data.filter(job => {
          const jobDate = new Date(job.created_at);
          const monthsDiff = (now - jobDate) / (1000 * 60 * 60 * 24 * 30);
          return monthsDiff <= parseInt(timeFilter);
        });
        
        setSavedJobs(filteredJobs);
        setError(null);
      } else {
        setError("Failed to fetch applied jobs");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching applied jobs");
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (job) => {
    setJobToRemove(job);
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = async () => {
    if (!jobToRemove) return;

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobToRemove.id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      if (response.data.status === "success") {
        const updatedJobs = savedJobs.filter(job => job.id !== jobToRemove.id);
        setSavedJobs(updatedJobs);
        toast.success('Job removed from applied jobs', {
          position: 'top-right',
          duration: 3000,
        });
      } else {
        toast.error('Failed to remove job from applied jobs', {
          position: 'top-right',
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error removing job from applied jobs:", err);
      toast.error('An error occurred while removing the job', {
        position: 'top-right',
        duration: 3000,
      });
    } finally {
      setShowConfirmDialog(false);
      setJobToRemove(null);
    }
  };

  const handleCloseDialog = () => {
    setShowConfirmDialog(false);
    setJobToRemove(null);
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

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link to={`/job-single-v3/${job.id}`} className="flex-grow w-full">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2 line-clamp-2">
                {job.job_title}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <BsBriefcase className="text-gray-600 flex-shrink-0" />
                <p className="text-gray-600 font-medium text-sm sm:text-base line-clamp-1">
                  {job.company_name || "Company Name"}
                </p>
              </div>
              <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                {job.complete_address || job.city || "Location N/A"}{" "}
                {job.country && `, ${job.country}`}
              </p>
              <div className="flex items-center text-gray-500 text-sm mb-3 sm:mb-0">
                <span>Posted {formatDate(job.created_at)}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
          <Link 
            to={`/job-single-v3/${job.id}`}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors p-2 text-sm"
          >
            <FiEye className="w-5 h-5" />
            <span className="sm:hidden">View</span>
          </Link>
          <button
            onClick={() => handleRemoveClick(job)}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors p-2 text-sm"
          >
            <FiTrash2 className="w-5 h-5" />
            <span className="sm:hidden">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
      <Toaster />
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Applied Jobs
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              className="px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest </option>
              <option value="asc">Oldest </option>
            </select>
            {/* <select
              className="px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="6">Last 6 Months</option>
              <option value="12">Last 12 Months</option>
              <option value="16">Last 16 Months</option>
              <option value="24">Last 24 Months</option>
              <option value="60">Last 5 Years</option>
            </select> */}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading applied jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 text-base sm:text-lg">
            {error}
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-gray-500">
            <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg sm:text-xl mb-2">No Applied Jobs</p>
            <p className="text-sm sm:text-base">Explore and apply to jobs you're interested in.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemove}
          title="Remove from Applied Jobs"
          description={`Are you sure you want to remove "${jobToRemove?.job_title}" from your applied jobs? This action cannot be undone.`}
          confirmLabel="Remove"
          cancelLabel="Cancel"
          variant="destructive"
        />
      </div>
    </div>
  );
};

export default JobListingsTable;

// export default JobListingsTable;