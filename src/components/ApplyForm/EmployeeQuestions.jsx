import React from 'react';

const EmployeeQuestionsForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const questions = [
    "What are your salary expectations?",
    "When can you start?",
    "Are you willing to relocate?",
    "Do you have any certifications relevant to this position?",
    "What is your preferred work environment?",
    "How did you hear about this position?"
  ];

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index}>
          <label htmlFor={`question${index + 1}`} className="block text-sm font-medium text-gray-700">{question}</label>
          <textarea
            id={`question${index + 1}`}
            name={`question${index + 1}`}
            value={formData[`question${index + 1}`] || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
          />
          {errors[`question${index + 1}`] && <p className="mt-1 text-sm text-red-600">{errors[`question${index + 1}`]}</p>}
        </div>
      ))}
    </div>
  );
};

export default EmployeeQuestionsForm;

