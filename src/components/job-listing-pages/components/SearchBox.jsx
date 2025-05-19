
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addKeyword } from "../../../features/filter/filterSlice";

// const SearchBox = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { jobList } = useSelector((state) => state.filter);
//   const dispatch = useDispatch();

//   // Initialize state from URL or Redux store
//   const [getKeyWord, setkeyWord] = useState(
//     searchParams.get('keywords') || jobList.keyword || ''
//   );

//   // Keyword handler to update both Redux and URL
//   const keywordHandler = (e) => {
//     const keyword = e.target.value;
    
//     // Update Redux store
//     dispatch(addKeyword(keyword));
    
//     // Update URL parameters
//     const currentParams = Object.fromEntries(searchParams);
//     if (keyword) {
//       currentParams['keywords'] = keyword;
//     } else {
//       delete currentParams['keywords'];
//     }
//     setSearchParams(currentParams);
//   };

//   // Synchronize state with URL or Redux changes
//   useEffect(() => {
//     // Priority: URL params > Redux store
//     const urlKeyword = searchParams.get('keywords');
//     if (urlKeyword !== null) {
//       setkeyWord(urlKeyword);
//       dispatch(addKeyword(urlKeyword));
//     } else {
//       setkeyWord(jobList.keyword);
//     }
//   }, [searchParams, jobList.keyword, dispatch]);

//   return (
//     <>
//       <input
//         type="text"
//         name="listing-search"
//         placeholder="Job title, keywords, or company"
//         value={getKeyWord}
//         onChange={keywordHandler}
//       />
//       <span className="icon flaticon-search-3"></span>
//     </>
//   );
// };

// export default SearchBox;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addKeyword } from "../../../features/filter/filterSlice";
import axios from "axios";
import { Search } from "lucide-react";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // States for autocomplete and search
  const [getKeyWord, setKeyWord] = useState(
    searchParams.get('keywords') || jobList.keyword || ''
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredTitles, setFilteredTitles] = useState([]);

  // Fetch job titles from API using axios
  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-title");
        setFilteredTitles(response.data.data);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };
    fetchJobTitles();
  }, []);

  // Handle input changes for autocomplete
  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setKeyWord(keyword);

    // Filter titles based on input
    if (keyword.trim()) {
      const results = filteredTitles.filter((title) =>
        title.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredTitles(results);
      setShowDropdown(true);
    } else {
      setFilteredTitles([]);
      setShowDropdown(false);
    }

    // Update Redux store
    dispatch(addKeyword(keyword));

    // Update URL parameters
    const currentParams = Object.fromEntries(searchParams);
    if (keyword) {
      currentParams['keywords'] = keyword;
    } else {
      delete currentParams['keywords'];
    }
    setSearchParams(currentParams);
  };

  // Handle selection from dropdown
  const handleSelect = (title) => {
    setKeyWord(title.name);
    setShowDropdown(false);

    // Update Redux store
    dispatch(addKeyword(title.name));

    // Update URL parameters
    const currentParams = Object.fromEntries(searchParams);
    currentParams['keywords'] = title.name;
    setSearchParams(currentParams);
  };

  // Synchronize state with URL or Redux changes
  useEffect(() => {
    const urlKeyword = searchParams.get('keywords');
    if (urlKeyword !== null) {
      setKeyWord(urlKeyword);
      dispatch(addKeyword(urlKeyword));
    } else {
      setKeyWord(jobList.keyword);
    }
  }, [searchParams, jobList.keyword, dispatch]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      
      <div className="relative w-full">
      <input
        type="text"
        name="listing-search"
        placeholder="Job title"
        value={getKeyWord}
        onChange={handleInputChange}
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm 
                 placeholder-gray-400 text-gray-900
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition-colors duration-200"
        autoComplete="off"
      />
      <Search 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
      />
    </div>
      
      {/* Autocomplete Dropdown */}
      {showDropdown && filteredTitles.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {filteredTitles.map((title) => (
            <li
              key={title.id}
              onClick={() => handleSelect(title)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {title.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
