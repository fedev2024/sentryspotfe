
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { format } from "date-fns";


const JobListingsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("6");

  useEffect(() => {
    fetchAppliedJobs();
  }, [timeFilter]);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        setAppliedJobs(response.data.data);
        setError(null);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching jobs");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    // Implement delete functionality here
    console.log("Delete job:", jobId);
  };
  console.log(appliedJobs,"appliedJobs");
  const DefaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Applied Jobs</h2>

          <select
            className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="6">Last 6 Months</option>
            <option value="12">Last 12 Months</option>
            <option value="16">Last 16 Months</option>
            <option value="24">Last 24 Months</option>
            <option value="60">Last 5 Years</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : appliedJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No applied jobs available at the moment. Please apply to jobs and
            check back later.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold">
                    Job Title
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Posted At
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Location
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job) => (
                  <tr key={job.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={job.logo || DefaultImage}
                          alt={`${job.job_title} logo`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <Link
                            to={`/job-single-v3/${job.id}`}
                            className="font-medium text-blue-600 hover:text-blue-800"
                          >
                            {job.job_title}
                          </Link>
                          {job.specialisms && (
                            <p className="text-sm text-gray-600 mt-1">
                              {job.specialisms}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-4 py-4 text-gray-600">
                      {job.created_at || "N/A"}
                    </td> */}
                    <td className="px-4 py-4 text-gray-600">
                      {job.created_at
                        ? format(new Date(job.created_at), "PPPpp") // Formats as "Dec 5, 2024 at 1:30 PM"
                        : "N/A"}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {job.complete_address ||
                        job.city ||
                        "Location not specified"}{" "}
                      {job.country ? "," : ""}
                      {job.country}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        {/* <button
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="View Return"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button> */}
                        <Link to={`/job-single-v3/${job.id}`}>
                          <button
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="View Application"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </Link>
                        {/* <button
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Application"
                          onClick={() => handleDelete(job.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingsTable;
