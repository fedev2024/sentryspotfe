
// import jobs from "@/data/job-featured";
// import LoginPopup from "@/components/common/form/login/LoginPopup";
// import FooterDefault from "@/components/footer/common-footer";
// import DefaulHeader from "@/components/header/DefaulHeader";
// import MobileMenu from "@/components/header/MobileMenu";
// import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
// import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
// import Contact from "@/components/job-single-pages/shared-components/Contact";
// import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
// import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
// import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
// import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
// import {useParams } from "react-router-dom";

// import MetaComponent from "@/components/common/MetaComponent";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant";

// const metadata = {
//   title: "Job Single Dyanmic V3 || sentryspot - Job Borad ReactJs Template",
//   description: "sentryspot - Job Borad ReactJs Template",
// };

// const JobSingleDynamicV3 = () => {
//   const [jobData, setJobData] = useState(null);
//   const [companyId,setCompanyId] =useState(null);
//   const [company,setCompany] = useState(null)
//   let params = useParams();
//   const id = params.id;
//   const token = localStorage.getItem(Constant.USER_TOKEN)

//   useEffect(()=>{
//     fetchJobData()
//    {companyId?fetchCompanyData():""}
//   },[id])

//   const fetchJobData = async () => {
//     try {
//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const headers = { Authorization: token };

//       // Fetch Job Details
//       const jobResponse = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`,
//         { headers }
//       );
//       const jobData = jobResponse.data.data;
//       setJobData(jobData);
//       setCompanyId(jobData.company_id)
//       console.log(jobData,companyId);

//       // If company_id exists, fetch company details
     
//     } catch (err) {
//       console.error("Error fetching job details:", err);
//       setLoading(false);
//     }
//   };

//   const fetchCompanyData = async () =>{
//     try {
//       // Fetch Company Details
//       const companyResponse = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/companies/${companyId}`,
//       );
//       setCompany(companyResponse.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching company details:", err);
//       setLoading(false);
//     }

//   }

//   return (
//     <>
//     <MetaComponent meta={metadata} />
//       {/* <!-- Header Span --> */}
//       <span className="header-span"></span>

//       <LoginPopup />
//       {/* End Login Popup Modal */}

//       <DefaulHeader />
//       {/* <!--End Main Header --> */}

//       {/* End Header */}
//       {/* End MobileMenu */}

//       {/* <!-- Job Detail Section --> */}
//       <section className="job-detail-section">
//         <div className="job-detail-outer">
//           <div className="auto-container">
//             <div className="row">
//               <div className="content-column col-lg-8 col-md-12 col-sm-12">
//                 <div className="job-block-outer">
//                   <div className="job-block-seven style-two">
//                     <div className="inner-box">
//                       <div className="content">
//                         <h4>{jobData?.job_title}</h4>

//                         <ul className="job-info">
//                           <li>
//                             <span className="icon flaticon-briefcase"></span>
//                             {company?.company_name}
//                           </li>
//                           {/* compnay info */}
//                           <li>
//                             <span className="icon flaticon-map-locator"></span>
//                             {jobData?.city},{jobData?.country}
//                           </li>
//                           {/* location info */}
//                           <li>
//                             <span className="icon flaticon-clock-3"></span>{" "}
//                             {jobData?.created_at}
//                           </li>
//                           {/* time info */}
//                           <li>
//                             <span className="icon flaticon-money"></span>{" "}
//                             {jobData?.offered_salary || "Salary not defined"}
//                           </li>
//                           {/* salary info */}
//                         </ul>
//                         {/* End .job-info */}

//                         <ul className="job-other-info">
//                           {jobData?.jobType?.map((val, i) => (
//                             <li key={i} className={`${val.styleClass}`}>
//                               {val.type}
//                             </li>
//                           ))}
//                         </ul>
//                         {/* End .job-other-info */}
//                       </div>
//                       {/* End .content */}
//                     </div>
//                   </div>
//                   {/* <!-- Job Block --> */}
//                 </div>
//                 {/* <!-- job block outer --> */}

//                 <div className="job-overview-two">
//                   <h4>Job Description</h4>
//                   <JobOverView2 />
//                 </div>
//                 {/* <!-- job-overview-two --> */}

//                 <JobDetailsDescriptions />
//                 {/* End job-details */}

//                 <div className="other-options">
//                   <div className="social-share">
//                     <h5>Share this job</h5>
//                     <SocialTwo />
//                   </div>
//                 </div>
//                 {/* <!-- Other Options --> */}
//               </div>
//               {/* End .content-column */}

//               <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
//                 <aside className="sidebar">
//                   <div className="btn-box">
//                     <a
//                       href="#"
//                       className="theme-btn btn-style-one"
//                       data-bs-toggle="modal"
//                       data-bs-target="#applyJobModal"
//                     >
//                       Apply For Job
//                     </a>
//                     <button className="bookmark-btn">
//                       <i className="flaticon-bookmark"></i>
//                     </button>
//                   </div>
//                   {/* End apply for job btn */}

//                   {/* <!-- Modal --> */}
//                   <div
//                     className="modal fade"
//                     id="applyJobModal"
//                     tabIndex="-1"
//                     aria-hidden="true"
//                   >
//                     <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                       <div className="apply-modal-content modal-content">
//                         <div className="text-center">
//                           <h3 className="title">Apply for this job</h3>
//                           <button
//                             type="button"
//                             className="closed-modal"
//                             data-bs-dismiss="modal"
//                             aria-label="Close"
//                           ></button>
//                         </div>
//                         {/* End modal-header */}

//                         <ApplyJobModalContent />
//                         {/* End PrivateMessageBox */}
//                       </div>
//                       {/* End .send-private-message-wrapper */}
//                     </div>
//                   </div>
//                   {/* End .modal */}

//                   <div className="sidebar-widget company-widget">
//                     <div className="widget-content">
//                       <div className="company-title">
//                         <div className="company-logo">
//                           {/* <img
                           
//                             src={jobData.logo}
//                             alt="resource"
//                           /> */}
//                         </div>
//                         {/* <h5 className="company-name">{jobData.company}</h5> */}
//                         <a href="#" className="profile-link">
//                           View company profile
//                         </a>
//                       </div>
//                       {/* End company title */}

//                       <CompnayInfo company={company} />

//                       <div className="btn-box">
//                         <a
//                           href="#"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="theme-btn btn-style-three"
//                         >
//                           {jobData?.link}
//                         </a>
//                       </div>
//                       {/* End btn-box */}
//                     </div>
//                   </div>
//                   {/* End .company-widget */}

//                   <div className="sidebar-widget contact-widget">
//                     <h4 className="widget-title">Contact Us</h4>
//                     <div className="widget-content">
//                       <div className="default-form">
//                         <Contact />
//                       </div>
//                       {/* End .default-form */}
//                     </div>
//                   </div>
//                   {/* End contact-widget */}
//                 </aside>
//                 {/* End .sidebar */}
//               </div>
//               {/* End .sidebar-column */}
//             </div>
//             {/* End .row  */}

//             <div className="related-jobs">
//               <div className="title-box">
//                 <h3>Related Jobs</h3>
//                 <div className="text">2020 jobs live - 293 added today.</div>
//               </div>
//               {/* End title box */}

//               <div className="row">
//                 <RelatedJobs2 />
//               </div>
//               {/* End .row */}
//             </div>
//             {/* <!-- Related Jobs --> */}
//           </div>
//           {/* End auto-container */}
//         </div>
//         {/* <!-- job-detail-outer--> */}
//       </section>
//       {/* <!-- End Job Detail Section --> */}

//       <FooterDefault footerStyle="alternate5" />
//       {/* <!-- End Main Footer --> */}
//     </>
//   );
// };

// export default JobSingleDynamicV3

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import components
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
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

const JobSingleDynamicV3 = () => {
  const [jobData, setJobData] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error("No authentication token found");
        }

        const headers = { Authorization: token };

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
      <DefaulHeader />

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
                      data-bs-toggle="modal"
                      data-bs-target="#applyJobModal"
                    >
                      Apply For Job
                    </a>
                    <button className="bookmark-btn">
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
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">Apply for this job</h3>
                          <button
                            type="button"
                            className="closed-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <ApplyJobModalContent />
                      </div>
                    </div>
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

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV3;