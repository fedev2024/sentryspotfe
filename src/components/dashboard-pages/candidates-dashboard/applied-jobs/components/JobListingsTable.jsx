
import { Link } from "react-router-dom";
import jobs from "../../../../../data/job-featured.js";
import { Constant } from "@/utils/constant/constant.js";
import { useState,useEffect } from "react";
import axios from "axios";

const JobListingsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);

const[apply,setapply]=useState([]);


useEffect(()=>{

axios.get(`https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1`,{
  headers:{
Authorization: token
  }})
  .then((response)=>{
    setapply(response.data.data)
    
  })

  .catch((err)=>{
    console.log(err)
  })

},[])

  

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Job</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>


              {apply.length === 0 ? (
        <p className="text-center text-xl">No Applied jobs available at the moment. Please Apply jobs & check back later.</p>
      ) : (
              <tbody>
                
                {apply.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img
                               
                               src={item.logo || "https://i.pinimg.com/564x/76/e3/2a/76e32aac67331df783916caaadd9a448.jpg"}
                                alt="logo"
                              />
                            </span>
                            <h4>
                              <Link to={`/job-single-v3/${item.id}`}>
                                {item.job_title}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.specialisms}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                London, UK
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.email_address}</td>
                    <td className="break-all">{item.complete_address}</td>
                    <td>
                      <div className="option-box">
                        <ul className="flex gap-0">
                        <li>
                            <button data-text="View retuen">
                              <span className="fa fa-exchange text-red-600 border"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="View Aplication">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>)}
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
