// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";

// const Skilltest = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const [apply, setApply] = useState([]); // Set the default value as an empty array

//   useEffect(() => {
//     axios
//       .get(`https://api.sentryspot.co.uk/api/jobseeker/user-skills`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         // Check if response.data.data is an array before setting it
//         setApply(response.data.data || []);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>Skill History</h4>

//         <div className="chosen-outer">
//           {/* Tabs Box */}
//           <select className="chosen-single form-select">
//             <option>Last 6 Months</option>
//             <option>Last 12 Months</option>
//             <option>Last 16 Months</option>
//             <option>Last 24 Months</option>
//             <option>Last 5 Years</option>
//           </select>
//         </div>
//       </div>
//       {/* End filter top bar */}

//       {/* Start table widget content */}
//       <div className="widget-content">
//         <div className="table-outer">
//           <table className="default-table manage-job-table">
//             <thead>
//               <tr>
//                 <th>Job Title</th>
//                 <th>Email</th>
//                 <th>Location</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             {apply.length === 0 ? (
//               <tbody>
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     No skill history available at the moment. Please check back later.
//                   </td>
//                 </tr>
//               </tbody>
//             ) : (
//               <tbody>
//                 {apply.map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       {/* Job Block */}
//                       <div className="job-block">
//                         <div className="inner-box">
//                           <div className="content">
//                             <span className="company-logo">
//                               <img
//                                 src={
//                                   item.logo ||
//                                   "https://i.pinimg.com/564x/76/e3/2a/76e32aac67331df783916caaadd9a448.jpg"
//                                 }
//                                 alt="logo"
//                               />
//                             </span>
//                             <h4>
//                               <Link to={`/job-single-v3/${item.id}`}>
//                                 {item.job_title}
//                               </Link>
//                             </h4>
//                             <ul className="job-info">
//                               <li>
//                                 <span className="icon flaticon-briefcase"></span>
//                                 {item.specialisms}
//                               </li>
//                               <li>
//                                 <span className="icon flaticon-map-locator"></span>
//                                 {item.location || "London, UK"}
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>{item.email_address}</td>
//                     <td className="break-all">{item.complete_address}</td>
//                     <td>
//                       <div className="option-box">
//                         <ul className="option-list">
//                           <li>
//                             <button data-text="View Return">
//                               <span className="fa fa-exchange text-red-600"></span>
//                             </button>
//                           </li>
//                           <li>
//                             <button data-text="View Application">
//                               <span className="la la-eye"></span>
//                             </button>
//                           </li>
//                           <li>
//                             <button data-text="Delete Application">
//                               <span className="la la-trash"></span>
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             )}
//           </table>
//         </div>
//       </div>
//       {/* End table widget content */}
//     </div>
//   );
// };

// export default Skilltest;
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";

// const Skilltest = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [skills, setSkills] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`https://api.sentryspot.co.uk/api/jobseeker/user-skills`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         setSkills(response.data.data || []);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>Skill History</h4>
//       </div>

//       <div className="widget-content">
//         <div className="table-outer">
//           <table className="default-table manage-job-table">
//             <thead>
//               <tr>
//                 <th>Job Title</th>
//                 {/* <th>Email</th>
//                 <th>Location</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {skills.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     No skill history available. Please check back later.
//                   </td>
//                 </tr>
//               ) : (
//                 skills.map((skill) => (
//                   <tr key={skill.id}>
//                     <td>
//                       <div className="job-block">
//                         <h4>
//                           <Link to={`/job-single-v3/${skill.id}`}>
//                             {skill.name}
//                           </Link>
//                         </h4>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="option-box">
//                         <ul className="option-list">
//                           <li>
//                             <button
//                               className="btn btn-primary"
                              
//                             >
//                               Take Test
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Skilltest;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";

const Skilltest = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.sentryspot.co.uk/api/jobseeker/user-skills`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setSkills(response.data.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg">
      {/* <div className="border-b border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Skill History
        </h2>
      </div> */}
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skills.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No skill history available. Please check back later.
                  </td>
                </tr>
              ) : (
                skills.map((skill) => (
                  <tr
                    key={skill.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Link
                          // to={`/job-single-v3/${skill.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          {skill.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/candidates-dashboard/testpaper/${skill.id}/${skill.name}`}>
                      <button 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        
                      >
                        Take Test
                      </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
4      </div>
    </div>
  );
};

export default Skilltest;