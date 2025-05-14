import React, { useState } from 'react';
import PersonalInfoForm from './PersonalForm';
import EmployeeQuestionsForm from './EmployeeQuestions';
import WorkExperienceForm from './AddtionalInfo';
import ReviewForm from './ReviewFrom';
import ProgressBar from './ProgressBar';
import { validatePersonalInfo, validateEmployeeQuestions, validateWorkExperience } from './Validation';
import { toast } from 'react-toastify';

const ApplyForm = (companyId) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      resumeOption: '',
      coverLetterOption: '',
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: '',
      workExperience: [],
      education: [],
      certifications: [],
      skills: '',
    });
    const [errors, setErrors] = useState({});
  
    // const nextStep = () => {
    //   let validationErrors = {};
    //   switch (step) {
    //     case 1:
    //       validationErrors = validatePersonalInfo(formData);
    //       break;
    //     case 2:
    //       validationErrors = validateEmployeeQuestions(formData);
    //       break;
    //     case 3:
    //       validationErrors = validateWorkExperience(formData);
    //       break;
    //     default:
    //       break;
    //   }
  
    //   if (Object.keys(validationErrors).length === 0) {
    //     setStep(step + 1);
    //     setErrors({});
    //   } else {
    //     setErrors(validationErrors);
    //   }
    // };
    const nextStep = () => {
      setStep(step + 1);
      // setErrors({});
    };
    const prevStep = () => {
      setStep(step - 1);
    };
  
    const handleSubmit = () => {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      toast.success("Applied Successfully")
      // Reset form or redirect user
    };
  
    const renderForm = () => {
      switch (step) {
        case 1:
          return <PersonalInfoForm formData={formData} setFormData={setFormData} errors={errors} />;
        case 2:
          return <EmployeeQuestionsForm formData={formData} companyId={companyId} setFormData={setFormData} errors={errors} />;
        // case 3:
        //   return <WorkExperienceForm formData={formData} setFormData={setFormData} errors={errors} />;
        case 3:
          return <ReviewForm formData={formData} />;
        default:
          return null;
      }
    };
  
    return (
      <div className="max-w-5xl  mx-auto p-4">
        <ProgressBar currentStep={step} totalSteps={3} />
        <h2 className="text-2xl font-bold mb-4">
          {step === 1 && 'Personal Information'}
          {step === 2 && ' Questions'}
          {/* {step === 3 && 'Work Experience & Education'} */}
          {step === 4 && 'Review & Submit'}
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
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  };

export default ApplyForm;

