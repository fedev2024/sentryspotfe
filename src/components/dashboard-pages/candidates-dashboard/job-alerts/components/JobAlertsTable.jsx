import { Link } from "react-router-dom";
import jobs from "../../../../../data/job-featured.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";

const JobAlertsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);

const[saved,setsaved]=useState([]);


useEffect(()=>{

axios.get(`https://api.sentryspot.co.uk/api/jobseeker/view-favorite-jobs?is_favorite=1`,{
  headers:{
Authorization: token
  }})
  .then((response)=>{
    setsaved(response.data.data)
    
  })

  .catch((err)=>{
    console.log(err)
  })

},[])






  return (
    <div className="tabs-box">
    <div className="widget-title">
      <h4>Saved Jobs</h4>
      <div className="chosen-outer">
        <select className="chosen-single form-select">
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
          <option>Last 16 Months</option>
          <option>Last 24 Months</option>
          <option>Last 5 years</option>
        </select>
      </div>
    </div>
    {/* End filter top bar */}
  
    {/* Start bar widget content */}
    <div className="widget-content">
      <div className="bar-outer px-10">
        {saved.length === 0 ? (
          <p className="text-center text-xl">
            No Saved jobs available at the moment. Please Save jobs & check back later.
          </p>
        ) : (
          saved.map((item) => (
            <div key={item.id} className="job-bar flex items-center p-4  mb-4 border-1 border-sky-500 rounded-lg">
              <div className="absolute left-8 company-logo mr-4">
                <img
                  className="rounded-lg h-14 w-20"
                  src={item.logo || "https://i.pinimg.com/564x/76/e3/2a/76e32aac67331df783916caaadd9a448.jpg"}
                  alt="logo"
                />
              </div>
              <div className="job-info flex-grow px-8">
                <h4>
                  <Link to={`/job-single-v3/${item.id}`} className="text-xl font-bold">
                    {item.job_title}
                  </Link>
                </h4>
                <ul className="flex space-x-8 text-gray-600">
                  <li>
                    <span className="icon flaticon-briefcase"> </span>
                    {item.specialisms}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"> </span>
                    {item.complete_address}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"> </span>
                    {item.qualification}
                  </li>
                  <li>
                    <span className="icon flaticon-email"> </span>
                    {item.email_address_of_job_poster}
                  </li>
                </ul>
              </div>
              <div className="job-actions flex items-center">
                <a href={`mailto:${item.email_address}`} className="mr-4 text-blue-500">
                  {item.email_address}
                </a>
                <div className="option-box flex space-x-2">
                  <button className="py-1 px-2 text-white bg-blue-500 rounded-full" data-text="View Application">
                    <span className="la la-eye"></span>
                  </button>
                  <button className="py-1 px-2 text-white bg-red-500 rounded-full" data-text="Delete Application">
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    {/* End bar widget content */}
  </div>
  
  );
};

export default JobAlertsTable;
