

import CandidatesList from "@/components/candidates-listing-pages/candidates-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Candidates List V3 || sentryspot - Job Borad ReactJs Template',
  description:
    'sentryspot - Job Borad ReactJs Template',
  
}


const CandidateListPage3 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <CandidatesList />
    </>
  );
};

export default CandidateListPage3
