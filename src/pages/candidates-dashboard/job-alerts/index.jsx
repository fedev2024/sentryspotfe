
import JobAlerts from "@/components/dashboard-pages/candidates-dashboard/job-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Job Alerts || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const JobAlertPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobAlerts />
    </>
  );
};

export default JobAlertPage
