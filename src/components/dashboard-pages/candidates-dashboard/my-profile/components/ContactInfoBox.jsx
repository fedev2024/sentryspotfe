import { useState } from "react";
import ResumeUpload from "./my-profile/ResumeUpload";

const ContactInfoBox = ({ onNext }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [showSampleVideo, setShowSampleVideo] = useState(false);
  const [videoError, setVideoError] = useState("");

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedFormats = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedFormats.includes(file.type)) {
        alert("Only PDF and DOCX files are allowed.");
        setResumeFile(null);
      } else if (file.size > 10 * 1024 * 1024) {
        alert("File size should not exceed 10 MB.");
        setResumeFile(null);
      } else {
        setResumeFile(file);
      }
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setVideoError("File size should not exceed 50 MB.");
        setVideoFile(null);
      } else {
        setVideoError("");
        setVideoFile(file);
      }
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onNext();
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Resume Upload */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 mb-5">
          <label className="w-1/4">Attach Resume</label>
          <div className="w-full">
            <input
              type="file"
              accept=".pdf, .docx"
              onChange={handleResumeChange}
              className="border h-10 w-full rounded-lg p-2"
            />
            {resumeFile && (
              <p className="text-green-500">Uploaded: {resumeFile.name}</p>
            )}
            <p className="text-gray-600">
              Accepts PDF or DOCX (max size: 10 MB).
            </p>
          </div>
        </div>

        {/* Video Upload */}
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
            {videoFile && (
              <div className="flex items-center mt-2 gap-2">
                <p className="text-green-500">Uploaded: {videoFile.name}</p>
                <button
                  type="button"
                  className="text-red-500 underline"
                  onClick={handleRemoveVideo}
                >
                  Remove
                </button>
              </div>
            )}
            <button
              type="button"
              className="text-blue-500 underline mt-2"
              onClick={() => setShowSampleVideo(true)}
            >
              View sample here
            </button>
            <p className="text-gray-600">
              Upload a video file (max size: 50 MB, max length: 60 seconds).
            </p>
          </div>
        </div>

        {/* Video Sample Popup */}
        {showSampleVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-5 max-w-lg">
              <video controls width="100%">
                <source
                  src="/path-to-your-video/Self-Intro-Video.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
              <button
                className="mt-4 text-red-500 underline"
                onClick={() => setShowSampleVideo(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Cover Letter */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 mt-5">
          <label className="w-1/4">Cover Letter</label>
          <div className="flex-col col-lg-10">
            <button className="float-end border p-2 mb-1 rounded-lg border-black">
              + AI Assist
            </button>
            <textarea
              name="coverLetter"
              className="border h-60 w-full rounded-lg"
              placeholder="Enter your cover letter"
              required
            />
          </div>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" class="theme-btn btn-style-one bg-blue-800">
            Save &amp; Next ➤
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
