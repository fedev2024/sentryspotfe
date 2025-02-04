
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
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
//     <div className="w-full mx-auto bg-white rounded-lg shadow-lg">
//       {/* <div className="border-b border-gray-200 p-6">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Skill History
//         </h2>
//       </div> */}
      
//       <div className="p-6">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Job Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {skills.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="2"
//                     className="px-6 py-4 text-center text-sm text-gray-500"
//                   >
//                     No skill history available. Please check back later.
//                   </td>
//                 </tr>
//               ) : (
//                 skills.map((skill) => (
//                   <tr
//                     key={skill.id}
//                     className="hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <Link
//                           // to={`/job-single-v3/${skill.id}`}
//                           className="text-sm font-medium text-blue-600 hover:text-blue-800"
//                         >
//                           {skill.name}
//                         </Link>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <Link to={`/candidates-dashboard/testpaper/${skill.id}/${skill.name}`}>
//                       <button 
//                         className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        
//                       >
//                         Take Test
//                       </button>
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
// 4      </div>
//     </div>
//   );
// };

// export default Skilltest;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";
// import { FileText } from "lucide-react"; // You can use a different icon if preferred

// const Skilltest = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSkills();
//   }, []);

//   const fetchSkills = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/user-skills`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       setSkills(response.data.data || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching skills");
//       console.error("Error fetching skills:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen py-3 px-3">
//       <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               My Skills
//             </h2>
//           </div>

//           {loading ? (
//             <div className="text-center py-16">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//               <p className="mt-4 text-gray-500">Loading...</p>
//             </div>
//           ) : error ? (
//             <div className="text-center py-16 text-red-600 text-lg">{error}</div>
//           ) : skills.length === 0 ? (
//             <div className="text-center py-16 text-gray-500 text-lg">
//               No skills available at the moment. Please add skills and check back later.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-100">
//                     <th className="px-6 py-4 text-left text-gray-700 font-semibold">
//                       Skill Name
//                     </th>
//                     <th className="px-6 py-4 text-center text-gray-700 font-semibold">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {skills.map((skill) => (
//                     <tr
//                       key={skill.id}
//                       className="border-t hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-6">
//                         <div className="flex items-center gap-4">
//                           <div>
//                             <span className="font-medium text-black">
//                               {skill.name}
//                             </span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-6">
//                         <div className="flex justify-center gap-2">
//                           <Link to={`/candidates-dashboard/testpaper/${skill.id}/${skill.name}`}>
//                             <button
//                               className="flex gap-2 px-4 py-2 bg-blue-600  hover:text-white text-white hover:bg-blue-700 rounded-md transition-colors"
//                               title="Take Skill Test"
//                             >
//                                Take Test
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

// export default Skilltest;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";
// import { GraduationCap } from "lucide-react";

// const Skilltest = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSkills();
//   }, []);

//   const fetchSkills = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/user-skills`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       setSkills(response.data.data || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching skills");
//       console.error("Error fetching skills:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen py-6 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//             <p className="ml-4 text-gray-500">Loading...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 text-lg">{error}</div>
//         ) : skills.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//             <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//             <p className="text-gray-500 text-lg">
//               No skills available at the moment. Please add skills and check back later.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {skills.map((skill) => (
//               <div
//                 key={skill.id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//               >
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <GraduationCap className="h-6 w-6 text-blue-500" />
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {skill.name}
//                       </h3>
//                     </div>
//                   </div>
//                   <div className="flex justify-center mt-6">
//                     <Link
//                       to={`/candidates-dashboard/testpaper/${skill.id}/${skill.name}`}
//                       className="w-full"
//                     >
//                       <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2">
//                         <span>Take Test</span>
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Skilltest;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { GraduationCap, X } from "lucide-react";

const InstructionsModal = ({ isOpen, onClose, onProceed, skillId, skillName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 relative">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="inline-block">📝</span> Instructions
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">
            Following instructions are common for all Users:
          </h3>
          
          <ol className="space-y-3 list-decimal pl-6">
            <li>The duration of the test is 10 minutes*. Your answer gets automatically submitted after 10 minutes*.</li>
            <li>This test consists of 15* multiple-choice questions.</li>
            <li>You may attempt the questions in any order.</li>
            <li>Please select the correct answer and click the Save and next button.</li>
            <li>Please click skip if you wish to skip a question. You may come back and answer the question later.</li>
            <li>Please click on the Submit Assessment button after answering all the questions.</li>
            <li>Do not close the window before submitting the test.</li>
            <li>Tests will be automatically submitted after the given time limit.</li>
          </ol>
        </div>
        
        <div className="border-t p-4 flex justify-end">
          <Link to={`/candidates-dashboard/testpaper/${skillId}/${skillName}`}>
            <button 
              onClick={onProceed}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Proceed to Test
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, onTakeTest }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">
            {skill.name}
          </h3>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => onTakeTest(skill.id, skill.name)}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <span>Take Test</span>
        </button>
      </div>
    </div>
  </div>
);

const Skilltest = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/user-skills`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      setSkills(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred while fetching skills");
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeTest = (skillId, skillName) => {
    setSelectedSkill({ id: skillId, name: skillName });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="ml-4 text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 text-lg">{error}</div>
        ) : skills.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No skills available at the moment. Please add skills and check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                onTakeTest={handleTakeTest}
              />
            ))}
          </div>
        )}
      </div>

      <InstructionsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceed={() => setIsModalOpen(false)}
        skillId={selectedSkill?.id}
        skillName={selectedSkill?.name}
      />
    </div>
  );
};

export default Skilltest;