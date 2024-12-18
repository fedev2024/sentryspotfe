import React from 'react';

const ReviewForm = ({ formData = {} }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        <p>Name: {formData?.firstName || 'N/A'} {formData?.lastName || 'N/A'}</p>
        <p>Email: {formData?.email || 'N/A'}</p>
        <p>Phone: {formData?.phone || 'N/A'}</p>
        <p>Location: {formData?.location || 'N/A'}</p>
        <p>Resume: {formData?.resumeOption || 'N/A'}</p>
        <p>Cover Letter: {formData?.coverLetterOption || 'N/A'}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Employee Questions</h3>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <p key={num}>Question {num}: {formData?.[`question${num}`] || 'N/A'}</p>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        {formData?.workExperience?.map((exp, index) => (
          <div key={index}>
            <p>Company: {exp.company || 'N/A'}</p>
            <p>Position: {exp.position || 'N/A'}</p>
            <p>Duration: {exp.duration || 'N/A'}</p>
          </div>
        )) || <p>No work experience provided</p>}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        {formData?.education?.map((edu, index) => (
          <div key={index}>
            <p>Institution: {edu.institution || 'N/A'}</p>
            <p>Degree: {edu.degree || 'N/A'}</p>
            <p>Year: {edu.year || 'N/A'}</p>
          </div>
        )) || <p>No education information provided</p>}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
        {formData?.certifications?.map((cert, index) => (
          <div key={index}>
            <p>Name: {cert.name || 'N/A'}</p>
            <p>Issuer: {cert.issuer || 'N/A'}</p>
            <p>Year: {cert.year || 'N/A'}</p>
          </div>
        )) || <p>No certifications provided</p>}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <p>{formData?.skills || 'No skills provided'}</p>
      </div>
    </div>
  );
};

export default ReviewForm;

