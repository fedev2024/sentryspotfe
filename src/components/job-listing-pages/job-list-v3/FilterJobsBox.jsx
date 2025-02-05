import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import ApplyForm from "@/components/ApplyForm/ApplyForm";

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Please Login</h3>
        <p className="mb-6">You need to be logged in to perform this action.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

// const FilterJobsBox = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [sort, setSort] = useState("");
//   const [perPage, setPerPage] = useState({ start: 0, end: 0 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const navigate = useNavigate()

//   const handleApplyNowClick = (jobId) => {
//     if (!token) {
//       setShowLoginModal(true);
//     } else {
//       navigate(`/apply/${jobId}`)
//       setSelectedJobId(jobId);
//       setShowPopup(true);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setSelectedJobId(null);
//   };

//   const handleCloseLoginModal = () => {
//     setShowLoginModal(false);
//   };

//   const savejob = async (jobId) => {
//     if (!token) {
//       setShowLoginModal(true);
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       if (response.data.status === "status" || response.data.code === 200) {
//         toast.success(response.message || "Your job was successfully saved!");
//       } else {
//         toast.error("Failed to save the job. Please try again.");
//       }
//     } catch (error) {
//       toast.error("An error occurred while saving the job. Please try again.");
//     }
//   };

//   const fetchJobs = async (params = searchParams) => {
//     try {
//       setIsLoading(true);
//       const urlParams = new URLSearchParams(params);

//       const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/job-list${
//         urlParams.toString() ? `?${urlParams.toString()}` : ""
//       }`;

//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       setJobs(data.data);
//       setFilteredJobs(data.data);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [searchParams]);

//   const hasFilters = () => {
//     return [...searchParams].some(
//       ([key, value]) => value !== null && value !== ""
//     );
//   };

//   const clearFilters = () => {
//     // Clear the search parameters
//     setSearchParams(new URLSearchParams());

//     // Reset all state
//     setSort("");
//     setPerPage({ start: 0, end: 0 });

//     // Fetch all jobs without filters
//     fetchJobs(new URLSearchParams());
//   };

//   const sortHandler = (e) => {
//     const sortValue = e.target.value;
//     setSort(sortValue);

//     const sortedJobs = [...filteredJobs].sort((a, b) => {
//       if (sortValue === "asc") {
//         return a.id - b.id;
//       } else if (sortValue === "des") {
//         return b.id - a.id;
//       }
//       return 0;
//     });

//     setFilteredJobs(sortedJobs);
//   };

//   const perPageHandler = (e) => {
//     const pageData = JSON.parse(e.target.value);
//     setPerPage(pageData);
//   };

//   let content = filteredJobs
//     ?.slice(
//       perPage.start,
//       perPage.end !== 0 ? perPage.end : filteredJobs.length
//     )
//     ?.map((item) => (
//       <div className="job-block col-lg-6 col-md-12 col-sm-12 hover:border-2 border-blue-400 hover:rounded-lg" key={item.id} >
//         <div className="inner-box ">
//           <div className="content ">
//             <span className="company-logo">
//               <img
//                 src={
//                   item.logo ||
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"
//                 }
//                 alt="company logo"
//               />
//             </span>
//             <h4>
//               <Link to={`/job-single-v3/${item.id}`}>{item.job_title}</Link>
//             </h4>

//             <ul className="job-info">
//               <li>
//                 <span className="icon flaticon-briefcase"></span>
//                 {item.industry || "Not specified"}
//               </li>
//               <li>
//                 <span className="icon flaticon-map-locator"></span>
//                 {item.city
//                   ? `${item.city}, ${item.country}`
//                   : "Location not specified"}
//               </li>
//               <li>
//                 <span className="icon flaticon-clock-3"></span>
//                 {item.application_deadline || "Open"}
//               </li>
//               <li>
//                 <span className="icon flaticon-money"></span>
//                 {item.offered_salary || "Salary not specified"}
//               </li>
//             </ul>

//             <ul className="job-other-info">
//               {item.job_type && <li className="time">{item.job_type}</li>}
//             </ul>

//             <div className="flex">
//               <button className="btn" onClick={() => savejob(item.id)}>
//                 <span className="fas fa-heart"></span>
//               </button>
//               <button
//                 className="btn"
//                 onClick={() => handleApplyNowClick(item.id)}
//               >
//                 <span className="flaticon-bookmark"></span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ));

//   if (isLoading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <>
//       <div className="ls-switcher">
//         <div className="flex bg-gray-50 mb-2 border=b justify-between items-center w-full py-4 px-4 ">
//           <div className="text">
//             Show <strong>{content?.length}</strong> jobs
//           </div>
//           <div className="flex items-center gap-2 ">
//             <select
//               value={sort}
//               className="chosen-single form-select"
//               onChange={sortHandler}
//             >
//               <option value="">Sort by (default)</option>
//               <option value="asc">Newest</option>
//               <option value="des">Oldest</option>
//             </select>

//             {/* <select
//               onChange={perPageHandler}
//               className="chosen-single form-select"
//               value={JSON.stringify(perPage)}
//             >
//               <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
//               <option value={JSON.stringify({ start: 0, end: 20 })}>
//                 20 per page
//               </option>
//               <option value={JSON.stringify({ start: 0, end: 25 })}>
//                 25 per page
//               </option>
//               <option value={JSON.stringify({ start: 0, end: 30 })}>
//                 30 per page
//               </option>
//             </select> */}

//             {hasFilters() && (
//               <button
//                 onClick={clearFilters}
//                 className="w-full p-2 bg-red-500 text-white"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         </div>

//         {/* <div className="sort-by">
//           <select
//             value={sort}
//             className="chosen-single form-select"
//             onChange={sortHandler}
//           >
//             <option value="">Sort by (default)</option>
//             <option value="asc">Newest</option>
//             <option value="des">Oldest</option>
//           </select>

//           <select
//             onChange={perPageHandler}
//             className="chosen-single form-select ms-3"
//             value={JSON.stringify(perPage)}
//           >
//             <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
//             <option value={JSON.stringify({ start: 0, end: 20 })}>
//               20 per page
//             </option>
//             <option value={JSON.stringify({ start: 0, end: 25 })}>
//               25 per page
//             </option>
//             <option value={JSON.stringify({ start: 0, end: 30 })}>
//               30 per page
//             </option>
//           </select>

         
//         </div>
//         {hasFilters() && (
//         <button onClick={clearFilters} className="btn btn-danger">
//           Clear Filters
//         </button>
//       )} */}
//       </div>

//       <div className="row">{content}</div>

//       <div className="ls-show-more">
//         <p>
//           Show {content?.length} of {jobs.length} Jobs
//         </p>
//         <div className="bar">
//           <span
//             className="bar-inner"
//             style={{ width: `${(content?.length / jobs.length) * 100}%` }}
//           ></span>
//         </div>
//         <button className="show-more">Show More</button>
//       </div>

//       {showPopup && selectedJobId && (
//         <ApplyJobModalContent
//           jobId={selectedJobId}
//           onClose={handleClosePopup}
//         />
//         // <ApplyForm />
//       )}

//       {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
//     </>
//   );
// };

const FilterJobsBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sort, setSort] = useState("");
  const [perPage, setPerPage] = useState({ start: 0, end: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const token = localStorage.getItem(Constant.USER_TOKEN);
  const navigate = useNavigate();

  const handleApplyNowClick = (jobId) => {
    if (!token) {
      setShowLoginModal(true);
    } else {
      navigate(`/apply/${jobId}`);
      setSelectedJobId(jobId);
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedJobId(null);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const savejob = async (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.status === "status" || response.data.code === 200) {
        toast.success(response.message || "Your job was successfully saved!");
      } else {
        toast.error("Failed to save the job. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the job. Please try again.");
    }
  };

  const fetchJobs = async (params = searchParams) => {
    try {
      setIsLoading(true);
      const urlParams = new URLSearchParams(params);

      // Add sorting parameters if they exist
      if (sort) {
        urlParams.set('filter_by', 'date');
        urlParams.set('order_by', sort === 'asc' ? 'desc' : 'asc');
      }

      const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/job-list${
        urlParams.toString() ? `?${urlParams.toString()}` : ""
      }`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setJobs(data.data);
      setFilteredJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams, sort]);

  const hasFilters = () => {
    return [...searchParams].some(
      ([key, value]) => value !== null && value !== ""
    );
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSort("");
    setPerPage({ start: 0, end: 0 });4
    fetchJobs(new URLSearchParams());
  };

  const sortHandler = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);
  };

  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    setPerPage(pageData);
  };

  let content = filteredJobs
    ?.slice(
      perPage.start,
      perPage.end !== 0 ? perPage.end : filteredJobs.length
    )
    ?.map((item) => (
      <div className="job-block col-lg-6 col-md-12 col-sm-12 hover:border-2 border-blue-400 hover:rounded-lg" key={item.id} >
        <div className="inner-box ">
          <div className="content ">
            <span className="company-logo">
              <img
                src={
                  item.logo ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"
                }
                alt="company logo"
              />
            </span>
            <h4>
              <Link to={`/job-single-v3/${item.id}`}>{item.job_title}</Link>
            </h4>

            <ul className="job-info">
              <li>
                <span className="icon flaticon-briefcase"></span>
                {item.industry || "Not specified"}
              </li>
              <li>
                <span className="icon flaticon-map-locator"></span>
                {item.city
                  ? `${item.city}, ${item.country}`
                  : "Location not specified"}
              </li>
              <li>
                <span className="icon flaticon-clock-3"></span>
                {item.application_deadline || "Open"}
              </li>
              <li>
                <span className="icon flaticon-money"></span>
                {item.offered_salary || "Salary not specified"}
              </li>
            </ul>

            <ul className="job-other-info">
              {item.job_type && <li className="time">{item.job_type}</li>}
            </ul>

            <div className="flex">
              <button className="btn" onClick={() => savejob(item.id)}>
                <span className="fas fa-heart"></span>
              </button>
              <button
                className="btn"
                onClick={() => handleApplyNowClick(item.id)}
              >
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <div className="ls-switcher">
        <div className="flex bg-gray-50 mb-2 border=b justify-between items-center w-full py-4 px-4 ">
          <div className="text">
            Show <strong>{content?.length}</strong> jobs
          </div>
          <div className="flex items-center gap-2 ">
            <select
              value={sort}
              className="chosen-single form-select"
              onChange={sortHandler}
            >
              <option value="">Sort by (default)</option>
              <option value="asc">Newest</option>
              <option value="des">Oldest</option>
            </select>

            {hasFilters() && (
              <button
                onClick={clearFilters}
                className="w-full p-2 bg-red-500 text-white"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row">{content}</div>

      <div className="ls-show-more">
        <p>
          Show {content?.length} of {jobs.length} Jobs
        </p>
        <div className="bar">
          <span
            className="bar-inner"
            style={{ width: `${(content?.length / jobs.length) * 100}%` }}
          ></span>
        </div>
        <button className="show-more">Show More</button>
      </div>

      {showPopup && selectedJobId && (
        <ApplyJobModalContent
          jobId={selectedJobId}
          onClose={handleClosePopup}
        />
      )}

      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
    </>
  );
};


export default FilterJobsBox;

// export default FilterJobsBox;
