import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import ApplyJobPopup from "./ApplyJobPopup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const FilterJobsBox = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobCount, setJobCount] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);



  const [filters, setFilters] = useState({
    job_type_id: null,
    offered_salary_id: null,
    career_level_id: null,
    experience_id: null,
    gender_id: null,
    industry_id: null,
    qualification_id: null,
    country_id: null,
    city_id: null,
  });

  const citylist = [
    { id: 1, name: 'Full-Time' },
    { id: 2, name: 'Part-Time' },
    // Add other job types
  ];

  const countrylist = [
    { id: 1, name: 'Full-Time' },
    { id: 2, name: 'Part-Time' },
    // Add other job types
  ];
  const qualificationlist = [
    { id: 1, name: 'UG' },
    { id: 2, name: 'PG' },
    // Add other job types
  ];
  const industrylist = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'Accounts' },
    // Add other job types
  ];
  const genderlist = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    // Add other job types
  ];

  const experiencelist = [
    { id: 1, name: 'Internship' },
    { id: 2, name: 'Entry-Level' },
    { id: 3, name: 'Associate' },
    { id: 4, name: 'Mid-Senior Level' },
    { id: 5, name: 'Director' },
    { id: 6, name: 'Executive' },
    // Add other job types
  ];

  const careerlist = [
    { id: 1, name: 'Back-end Developer' },
    { id: 2, name: 'Front-end Developer' },
    // Add other job types
  ];

  const jobTypeList = [
    { id: 1, name: 'Full-Time' },
    { id: 2, name: 'Part-Time' },
    // Add other job types
  ];

  const salarytype = [
    { id: 1, name: '0-100k' },
    { id: 2, name: '100k-200k' },
    { id: 3, name: '200k-300k' },
    // Add other job types
  ];

  const handleToggle = (filterCategory, id) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: prevFilters[filterCategory] === id ? null : id,
    }));
  };

  useEffect(() => {
    // Fetch the list of countries
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/countries');
        setCountries(response.data.data);
      } catch (error) {
        console.error('Failed to fetch countries', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch the list of states when a country is selected
    if (filters.country_id) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/stats/${filters.country_id}`);
          setStates(response.data.data);
        } catch (error) {
          console.error('Failed to fetch states', error);
        }
      };

      fetchStates();
    } else {
      setStates([]); // Clear states if no country is selected
    }
  }, [filters.country_id]);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const queryString = Object.keys(filters)
          .filter((key) => filters[key])
          .map((key) => `${key}=${filters[key]}`)
          .join('&');

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/job-list?${queryString}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
       setJobCount(response.data.data.length);
        setJobs(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const savejob = async(jobId)=>{
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
       
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Your job successfully Saved!');
      } else {
        toast.error('Failed to job  the job. Please try again.');
      }
    } catch (error) {
      toast.error('Error Saving  job:', error);
      toast.error('An error occurred while saving for the job. Please try again.');
    }
  };
  



  const handleApplyNowClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-6  min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72  p-4 rounded-lg shadow-md" style={{backgroundColor:"#F4F7FC"}}>
        <ToastContainer/>
       <div className="flex">
       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h2>


       </div>
        {/* Job Type Toggle Switches */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Job Type</h3>
          <ul className="s switchbox">
            {jobTypeList.map((item) => (
              <li key={item.id}>
                <label className="flex items-center space-x-2 switch">
                  <input
                    type="checkbox"
                    checked={filters.job_type_id === item.id}
                    onChange={() => handleToggle('job_type_id', item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                   <span className="slider round"></span>
                  <span className="text-gray-700 title">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

       

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Salary</h3>
          <ul className=" switchbox">
            {salarytype.map((item) => (
              <li key={item.id}>
                <label className="flex items-center space-x-2 switch">
                  <input
                    type="checkbox"
                    checked={filters.offered_salary_id === item.id}
                    onChange={() => handleToggle('offered_salary_id', item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                   <span className="slider round"></span>
                   <span className="text-gray-700 title">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded-lg p-2 bg-white mb-6">
       <div className="mb-10 mt-2">
          <label className="text-lg font-medium text-gray-700 mb-2">Country</label>
          <select
            name="country_id"
            value={filters.country_id || ''}
            onChange={handleFilterChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
       
          <div className="mb-6">
            <label className="text-lg font-medium text-gray-700 mb-2">State</label>
            <select
              name="state_id"
              value={filters.state_id || ''}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            > {filters.country_id && ( <option value="">Select a State</option> )}
              <option value="">Select a Country First</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
       </div>


        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Career</h3>
          <ul className="s switchbox">
            {careerlist.map((item) => (
              <li key={item.id}>
                <label className="flex items-center space-x-2 switch">
                  <input
                    type="checkbox"
                    checked={filters.career_level_id === item.id}
                    onChange={() => handleToggle('career_level_id', item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                   <span className="slider round"></span>
                  <span className="text-gray-700 title">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Experience</h3>
          <ul className="s switchbox">
            {experiencelist.map((item) => (
              <li key={item.id}>
                <label className="flex items-center space-x-2 switch">
                  <input
                    type="checkbox"
                    checked={filters.experience_id === item.id}
                    onChange={() => handleToggle('experience_id', item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                   <span className="slider round"></span>
                  <span className="text-gray-700 title">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Gender</h3>
          <ul className="s switchbox">
            {genderlist.map((item) => (
              <li key={item.id}>
                <label className="flex items-center space-x-2 switch">
                  <input
                    type="checkbox"
                    checked={filters.gender_id === item.id}
                    onChange={() => handleToggle('gender_id', item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                   <span className="slider round"></span>
                  <span className="text-gray-700 title">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Industry</h3>
          <ul className="s switchbox">
            {industrylist.map((item) => (
              <li key={item.id}>
                <label className="flex items-center space-x-2 switch">
                  <input
                    type="checkbox"
                    checked={filters.industry_id === item.id}
                    onChange={() => handleToggle('industry_id', item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                   <span className="slider round"></span>
                  <span className="text-gray-700 title">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Qualification</h3>
          <ul className="s switchbox">
            {qualificationlist.map((item) => (
              <li key={item.id}>
                <label className="flex items-center space-x-2 switch">
                  <input
                    type="checkbox"
                    checked={filters.qualification_id === item.id}
                    onChange={() => handleToggle('qualification_id', item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                   <span className="slider round"></span>
                  <span className="text-gray-700 title">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
       

      
      

        {/* Add similar blocks for other filters like Offered Salary, Career Level, etc. */}
        
        
      </aside>

      {/* Job List */}
      <main className="flex-1 pl-6">
      <div className="flex justify-between px-5 my-3">

      <p className="text-lg  text-gray-800 mb-4">
        Show {jobCount} {jobCount === 1 ? 'Job' : 'Jobs'} 
      </p>

      <button
  type="button"
  onClick={() => setFilters({
    job_type_id: null,
    offered_salary_id: null,
    career_level_id: null,
    experience_id: null,
    gender_id: null,
    industry_id: null,
    qualification_id: null,
    country_id: null,
    city_id: null,
  })}
  className="bg-red-200 text-red-600 rounded-md  px-4 py-2 shadow-md hover:bg-red-600 hover:text-white "
>
  Reset Filters
</button>
      </div>

        <ul className="px-16">
          {jobs.map((job) => (
            <div
            className="job-block-four col-lg-12 col-md-6 col-sm-12"
            key={job.id}
          >
            <div className="inner-box text-start ps-5 p-0">
              <span className="flex align-middle">
                <img
                  src={job.logo || "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1717372800&semt=ais_user"}
                  alt="featured job"
                  className="absolute -left-10 top-7 rounded-xl border-2 p-1 h-20 bg-black"
                />
                <h4 className="pt-8 ps-2 flex justify-between w-full">
                  {console.log(job.job_title, "data")}
                  <Link to={`/job-single-v3/${job.id}`}>{job.job_title}</Link>
                  <div className="absolute right-0 text-sm">
                    <button className=" p-1 px-2 border-blue-800 rounded-full me-2 " onClick={handleApplyNowClick} >
                      <i className="fas fa-bookmark text-blue-900 "></i> Apply
                    </button>
                    <button className=" p-1 px-2 border-blue-800 rounded-full me-2" onClick={() => savejob(job.id)}>
                      <i className="fas fa-heart text-blue-900"></i> Save
                    </button>
                  </div>
                </h4>
              </span>
              {showPopup && (
        <ApplyJobPopup jobId={job.id} token={token} onClose={handleClosePopup} />
      )}
              <div className="location">
                <span className="icon flaticon-map-locator"></span>
                {job.complete_address}
              </div>
    
              <div className="flex">
                <ul className="post-tags text-start">
                  <li className="border">
                    <a href="#">Specialisms: {job.specialisms}</a>
                  </li>
                  <li className="border">
                    <a href="#">Qualification: {job.qualification}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          ))}
        </ul>
      </main>
    </div>
  );
};


export default FilterJobsBox;
