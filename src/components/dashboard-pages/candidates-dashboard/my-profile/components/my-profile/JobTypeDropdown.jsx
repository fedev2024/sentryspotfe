import React from "react";

const JobTypeDropdown = ({ jobTypes }) => {
  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label>Job-Type*</label>
      <div className="job-type-container row">
        {jobTypes.map((type) => (
          <div key={type.id} className="checkbox-wrapper col-lg-3 flex mt-1 gap-2">
            <input type="checkbox" id={`jobtype-${type.id}`} value={type.id} />
            <label htmlFor={`jobtype-${type.id}`}>{type.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTypeDropdown; 