// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Constant } from '@/utils/constant/constant';

// function Testpaper() {
//   const { skillId, skillName } = useParams();
//   const navigate = useNavigate();

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState({});
//   const [skillAssessmentId, setSkillAssessmentId] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem(Constant.USER_TOKEN);

//     if (!token) {
//       navigate('/');
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         // const response = await axios.get(
          // `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment?skill_id=${parseInt(skillId)}&skill_name=${encodeURIComponent(skillName)}`,
//         //   {
//         //     headers: {
//         //       Authorization: token,
//         //       'Content-Type': 'application/json',
//         //     },
//         //   }
//         // );
//         const response = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment`,
//           {
//             params: {
//               skill_id: parseInt(skillId),
//               skill_name: skillName
//             },
//             headers: {
//               Authorization: token,
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         const { questions, skill_assessment_id } = response.data.data;
//         setQuestions(questions);
//         setSkillAssessmentId(skill_assessment_id);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//         setError(error.message || 'Error fetching questions');
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [skillId, skillName, navigate]);

//   const handleAnswerChange = (questionId, answer) => {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((question) =>
//         question.id === questionId ? { ...question, user_answer: answer } : question
//       )
//     );
//   };

//   const handleSubmit = async () => {
//     const token = localStorage.getItem('token');
//     const jobSeekerId = 1; // Replace with the actual JobSeekerId if needed

//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment/${skillAssessmentId}`,
//         {
//           user_id: parseInt(jobSeekerId, 10), // Ensure user_id is an integer
//           skill_id: parseInt(skillId, 10),
//           skill_name: skillName,
//           questions: questions.map((question) => ({
//             ...question,
//             user_answer: question.user_answer || '',
//           })),
//         },
//         {
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const { results } = response.data.data;
//       setResults(results);
//       setShowResults(true);

//       // Store results in local storage
//       localStorage.setItem('testResults', JSON.stringify({
//         skillName,
//         totalQuestions: results.total_question,
//         rightAnswers: results.right_answer,
//         wrongAnswers: results.wrong_answer,
//         percentage: results.Percentage
//       }));
//     } catch (error) {
//       console.error('Error submitting answers:', error);
//       setError(error.message || 'Error submitting answers');
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const handleBack = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   if (loading) {
//     return <div className="font-bold mx-auto  text-xl"> <div className="w-100  d-flex flex-row justify-content-center align-items-center bg-white p-5 ">
//     <div
//       className="w-75  d-flex flex-column align-items-center "
//       style={{ gap: "7px" }}
//     >
//       <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
//           <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-900 h-64 w-64 pt-20 ps-16">Please Wait..</div>
//         </div>
//       <h2 className='text-blue-950'>Hold On A Second! We're Processing your request...!</h2>
//       <p className="p-0 m-0 " style={{ color: "red", fontWeight: "500" }}>
//         Don't Shut or Back Your Window!
//       </p>
//     </div>
//   </div></div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="flex h-screen w-full">
//       <div className="flex-1 py-24 bg-slate-200 px-5">
//         {showResults ? (
//           <div className="w-100 bg-white d-flex justify-content-center align-items-center text-center ">
//             <div className="w-75 d-flex flex-column align-items-center p-20 font-bold border-2 rounded-lg"  style={{ gap: '12px' }}>
//               {/* Display results here */}
//               <h3 className=''>Total Questions: {results.total_question}</h3>
//               <h3 className='m-2'>Right Answer: {results.right_answer}</h3>
//               <h3>Wrong Answer: {results.wrong_answer}</h3>
//               <h3 className='m-2'>Percentage: {Math.floor(results.Percentage)}%</h3>
//               <button
//                 className="p-2 bg-blue-950 rounded-md text-white hover:bg-blue-950 mt-4"
//                 onClick={handleBack}
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <h1 className="text-2xl mb-4 ms-20">{questions[currentQuestionIndex].question}</h1>
//             <ul className="mb-4">
//               {questions[currentQuestionIndex].options.map((option, index) => (
//                 <li key={index} className="mb-2 ms-20">
//                   <input
//                     type="radio"
//                     id={`option-${index}`}
//                     name="option"
//                     value={option}
//                     checked={questions[currentQuestionIndex].user_answer === option}
//                     onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
//                     className="mr-2"
//                   />
//                   <label htmlFor={`option-${index}`}>{option}</label>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex justify-between ">
//               <button
//                 className={`p-2 bg-blue-950 rounded-md text-white hover:bg-blue-950 mt-4 ${
//                   currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//                 }`}
//                 onClick={handlePrevious}
//                 disabled={currentQuestionIndex === 0}
//               >
//                ↩️ Previous
//               </button>
//               {currentQuestionIndex === questions.length - 1 ? (
//                 <button
//                   className="p-2 bg-green-500 rounded-md text-white hover:bg-green-700"
//                   onClick={handleSubmit}
//                 >
//                  🎓 Submit
//                 </button>
//               ) : (
//                 <button
//                   className="p-2  bg-blue-950 rounded-md text-white hover:bg-blue-950 mt-4"
//                   onClick={handleNext}
//                 >
//                  ↪️ Next
//                 </button>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Testpaper;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Constant } from '@/utils/constant/constant';

// const TestPaper = () => {

//   const { skillId, skillName } = useParams();
//   const navigate = useNavigate();
  
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState({});
//   const [skillAssessmentId, setSkillAssessmentId] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem(Constant.USER_TOKEN);
//     if (!token) {
//       navigate('/login');
//       return;
//     }
// console.log(skillId,skillName,"vhbdbvkhd");
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment?skill_id=${parseInt(skillId)}&skill_name=${encodeURIComponent(skillName)}`,
//           {
//             // params: {
//             //   skill_id: parseInt(skillId),
//             //   skill_name: skillName
//             // },
//             headers: {
//               Authorization: token,
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         console.log(response ,"qaaaaa");

//         const { questions, skill_assessment_id } = response.data.data;
//         setQuestions(questions);
//         setSkillAssessmentId(skill_assessment_id        );
//         setLoading(false);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch questions');
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [skillId, skillName, navigate]);

//   const handleAnswerSelect = (questionId, selectedAnswer) => {
//     setQuestions(prevQuestions =>
//       prevQuestions.map(question =>
//         question.id === questionId 
//           ? { ...question, user_answer: selectedAnswer }
//           : question
//       )
//     );
//   };

//   // const handleSubmitTest = async () => {
//   //   const token = localStorage.getItem(Constant.USER_TOKEN);
//   //   if (!token) {
//   //     navigate('/login');
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     const response = await axios.put(
//   //       `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment/${skillAssessmentId}`,
//   //       {
//   //         skill_id: parseInt(skillId),
//   //         skill_name: skillName,
//   //         questions: questions.map(q => ({
//   //           id: q.id,
//   //           question: q.question,
//   //           user_answer: q.user_answer || ''
//   //         }))
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: token,
//   //           'Content-Type': 'application/json',
//   //         },
//   //       }
//   //     );

//   //     const { results } = response.data.data;
//   //     setResults(results);
//   //     setShowResults(true);
//   //     setLoading(false);

//   //     localStorage.setItem('testResults', JSON.stringify({
//   //       skillName,
//   //       totalQuestions: results.total_question,
//   //       rightAnswers: results.right_answer,
//   //       wrongAnswers: results.wrong_answer,
//   //       percentage: results.Percentage
//   //     }));
//   //   } catch (err) {
//   //     setError(err.message || 'Failed to submit test');
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmitTest = async () => {
//     const token = localStorage.getItem(Constant.USER_TOKEN);
//     const jobSeekerId = 1;

//     if (!token) {
//       navigate('/login2');
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `https://api.sentryspot.co.uk/api/user/skill-assessment/${skillAssessmentId}`,
//         {
//           user_id: parseInt(jobSeekerId, 10),
//           skill_id: parseInt(skillId, 10),
//           skill_name: skillName,
//           questions: questions.map((question) => ({
//             ...question,
//             user_answer: question.user_answer || '',
//           })),
//         },
//         {
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log(response,"chkuu");
//       const { results } = response.data.data;
//       setResults(results);
//       setShowResults(true);

//       localStorage.setItem('testResults', JSON.stringify({
//         skillName,
//         totalQuestions: results.total_question,
//         rightAnswers: results.right_answer,
//         wrongAnswers: results.wrong_answer,
//         percentage: results.Percentage,
//       }));
//     } catch (error) {
//       console.error('Error submitting answers:', error);
//       setError(error.message || 'Error submitting answers');
//     }
//   };
//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">
//             Please Wait
//           </h2>
//           <p className="text-gray-600">
//             Loading your test questions...
//           </p>
//           <p className="text-sm text-red-500 mt-2">
//             Please do not close or refresh the page
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//           <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
//           <p className="text-gray-700">{error}</p>
//           <button 
//             onClick={() => navigate(-1)}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (showResults) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//           <h2 className="text-2xl font-bold text-center mb-6">Test Results</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//               <span className="font-semibold">Total Questions:</span>
//               <span>{results.total_question}</span>
//             </div>
//             <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
//               <span className="font-semibold">Correct Answers:</span>
//               <span className="text-green-600">{results.right_answer}</span>
//             </div>
//             <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
//               <span className="font-semibold">Wrong Answers:</span>
//               <span className="text-red-600">{results.wrong_answer}</span>
//             </div>
//             <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//               <span className="font-semibold">Score:</span>
//               <span className="text-blue-600 font-bold">{Math.floor(results.Percentage)}%</span>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate(-1)}
//             className="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-bold">
//               Question {currentQuestionIndex + 1} of {questions.length}
//             </h1>
//             <span className="text-sm text-gray-500">
//               Skill: {skillName}
//             </span>
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full">
//             <div 
//               className="h-full bg-blue-500 rounded-full transition-all duration-300"
//               style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="mb-8">
//           <h2 className="text-xl mb-6 font-medium">
//             {questions[currentQuestionIndex]?.question}
//           </h2>
//           <div className="space-y-3">
//             {questions[currentQuestionIndex]?.options.map((option, index) => (
//               <label 
//                 key={index}
//                 className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors
//                   ${questions[currentQuestionIndex]?.user_answer === option 
//                     ? 'border-blue-500 bg-blue-50' 
//                     : 'border-gray-200 hover:bg-gray-50'}`}
//               >
//                 <input
//                   type="radio"
//                   name={`question-${questions[currentQuestionIndex]?.id}`}
//                   value={option}
//                   checked={questions[currentQuestionIndex]?.user_answer === option}
//                   onChange={() => handleAnswerSelect(questions[currentQuestionIndex]?.id, option)}
//                   className="w-4 h-4 text-blue-600"
//                 />
//                 <span className="flex-grow">{option}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-between items-center pt-4 border-t">
//           <button
//             onClick={handlePrevious}
//             disabled={currentQuestionIndex === 0}
//             className={`px-6 py-2 rounded-lg transition-colors
//               ${currentQuestionIndex === 0
//                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//           >
//             ← Previous
//           </button>
          
//           {currentQuestionIndex === questions.length - 1 ? (
//             <button
//               onClick={handleSubmitTest}
//               className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//             >
//               Submit Test
//             </button>
//           ) : (
//             <button
//               onClick={handleNext}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Next →
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestPaper;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';

const TestPaper = () => {
  const { skillId, skillName } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});
  const [skillAssessmentId, setSkillAssessmentId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment`,
          {
            params: {
              skill_id: parseInt(skillId),
              skill_name: skillName
            },
            headers: {
              Authorization: ` ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const { questions: fetchedQuestions, skill_assessment_id } = response.data.data;
        
        if (!fetchedQuestions || !Array.isArray(fetchedQuestions)) {
          throw new Error('Invalid questions data received');
        }

        setQuestions(fetchedQuestions);
        setSkillAssessmentId(skill_assessment_id);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [skillId, skillName, navigate]);

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId 
          ? { ...question, user_answer: selectedAnswer }
          : question
      )
    );
  };

  const handleSubmitTest = async () => {
    const token = localStorage.getItem(Constant.USER_TOKEN);
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      
      // Validate that all questions have been answered
      const unansweredQuestions = questions.filter(q => !q.user_answer);
      if (unansweredQuestions.length > 0) {
        setError(`Please answer all questions before submitting. ${unansweredQuestions.length} questions remaining.`);
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment/${skillAssessmentId}`,
        {
          skill_id: parseInt(skillId),
          skill_name: skillName,
          questions: questions.map(question => ({
            id: question.id,
            question: question.question,
            user_answer: question.user_answer
          }))
        },
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
 console.log(response,"test-resilts");
      const { results: testResults } = response.data.data;
      
      // Store results in localStorage
      const resultsData = {
        skillName,
        totalQuestions: testResults.total_question,
        rightAnswers: testResults.right_answer,
        wrongAnswers: testResults.wrong_answer,
        percentage: testResults.Percentage
      };
      
      localStorage.setItem('testResults', JSON.stringify(resultsData));
      
      setResults(testResults);
      setShowResults(true);
      setLoading(false);
    } catch (err) {
      console.error('Error submitting test:', err);
      setError(err.response?.data?.message || err.message || 'Failed to submit test');
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Please Wait
          </h2>
          <p className="text-gray-600">
            Loading your test questions...
          </p>
          <p className="text-sm text-red-500 mt-2">
            Please do not close or refresh the page
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Test Results for {skillName}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Total Questions:</span>
              <span>{results.total_question}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-semibold">Correct Answers:</span>
              <span className="text-green-600">{results.right_answer}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="font-semibold">Wrong Answers:</span>
              <span className="text-red-600">{results.wrong_answer}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-semibold">Score:</span>
              <span className="text-blue-600 font-bold">{Math.floor(results.Percentage)}%</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/candidates-dashboard/dashboard')}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">No questions available</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h1>
            <span className="text-sm text-gray-500">
              Skill: {skillName}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl mb-6 font-medium">
            {currentQuestion.question}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label 
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors
                  ${currentQuestion.user_answer === option 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={currentQuestion.user_answer === option}
                  onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="flex-grow">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg transition-colors
              ${currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            ← Previous
          </button>
          
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitTest}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPaper;