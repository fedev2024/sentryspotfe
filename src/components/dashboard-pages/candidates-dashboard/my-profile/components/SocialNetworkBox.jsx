import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


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

  useEffect(() => {
    axios
      .get(`${baseurl}course-types`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setcoursetype(response.data.data);
      })
      .catch((error) => {
      toast.error(error.message);
      });

    axios
      .get(`${baseurl}degree`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setDegreetype(response.data.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    axios
      .get(`${baseurl}years`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBatchtype(response.data.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = [
      {
        institute,
        batch_start_id: parseInt(selectBatchStarttype, 10), // Convert to integer
        batch_end_id: parseInt(selectBatchEndtype, 10), // Convert to integer
        degree_id: parseInt(selectDegreetype, 10), // Convert to integer
        course_type_id: parseInt(selectcoursetype, 10), // Convert to integer
      }
    ];

    try {
      await axios.put(`${baseurl}user-profile-education`, payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
      });
      toast.success("Education details saved successfully!");
      onNext();  // Move to the next step
    } catch (error) {
      toast.error("Failed to save education details.");
    }
};

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Institute</label>
          <input
            type="text"
            name="institute"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            placeholder="Enter institute name"
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Field of Study(Course)</label>
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

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Batch Start</label>
          <select
            id="BatchStart"
            value={selectBatchStarttype}
            onChange={(e) => setselectBatchStarttype(e.target.value)}
          >
            <option value="">Select start year</option>
            {Batchtype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Batch End</label>
          <select
            id="BatchEnd"
            value={selectBatchEndtype}
            onChange={(e) => setselectBatchEndtype(e.target.value)}
          >
            <option value="">Select end year</option>
            {Batchtype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Graduation Start Year</label>
          <select
            id="BatchStart"
            value={selectBatchStarttype}
            onChange={(e) => setselectBatchStarttype(e.target.value)}
          >
            <option value="">Select start year</option>
            {Batchtype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Graduation End Year</label>
          <select
            id="BatchEnd"
            value={selectBatchEndtype}
            onChange={(e) => setselectBatchEndtype(e.target.value)}
          >
            <option value="">Select end year</option>
            {Batchtype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Level Of Education</label>
          <select
            id="Degree"
            value={selectDegreetype}
            onChange={(e) => setselectDegreetype(e.target.value)}
          >
            <option value="">Select a Degree</option>
            {Degreetype.map((type) => (
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
