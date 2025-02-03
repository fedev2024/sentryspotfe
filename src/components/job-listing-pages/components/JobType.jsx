

// // import { useDispatch, useSelector } from "react-redux";
// // import { addJobType } from "../../../features/filter/filterSlice";
// // import { jobTypeCheck } from "../../../features/job/jobSlice";

// // const JobType = () => {
// //     const { jobTypeList } = useSelector((state) => state.job) || {};
// //     const dispatch = useDispatch();

// //     // dispatch job-type
// //     const jobTypeHandler = (e, id) => {
// //         dispatch(addJobType(e.target.value));
// //         dispatch(jobTypeCheck(id));
// //     };

// //     return (
// //         <ul className="switchbox">
// //             {jobTypeList?.map((item) => (
// //                 <li key={item.id}>
// //                     <label className="switch">
// //                         <input
// //                             type="checkbox"
// //                             value={item.value}
// //                             checked={item.isChecked || false}
// //                             onChange={(e) => jobTypeHandler(e, item.id)}
// //                         />
// //                         <span className="slider round"></span>
// //                         <span className="title">{item.name}</span>
// //                     </label>
// //                 </li>
// //             ))}
// //         </ul>
// //     );
// // };

// // export default JobType;
// // import React, { useCallback, useMemo } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useSearchParams } from "react-router-dom";
// // import { addJobType } from "../../../features/filter/filterSlice";
// // import { jobTypeCheck } from "../../../features/job/jobSlice";

// // const JobType = () => {
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const { jobTypeList } = useSelector((state) => state.job, (prev, next) => 
// //     JSON.stringify(prev.jobTypeList) === JSON.stringify(next.jobTypeList)
// //   ) || [];
  
// //   const dispatch = useDispatch();

// //   // Memoized selected job type IDs from URL
// //   const selectedJobTypeIds = useMemo(() => {
// //     return searchParams.get('jobTypeIds')?.split(',').map(Number).filter(Boolean) || [];
// //   }, [searchParams]);

// //   // Memoized job type handler to prevent unnecessary re-renders
// //   const jobTypeHandler = useCallback((e, id) => {
// //     const isChecked = e.target.checked;

// //     // Create a new array of selected job type IDs
// //     const newSelectedJobTypeIds = isChecked
// //       ? [...selectedJobTypeIds, id]
// //       : selectedJobTypeIds.filter(typeId => typeId !== id);

// //     // Update URL parameters
// //     const currentParams = Object.fromEntries(searchParams);
// //     if (newSelectedJobTypeIds.length > 0) {
// //       currentParams['job_type_id'] = newSelectedJobTypeIds.join(',');
// //     } else {
// //       delete currentParams['jobTypeIds'];
// //     }
    
// //     // Dispatch actions with minimal updates
// //     dispatch(jobTypeCheck(id));
// //     dispatch(addJobType(newSelectedJobTypeIds));
    
// //     // Update search params
// //     setSearchParams(currentParams, { replace: true });
// //   }, [selectedJobTypeIds, dispatch, searchParams, setSearchParams]);

// //   // Memoized rendering of job type list
// //   const jobTypeListRender = useMemo(() => {
// //     return jobTypeList.map((item) => (
// //       <li key={item.id}>
// //         <label className="switch">
// //           <input
// //             type="checkbox"
// //             value={item.id}
// //             checked={selectedJobTypeIds.includes(item.id)}
// //             onChange={(e) => jobTypeHandler(e, item.id)}
// //           />
// //           <span className="slider round"></span>
// //           <span className="title">{item.value}</span>
// //         </label>
// //       </li>
// //     ));
// //   }, [jobTypeList, selectedJobTypeIds, jobTypeHandler]);

// //   return (
// //     <ul className="switchbox">
// //       {jobTypeListRender}
// //     </ul>
// //   );
// // };

// // // Prevent unnecessary re-renders
// // export default React.memo(JobType);

// // import React, { useCallback, useMemo } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useSearchParams } from "react-router-dom";
// // import { addJobType } from "../../../features/filter/filterSlice";
// // import { jobTypeCheck } from "../../../features/job/jobSlice";

// // const JobType = () => {
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const { jobTypeList } = useSelector((state) => state.job, (prev, next) => 
// //     JSON.stringify(prev.jobTypeList) === JSON.stringify(next.jobTypeList)
// //   ) || [];
  
// //   const dispatch = useDispatch();

// //   // Memoized selected job type ID from URL (only one allowed)
// //   const selectedJobTypeId = useMemo(() => {
// //     const id = searchParams.get("job_type_id");
// //     return id ? Number(id) : null;
// //   }, [searchParams]);

// //   // Handler to select a single job type
// //   const jobTypeHandler = useCallback((id) => {
// //     // Update URL parameters with the new selected job type ID
// //     const currentParams = Object.fromEntries(searchParams);
// //     currentParams["job_type_id"] = id;

// //     // Dispatch actions with the new ID
// //     dispatch(jobTypeCheck(id));
// //     dispatch(addJobType([id]));

// //     // Update search params
// //     setSearchParams(currentParams, { replace: true });
// //   }, [dispatch, searchParams, setSearchParams]);

// //   // Memoized rendering of job type list
// //   const jobTypeListRender = useMemo(() => {
// //     return jobTypeList.map((item) => (
// //       <li key={item.id}>
// //         <label className="switch">
// //           <input
// //             type="radio" // Use radio for single selection
// //             name="job_type" // Ensures only one can be selected at a time
// //             value={item.id}
// //             checked={selectedJobTypeId === item.id}
// //             onChange={() => jobTypeHandler(item.id)}
// //           />
// //           <span className="slider round"></span>
// //           <span className="title">{item.value}</span>
// //         </label>
// //       </li>
// //     ));
// //   }, [jobTypeList, selectedJobTypeId, jobTypeHandler]);

// //   return (
// //     <ul className="switchbox">
// //       {jobTypeListRender}
// //     </ul>
// //   );
// // };

// // // Prevent unnecessary re-renders
// // export default React.memo(JobType);
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

//   // Render job type list
//   const jobTypeListRender = useMemo(() => {
//     return jobTypeList.map((item) => (
//       <li key={item.id}>
//         <label className="switch">
//           <input
//             type="checkbox" // Changed to checkbox to allow deselection
//             name="job_type"
//             value={item.id}
//             checked={selectedJobTypeId === item.id}
//             onChange={() => jobTypeHandler(item.id)}
//           />
//           <span className="slider round"></span>
//           <span className="title">{item.value}</span>
//         </label>
//       </li>
//     ));
//   }, [jobTypeList, selectedJobTypeId, jobTypeHandler]);

//   return (
//     <ul className="switchbox">
//       {jobTypeListRender}
//     </ul>
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

  // Get selected job type ID from URL
  const selectedJobTypeId = useMemo(() => {
    const id = searchParams.get("job_type_id");
    return id ? Number(id) : null;
  }, [searchParams]);

  // Handler to toggle job type selection
  const jobTypeHandler = useCallback((id) => {
    const currentParams = Object.fromEntries(searchParams);
    
    if (selectedJobTypeId === id) {
      // If clicking the same job type, deactivate it
      delete currentParams["job_type_id"];
      dispatch(jobTypeCheck(null));
      dispatch(addJobType([]));
    } else {
      // If clicking a different job type, activate it
      currentParams["job_type_id"] = id;
      dispatch(jobTypeCheck(id));
      dispatch(addJobType([id]));
    }

    // Update search params, removing the parameter entirely if deactivating
    setSearchParams(
      Object.keys(currentParams).length > 0 ? currentParams : {},
      { replace: true }
    );
  }, [dispatch, searchParams, setSearchParams, selectedJobTypeId]);

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
                  checked={selectedJobTypeId === item.id}
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