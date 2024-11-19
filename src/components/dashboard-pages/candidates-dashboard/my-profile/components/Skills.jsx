// import React, { useState } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant";
// const Skills = ({ onNext }) => {
//   const [skills, setSkills] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && inputValue.trim()) {
//       e.preventDefault();
//       if (!skills.includes(inputValue.trim())) {
//         setSkills([...skills, inputValue.trim()]);
//       }
//       setInputValue("");
//     }
//   };

//   const handleRemoveSkill = (skillToRemove) => {
//     setSkills(skills.filter((skill) => skill !== skillToRemove));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {

// const token = localStorage.getItem(Constant.USER_TOKEN)

//       // Convert the skills array to a comma-separated string
//       const skillsString = skills.join(",");

//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/skills",
//         { skills: skillsString },
//         {
//           headers: {
//             Authorization: token, // Add token if needed
//           },
//         }
//       );
//       console.log("Skills submitted successfully:", response.data);

//       // After successful submission, go to the next tab
//       onNext();
//     } catch (error) {
//       console.error("Error submitting skills:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <h5 className="text-xl">Skills</h5>
//         <div className="form-group col-lg-12 col-md-12 my-4">
//           <p>Add Skills with AI & manual (Maximum 15):</p>
//           <div className="border rounded flex items-center flex-wrap gap-2 p-3">
//             {skills.map((skill, index) => (
//               <div
//                 key={index}
//                 className="bg-blue-800 text-white px-2 rounded-xl py-2 flex items-center"
//               >
//                 <span className="mr-2">{skill}</span>
//                 <button
//                   type="button"
//                   className="text-white ml-1"
//                   onClick={() => handleRemoveSkill(skill)}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="border-none focus:outline-none flex-grow"
//               placeholder="Enter a skill"
//             />
//           </div>
//         </div>

//         <div className="form-group col-lg-12 col-md-12">
//           <button
//             type="submit"
//             className="theme-btn btn-style-one bg-blue-800"
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save & Next ➤"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Skills;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const Skills = ({ onNext, selectedRoles = [] }) => {
  const [skills, setSkills] = useState([]);
  const [fetchedSkills, setFetchedSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedRoles.length > 0) {
      fetchSkillsForRoles(selectedRoles);
    }
  }, [selectedRoles]);

  const fetchSkillsForRoles = async (roles) => {
    setFetching(true);
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/fetch-skills",
        { roles },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data && Array.isArray(response.data.skills)) {
        setFetchedSkills(response.data.skills);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setFetching(false);
    }
  };

  // Handle adding custom skills
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!skills.includes(inputValue.trim())) {
        setSkills([...skills, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleAddFetchedSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);

      // Convert the skills array to a comma-separated string
      const skillsString = skills.join(",");
      const languagesData = languages.map((lang) => ({
        name: lang.name,
        proficiency: lang.proficiency,
      }));

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/skills-and-languages",
        { skills: skillsString, languages: languagesData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Data submitted successfully:", response.data);

      // After successful submission, go to the next tab
      onNext();
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h5 className="text-xl">Skills</h5>

        {/* Fetched Skills */}
        {fetching ? (
          <p>Loading skills for selected roles...</p>
        ) : fetchedSkills.length > 0 ? (
          <div className="mb-4">
            <p>Suggested Skills (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {fetchedSkills.map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddFetchedSkill(skill)}
                  className="border border-blue-800 text-blue-800 px-2 rounded-lg hover:bg-blue-800 hover:text-white"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Add Custom Skills */}
        <div className="form-group col-lg-12 col-md-12 my-4">
          <p>Add Skills manually (Maximum 15):</p>
          <div className="border rounded flex items-center flex-wrap gap-2 p-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-800 text-white px-2 rounded-xl py-2 flex items-center"
              >
                <span className="mr-2">{skill}</span>
                <button
                  type="button"
                  className="text-white ml-1"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none focus:outline-none flex-grow"
              placeholder="Enter a skill"
              disabled={skills.length >= 15}
            />
          </div>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one bg-blue-800"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Next ➤"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Skills;
