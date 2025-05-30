const JobOverView = (company) => {
  console.log(company)
  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>Posted 1 hours ago</span>
        </li>
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Qualification:</h5>
          <span>{company.company?.qualification}</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{company.company?.city}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{company.company?.job_title}</span>
        </li>
        <li>
          <i className="icon icon-clock"></i>
          <h5>Hours:</h5>
          <span>50h / week</span>
        </li>
        <li>
          <i className="icon icon-rate"></i>
          <h5>Rate:</h5>
          <span>$15 - $25 / hour</span>
        </li>
        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>{company.company?.offered_salary}</span>
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;
