

// import { useDispatch, useSelector } from "react-redux";
// import { addJobType } from "../../../features/filter/filterSlice";
// import { jobTypeCheck } from "../../../features/job/jobSlice";

// const JobType = () => {
//     const { jobTypeList } = useSelector((state) => state.job) || {};
//     const dispatch = useDispatch();

//     // dispatch job-type
//     const jobTypeHandler = (e, id) => {
//         dispatch(addJobType(e.target.value));
//         dispatch(jobTypeCheck(id));
//     };

//     return (
//         <ul className="switchbox">
//             {jobTypeList?.map((item) => (
//                 <li key={item.id}>
//                     <label className="switch">
//                         <input
//                             type="checkbox"
//                             value={item.value}
//                             checked={item.isChecked || false}
//                             onChange={(e) => jobTypeHandler(e, item.id)}
//                         />
//                         <span className="slider round"></span>
//                         <span className="title">{item.name}</span>
//                     </label>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default JobType;
// import React, { useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addJobType } from "../../../features/filter/filterSlice";
// import { jobTypeCheck } from "../../../features/job/jobSlice";

// const JobType = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { jobTypeList } = useSelector((state) => state.job, (prev, next) => 
//     JSON.stringify(prev.jobTypeList) === JSON.stringify(next.jobTypeList)
//   ) || [];
  
//   const dispatch = useDispatch();

//   // Memoized selected job type IDs from URL
//   const selectedJobTypeIds = useMemo(() => {
//     return searchParams.get('jobTypeIds')?.split(',').map(Number).filter(Boolean) || [];
//   }, [searchParams]);

//   // Memoized job type handler to prevent unnecessary re-renders
//   const jobTypeHandler = useCallback((e, id) => {
//     const isChecked = e.target.checked;

//     // Create a new array of selected job type IDs
//     const newSelectedJobTypeIds = isChecked
//       ? [...selectedJobTypeIds, id]
//       : selectedJobTypeIds.filter(typeId => typeId !== id);

//     // Update URL parameters
//     const currentParams = Object.fromEntries(searchParams);
//     if (newSelectedJobTypeIds.length > 0) {
//       currentParams['job_type_id'] = newSelectedJobTypeIds.join(',');
//     } else {
//       delete currentParams['jobTypeIds'];
//     }
    
//     // Dispatch actions with minimal updates
//     dispatch(jobTypeCheck(id));
//     dispatch(addJobType(newSelectedJobTypeIds));
    
//     // Update search params
//     setSearchParams(currentParams, { replace: true });
//   }, [selectedJobTypeIds, dispatch, searchParams, setSearchParams]);

//   // Memoized rendering of job type list
//   const jobTypeListRender = useMemo(() => {
//     return jobTypeList.map((item) => (
//       <li key={item.id}>
//         <label className="switch">
//           <input
//             type="checkbox"
//             value={item.id}
//             checked={selectedJobTypeIds.includes(item.id)}
//             onChange={(e) => jobTypeHandler(e, item.id)}
//           />
//           <span className="slider round"></span>
//           <span className="title">{item.value}</span>
//         </label>
//       </li>
//     ));
//   }, [jobTypeList, selectedJobTypeIds, jobTypeHandler]);

//   return (
//     <ul className="switchbox">
//       {jobTypeListRender}
//     </ul>
//   );
// };

// // Prevent unnecessary re-renders
// export default React.memo(JobType);

import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addJobType } from "../../../features/filter/filterSlice";
import { jobTypeCheck } from "../../../features/job/jobSlice";

const JobType = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobTypeList } = useSelector((state) => state.job, (prev, next) => 
    JSON.stringify(prev.jobTypeList) === JSON.stringify(next.jobTypeList)
  ) || [];
  
  const dispatch = useDispatch();

  // Memoized selected job type ID from URL (only one allowed)
  const selectedJobTypeId = useMemo(() => {
    const id = searchParams.get("job_type_id");
    return id ? Number(id) : null;
  }, [searchParams]);

  // Handler to select a single job type
  const jobTypeHandler = useCallback((id) => {
    // Update URL parameters with the new selected job type ID
    const currentParams = Object.fromEntries(searchParams);
    currentParams["job_type_id"] = id;

    // Dispatch actions with the new ID
    dispatch(jobTypeCheck(id));
    dispatch(addJobType([id]));

    // Update search params
    setSearchParams(currentParams, { replace: true });
  }, [dispatch, searchParams, setSearchParams]);

  // Memoized rendering of job type list
  const jobTypeListRender = useMemo(() => {
    return jobTypeList.map((item) => (
      <li key={item.id}>
        <label className="switch">
          <input
            type="radio" // Use radio for single selection
            name="job_type" // Ensures only one can be selected at a time
            value={item.id}
            checked={selectedJobTypeId === item.id}
            onChange={() => jobTypeHandler(item.id)}
          />
          <span className="slider round"></span>
          <span className="title">{item.value}</span>
        </label>
      </li>
    ));
  }, [jobTypeList, selectedJobTypeId, jobTypeHandler]);

  return (
    <ul className="switchbox">
      {jobTypeListRender}
    </ul>
  );
};

// Prevent unnecessary re-renders
export default React.memo(JobType);
