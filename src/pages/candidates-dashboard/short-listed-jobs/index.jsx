
import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Short ListedJobs || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const ShortListedJobsPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShortListedJobs />
    </>
  );
};

export default ShortListedJobsPage
