
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import DetailsContent from "./detailsContent";
// // import { Icon1, People, Timer } from "../../../imagepath";
// // import { Target } from "react-feather";
// import CourseDescription from "./CourseDescription";
// import DefaulHeader2 from "../header/DefaulHeader2";
// import LoginPopup from "../common/form/login/LoginPopup";
// import FooterDefault from "../footer/common-footer";

// // Styled Components


// const CourseDetails = () => {
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { courseid } = useParams();
  
//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         const url = `https://api.novajobs.us/api/trainers/courses/${courseid}`;
//         const response = await axios.get(url);
//         if (response.data) {
//           setCourseData(response.data);
//         } else {
//           setError("No course content available at this time.");
//         }
//       } catch (error) {
//         console.error("Error fetching course data:", error);
//         setError("Error loading course data. Please try again later.");
//         console.log(error.response);
//         if(error.response && error.response.status == 401){
//           window.location.href = '/login'
//         }

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseData();
//   }, [courseid]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="alert alert-warning">{error}</div>;
//   if (!courseData)
//     return (
//       <div className="alert alert-info">
//         No course content available at this time.
//       </div>
//     );

//   const token = localStorage.getItem("token");

 

 

//   const courseDescription = courseData.data.course_description || "";
  
//   return (
//     <div className="main-wrapper">
//       {/* {token ? <CourseHeader activeMenu={"CourseDetails"} courseId={courseid} /> : <Header />} */}
//       <LoginPopup />
//       <DefaulHeader2 />
//       <div className="inner-banner">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-8">
//               <div className="instructor-wrap border-bottom-0 m-0">
//                 <div className="about-instructor align-items-center">
//                   <div className="abt-instructor-img">
//                     <Link
//                       to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
//                     >
//                       <img src={`https://api.novajobs.us${courseData.data.trainer_photo}`} alt="Instructor" className="img-fluid" />
//                     </Link>
//                   </div>
//                   <div className="instructor-detail me-3">
//                     <h5>
//                       <Link
//                         to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
//                       >
//                         {courseData.data.trainer_first_name ||
//                           "Instructor Name"}{" "}
//                         {courseData.data.trainer_last_name || ""}
//                       </Link>
//                     </h5>
//                     <p>
//                       {courseData.data.trainer_job_title || "Instructor Title"}
//                     </p>
//                   </div>
//                   {/* <div className="rating mb-0">
//                     <i className="fas fa-star filled me-1" />
//                     <i className="fas fa-star filled me-1" />
//                     <i className="fas fa-star filled me-1" />
//                     <i className="fas fa-star filled me-1" />
//                     <i className="fas fa-star me-1" />
//                     <span className="d-inline-block average-rating">
//                       <span className="rating text-white">({courseData.data.rating})</span> 
//                     </span>
//                   </div> */}
//                   <div className="rating mb-0">
//                     {Array.from({ length: 5 }).map((_, index) => (
//                       <i
//                         key={index}
//                         className={`fas fa-star ${
//                           index < courseData.data.rating ? "filled" : "unfilled"
//                         } me-1`}
//                       />
//                     ))}
//                     <span className="d-inline-block average-rating">
//                       <span className="rating text-white">
//                         ({courseData.data.rating})
//                       </span>
//                     </span>
//                   </div>
//                 </div>
//                 <span className="web-badge mb-3">
//                   {courseData.course_category_name
//                     ? courseData.data.course_category_name
//                     : "Graduates"}
//                 </span>
//               </div>
//               <h2>{courseData.data.course_title || "Course Title"}</h2>

//               {/* <CourseDescriptionWrapper>
//                 <div
//                   dangerouslySetInnerHTML={{ __html: displayedDescription }}
//                 />
//                 {courseDescription.length >
//                   truncateDescription(courseDescription).length && (
//                   <ReadMoreButton onClick={toggleDescription}>
//                     {isExpanded ? "Show Less" : "Read More"}
//                   </ReadMoreButton>
//                 )}
//               </CourseDescriptionWrapper> */}
//               <CourseDescription description={courseDescription} />

//               <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
//                 <div className="cou-info">
//                   {/* <img src={Icon1} alt="Lessons" /> */}
//                   <p>{courseData.data.total_lectures || " No Lessons"}</p>
//                 </div>
//                 <div className="cou-info">
//                   {/* <img src={Timer} alt="Duration" /> */}
//                   <p>{courseData.data.time_spent_on_course || "9hr 30min"}</p>
//                 </div>
//                 <div className="cou-info">
//                   {/* <img src={People} alt="Enrolled Students" /> */}
//                   <p>
//                     {`${courseData.data.enrolled_student_count} students enrolled` ||
//                       "32 students enrolled"}
//                   </p>
//                 </div>
//                 <div className="cou-info">
//                   {/* <Target size={24} color="#000" />{" "} */}
//                   {/* Adjust size and color */}
//                   <p>{`${courseData.data.target_audience}`}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* </section> */}
//       <DetailsContent courseFeatureData={courseData.data} />
//       <FooterDefault />
//     </div>
//   );
// };

// export default CourseDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DetailsContent from "./detailsContent";
import CourseDescription from "./CourseDescription";
import DefaulHeader2 from "../header/DefaulHeader2";
import LoginPopup from "../common/form/login/LoginPopup";
import FooterDefault from "../footer/common-footer";

const CourseDetails = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseid } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const url = `https://api.novajobs.us/api/trainers/courses/${courseid}`;
        const response = await axios.get(url);
        if (response.data) {
          setCourseData(response.data);
        } else {
          setError("No course content available at this time.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Error loading course data. Please try again later.");
        if (error.response && error.response.status === 401) {
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseid]);

  if (loading)
    return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
  if (error)
    return <div className="alert alert-warning text-center py-10">{error}</div>;
  if (!courseData)
    return (
      <div className="alert alert-info text-center py-10">
        No course content available at this time.
      </div>
    );

  const courseDescription = courseData.data.course_description || "";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <LoginPopup />
      <DefaulHeader2 />

      {/* Banner Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Instructor Details */}
            <div className="flex items-center gap-4">
              <Link
                // to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
              >
                <img
                  src={`https://api.sentryspot.co.uk${courseData.data.trainer_photo}`}
                  alt="Instructor"
                  className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg"
                />
              </Link>
              <div>
                <h5 className="text-2xl font-semibold">
                  <Link
                    // to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
                  >
                    {courseData.data.trainer_first_name}{" "}
                    {courseData.data.trainer_last_name}
                  </Link>
                </h5>
                <p className="text-sm">{courseData.data.trainer_job_title}</p>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i
                      key={index}
                      className={`fas fa-star ${
                        index < courseData.data.rating
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">
                    ({courseData.data.rating})
                  </span>
                </div>
              </div>
            </div>

            {/* Course Title */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold">{courseData.data.course_title}</h1>
              <span className="inline-block mt-2 px-3 py-1 bg-white text-blue-600 rounded-full text-sm shadow">
                {courseData.course_category_name || "Graduates"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="text-xl font-semibold">
              {courseData.data.total_lectures || "No Lessons"}
            </p>
            <p className="text-gray-500 text-sm">Total Lessons</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="text-xl font-semibold">
              {courseData.data.time_spent_on_course || "9hr 30min"}
            </p>
            <p className="text-gray-500 text-sm">Duration</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="text-xl font-semibold">
              {courseData.data.enrolled_student_count || 32} Students
            </p>
            <p className="text-gray-500 text-sm">Enrolled</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="text-xl font-semibold">
              {courseData.data.target_audience || "General"}
            </p>
            <p className="text-gray-500 text-sm">Target Audience</p>
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div className="container mx-auto px-4 mt-10">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
          <CourseDescription description={courseDescription} />
        </div>
      </div>

      {/* Additional Course Details */}
      <DetailsContent courseFeatureData={courseData.data} />

      {/* Footer */}
      <FooterDefault />
    </div>
  );
};

export default CourseDetails;
