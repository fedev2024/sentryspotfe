// import { useState, useEffect } from "react";
// import { Constant } from "@/utils/constant/constant";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import InstituteAutoComplete from "./InstituteName";


// const SocialNetworkBox = ({ onNext }) => {

//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

//   const [institute, setInstitute] = useState("");
//   const [coursetype, setcoursetype] = useState([]);
//   const [selectcoursetype, setselectcoursetype] = useState("");
//   const [Degreetype, setDegreetype] = useState([]);
//   const [selectDegreetype, setselectDegreetype] = useState("");
//   const [Batchtype, setBatchtype] = useState([]);
//   const [selectBatchStarttype, setselectBatchStarttype] = useState("");
//   const [selectBatchEndtype, setselectBatchEndtype] = useState("");

//   useEffect(() => {
//     axios
//       .get(`${baseurl}course-types`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         setcoursetype(response.data.data);
//       })
//       .catch((error) => {
//       toast.error(error.message);
//       });

//     axios
//       .get(`${baseurl}degree`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         setDegreetype(response.data.data);
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });

//     axios
//       .get(`${baseurl}years`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         setBatchtype(response.data.data);
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = [
//       {
//         institute,
//         batch_start_id: parseInt(selectBatchStarttype, 10), // Convert to integer
//         batch_end_id: parseInt(selectBatchEndtype, 10), // Convert to integer
//         degree_id: parseInt(selectDegreetype, 10), // Convert to integer
//         course_type_id: parseInt(selectcoursetype, 10), // Convert to integer
//       }
//     ];

//     try {
//       await axios.put(`${baseurl}user-profile-education`, payload, {
//         headers: {
//           Authorization: token,
//           'Content-Type': 'application/json'
//         },
//       });
//       toast.success("Education details saved successfully!");
//       onNext();  // Move to the next step
//     } catch (error) {
//       toast.error("Failed to save education details.");
//     }
// };

//   return (
//     <form className="default-form" onSubmit={handleSubmit}>
//       <ToastContainer />
//       <div className="row">
//         <div className="form-group col-lg-6 col-md-12">
//           <label>Institution Name</label>
//           <input
//             type="text"
//             name="institute"
//             value={institute}
//             onChange={(e) => setInstitute(e.target.value)}
//             placeholder="Enter institute name"
//             required
//           />
//         </div>
//         {/* <InstituteAutoComplete /> */}
//         <div className="form-group col-lg-6 col-md-12">
//           <label>Level Of Education</label>
//           <select
//             id="Degree"
//             value={selectDegreetype}
//             onChange={(e) => setselectDegreetype(e.target.value)}
//           >
//             <option value="">Select a Degree</option>
//             {Degreetype.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>Field of Study(Course)</label>
//           <select
//             id="course"
//             value={selectcoursetype}
//             onChange={(e) => setselectcoursetype(e.target.value)}
//           >
//             <option value="">Select a course</option>
//             {coursetype.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* <div className="form-group col-lg-6 col-md-12">
//           <label>Batch Start</label>
//           <select
//             id="BatchStart"
//             value={selectBatchStarttype}
//             onChange={(e) => setselectBatchStarttype(e.target.value)}
//           >
//             <option value="">Select start year</option>
//             {Batchtype.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>Batch End</label>
//           <select
//             id="BatchEnd"
//             value={selectBatchEndtype}
//             onChange={(e) => setselectBatchEndtype(e.target.value)}
//           >
//             <option value="">Select end year</option>
//             {Batchtype.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div> */}
//         {/* <div className="form-group col-lg-6 col-md-12">
//           <label>Graduation Start Year</label>
//           <select
//             id="BatchStart"
//             value={selectBatchStarttype}
//             onChange={(e) => setselectBatchStarttype(e.target.value)}
//           >
//             <option value="">Select start year</option>
//             {Batchtype.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div> */}

//         {/* <div className="form-group col-lg-6 col-md-12">
//           <label>Graduation End Year</label>
//           <select
//             id="BatchEnd"
//             value={selectBatchEndtype}
//             onChange={(e) => setselectBatchEndtype(e.target.value)}
//           >
//             <option value="">Select end year</option>
//             {Batchtype.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div> */}
//         <div className="form-group col-lg-6 col-md-12">
//           {/* Label */}
//           <label>Graduation Year</label>

//           {/* Static Dropdown */}
//           <select
//             id="BatchEnd"
//             className="form-select border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select Graduation Year</option>
//             <option value="2024">2024</option>
//             <option value="2023">2023</option>
//             <option value="2022">2022</option>
//             <option value="2021">2021</option>
//             <option value="2020">2020</option>
//             <option value="2019">2019</option>
//             <option value="2018">2018</option>
//             <option value="2017">2017</option>
//             <option value="2016">2016</option>
//             <option value="2015">2015</option>
//             <option value="2014">2014</option>
//             <option value="2013">2013</option>
//             <option value="2012">2012</option>
//             {/* Add more years if needed */}
//           </select>
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <button type="submit" className="theme-btn btn-style-one bg-blue-950">
//             Save & Next ➤
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SocialNetworkBox;
import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import InstituteAutoComplete from "./InstituteName";

const SocialNetworkBox = ({ onNext }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

  const [institute, setInstitute] = useState("");
  const [coursetype, setcoursetype] = useState([]);
  const [selectcoursetype, setselectcoursetype] = useState("");
  const [Degreetype, setDegreetype] = useState([]);
  const [selectDegreetype, setselectDegreetype] = useState("");
  const [Batchtype, setBatchtype] = useState([]);
  const [selectBatchStarttype, setselectBatchStarttype] = useState("");
  const [selectBatchEndtype, setselectBatchEndtype] = useState("");
  const [educationLevels, setEducationLevels] = useState([]);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}institues`, { headers: { Authorization: token } })
      .then((response) => setcoursetype(response.data.data))
      .catch((error) => toast.error(error.message));

    // axios
    //   .get(`${baseurl}degree`, { headers: { Authorization: token } })
    //   .then((response) => setDegreetype(response.data.data))
    //   .catch((error) => toast.error(error.message));

    axios
      .get(`${baseurl}years`, { headers: { Authorization: token } })
      .then((response) => setBatchtype(response.data.data))
      .catch((error) => toast.error(error.message));

    axios
      .get(`${baseurl}education-level`, { headers: { Authorization: token } })
      .then((response) => setEducationLevels(response.data.data))
      .catch((error) => toast.error(error.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = [
      {
        institute,
        batch_start_id: parseInt(selectBatchStarttype, 10),
        batch_end_id: parseInt(selectBatchEndtype, 10),
        degree_id: parseInt(selectDegreetype, 10),
        course_type_id: parseInt(selectcoursetype, 10),
        education_level_id: parseInt(selectedEducationLevel, 10),
      },
    ];

    try {
      // await axios.put(`${baseurl}user-profile-education`, payload, {
      //   headers: {
      //     Authorization: token,
      //     "Content-Type": "application/json",
      //   },
      // });
      toast.success("Education details saved successfully!");
      onNext();
    } catch (error) {
      toast.error("Failed to save education details.");
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="row">
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Institution Name</label>
          <input
            type="text"
            name="institute"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            placeholder="Enter institute name"
            required
          />
        </div> */}
        <InstituteAutoComplete />

        <div className="form-group col-lg-6 col-md-12">
          <label>Education Level</label>
          <select
            id="Level of Education"
            value={selectedEducationLevel}
            onChange={(e) => setSelectedEducationLevel(e.target.value)}
          >
            <option value="">Select Education Level</option>
            {educationLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

     

        <div className="form-group col-lg-6 col-md-12">
          <label>Field of Study (Course)</label>
          <select
            id="course"
            value={selectcoursetype}
            onChange={(e) => setselectcoursetype(e.target.value)}
          >
            <option value="">Select a course</option>
            {coursetype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Graduation Year</label>
          <select
            id="BatchEnd"
            value={selectBatchEndtype}
            onChange={(e) => setselectBatchEndtype(e.target.value)}
          >
            <option value="">Select Graduation Year</option>
            {Batchtype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one bg-blue-950">
            Save & Next ➤
          </button>
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
