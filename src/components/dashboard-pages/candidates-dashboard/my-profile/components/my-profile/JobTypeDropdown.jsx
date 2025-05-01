// import React from "react";

// const JobTypeDropdown = ({ jobTypes }) => {
//   return (
//     <div className="form-group col-lg-12 col-md-12 font-light">
//       <label>Job-Type*</label>
//       <div className="job-type-container row">
//         {jobTypes.map((type) => (
//           <div key={type.id} className="checkbox-wrapper col-lg-3 flex mt-1 gap-2">
//             <input type="checkbox" id={`jobtype-${type.id}`} value={type.id} />
//             <label htmlFor={`jobtype-${type.id}`}>{type.name}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobTypeDropdown; 

import React from "react";
import { Controller } from "react-hook-form";

const JobTypeDropdown = ({ jobTypes, control, setValue, errors }) => {
  // Function to handle checkbox changes
  const handleCheckboxChange = (jobTypeId, currentSelected) => {
    // Check if this job type is already in the array
    const isSelected = currentSelected.some(item => item.value === jobTypeId);
    
    // Create updated selection
    let updatedSelection;
    if (isSelected) {
      // Remove if already selected
      updatedSelection = currentSelected.filter(item => item.value !== jobTypeId);
    } else {
      // Add if not selected
      const jobType = jobTypes.find(type => type.id === jobTypeId);
      updatedSelection = [
        ...currentSelected,
        { value: jobTypeId, label: jobType.name }
      ];
    }
    
    // Update the form value
    setValue("job_type", updatedSelection);
    return updatedSelection;
  };

  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">Job Type*</label>
      
      <Controller
        name="job_type"
        control={control}
        rules={{ required: "Please select at least one job type" }}
        defaultValue={[]}
        render={({ field }) => (
          <div className="job-type-container row">
            {jobTypes.map((type) => {
              // Check if this job type is already selected
              const isChecked = Array.isArray(field.value) && 
                field.value.some(item => item.value === type.id);
              
              return (
                <div key={type.id} className="checkbox-wrapper col-lg-3 flex mt-1 gap-2">
                  <input
                    type="checkbox"
                    id={`jobtype-${type.id}`}
                    checked={isChecked}
                    onChange={() => {
                      // Update the field value and re-render
                      const newValue = handleCheckboxChange(type.id, field.value || []);
                      field.onChange(newValue);
                    }}
                    className="cursor-pointer"
                  />
                  <label 
                    htmlFor={`jobtype-${type.id}`}
                    className="cursor-pointer"
                  >
                    {type.name}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      />
      
      {errors.job_type && (
        <p className="text-red-500 text-sm mt-1">{errors.job_type.message}</p>
      )}
    </div>
  );
};

export default JobTypeDropdown;