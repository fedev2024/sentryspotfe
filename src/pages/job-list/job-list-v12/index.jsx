
import JobList from "@/components/job-listing-pages/job-list-v12";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V12 || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const JobListPage12 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage12
