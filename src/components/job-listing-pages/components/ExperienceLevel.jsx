

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
      setSearchParams(currentParams, { replace: true });
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

  // Memoized rendering of experience level list
  const experienceLevelListRender = useMemo(() => {
    return [
      ...experienceLavel.map((item) => (
        <li key={item.id}>
          <label className="switch">
            <input
              type="checkbox"
              checked={selectedExperienceLevelId === item.id}
              onChange={() => experienceHandler(item.id)}
            />
            <span className="slider round"></span>
            <span className="title">{item.name}</span>
          </label>
        </li>
      )),
      <li key="view-more">
        <button className="view-more">
          <span className="icon flaticon-plus"></span> View More
        </button>
      </li>
    ];
  }, [experienceLavel, selectedExperienceLevelId, experienceHandler]);

  return (
    <ul className="switchbox">
      {experienceLevelListRender}
    </ul>
  );
};

export default React.memo(ExperienceLevel);