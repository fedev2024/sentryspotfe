

// import { useDispatch, useSelector } from "react-redux";
// import { addExperience } from "../../../features/filter/filterSlice";
// import { experienceLavelCheck } from "../../../features/job/jobSlice";

// const ExperienceLevel = () => {
//     const { experienceLavel } = useSelector((state) => state.job) || {};
//     const dispatch = useDispatch();

//     // experience handler
//     const experienceHandler = (e, id) => {
//         dispatch(addExperience(e.target.value));
//         dispatch(experienceLavelCheck(id));
//     };

//     return (
//         <ul className="switchbox">
//             {experienceLavel?.map((item) => (
//                 <li key={item.id}>
//                     <label className="switch">
//                         <input
//                             type="checkbox"
//                             checked={item.isChecked}
//                             value={item.value}
//                             onChange={(e) => experienceHandler(e, item.id)}
//                         />
//                         <span className="slider round"></span>
//                         <span className="title">{item.name}</span>
//                     </label>
//                 </li>
//             ))}
//             <li>
//                 <button className="view-more">
//                     <span className="icon flaticon-plus"></span> View More
//                 </button>
//             </li>
//         </ul>
//     );
// };

// export default ExperienceLevel;
// import React, { useCallback, useMemo, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addExperience } from "../../../features/filter/filterSlice";
// import { experienceLavelCheck } from "../../../features/job/jobSlice";

// const ExperienceLevel = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { experienceLavel } = useSelector((state) => state.job) || {};
//   const dispatch = useDispatch();

//   // Get the current selected experience level ID from URL
//   const selectedExperienceLevelId = useMemo(() => {
//     const idFromUrl = searchParams.get('experience_id');
//     return idFromUrl ? Number(idFromUrl) : null;
//   }, [searchParams]);

//   // Experience handler to toggle selection
//   const experienceHandler = useCallback((id) => {
//     // If already selected, deselect (remove from URL)
//     if (selectedExperienceLevelId === id) {
//       const currentParams = Object.fromEntries(searchParams);
//       delete currentParams['experience_id'];
      
//       // Reset all checked states
//       experienceLavel.forEach(item => {
//         if (item.isChecked) {
//           dispatch(experienceLavelCheck(item.id));
//         }
//       });

//       // Update URL and Redux
//       setSearchParams(currentParams, { replace: true });
//       dispatch(addExperience(null));
//     } else {
//       // Uncheck previously checked items
//       experienceLavel.forEach(item => {
//         if (item.isChecked) {
//           dispatch(experienceLavelCheck(item.id));
//         }
//       });

//       // Check the new item
//       dispatch(experienceLavelCheck(id));

//       // Update URL and Redux
//       const currentParams = Object.fromEntries(searchParams);
//       currentParams['experience_id'] = id;
//       setSearchParams(currentParams, { replace: true });
//       dispatch(addExperience(id));
//     }
//   }, [selectedExperienceLevelId, dispatch, searchParams, experienceLavel, setSearchParams]);

//   // Sync initial state if needed
//   useEffect(() => {
//     // If there's an experience_id in URL, ensure it's checked
//     if (selectedExperienceLevelId) {
//       const itemToCheck = experienceLavel.find(item => item.id === selectedExperienceLevelId);
//       if (itemToCheck && !itemToCheck.isChecked) {
//         dispatch(experienceLavelCheck(selectedExperienceLevelId));
//         dispatch(addExperience(selectedExperienceLevelId));
//       }
//     }
//   }, [selectedExperienceLevelId, experienceLavel, dispatch]);

//   // Memoized rendering of experience level list
//   const experienceLevelListRender = useMemo(() => {
//     return [
//       ...experienceLavel.map((item) => (
//         <li key={item.id}>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={selectedExperienceLevelId === item.id}
//               onChange={() => experienceHandler(item.id)}
//             />
//             <span className="slider round"></span>
//             <span className="title">{item.name}</span>
//           </label>
//         </li>
//       )),
//       <li key="view-more">
//         <button className="view-more">
//           <span className="icon flaticon-plus"></span> View More
//         </button>
//       </li>
//     ];
//   }, [experienceLavel, selectedExperienceLevelId, experienceHandler]);

//   return (
//     <ul className="switchbox">
//       {experienceLevelListRender}
//     </ul>
//   );
// };

// export default React.memo(ExperienceLevel);

import React, { useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addExperience } from "../../../features/filter/filterSlice";
import { experienceLavelCheck } from "../../../features/job/jobSlice";

const ExperienceLevel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { experienceLavel } = useSelector((state) => state.job) || {};
  const dispatch = useDispatch();

  // Get the current selected experience level ID from URL
  const selectedExperienceLevelId = useMemo(() => {
    const idFromUrl = searchParams.get('experience_id');
    return idFromUrl ? Number(idFromUrl) : null;
  }, [searchParams]);

  // Experience handler to toggle selection
  const experienceHandler = useCallback((id) => {
    // If already selected, deselect (remove from URL)
    if (selectedExperienceLevelId === id) {
      const currentParams = Object.fromEntries(searchParams);
      delete currentParams['experience_id'];

      // Reset all checked states
      experienceLavel.forEach(item => {
        if (item.isChecked) {
          dispatch(experienceLavelCheck(item.id));
        }
      });

      // Update URL and Redux
      setSearchParams(
        Object.keys(currentParams).length > 0 ? currentParams : {},
        { replace: true }
      );
      dispatch(addExperience(null));
    } else {
      // Uncheck previously checked items
      experienceLavel.forEach(item => {
        if (item.isChecked) {
          dispatch(experienceLavelCheck(item.id));
        }
      });

      // Check the new item
      dispatch(experienceLavelCheck(id));

      // Update URL and Redux
      const currentParams = Object.fromEntries(searchParams);
      currentParams['experience_id'] = id;
      setSearchParams(currentParams, { replace: true });
      dispatch(addExperience(id));
    }
  }, [selectedExperienceLevelId, dispatch, searchParams, experienceLavel, setSearchParams]);

  // Sync initial state if needed
  useEffect(() => {
    // If there's an experience_id in URL, ensure it's checked
    if (selectedExperienceLevelId) {
      const itemToCheck = experienceLavel.find(item => item.id === selectedExperienceLevelId);
      if (itemToCheck && !itemToCheck.isChecked) {
        dispatch(experienceLavelCheck(selectedExperienceLevelId));
        dispatch(addExperience(selectedExperienceLevelId));
      }
    }
  }, [selectedExperienceLevelId, experienceLavel, dispatch]);

  // Render loading or empty state
  if (!experienceLavel || experienceLavel.length === 0) {
    return (
      <div className="w-full space-y-2">
        <div className="text-sm text-gray-500 text-center py-2">
          No experience levels found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <ul className="space-y-2">
        {experienceLavel.map((item) => (
          <li key={item.id} className="w-full">
            <label className="flex items-center group cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedExperienceLevelId === item.id}
                  onChange={() => experienceHandler(item.id)}
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
                {item.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {/* Optional: View More button - styled inline if you want it */}
      {/* <button className="w-full text-sm text-blue-600 hover:text-blue-800 text-center py-2">
        View More
      </button> */}
    </div>
  );
};

export default React.memo(ExperienceLevel);