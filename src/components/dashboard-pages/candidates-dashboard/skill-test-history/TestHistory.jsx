// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Constant } from '@/utils/constant/constant';

// function Skillhistory() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem(Constant.USER_TOKEN);

//     axios.get('https://api.sentryspot.co.uk/api/user/skill-assessment-history', {
//       headers: {
//         Authorization: token
//       }
//     })
//       .then(response => {
//         // Ensure response.data.data is an array before setting state
//         const data = Array.isArray(response.data.data) ? response.data.data : [];
//         setUsers(data);
//       })
//       .catch(error => console.error('Error fetching user data:', error));
//   }, []);

//   return (
//     <>
//       <h5 className="text-2xl font-bold mb-6 ms-5">Skill History</h5>
//       <div className="container mx-auto p-4 text-center">
//         <div className="overflow-x-auto">
//           {users.length === 0 ? (
//             <p className="text-lg text-gray-500">There is no data available.</p>
//           ) : (
//             <table className="min-w-full bg-dark text-black rounded-md text-center">
//               <thead>
//                 <tr className="bg-violet-900 text-white">
//                   <th className="py-2 px-4">Date / Time</th>
//                   <th className="py-2 px-4">Skill Name</th>
//                   <th className="py-2 px-4">Verification Status</th>
//                   <th className="py-2 px-4">Total Questions</th>
//                   <th className="py-2 px-4">Right Answers</th>
//                   <th className="py-2 px-4">Wrong Answers</th>
//                   <th className="py-2 px-4">Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, index) => (
//                   <tr key={index} className="border border-gray-700 text-center">
//                     <td className="py-2 px-4">{user.date_time || "N/A"}</td>
//                     <td className="py-2 px-4">{user.skill_name || "N/A"}</td>
//                     <td className="py-2 px-4">{user.is_verified ? "Verified" : "Not Verified"}</td>
//                     <td className="py-2 px-4">{user.results.total_question}</td>
//                     <td className="py-2 px-4">{user.results.right_answer}</td>
//                     <td className="py-2 px-4">{user.results.wrong_answer}</td>
//                     <td className="py-2 px-4">{user.results.Percentage}%</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Skillhistory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-12 h-12 border-4 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const SkillHistory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skillname,setSkillName] = useState("")

  useEffect(() => {
    const fetchSkillHistory = async () => {
      try {
        const token = localStorage.getItem(Constant.USER_TOKEN);
        
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(
          'https://api.sentryspot.co.uk/api/jobseeker/skill-assessment-history',
          {
            headers: {
              Authorization: token
            }
          }
        );
          console.log(response.data.data,"sttttt");
        // Check if the response has the expected structure
        if (response.data?.status === 'success' && Array.isArray(response.data?.data)) {
          setUsers(response.data.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching skill history:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg">
        <p className="text-center text-red-600">Error loading skill history: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      {/* <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Skill History</h1>
      </div> */}

      {/* Content */}
      <div className="p-6">
        <div className="overflow-x-auto">
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">
                No skill assessment history available.
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-blue-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Date / Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Skill Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Correct
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Incorrect
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.date_time || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.skill_assessment.skill_name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.is_verified 
                            ? "bg-green-100 text-green-800 px-2 py-2" 
                            : "bg-red-300 text-red-800 p-2"
                        }`}
                      >
                        {user.is_verified ? "Passed" : "Failed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                      {user.results?.total_question || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                      {user.results?.right_answer || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                      {user.results?.wrong_answer || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span 
                        className={`text-sm font-medium ${
                          parseFloat(user.results?.Percentage) >= 70 
                            ? "text-green-600" 
                            : "text-red-600"
                        }`}
                      >
                        {user.results?.Percentage || "0"}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillHistory;