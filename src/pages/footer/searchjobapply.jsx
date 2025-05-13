import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";

export default function SearchJobsApply() {
  return (
    <div className="search-jobs-apply-page">
      <DefaulHeader2 />

      {/* Hero Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/images/job-search-icon.png" // ✅ Replace with the correct icon/image path
            alt="Job Search Icon"
            className="w-12 h-12"
          />
        </div>
        <h1 className="text-white text-3xl font-bold">Search Jobs & Apply</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Find Your Dream Job with SentrySpot Resume’s Advanced Job Search &
            Apply Tool
          </h2>
          <p>
            At SentrySpot Resume, we aim to simplify your job search and
            application process. Our advanced job search and apply tool
            leverages cutting-edge technology to connect you with opportunities
            that match your skills, experience, and career aspirations.
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
