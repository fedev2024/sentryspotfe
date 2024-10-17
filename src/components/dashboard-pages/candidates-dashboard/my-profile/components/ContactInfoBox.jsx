import Map from "../../../Map";
import ResumeUpload from "./my-profile/ResumeUpload";
import { useState } from "react";

const ContactInfoBox = ({ onNext }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [videoError, setVideoError] = useState("");
  const [audioError, setAudioError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    // After successful submission, go to the next tab
    onNext();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (e.g., limit to 50 MB)
      if (file.size > 50 * 1024 * 1024) {
        setVideoError("File size should not exceed 50 MB.");
        setVideoFile(null);
      } else {
        setVideoError("");
        setVideoFile(file);
      }
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (e.g., limit to 10 MB)
      if (file.size > 10 * 1024 * 1024) {
        setAudioError("File size should not exceed 10 MB.");
        setAudioFile(null);
      } else {
        setAudioError("");
        setAudioFile(file);
      }
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Attach Resume */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 mb-5">
          <label className="w-1/4">Attach Resume</label>
          <ResumeUpload />
        </div>
        
        {/* Upload Video Profile */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 my-5">
          <label className="w-1/4">Upload Video Profile</label>
          <div className="w-full">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="border h-10 w-full rounded-lg p-2"
            />
            {videoError && <p className="text-red-500">{videoError}</p>}
            <p className="text-gray-600">
              Upload a video file (max size: 50 MB, max length: 60 seconds).
            </p>
          </div>
        </div>

        {/* Upload Audio Profile */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 my-5">
          <label className="w-1/4">Upload Audio Profile</label>
          <div className="w-full">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="border h-10 w-full rounded-lg p-2"
            />
            {audioError && <p className="text-red-500">{audioError}</p>}
            <p className="text-gray-600">
              Upload an audio file (max size: 10 MB, max length: 60 seconds).
            </p>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 mt-5">
          <label className="w-1/4">Cover Letter</label>
        <div className="flex-col col-lg-10">
        <button className="float-end border p-2 mb-1 rounded-lg border-black">+ AI Assist</button>
          <textarea
            name="coverLetter"
            className="border h-60 w-full rounded-lg"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia.
             Queensberry Street, North Melbourne VIC 3051"
            required
          />
        </div>
        </div>
        <div className="form-group flex col-lg-12 col-md-12">
          <label className="w-1/5"></label>
          <input type="checkbox" name="includeCoverLetter" className="ms-4" />
          <p>Include cover letter while applying</p>
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save & Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
