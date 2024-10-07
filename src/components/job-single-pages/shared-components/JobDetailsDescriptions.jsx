const JobDetailsDescriptions = (company) => {
  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>
       {company.company?.job_description}
      </p>
    
    </div>
  );
};

export default JobDetailsDescriptions;
