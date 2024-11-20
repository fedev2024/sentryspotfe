import React, { useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const Additionalinformation = () => {
  const [formData, setFormData] = useState({
    iit_jee_rank: "",
    cat_percentile: "",
    gmat_score: "",
    marital_status: "",
    is_veteran_or_ex_military: null,
    is_differently_abled: null,
    handled_team: null,
    willing_to_work_6_days: null,
    willing_to_relocate: null,
    open_to_startups: null,
    willingness_to_travel: null,
    work_permit_usa: "",
    languages: "",
    languages: [],
  });
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState("");
  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      setLanguages([
        ...languages,
        { name: languageInput.trim(), proficiency: "Intermediate" },
      ]);
      setLanguageInput("");
    }
  };

  const handleLanguageProficiencyChange = (index, proficiency) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].proficiency = proficiency;
    setLanguages(updatedLanguages);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue =
      type === "checkbox" || type === "radio" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual token if required
      const token = localStorage.getItem(Constant.USER_TOKEN);

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/additional-details",
        formData,
        {
          headers: {
            Authorization: token, // Add token if needed
          },
        }
      );
      console.log("Additional details submitted successfully:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error submitting additional details:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setFormData({ ...formData, languages: updatedLanguages });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { name: "", proficiency: "" }],
    });
  };

  const deleteLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: updatedLanguages });
  };
  return (
    <form onSubmit={handleSubmit} className="default-form">
      <div className="row">
        {/* <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">IIT-JEE All India Rank (AIR)</label>
          <input
            type="text"
            name="iit_jee_rank"
            value={formData.iit_jee_rank}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">CAT Percentile</label>
          <input
            type="text"
            name="cat_percentile"
            value={formData.cat_percentile}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">GMAT Score</label>
          <input
            type="text"
            name="gmat_score"
            value={formData.gmat_score}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">Marital Status</label>
          <input
            type="text"
            name="marital_status"
            value={formData.marital_status}
            onChange={handleInputChange}
          />
        </div> */}

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Are you a veteran or ex-military?</label>
          <div className="flex">
            <input
              type="radio"
              name="is_veteran_or_ex_military"
              value={true}
              onChange={handleInputChange}
              checked={formData.is_veteran_or_ex_military === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="is_veteran_or_ex_military"
              value={false}
              onChange={handleInputChange}
              checked={formData.is_veteran_or_ex_military === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">
            Do you require any reasonable adjustments to perform your role
            effectively?
          </label>
          <div className="flex">
            <input
              type="radio"
              name="is_differently_abled"
              value={true}
              onChange={handleInputChange}
              checked={formData.is_differently_abled === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="is_differently_abled"
              value={false}
              onChange={handleInputChange}
              checked={formData.is_differently_abled === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Have you handled a team?</label>
          <div className="flex">
            <input
              type="radio"
              name="handled_team"
              value={true}
              onChange={handleInputChange}
              checked={formData.handled_team === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="handled_team"
              value={false}
              onChange={handleInputChange}
              checked={formData.handled_team === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">
            Are you open to flexible or extended work schedules, including
            weekends?
          </label>
          <div className="flex">
            <input
              type="radio"
              name="willing_to_work_6_days"
              value={true}
              onChange={handleInputChange}
              checked={formData.willing_to_work_6_days === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="willing_to_work_6_days"
              value={false}
              onChange={handleInputChange}
              checked={formData.willing_to_work_6_days === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Have you willing to relocate?</label>
          <div className="flex">
            <input
              type="radio"
              name="willing_to_relocate"
              value={true}
              onChange={handleInputChange}
              checked={formData.willing_to_relocate === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="willing_to_relocate"
              value={false}
              onChange={handleInputChange}
              checked={formData.willing_to_relocate === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        {/* <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">Have you open to startups?</label>
          <div className="flex">
            <input
              type="radio"
              name="open_to_startups"
              value={true}
              onChange={handleInputChange}
              checked={formData.open_to_startups === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="open_to_startups"
              value={false}
              onChange={handleInputChange}
              checked={formData.open_to_startups === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div> */}

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">
            Are you comfortable traveling for work-related purposes?
          </label>
          <div className="flex">
            <input
              type="radio"
              name="willingness_to_travel"
              value={true}
              onChange={handleInputChange}
              checked={formData.willingness_to_travel === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="willingness_to_travel"
              value={false}
              onChange={handleInputChange}
              checked={formData.willingness_to_travel === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Do you have a work permit for the UK?</label>
          <div className="flex">
            <input
              type="radio"
              name="work_permit_usa"
              value={true}
              onChange={handleInputChange}
              checked={formData.work_permit_usa === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="work_permit_usa"
              value={false}
              onChange={handleInputChange}
              checked={formData.work_permit_usa === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        {/* Continue with other form fields in a similar manner */}
        {/* <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">Languages</label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
          />
        </div> */}
        {/* Add Languages */}

        <h5 className="text-xl mt-6">Languages</h5>
        <div className="form-group col-lg-12flex gap-10 col-md-12 my-4">
          <div className="border rounded flex items-center flex-wrap gap-2 p-3">
            {languages.map((language, index) => (
              <div key={index} className="flex flex-wrap gap-2 items-center">
                <span>{language.name}</span>
                <select
                  value={language.proficiency}
                  onChange={(e) =>
                    handleLanguageProficiencyChange(index, e.target.value)
                  }
                  className="border rounded p-1"
                >
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                  <option value="Fluent">Fluent</option>
                </select>
                <button
                  type="button"
                  className="theme-btn btn-style-one bg-blue-950 "
                  onClick={() => handleRemoveLanguage(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type="text"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              className="border-none focus:outline-none flex-grow"
              placeholder="Enter a language"
            />
            <button
              type="button"
              onClick={handleAddLanguage}
              className="theme-btn btn-style-one bg-blue-950 ml-2"
            >
              + Add
            </button>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one bg-blue-800"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Additionalinformation;
