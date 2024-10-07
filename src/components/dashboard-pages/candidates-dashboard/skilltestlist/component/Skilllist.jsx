import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";

const Skilltest = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const [apply, setApply] = useState([]); // Set the default value as an empty array

  useEffect(() => {
    axios
      .get(`https://api.resumeintellect.com/api/user/skill-assessment-history`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Check if response.data.data is an array before setting it
        setApply(response.data.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Skill History</h4>

        <div className="chosen-outer">
          {/* Tabs Box */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 Years</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
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
              <tbody>
                <tr>
                  <td colSpan="4" className="text-center">
                    No skill history available at the moment. Please check back later.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {apply.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {/* Job Block */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img
                                src={
                                  item.logo ||
                                  "https://i.pinimg.com/564x/76/e3/2a/76e32aac67331df783916caaadd9a448.jpg"
                                }
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
                                {item.location || "London, UK"}
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
                        <ul className="option-list">
                          <li>
                            <button data-text="View Return">
                              <span className="fa fa-exchange text-red-600"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="View Application">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Application">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default Skilltest;
