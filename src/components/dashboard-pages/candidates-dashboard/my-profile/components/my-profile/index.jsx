{
  /*
  import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";
import ResumeUpload from "./ResumeUpload";

const index = ({ onNext }) => {
  return (
    <div className="widget-content">
     {/* <LogoUpload /> 
           <ResumeUpload />



 
 <FormInfoBox />
 
</div>
);
};

export default index;

  */
}

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useEffect } from "react";
import React, { useState } from "react";
import Select from "react-select";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Header from "@/components/home-10/Header";
import { Constant } from "@/utils/constant/constant";
import { toast, ToastContainer } from "react-toastify";

const Index = ({ onNext }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

  const current = new Date().toISOString().split("T")[0];
  const [logImg, setLogImg] = useState(null);

  const logImgHander = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLogImg(reader.result); // Store the Base64 string of the file
      };
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  // Resetting the image
  const resetImage = () => {
    setLogImg(null); // Reset the image to null (default)
  };

  const personal_details = "personal_details";

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const handlePhoneVerification = () => {
    // Phone verification logic
    // For example, trigger SMS verification and set verification status
    if (phoneNumber) {
      // Simulating a verification process
      toast.success("Phone number verified!");
      setIsPhoneVerified(true); // Mark as verified
    } else {
      toast.error("Please enter a valid phone number.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSector) {
      toast.error("Please select a sector.");
      return;
    }
    if (selectedRoles.length === 0) {
      toast.error("Please select at least one role.");
      return;
    }

    const payload = {
      selectedSector,
      selectedRoles,
    };

    console.log("Payload:", payload);
    toast.success("Details saved successfully!");
    const form = e.target;
    console.log(">>>>>>", form);
    const formData = {
      keyword: personal_details,
      photo: logImg,
      first_name: form.first_name.value,
      last_name: form.lastname.value,
      // gender_id: form.gender.value,
      // dob: form.birthdate.value,
      email: form.email.value,

      phone_number: phoneNumber, // Use the state value here

      current_country_id: form.country.value,
      current_state_id: form.state.value,
      current_city_id: form.city.value,

      preferred_country_id: form.preferredcountry.value,
      preferred_state_id: form.preferredstate.value,
      preferred_city_id: form.preferredcity.value,

      // industry_id: form.industries.value,
      functional_area_id: form.Functional.value,
      // notice_period_id: form.notice_period.value,
      experience_in_month: form.Experiencetype.value,
      annual_salary_id: form.Salarytype.value,
      expected_salary_id: form.expectedSalarytype.value,
    };

    try {
      const response = await axios.put(
        "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
        JSON.stringify(formData), // Send as a JSON string
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      toast.success("Personal Details updated successfully!");
      onNext();
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${baseurl}user-profile/first_name`, {
          headers: {
            Authorization: token,
          },
        });
        const profileData = response.data.data;
        console.log("Profile Data>>>>:", profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const [workplaceTypes, setWorkplaceTypes] = useState([]);
  const [selectedWorkplace, setSelectedWorkplace] = useState("");

  useEffect(() => {
    // Fetch workplace types from API
    axios
      .get(`${baseurl}workplace-types`, {
        headers: {
          Authorization: token, // Assuming you're storing the token in localStorage
        },
      })
      .then((response) => {
        setWorkplaceTypes(response.data.data); // Adjust the path according to the response structure
      })
      .catch((error) => {
        console.error("Error fetching workplace types:", error);
      });
  }, []);

  const [jobtype, setjobstype] = useState([]);
  const [selectjobtype, setselectjobtype] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}job-types`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setjobstype(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [Experiencetype, setExperiencetype] = useState([]);
  const [selectExperiencetype, setselectExperiencetype] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}experience-level`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setExperiencetype(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [Salarytype, setSalarytype] = useState([]);
  const [selectSalarytype, setselectSalarytype] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}salary-range`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setSalarytype(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [expectedSalarytype, expectedsetSalarytype] = useState([]);
  const [expectedselectSalarytype, expectedsetselectSalarytype] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}salary-range`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        expectedsetSalarytype(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [Gendertype, setGendertype] = useState([]);
  const [selectGendertype, setselectGendertype] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}genders`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setGendertype(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [Functionaltype, setFunctionaltype] = useState([]);
  const [selectFunctionaltype, setselectFunctionaltype] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}functional-area`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setFunctionaltype(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [industriestype, setindustriestype] = useState([]);
  const [selectindustriestype, setselectindustriestype] = useState("");

  useEffect(() => {
    axios
      .get(`${baseurl}industries`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setindustriestype(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${baseurl}countries`, {
        headers: {
          Authorization: token,
        },
      });
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`${baseurl}stats/${countryId}`, {
        headers: {
          Authorization: token,
        },
      });
      setStates(response.data.data);
      setCities([]); // Reset cities when country changes
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(`${baseurl}cities/${stateId}`, {
        headers: {
          Authorization: token,
        },
      });
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    fetchStates(countryId);
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    fetchCities(stateId);
  };

  const [preferredcountries, preferredsetCountries] = useState([]);
  const [preferredstates, preferredsetStates] = useState([]);
  const [preferredcities, preferredsetCities] = useState([]);

  const [preferredselectedCountry, preferredsetSelectedCountry] = useState("");
  const [preferredselectedState, preferredsetSelectedState] = useState("");
  const [preferredselectedCity, preferredsetSelectedCity] = useState("");

  useEffect(() => {
    preferredfetchCountries();
  }, []);

  const preferredfetchCountries = async () => {
    try {
      const response = await axios.get(`${baseurl}countries`, {
        headers: {
          Authorization: token,
        },
      });
      preferredsetCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const preferredfetchStates = async (countryId) => {
    try {
      const response = await axios.get(`${baseurl}stats/${countryId}`, {
        headers: {
          Authorization: token,
        },
      });
      preferredsetStates(response.data.data);
      preferredsetCities([]); // Reset cities when country changes
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const preferredfetchCities = async (stateId) => {
    try {
      const response = await axios.get(`${baseurl}cities/${stateId}`, {
        headers: {
          Authorization: token,
        },
      });
      preferredsetCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const preferredhandleCountryChange = (e) => {
    const countryId = e.target.value;
    preferredsetSelectedCountry(countryId);
    preferredfetchStates(countryId);
  };

  const preferredhandleStateChange = (e) => {
    const stateId = e.target.value;
    preferredsetSelectedState(stateId);
    preferredfetchCities(stateId);
  };

  const [email, setEmail] = useState("");

  useEffect(() => {
    // Assuming the user information is stored in localStorage with the key 'XuserInfo'
    const userInfo = JSON.parse(localStorage.getItem("__XuserInfo"));

    // Set the email from localStorage to the component state
    if (userInfo && userInfo.email) {
      setEmail(userInfo.email);
    }
  }, []);

  const defaultSectors = {
    "Cyber Security": [
      "Cybersecurity Analyst",
      "Network Security Engineer",
      "Security Consultant",
      "Penetration Tester (Ethical Hacker)",
      "Cybersecurity Architect",
      "Incident Response Manager",
      "Chief Information Security Officer (CISO)",
      "Malware Analyst",
      "Security Software Developer",
      "Forensic Analyst",
      "Compliance Analyst (Cybersecurity)",
      "Cloud Security Engineer",
      "Security Operations Center (SOC) Analyst",
      "Identity and Access Management (IAM) Specialist",
      "Vulnerability Assessment Analyst",
      "Application Security Engineer",
      "Security Researcher",
      "Data Protection Officer (DPO)",
      "Security Awareness Trainer",
      "Risk Manager (Cybersecurity)",
      "Cryptographer",
      "DevSecOps Engineer",
      "Security Tester (Ethical Hacker)",
      "Red Team Operator",
      "Blue Team Operator",
      "Threat Intelligence Analyst",
      "Security Infrastructure Engineer",
      "Penetration Testing Manager",
      "Chief Security Officer (CSO)",
    ],
    "Security & Safety": [
      "CCTV Operator",
      "Counter Terrorist Cleared",
      "Environmental Safety Specialist",
      "Event Safety Steward",
      "Fire Safety Officer",
      "Health and Safety Officer",
      "Health and Safety Specialist",
      "Law Enforcement Officer",
      "Security & Safety Professional",
      "Parking Attendant",
      "Probation/Prison Service Officer",
      "Security Consultant",
      "Security Contracts Manager",
      "Security Guard",
      "Traffic Warden",
      "Security Supervisor",
      "Security Operations Manager",
      "Security Manager",
      "Access Control Officer",
      "Alarm Technician",
      "Asset Protection Specialist",
      "Loss Prevention Manager",
      "Safety Manager",
      "Fire Marshal",
      "Emergency Response Specialist",
      "Surveillance Technician",
      "Risk Assessment Consultant",
      "Occupational Health and Safety Specialist",
      "Building Security Coordinator",
      "Safety Trainer",
      "Forensic Safety Investigator",
      "Disaster Recovery Specialist",
      "Workplace Safety Coordinator",
      "Security Investigator",
      "Anti-Terrorism Analyst",
    ],
  };

  const [sectors, setSectors] = useState(defaultSectors);
  const [selectedSector, setSelectedSector] = useState("");
  const [newSector, setNewSector] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [customRoles, setCustomRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Handle sector selection
  const handleSectorChange = (e) => {
    const value = e.target.value;
    if (value === "add-new-sector") {
      setNewSector("");
    }
    setSelectedSector(value);
    setSelectedRoles([]);
    setCustomRoles([]);
  };

  // Handle role selection
  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles((prev) => prev.filter((r) => r !== role));
    } else if (selectedRoles.length < 5) {
      setSelectedRoles((prev) => [...prev, role]);
    } else {
      toast.error("You can only select up to 5 roles.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <ToastContainer />
      <div className="row">
        {/* Profile Picture Upload */}

        <div className="form-group col-lg-6 col-md-12 flex justify-center">
          <div>
            <div className="rounded-full border w-32 h-32 flex items-center justify-center">
              <input
                className="uploadButton-input hidden"
                type="file"
                name="attachments[]"
                accept="image/*"
                id="upload"
                // required
                onChange={logImgHander}
              />
              <label
                className="uploadButton-button cursor-pointer flex items-center justify-center"
                htmlFor="upload"
              >
                {logImg ? (
                  <img
                    src={logImg}
                    alt="Uploaded"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <i className="fas fa-camera text-6xl"></i>
                  </div>
                )}
              </label>
            </div>
            <div className="cursor-pointer bg-blue-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg">
              Add Picture
            </div>

            {logImg && (
              <button
                type="button"
                onClick={resetImage}
                className="bg-red-500 text-white mt-2 py-1 px-4 rounded-lg text-sm"
              >
                Remove Picture
              </button>
            )}
          </div>
        </div>
        {/* Form Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <label style={{ fontWeight: "800" }}>First Name*</label>
          <input
            type="text"
            name="first_name"
            placeholder="eg. Jerome"
            required
            className="border font-light rounded-none mb-4"
          />
          <label>Last Name*</label>
          <input
            type="text"
            name="lastname"
            placeholder="eg. doe"
            required
            className="border rounded-none font-light"
          />
        </div>

        {/* <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Workspace*</label>
          <select
            id="workplaceType"
            value={selectedWorkplace}
            onChange={(e) => setSelectedWorkplace(e.target.value)}
          >
            <option value="">Select a workplace type</option>
            {workplaceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Job-Type*</label>
          <select
            id="jobtype"
            value={selectjobtype}
            onChange={(e) => setselectjobtype(e.target.value)}
          >
            <option value="">select a job-type</option>
            {jobtype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div> */}

        <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Phone Number*</label>
          <PhoneInput
            country={"gb"} // Set default country here
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
            inputStyle={{
              width: "100%",
              borderRadius: "10px",
              border: "none",
              height: "calc(2.5em + 1rem + 3px)",
              fontSize: "1rem",
              lineHeight: "1.5",
              backgroundColor: "#F0F5F7",
              backgroundClip: "padding-box",
            }}
            containerStyle={{ width: "100%" }}
            buttonStyle={{
              borderRadius: "none",
              border: "none",
              backgroundColor: "#f8f9fa",
            }}
          />
          <button
            type="button"
            onClick={handlePhoneVerification}
            className="bg-blue-600 text-white py-1 px-4 mt-2 rounded-lg"
          >
            Verify
          </button>
          {isPhoneVerified && (
            <p className="text-green-500 mt-2">Phone Verified</p>
          )}
        </div>
        <div className="form-group col-lg-6 col-md-12 font-light relative">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="email pr-10" // Adding padding to the right so the icon doesn't overlap with text
            placeholder="Your Email*"
            required
            readOnly
            disabled
          />
          <i className="fas fa-check absolute right-2 top-1/2 transform -translate-y-1/2 p-2 mr-2 bg-green-500 text-white rounded-full"></i>
        </div>

        {/* <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Gender*</label>
          <select
          id="Gender"
          name='gender'
          value={selectGendertype}
          onChange={(e)=> setselectGendertype(e.target.value)}>
            <option value="">select a Gender</option>
            {Gendertype.map((type)=>(
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          </div> 

        <div className="form-group col-lg-6 col-md-12 font-light">
  <label>DD/MM/YYYY (Optional)</label>
  <input
    type="date"
    name="birthdate"
    max={current}

    style={{backgroundColor:"#F0F5F7"}}
    className=" rounded-lg p-2 py-3 text-lg border-0 w-full font-thin"
    placeholder="Enter BirthDate"
  />
</div> */}

        <div className="form-group col-lg-4 col-md-12 font-light">
          <label className="my-2 mt-4 text-lg">(Current - Location)</label>
          {/* <label>Country*</label> */}
          <select
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-8 col-md-12 font-light">
          <label className="my-2 mt-4 text-lg">(Preferred - Location)</label>
          {/* <label>Country*</label> */}
          <select
            name="preferredcountry"
            value={preferredselectedCountry}
            onChange={preferredhandleCountryChange}
            required
          >
            <option value="">Select Country</option>
            {preferredcountries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-lg-12 col-md-12 font-light">
          <label>Job-Type*</label>
          <div className="job-type-container row">
            {jobtype.map((type) => (
              <div
                key={type.id}
                className="checkbox-wrapper col-lg-3 flex mt-1 gap-2"
              >
                <input
                  type="checkbox"
                  id={`jobtype-${type.id}`}
                  value={type.id}
                  checked={selectjobtype.includes(type.id)}
                  onChange={(e) => {
                    const newSelectedTypes = e.target.checked
                      ? [...selectjobtype, type.id]
                      : selectjobtype.filter((id) => id !== type.id);
                    setselectjobtype(newSelectedTypes);
                  }}
                />
                <label htmlFor={`jobtype-${type.id}`}>{type.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Job Title*</label>
          <input
            type="text"
            name="job_title"
            placeholder="eg. Frontend Developer"
            required
            className="border font-light rounded-none mb-4"
          />
          {/* <select
            id="Functional"
            name="Functional"
            value={selectFunctionaltype}
            onChange={(e) => setselectFunctionaltype(e.target.value)}
          >
            <option value="">select a Functional Area</option>
            {Functionaltype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select> */}
        </div>

        <div className="form-group  col-lg-6 col-md-12 font-light">
          <label>Select Sector*</label>
          <select
            value={selectedSector}
            onChange={handleSectorChange}
            className="form-control"
            required
          >
            <option value="">Select a sector</option>
            {Object.keys(sectors).map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Roles Section */}
        {selectedSector && selectedSector !== "add-new-sector" && (
          <div className=" form-group col-lg-6 col-md-12 font-light">
            <label>Roles in {selectedSector} (select up to 5)</label>
            <div
              className="dropdown"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            >
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
              >
                {selectedRoles.length > 0
                  ? `${selectedRoles.length} roles selected`
                  : "Select Roles"}
              </button>
              {showRoleDropdown && (
                <div
                  className="dropdown-menu show role-dropdown"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {[...sectors[selectedSector], ...customRoles].map((role) => (
                    <label key={role} className="dropdown-item">
                      <input
                        type="checkbox"
                        value={role}
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                        className="gap-2"
                        disabled={
                          selectedRoles.length === 5 &&
                          !selectedRoles.includes(role)
                        }
                      />
                      {role}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <small>{5 - selectedRoles.length} roles remaining</small>
          </div>
        )}

        {/* State Dropdown */}
        {/* <div className="form-group col-lg-4 col-md-12 font-light">
          <label>State*</label>
          <select
            name="state"
            value={selectedState}
            onChange={handleStateChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* City Dropdown */}
        {/* <div className="form-group col-lg-4 col-md-12 font-light">
          <label>City*</label>
          <select
            name="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* State Dropdown */}
        {/* <div className="form-group col-lg-4 col-md-12 font-light">
          <label>State*</label>
          <select
            name="preferredstate"
            value={preferredselectedState}
            onChange={preferredhandleStateChange}
            required
          >
            <option value="">Select State</option>
            {preferredstates.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* City Dropdown */}
        {/* <div className="form-group col-lg-4 col-md-12 font-light">
          <label>City*</label>
          <select
            name="preferredcity"
            value={preferredselectedCity}
            onChange={(e) => preferredsetSelectedCity(e.target.value)}
            required
          >
            <option value="">Select City</option>
            {preferredcities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Salary-Range (INR)*</label>
          <select
            id="Salarytype"
            name="Salarytype"
            value={selectSalarytype}
            onChange={(e) => setselectSalarytype(e.target.value)}
          >
            <option value="">select a Salary</option>
            {Salarytype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Expected Salary-Range (INR)*</label>
          <select
            id="expectedSalarytype"
            name="expectedSalarytype"
            value={expectedselectSalarytype}
            onChange={(e) => expectedsetselectSalarytype(e.target.value)}
          >
            <option value="">select a Salary</option>
            {expectedSalarytype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div> */}
        <div className="form-group col-lg-6 col-md-12 font-light">
          {/* Label */}
          <label className="font-medium">
            Salary*{" "}
            <span className="text-sm text-gray-500">
              Minimum salary (please enter at least one type of salary)
            </span>
          </label>

          {/* Input and Dropdown Container */}
          <div className=" font-light  row">
            {/* Input Container */}
            <div className=" col-lg-6 col-md-12 ">
              {/* Input Field with Currency Symbol */}
              <div className="relative">
                {/* Currency Symbol */}
                <span className="absolute  text-center z-10 top-[20%] p-2 left-0 flex items-center text-gray-500">
                  £
                </span>
                {/* Input Field */}
                <input
                  type="number"
                  name="salary"
                  className="w-full pl-10 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5000"
                  required
                />
              </div>
            </div>

            {/* Dropdown */}
            <div className=" col-lg-6 col-md-12 ">
              <select
                name="salaryType"
                className="  border border-gray-300 rounded-r-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              >
                <option value="per hour">per hour</option>
                <option value="per annum">per annum</option>
              </select>
            </div>
          </div>

          {/* Helper Text */}
          <p className="mt-2 text-sm text-gray-500">
            Read our Salary Blog to find out more
          </p>
        </div>

        {/* <div className="form-group col-lg-6 col-md-12 font-light">
          <label>Notice Period*</label>
          <input
            type="text"
            name="notice_period"
            placeholder="Notice Period"
            required
          />
        </div> */}

        <div className="form-group col-lg-12 col-md-12 font-light">
          <label className="font-medium">
            Work Experience *{" "}
            <span className="text-sm text-gray-500">
              How many years of work experience do you have ?
            </span>
          </label>
          <select
            id="Experiencetype"
            name="Experiencetype"
            value={selectExperiencetype}
            onChange={(e) => setselectExperiencetype(e.target.value)}
          >
            <option value="">select a Experience</option>
            {/* {Experiencetype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))} */}
            <option value="1">0-1 year</option>
            <option value="2">1-2 years</option>
            <option value="3">2-3 years</option>
            <option value="4">3-5 years</option>
            <option value="5">5-10 years</option>
            <option value="6">10+ years</option>
          </select>
        </div>

        {/* <div className="form-group col-lg-12 col-md-12 font-light">
          <label>Industries*</label>
          <select
            id="industries"
            name="industries"
            value={selectindustriestype}
            onChange={(e) => setselectindustriestype(e.target.value)}
          >
            <option value="">select a Industries</option>
            {industriestype.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* Submit Button */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one bg-blue-900">
            Save & Next ➤
          </button>
        </div>
      </div>
    </form>
  );
};

export default Index;
