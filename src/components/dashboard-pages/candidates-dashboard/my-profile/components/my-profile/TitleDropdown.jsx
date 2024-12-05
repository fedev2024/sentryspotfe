import React from "react";

const TitleDropdown = ({ titles }) => {
  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label>Job Title*</label>
      <select name="job_title" required className="border font-light rounded-none mb-4">
        <option value="">Select a job title</option>
        {titles.map((title) => (
          <option key={title.id} value={title.id}>
            {title.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TitleDropdown; 