


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addLocation } from "../../../features/filter/filterSlice";

// const LocationBox = () => {
//     const { jobList } = useSelector((state) => state.filter);
//     const [getLocation, setLocation] = useState(jobList.location);
//     const dispath = useDispatch();

//     // location handler
//     const locationHandler = (e) => {
//         dispath(addLocation(e.target.value));
//     };

//     useEffect(() => {
//         setLocation(jobList.location);
//     }, [setLocation, jobList]);

//     return (
//         <>
//             <input
//                 type="text"
//                 name="listing-search"
//                 placeholder="City or postcode"
//                 value={getLocation}
//                 onChange={locationHandler}
//             />
//             <span className="icon flaticon-map-locator"></span>
//         </>
//     );
// };

// export default LocationBox;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addLocation } from "../../../features/filter/filterSlice";

const LocationBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // Initialize state from URL or Redux store
  const [getLocation, setLocation] = useState(
    searchParams.get('location') || jobList.location || ''
  );

  // Location handler to update both Redux and URL
  const locationHandler = (e) => {
    const location = e.target.value;
    
    // Update Redux store
    dispatch(addLocation(location));
    
    // Update URL parameters
    const currentParams = Object.fromEntries(searchParams);
    if (location) {
      currentParams['location'] = location;
    } else {
      delete currentParams['location'];
    }
    setSearchParams(currentParams);
  };

  // Synchronize state with URL or Redux changes
  useEffect(() => {
    // Priority: URL params > Redux store
    const urlLocation = searchParams.get('location');
    if (urlLocation !== null) {
      setLocation(urlLocation);
      dispatch(addLocation(urlLocation));
    } else {
      setLocation(jobList.location);
    }
  }, [searchParams, jobList.location, dispatch]);

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="City "
        value={getLocation}
        onChange={locationHandler}
      />
      <span className="icon flaticon-map-locator"></span>
    </>
  );
};

export default LocationBox;