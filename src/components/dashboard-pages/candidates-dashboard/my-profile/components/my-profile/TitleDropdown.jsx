// import React from "react";

// const TitleDropdown = ({ titles }) => {
//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label>Job Title*</label>
//       <select name="job_title" required className="border font-light rounded-none mb-4">
//         <option value="">Select a job title</option>
//         {titles.map((title) => (
//           <option key={title.id} value={title.id}>
//             {title.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default TitleDropdown; 


import React, { useState } from "react";

const TitleAutocomplete = ({ titles }) => {
  // console.log(titles,"jobtitle");
  const [query, setQuery] = useState(""); // Stores user input
  const [filteredTitles, setFilteredTitles] = useState([]); // Stores filtered titles
  const [showDropdown, setShowDropdown] = useState(false); // Toggles dropdown visibility

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter titles based on the query
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
  };

  const handleSelect = (title) => {
    setQuery(title.name); // Update input with selected title
    setShowDropdown(false); // Close dropdown
  };

  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label htmlFor="job-title">Job Title*</label>
      <input
        type="text"
        id="job-title"
        name="job_title"
        required
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
