// import React from "react";

// const WorkExperienceDropdown = ({ workExperience }) => {
//   return (
//     <div className="form-group col-lg-12 col-md-12 font-light">
//       <label>Work Experience*</label>
//       <select id="Experiencetype" name="Experiencetype" required>
//         <option value="">Select work experience</option>
//         {workExperience.map((exp) => (
//           <option key={exp.id} value={exp.id}>
//             {exp.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default WorkExperienceDropdown; 

"use client"

import { useState } from "react"
// import  { UseFormRegister } from "react-hook-form"



const WorkExperienceDropdown = ({ workExperience = [], register, errors }) => {
  const [selectedExperience, setSelectedExperience] = useState("")

  // If no work experience data is provided, use default options
  const experienceOptions =
    workExperience.length > 0
      ? workExperience
      : [
          { id: "1", name: "0-1 year" },
          { id: "2", name: "1-2 years" },
          { id: "3", name: "2-3 years" },
          { id: "4", name: "3-5 years" },
          { id: "5", name: "5-10 years" },
          { id: "6", name: "10+ years" },
        ]

  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">
        Work Experience * <span className="text-sm text-gray-500">How many years of work experience do you have?</span>
      </label>

      {register ? (
        // React Hook Form version
        <>
          <select
            {...register("experience", { required: "Work experience is required" })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select experience level</option>
            {experienceOptions.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.name}
              </option>
            ))}
          </select>
          {errors?.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
        </>
      ) : (
        // Standalone version
        <select
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select experience level</option>
          {experienceOptions.map((exp) => (
            <option key={exp.id} value={exp.id}>
              {exp.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default WorkExperienceDropdown
