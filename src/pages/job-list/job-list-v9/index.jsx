
import JobList from "@/components/job-listing-pages/job-list-v9";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V9 || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const JobListPage9 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage9
