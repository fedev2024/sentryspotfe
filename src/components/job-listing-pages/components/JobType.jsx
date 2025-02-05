
// import React, { useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addJobType } from "../../../features/filter/filterSlice";
// import { jobTypeCheck } from "../../../features/job/jobSlice";

// const JobType = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { jobTypeList } = useSelector(
//     (state) => state.job,
//     (prev, next) =>
//       JSON.stringify(prev.jobTypeList) === JSON.stringify(next.jobTypeList)
//   ) || [];

//   const dispatch = useDispatch();

//   // Get selected job type ID from URL
//   const selectedJobTypeId = useMemo(() => {
//     const id = searchParams.get("job_type_id");
//     return id ? Number(id) : null;
//   }, [searchParams]);

//   // Handler to toggle job type selection
//   const jobTypeHandler = useCallback((id) => {
//     const currentParams = Object.fromEntries(searchParams);
    
//     if (selectedJobTypeId === id) {
//       // If clicking the same job type, deactivate it
//       delete currentParams["job_type_id"];
//       dispatch(jobTypeCheck(null));
//       dispatch(addJobType([]));
//     } else {
//       // If clicking a different job type, activate it
//       currentParams["job_type_id"] = id;
//       dispatch(jobTypeCheck(id));
//       dispatch(addJobType([id]));
//     }

//     // Update search params, removing the parameter entirely if deactivating
//     setSearchParams(
//       Object.keys(currentParams).length > 0 ? currentParams : {},
//       { replace: true }
//     );
//   }, [dispatch, searchParams, setSearchParams, selectedJobTypeId]);

//   // Render loading state (if needed)
//   if (jobTypeList.length === 0) {
//     return (
//       <div className="w-full space-y-2">
//         <div className="text-sm text-gray-500 text-center py-2">
//           No job types found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full space-y-2">
//       <ul className="space-y-2">
//         {jobTypeList.map((item) => (
//           <li key={item.id} className="w-full">
//             <label className="flex items-center group cursor-pointer">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={selectedJobTypeId === item.id}
//                   onChange={() => jobTypeHandler(item.id)}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-2xl peer 
//                                 peer-checked:bg-blue-500 
//                                 peer-focus:ring-4 peer-focus:ring-blue-300 
//                                 dark:peer-focus:ring-blue-800">
//                 </div>
//                 <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
//                                 transition-all duration-300 ease-in-out
//                                 peer-checked:translate-x-5">
//                 </div>
//               </div>
//               <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-grow truncate">
//                 {item.value}
//               </span>
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default React.memo(JobType);


import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addJobType } from "../../../features/filter/filterSlice";
import { jobTypeCheck } from "../../../features/job/jobSlice";

const JobType = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobTypeList } = useSelector(
    (state) => state.job,
    (prev, next) =>
      JSON.stringify(prev.jobTypeList) === JSON.stringify(next.jobTypeList)
  ) || [];

  const dispatch = useDispatch();

  // Get selected job type IDs from URL
  const selectedJobTypeIds = useMemo(() => {
    const ids = searchParams.get("job_type_id");
    return ids ? ids.split('+').map(Number) : [];
  }, [searchParams]);

  // Handler to toggle job type selection
  const jobTypeHandler = useCallback((id) => {
    const currentParams = Object.fromEntries(searchParams);
    
    let newSelectedIds;
    if (selectedJobTypeIds.includes(id)) {
      // Remove the id if it's already selected
      newSelectedIds = selectedJobTypeIds.filter(typeId => typeId !== id);
    } else {
      // Add the id if it's not selected
      newSelectedIds = [...selectedJobTypeIds, id];
    }

    if (newSelectedIds.length > 0) {
      // Sort IDs for consistent URL formatting
      newSelectedIds.sort((a, b) => a - b);
      currentParams["job_type_id"] = newSelectedIds.join('+');
      dispatch(jobTypeCheck(newSelectedIds));
      dispatch(addJobType(newSelectedIds));
    } else {
      // If no jobs selected, remove the parameter
      delete currentParams["job_type_id"];
      dispatch(jobTypeCheck(null));
      dispatch(addJobType([]));
    }

    // Update search params
    setSearchParams(
      Object.keys(currentParams).length > 0 ? currentParams : {},
      { replace: true }
    );
  }, [dispatch, searchParams, setSearchParams, selectedJobTypeIds]);

  // Render loading state (if needed)
  if (jobTypeList.length === 0) {
    return (
      <div className="w-full space-y-2">
        <div className="text-sm text-gray-500 text-center py-2">
          No job types found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <ul className="space-y-2">
        {jobTypeList.map((item) => (
          <li key={item.id} className="w-full">
            <label className="flex items-center group cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedJobTypeIds.includes(item.id)}
                  onChange={() => jobTypeHandler(item.id)}
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
                {item.value}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(JobType);