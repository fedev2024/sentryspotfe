import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeQuestionsForm = ({ formData, setFormData, errors, companyId }) => {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`);
        const data = await response.json();

        // Parse screening_questions if it's a JSON string
        const screeningQuestions = data.data.screening_questions
          ? JSON.parse(data.data.screening_questions)
          : [];
        setQuestions(screeningQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]); // Fallback to an empty array
      }
    };

    fetchQuestions();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle radio button selection
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">Screening Questions</h2>
      {questions.map((question, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow"
        >
          <label
            htmlFor={`question${index + 1}`}
            className="block text-base font-medium text-gray-800"
          >
            {question.question}
          </label>
          <p className="text-sm text-gray-600 mt-1">{question.description}</p>
          {question.options && question.options.length > 0 ? (
            <div className="space-y-2 mt-3">
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`question${index + 1}_option${optIndex}`}
                    name={`question${index + 1}`}
                    value={option}
                    checked={formData[`question${index + 1}`] === option}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`question${index + 1}_option${optIndex}`}
                    className="ml-3 text-sm text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <textarea
              id={`question${index + 1}`}
              name={`question${index + 1}`}
              value={formData[`question${index + 1}`] || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
              className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              placeholder="Type your answer here..."
            />
          )}
          {errors[`question${index + 1}`] && (
            <p className="mt-2 text-sm text-red-600">
              {errors[`question${index + 1}`]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeeQuestionsForm;

