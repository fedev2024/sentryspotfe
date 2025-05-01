

// import React, { useState } from "react";

import { useState } from "react";

// const TitleAutocomplete = ({ titles }) => {
//   // console.log(titles,"jobtitle");
//   const [query, setQuery] = useState(""); // Stores user input
//   const [filteredTitles, setFilteredTitles] = useState([]); // Stores filtered titles
//   const [showDropdown, setShowDropdown] = useState(false); // Toggles dropdown visibility

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     // Filter titles based on the query
//     if (value.trim()) {
//       const results = titles.filter((title) =>
//         title.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredTitles(results);
//       setShowDropdown(true);
//     } else {
//       setFilteredTitles([]);
//       setShowDropdown(false);
//     }
//   };

//   const handleSelect = (title) => {
//     setQuery(title.name); // Update input with selected title
//     setShowDropdown(false); // Close dropdown
//   };

//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label htmlFor="job-title">Job Title*</label>
//       <input
//         type="text"
//         id="job-title"
//         name="job_title"
//         required
//         value={query}
//         onChange={handleInputChange}
//         className="border font-normal rounded-none mb-4 w-full px-2 py-1"
//         placeholder="Type a job title"
//         autoComplete="off"
//       />
//       {showDropdown && filteredTitles.length > 0 && (
//         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md">
//           {filteredTitles.map((title) => (
//             <li
//               key={title.id}
//               onClick={() => handleSelect(title)}
//               className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//             >
//               {title.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };



 const TitleAutocomplete = ({ titles, register, setValue }) => {
  const [query, setQuery] = useState("");
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const results = titles.filter((title) =>
        title.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTitles(results);
      setShowDropdown(true);
    } else {
      setFilteredTitles([]);
      setShowDropdown(false);
    }

    // Always update React Hook Form too:
    setValue("job_title", value);
  };

  const handleSelect = (title) => {
    setQuery(title.name);
    setShowDropdown(false);
    setValue("job_title", title.name); // ✅ Set selected value in React Hook Form
  };

  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label htmlFor="job-title">Job Title*</label>
      <input
        type="text"
        id="job-title"
        {...register("job_title", { required: true })}
        value={query}
        onChange={handleInputChange}
        className="border font-normal rounded-none mb-4 w-full px-2 py-1"
        placeholder="Type a job title"
        autoComplete="off"
      />
      {showDropdown && filteredTitles.length > 0 && (
        <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md">
          {filteredTitles.map((title) => (
            <li
              key={title.id}
              onClick={() => handleSelect(title)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {title.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TitleAutocomplete;
