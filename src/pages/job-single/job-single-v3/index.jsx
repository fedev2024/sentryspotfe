
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// // Import components
// import LoginPopup from "@/components/common/form/login/LoginPopup";
// import FooterDefault from "@/components/footer/common-footer";
// import DefaulHeader2 from "@/components/header/DefaulHeader2";
// import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
// import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
// import Contact from "@/components/job-single-pages/shared-components/Contact";
// import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
// import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
// import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
// import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
// import MetaComponent from "@/components/common/MetaComponent";

// // Utility imports
// import { Constant } from "@/utils/constant/constant";

// const JobSingleDynamicV3 = () => {
//   const [jobData, setJobData] = useState(null);
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const handleApplyClick = (e) => {
//     e.preventDefault();
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     // If token exists, show the modal
//     const modal = document.querySelector("#applyJobModal");
//     const bootstrapModal = new bootstrap.Modal(modal);
//     bootstrapModal.show();
//   };

//   const handleBookmarkClick = (e) => {
//     e.preventDefault();
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     // Add your bookmark logic here
//     // You might want to call an API to save the bookmark
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = token ? { Authorization: token } : {};

//         // Fetch Job Details
//         const jobResponse = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`,
//           { headers }
//         );

//         const fetchedJobData = jobResponse.data.data;
//         setJobData(fetchedJobData);

//         // Fetch Company Details if company_id exists
//         if (fetchedJobData.company_id) {
//           const companyResponse = await axios.get(
//             `https://api.sentryspot.co.uk/api/jobseeker/companies/${fetchedJobData.company_id}`
//           );
//           setCompany(companyResponse.data.data);
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, token]);

//   const metadata = {
//     title: "Job Single Dynamic V3 || sentryspot - Job Board ReactJs Template",
//     description: "Job details page with comprehensive job and company information",
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <MetaComponent meta={metadata} />
//       <span className="header-span"></span>

//       <LoginPopup />
//       <DefaulHeader2 />

//       <section className="job-detail-section">
//         <div className="job-detail-outer">
//           <div className="auto-container">
//             <div className="row">
//               <div className="content-column col-lg-8 col-md-12 col-sm-12">
//                 <div className="job-block-outer">
//                   <div className="job-block-seven style-two">
//                     <div className="inner-box">
//                       <div className="content">
//                         <h4>{jobData?.job_title || "Job Title Not Available"}</h4>

//                         <ul className="job-info">
//                           <li>
//                             <span className="icon flaticon-briefcase"></span>
//                             {company?.company_name || "Company Name Not Available"}
//                           </li>
//                           <li>
//                             <span className="icon flaticon-map-locator"></span>
//                             {jobData?.city && jobData?.country 
//                               ? `${jobData.city}, ${jobData.country}` 
//                               : "Location Not Specified"}
//                           </li>
//                           <li>
//                             <span className="icon flaticon-clock-3"></span>
//                             {jobData?.created_at || "Date Not Available"}
//                           </li>
//                           <li>
//                             <span className="icon flaticon-money"></span>
//                             {jobData?.offered_salary || "Salary Not Defined"}
//                           </li>
//                         </ul>

//                         {jobData?.jobType && (
//                           <ul className="job-other-info">
//                             {jobData.jobType.map((val, i) => (
//                               <li key={i} className={val.styleClass}>
//                                 {val.type}
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="job-overview-two">
//                   <h4>Job Description</h4>
//                   <JobOverView2 />
//                 </div>

//                 <JobDetailsDescriptions />

//                 <div className="other-options">
//                   <div className="social-share">
//                     <h5>Share this job</h5>
//                     <SocialTwo />
//                   </div>
//                 </div>
//               </div>

//               <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
//                 <aside className="sidebar">
//                   <div className="btn-box">
//                     <a
//                       href="#"
//                       className="theme-btn btn-style-one"
//                       onClick={handleApplyClick}
//                     >
//                       Apply For Job
//                     </a>
//                     <button className="bookmark-btn" onClick={handleBookmarkClick}>
//                       <i className="flaticon-bookmark"></i>
//                     </button>
//                   </div>

//                   {/* Apply Job Modal */}
//                   <div
//                     className="modal fade"
//                     id="applyJobModal"
//                     tabIndex="-1"
//                     aria-hidden="true"
//                   >
//                     {token && (
//                       <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                         <div className="apply-modal-content modal-content">
//                           <div className="text-center">
//                             <h3 className="title">Apply for this job</h3>
//                             <button
//                               type="button"
//                               className="closed-modal"
//                               data-bs-dismiss="modal"
//                               aria-label="Close"
//                             ></button>
//                           </div>
//                           <ApplyJobModalContent job={jobData} />
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="sidebar-widget company-widget">
//                     <div className="widget-content">
//                       <div className="company-title">
//                         <div className="company-logo">
//                           {/* Company logo placeholder */}
//                         </div>
//                         <a href="#" className="profile-link">
//                           View company profile
//                         </a>
//                       </div>

//                       <CompnayInfo />

//                       <div className="btn-box">
//                         <a
//                           href={jobData?.link || "#"}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="theme-btn btn-style-three"
//                         >
//                           Company Website
//                         </a>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="sidebar-widget contact-widget">
//                     <h4 className="widget-title">Contact Us</h4>
//                     <div className="widget-content">
//                       <div className="default-form">
//                         <Contact />
//                       </div>
//                     </div>
//                   </div>
//                 </aside>
//               </div>
//             </div>

//             <div className="related-jobs">
//               <div className="title-box">
//                 <h3>Related Jobs</h3>
//                 <div className="text">2020 jobs live - 293 added today.</div>
//               </div>

//               <div className="row">
//                 <RelatedJobs2 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <FooterDefault footerStyle="alternate5" />
//     </>
//   );
// };

// export default JobSingleDynamicV3;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Import components
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import MetaComponent from "@/components/common/MetaComponent";

// Utility imports
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-hot-toast";

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

const JobSingleDynamicV3 = () => {
  const [jobData, setJobData] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const handleApplyClick = (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    // If token exists, show the modal
    const modal = document.querySelector("#applyJobModal");
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  };

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    try {
      console.log("bookmark");
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response,"bookmark");
      if (response.data.status == "status" || response.data.code == 200) {
        toast.success(response.message || "Your job was successfully saved!");
      } else {
        toast.error("Failed to save the job. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the job. Please try again.");
    }
    // Add your bookmark logic here
    // You might want to call an API to save the bookmark
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: token } : {};

        // Fetch Job Details
        const jobResponse = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`,
          { headers }
        );

        const fetchedJobData = jobResponse.data.data;
        setJobData(fetchedJobData);

        // Fetch Company Details if company_id exists
        if (fetchedJobData.company_id) {
          const companyResponse = await axios.get(
            `https://api.sentryspot.co.uk/api/jobseeker/companies/${fetchedJobData.company_id}`
          );
          setCompany(companyResponse.data.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const metadata = {
    title: "Job Single Dynamic V3 || sentryspot - Job Board ReactJs Template",
    description: "Job details page with comprehensive job and company information",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>

      <LoginPopup />
      <DefaulHeader2 />

      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content">
                        <h4>{jobData?.job_title || "Job Title Not Available"}</h4>

                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            {company?.company_name || "Company Name Not Available"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {jobData?.city && jobData?.country 
                              ? `${jobData.city}, ${jobData.country}` 
                              : "Location Not Specified"}
                          </li>
                          <li>
                            <span className="icon flaticon-clock-3"></span>
                            {jobData?.created_at || "Date Not Available"}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>
                            {jobData?.offered_salary || "Salary Not Defined"}
                          </li>
                        </ul>

                        {jobData?.jobType && (
                          <ul className="job-other-info">
                            {jobData.jobType.map((val, i) => (
                              <li key={i} className={val.styleClass}>
                                {val.type}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="job-overview-two">
                  <h4>Job Description</h4>
                  <JobOverView2 />
                </div>

                <JobDetailsDescriptions />

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn btn-style-one"
                      onClick={handleApplyClick}
                    >
                      Apply For Job
                    </a>
                    <button className="bookmark-btn" onClick={handleBookmarkClick}>
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>

                  {/* Apply Job Modal */}
                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    {token && (
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="apply-modal-content modal-content">
                          <div className="text-center">
                            {/* <h3 className="title">Apply for this job</h3>
                            <button
                              type="button"
                              className="closed-modal"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button> */}
                          </div>
                          <ApplyJobModalContent jobId={jobData.id} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          {/* Company logo placeholder */}
                        </div>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>

                      <CompnayInfo />

                      <div className="btn-box">
                        <a
                          href={jobData?.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          Company Website
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <div className="related-jobs">
              <div className="title-box">
                <h3>Related Jobs</h3>
                <div className="text">2020 jobs live - 293 added today.</div>
              </div>

              <div className="row">
                <RelatedJobs2 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV3;