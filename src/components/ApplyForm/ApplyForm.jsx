import React, { useState } from 'react';
import PersonalInfoForm from './PersonalForm';
import EmployeeQuestionsForm from './EmployeeQuestions';
import WorkExperienceForm from './AddtionalInfo';
import ReviewForm from './ReviewFrom';
import ProgressBar from './ProgressBar';
import { validatePersonalInfo, validateEmployeeQuestions, validateWorkExperience } from './Validation';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/store/slices/service/axiosInstance';

const ApplyForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      resumeOption: '',
      coverLetterOption: '',
      resumeFile: null,
      coverLetterFile: null,
      resumePath: '',
      coverLetterPath: '',
      screeningQuestions: [],
      workExperience: [],
      education: [],
      certifications: [],
      skills: '',
    });
    const [errors, setErrors] = useState({});
  
    const nextStep = () => {
      setStep(step + 1);
    };

    const prevStep = () => {
      setStep(step - 1);
    };
  
    const handleSubmit = async () => {
      try {
        setIsSubmitting(true);

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          toast.error('Please fill in all required fields');
          return;
        }

        // Validate screening questions
        if (!formData.screeningQuestions || formData.screeningQuestions.length === 0) {
          toast.error('Please complete all screening questions');
          return;
        }

        // Log the data being sent
        console.log('Submitting form data:', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          screeningQuestions: formData.screeningQuestions,
          resumeFile: formData.resumeFile ? 'File present' : 'No file',
          coverLetterFile: formData.coverLetterFile ? 'File present' : 'No file'
        });

        // Create FormData object
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('first_name', formData.firstName);
        formDataToSubmit.append('last_name', formData.lastName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('phone_no', formData.phone);
        
        // Append resume file if exists
        if (formData.resumeFile) {
          formDataToSubmit.append('resume_upload', formData.resumeFile);
        }
        
        // Append cover letter file if exists
        if (formData.coverLetterFile) {
          formDataToSubmit.append('cover_letter_upload', formData.coverLetterFile);
        }
        
        formDataToSubmit.append('resume_path', formData.resumePath || '');
        formDataToSubmit.append('cover_letter_path', formData.coverLetterPath || '');
        formDataToSubmit.append('screening_questions_answer', JSON.stringify(formData.screeningQuestions));

        // Log the FormData contents
        for (let pair of formDataToSubmit.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

        // Submit the application
        const response = await axiosInstance.post(
          `/jobseeker/apply-for-job/${jobId}`,
          formDataToSubmit,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        
  
        if (response.data.status === 'success') {
          toast.success('Application submitted successfully!');
          navigate('/candidates-dashboard/applied-jobs');
        } else {
          toast.error(response.data.message || 'Failed to submit application');
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const renderForm = () => {
      switch (step) {
        case 1:
          return <PersonalInfoForm formData={formData} setFormData={setFormData} errors={errors} />;
        case 2:
          return <EmployeeQuestionsForm 
            formData={formData} 
            setFormData={setFormData} 
            errors={errors}
            jobId={jobId}
          />;
        case 3:
          return <ReviewForm formData={formData} />;
        default:
          return null;
      }
    };
  
    return (
      <div className="max-w-5xl mx-auto p-4">
        <ProgressBar currentStep={step} totalSteps={3} />
        <h2 className="text-2xl font-bold mb-4">
          {step === 1 && 'Personal Information'}
          {step === 2 && 'Questions'}
          {step === 3 && 'Review & Submit'}
        </h2>
        {renderForm()}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    );
  };

export default ApplyForm;

