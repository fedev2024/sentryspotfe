// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant";
// import toast from "react-hot-toast";

// const ProfileVisalbilty = ({ onNext }) => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

//   const [designation, setDesignation] = useState("");
//   const [organization, setOrganization] = useState("");
//   const [timePeriodStart, setTimePeriodStart] = useState("");
//   const [timePeriodEnd, setTimePeriodEnd] = useState("");
//   const [isPresent, setIsPresent] = useState(0); // 1 for present, 0 for not present
//   const [Salarytype, setSalarytype] = useState([]);
//   const [selectSalarytype, setselectSalarytype] = useState("");

//   useEffect(() => {
//     axios
//       .get(`${baseurl}salary-range`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         setSalarytype(response.data.data);
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = [
//       {
//         designation,
//         organization,
//         annual_salary_id: parseInt(selectSalarytype, 10), // Convert to integer
//         time_period_start: timePeriodStart,
//         time_period_end: timePeriodEnd,
//         is_present: isPresent,
//       }
//     ];

//     try {
//       await axios.put(`${baseurl}user-profile-professional`, payload, {
//         headers: {
//           Authorization: token,
//           'Content-Type': 'application/json'
//         },
//       });
//       toast.success("Professional details saved successfully!");
//       onNext();  // Move to the next step
//     } catch (error) {
//       toast.error("Failed to save professional details.");
//     }
//   };

//   return (
//     <form className="default-form" onSubmit={handleSubmit}>
//       <div className="row">
//         <div className="form-group col-lg-12 col-md-12">
//           <label>Designation</label>
//           <input
//             type="text"
//             name="designation"
//             value={designation}
//             onChange={(e) => setDesignation(e.target.value)}
//             placeholder="Enter your designation"
//             required
//           />
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>Organization</label>
//           <input
//             type="text"
//             name="organization"
//             value={organization}
//             onChange={(e) => setOrganization(e.target.value)}
//             placeholder="Enter organization name"
//             required
//           />
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>Salary-Range (INR)</label>
//           <select
//             id="Salarytype"
//             name="Salarytype"
//             value={selectSalarytype}
//             onChange={(e) => setselectSalarytype(e.target.value)}
//           >
//             <option value="">Select a Salary</option>
//             {Salarytype.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//   <label>Time Period Start</label>
//   <input
//     type="date"
//     name="timePeriodStart"
//     value={timePeriodStart}
//     onChange={(e) => setTimePeriodStart(e.target.value)}
//     required
//     style={{backgroundColor:"#F0F5F7"}}
//     className="form-control text-lg p-3 rounded-lg border-0 w-full font-thin" // Added to match the style
//     placeholder="Select start date"  // Added for consistency
//   />
// </div>

// <div className="form-group col-lg-6 col-md-12">
//   <label>Time Period End</label>
//   <input
//     type="date"
//     name="timePeriodEnd"
//     value={timePeriodEnd}
//     onChange={(e) => setTimePeriodEnd(e.target.value)}
//     required={!isPresent}
//     disabled={isPresent === 1}
//     style={{backgroundColor:"#F0F5F7"}}
//     className="form-control text-lg p-3 rounded-lg border-0 w-full font-thin"  // Added to match the style
//     placeholder="Select end date"  // Added for consistency
//   />
// </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>
//             <input
//               type="checkbox"
//               checked={isPresent === 1}
//               onChange={(e) => setIsPresent(e.target.checked ? 1 : 0)}
//             />
//             Currently working here
//           </label>
//         </div>

//         <div className="form-group col-lg-7 col-md-12">
//           <button type="submit" className="theme-btn btn-style-one bg-blue-950">
//             Save & Next ➤
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ProfileVisalbilty;

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import TitleDropdown from "./TitleDropdown";

const ProfileVisibility = ({ onNext }) => {
  const [forms, setForms] = useState([
    {
      id: Date.now(),
      jobTitle: "",
      company: "",
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
      isPresent: false,
      description: "",
    },
  ]);
  const [charLimit] = useState(2000);
  const [jobTitle, setJobTitle] = useState();

  // Handle input changes for a specific form
  const handleChange = (id, field, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, [field]: value } : form
      )
    );
  };

  // Add a new form
  const handleAddForm = () => {
    setForms((prevForms) => [
      ...prevForms,
      {
        id: Date.now(),
        jobTitle: "",
        company: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        isPresent: false,
        description: "",
      },
    ]);
    toast.success("New form added!");
  };

  // Delete a specific form
  const handleDeleteForm = (id) => {
    setForms((prevForms) => prevForms.filter((form) => form.id !== id));
    toast.success("Form deleted successfully!");
  };

  // Save all forms (or send data to the backend)
  const handleSaveAll = () => {
    console.log("Saving all forms:", forms); // Replace with API call
    toast.success("All forms saved successfully!");
    onNext();
  };

  const fetchJobTitle = async () => {
    const jobTypeResponse = await axios.get(
      `https://api.sentryspot.co.uk/api/employeer/job-titles`
    );
    console.log(jobTypeResponse, ">>>>>>");
    if (jobTypeResponse && jobTypeResponse.data.data) {
      setJobTitle(jobTypeResponse.data.data);
    }
  };
  fetchJobTitle();

  return (
    <div>
      {/* <h3>Profile Visibility</h3> */}
      {forms.map((form, index) => (
        <form key={form.id} className="default-form mb-4">
          <div className="row">
            {/* Job Title */}
            {/* <div className="form-group col-lg-6 col-md-12">
              <label>Job title*</label>
              <input
                type="text"
                name="jobTitle"
                value={form.jobTitle}
                onChange={(e) =>
                  handleChange(form.id, "jobTitle", e.target.value)
                }
                placeholder="e.g., HR Manager"
                required
                className="form-control"
              />
            </div> */}
            {/* <JobTypeDropdown jobTypes={jobTitle} /> */}
            <TitleDropdown titles={jobTitle} />

            {/* Company */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Company*</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(e) =>
                  handleChange(form.id, "company", e.target.value)
                }
                placeholder="e.g., Birla"
                required
                className="form-control"
              />
            </div>

            {/* From Month and Year */}
            <div className="form-group col-lg-6 col-md-6">
              <label>From Month*</label>
              <input
                type="text"
                name="fromMonth"
                value={form.fromMonth}
                onChange={(e) =>
                  handleChange(form.id, "fromMonth", e.target.value)
                }
                placeholder="e.g., January"
                required
                className="form-control"
              />
            </div>
            <div className="form-group col-lg-6 col-md-6">
              <label>From Year*</label>
              <input
                type="number"
                name="fromYear"
                value={form.fromYear}
                onChange={(e) =>
                  handleChange(form.id, "fromYear", e.target.value)
                }
                placeholder="e.g., 2022"
                required
                className="form-control"
              />
            </div>

            {/* To Month and Year */}
            <div className="form-group col-lg-6 col-md-6">
              <label>To Month*</label>
              <input
                type="text"
                name="toMonth"
                value={form.toMonth}
                onChange={(e) =>
                  handleChange(form.id, "toMonth", e.target.value)
                }
                placeholder="e.g., March"
                disabled={form.isPresent}
                required={!form.isPresent}
                className="form-control"
              />
            </div>
            <div className="form-group col-lg-6 col-md-6">
              <label>To Year*</label>
              <input
                type="number"
                name="toYear"
                value={form.toYear}
                onChange={(e) =>
                  handleChange(form.id, "toYear", e.target.value)
                }
                placeholder="e.g., 2023"
                disabled={form.isPresent}
                required={!form.isPresent}
                className="form-control"
              />
            </div>

            {/* Currently Working Here */}
            {/* <div className="form-group col-lg-12 col-md-12 p-2">
              <label>
                <input
                  type="checkbox"
                  checked={form.isPresent}
                  onChange={(e) =>
                    handleChange(form.id, "isPresent", e.target.checked)
                  }
                />
                I currently work here
              </label>
            </div> */}
            <div className="flex items-center space-x-2 col-lg-12 col-md-12 mb-4">
              <input
                type="checkbox"
                id={`present-${form.id}`}
                className="w-5 h-5 accent-blue-600 cursor-pointer"
                checked={form.isPresent}
                onChange={(e) =>
                  handleChange(form.id, "isPresent", e.target.checked)
                }
              />
              <label
                htmlFor={`present-${form.id}`}
                className="text-gray-700 text-sm md:text-base cursor-pointer"
              >
                I currently work here
              </label>
            </div>

            {/* Description */}
            <div className="form-group col-lg-12 col-md-12">
              <label>What did you do there?</label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) =>
                  handleChange(
                    form.id,
                    "description",
                    e.target.value.slice(0, charLimit) // Limit characters
                  )
                }
                placeholder="Describe your role and responsibilities"
                rows="4"
                className="form-control"
              />
              <small>
                {charLimit - form.description.length} characters remaining
              </small>
            </div>

            {/* Delete Button */}
            {index > 0 && (
              <div className="form-group col-lg-12 col-md-12 text-right">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteForm(form.id)}
                >
                  Delete Entry
                </button>
              </div>
            )}
          </div>
        </form>
      ))}

      {/* Add Another and Save All Buttons */}
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddForm}
        >
          Save and Add Another
        </button>
        <button
          type="button"
          className="theme-btn btn-style-one bg-blue-950"
          onClick={handleSaveAll}
        >
          Save & Next ➤
        </button>
      </div>
    </div>
  );
};

export default ProfileVisibility;

// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const ProfileVisibility = () => {
//   const defaultSectors = {
//     "Cyber Security": [
//       "Cybersecurity Analyst",
//       "Network Security Engineer",
//       "Security Consultant",
//       "Penetration Tester (Ethical Hacker)",
//       "Cybersecurity Architect",
//       "Incident Response Manager",
//       "Chief Information Security Officer (CISO)",
//     ],
//     "Security & Safety": [
//       "CCTV Operator",
//       "Counter Terrorist Cleared",
//       "Environmental Safety Specialist",
//       "Event Safety Steward",
//       "Fire Safety Officer",
//     ],
//   };

//   const [sectors, setSectors] = useState(defaultSectors);
//   const [selectedSector, setSelectedSector] = useState("");
//   const [newSector, setNewSector] = useState("");
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [customRoles, setCustomRoles] = useState([]);
//   const [newRole, setNewRole] = useState("");
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);

//   // Handle sector selection
//   const handleSectorChange = (e) => {
//     const value = e.target.value;
//     if (value === "add-new-sector") {
//       setNewSector("");
//     }
//     setSelectedSector(value);
//     setSelectedRoles([]);
//     setCustomRoles([]);
//   };

//   // Add a custom sector
//   const handleAddNewSector = () => {
//     if (newSector.trim() && !sectors[newSector]) {
//       setSectors((prev) => ({ ...prev, [newSector]: [] }));
//       setSelectedSector(newSector);
//       setNewSector("");
//       toast.success("Custom sector added successfully!");
//     } else {
//       toast.error("Invalid or duplicate sector.");
//     }
//   };

//   // Add a custom role
//   const handleAddCustomRole = () => {
//     if (newRole.trim() && !customRoles.includes(newRole)) {
//       setCustomRoles((prev) => [...prev, newRole]);
//       setNewRole("");
//       toast.success("Custom role added successfully!");
//     } else {
//       toast.error("Invalid or duplicate role.");
//     }
//   };

//   // Handle role selection
//   const handleRoleChange = (role) => {
//     if (selectedRoles.includes(role)) {
//       setSelectedRoles((prev) => prev.filter((r) => r !== role));
//     } else if (selectedRoles.length < 5) {
//       setSelectedRoles((prev) => [...prev, role]);
//     } else {
//       toast.error("You can only select up to 5 roles.");
//     }
//   };

//   // Submit the form
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedSector) {
//       toast.error("Please select a sector.");
//       return;
//     }
//     if (selectedRoles.length === 0) {
//       toast.error("Please select at least one role.");
//       return;
//     }
//     const payload = {
//       selectedSector,
//       selectedRoles,
//     };
//     console.log("Payload:", payload);
//     toast.success("Details saved successfully!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="default-form">
//       <div className="form-group">
//         <label>Sector*</label>
//         <select
//           value={selectedSector}
//           onChange={handleSectorChange}
//           className="form-control"
//           required
//         >
//           <option value="">Select a sector</option>
//           {Object.keys(sectors).map((sector) => (
//             <option key={sector} value={sector}>
//               {sector}
//             </option>
//           ))}
//           <option value="add-new-sector">Add New Sector</option>
//         </select>
//       </div>

//       {/* Add a custom sector */}
//       {selectedSector === "add-new-sector" && (
//         <div className="form-group">
//           <label>Custom Sector</label>
//           <div className="d-flex align-items-center">
//             <input
//               type="text"
//               value={newSector}
//               onChange={(e) => setNewSector(e.target.value)}
//               placeholder="Enter new sector"
//               className="form-control"
//             />
//             <button
//               type="button"
//               onClick={handleAddNewSector}
//               className="btn btn-secondary ml-2"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Roles Section */}
//       {selectedSector && selectedSector !== "add-new-sector" && (
//         <div className="form-group">
//           <label>Roles in {selectedSector} (select up to 5)</label>
//           <div
//             className="dropdown"
//             onClick={() => setShowRoleDropdown(!showRoleDropdown)}
//           >
//             <button type="button" className="btn btn-secondary dropdown-toggle">
//               {selectedRoles.length > 0
//                 ? `${selectedRoles.length} roles selected`
//                 : "Select Roles"}
//             </button>
//             {showRoleDropdown && (
//               <div className="dropdown-menu show role-dropdown">
//                 {[...sectors[selectedSector], ...customRoles].map((role) => (
//                   <label key={role} className="dropdown-item">
//                     <input
//                       type="checkbox"
//                       value={role}
//                       checked={selectedRoles.includes(role)}
//                       onChange={() => handleRoleChange(role)}
//                       disabled={
//                         selectedRoles.length === 5 && !selectedRoles.includes(role)
//                       }
//                     />
//                     {role}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="mt-3">
//             <label>Add a Custom Role</label>
//             <div className="d-flex align-items-center">
//               <input
//                 type="text"
//                 value={newRole}
//                 onChange={(e) => setNewRole(e.target.value)}
//                 placeholder="Enter custom role"
//                 className="form-control"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddCustomRole}
//                 className="btn btn-secondary ml-2"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//           <small>{5 - selectedRoles.length} roles remaining</small>
//         </div>
//       )}

//       <div className="form-group text-right">
//         <button type="submit" className="btn btn-primary">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ProfileVisibility;
