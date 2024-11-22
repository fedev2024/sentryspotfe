


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addCategory } from "../../../features/filter/filterSlice";

// const Categories = () => {
//     const { jobList } = useSelector((state) => state.filter) || {};
//     const [getCategory, setCategory] = useState(jobList.category);

//     const dispatch = useDispatch();

//     // category handler
//     const categoryHandler = (e) => {
//         dispatch(addCategory(e.target.value));
//     };

//     useEffect(() => {
//         setCategory(jobList.category);
//     }, [setCategory, jobList]);

//     return (
//         <>
//             <select
//                 className="form-select"
//                 value={jobList.category}
//                 onChange={categoryHandler}
//             >
//                 <option value="">Choose a category</option>
//                 <option value="residential">Residential</option>
//                 <option value="commercial">Commercial</option>
//                 <option value="industrial">Industrial</option>
//                 <option value="apartments">Apartments</option>
//             </select>
//             <span className="icon flaticon-briefcase"></span>
//         </>
//     );
// };

// export default Categories;
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addCategory } from "../../../features/filter/filterSlice";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.sentryspot.co.uk/api/employeer/job-categories');
        const result = await response.json();
        if (result.status === "success" && result.data) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Get selected category ID from URL
  const selectedCategoryId = useMemo(() => {
    const id = searchParams.get("category_id");
    return id ? Number(id) : null;
  }, [searchParams]);

  // Handler to toggle category selection
  const categoryHandler = useCallback((id, name) => {
    const currentParams = Object.fromEntries(searchParams);
    
    if (selectedCategoryId === id) {
      // If clicking the same category, deactivate it
      delete currentParams["category_id"];
      dispatch(addCategory(""));
    } else {
      // If clicking a different category, activate it
      currentParams["category_id"] = id;
      dispatch(addCategory(name));
    }

    // Update search params
    setSearchParams(
      Object.keys(currentParams).length > 0 ? currentParams : {},
      { replace: true }
    );
  }, [dispatch, searchParams, setSearchParams, selectedCategoryId]);

  return (
    <div className="w-full space-y-2">
      
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="w-full">
            <label className="flex items-center group cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedCategoryId === category.id}
                  onChange={() => categoryHandler(category.id, category.name)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-2xl peer 
                              peer-checked:bg-blue-500 
                              peer-focus:ring-4 peer-focus:ring-blue-300 
                              dark:peer-focus:ring-blue-800">
                </div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                              transition-all duration-300 ease-in-out
                              peer-checked:translate-x-5">
                </div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-grow truncate">
                {category.name}
              </span>
              {selectedCategoryId === category.id && (
                <span className="ml-2 text-xs text-blue-600 font-medium flex-shrink-0">
                  Selected
                </span>
              )}
            </label>
          </li>
        ))}
      </ul>
      {categories.length === 0 && (
        <div className="text-sm text-gray-500 text-center py-2">
          Loading categories...
        </div>
      )}
    </div>
  );
};

export default React.memo(Categories);