import React from "react";

const WorkExperienceDropdown = ({ workExperience }) => {
  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label>Work Experience*</label>
      <select id="Experiencetype" name="Experiencetype" required>
        <option value="">Select work experience</option>
        {workExperience.map((exp) => (
          <option key={exp.id} value={exp.id}>
            {exp.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorkExperienceDropdown; 