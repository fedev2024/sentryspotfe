import FooterDefault from "../../footer/common-footer";
import Breadcrumb from "../../common/Breadcrumb";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterJobsBox from "./FilterJobsBox";
import FilterSidebar from "./FilterSidebar";
import { useState, useEffect } from "react";
import Companieslist from "./Companieslist";
import { useLocation, useNavigate } from "react-router-dom";
import Courselist from "./Courselist";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    // Get the hash from the URL and set the active tab accordingly
    const hash = location.hash.replace("#", "");
    if (hash) {
      setActiveTab(hash);
    }
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`#${tab}`);
  };

  return (
    <>
      {/* Header Span */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Find Jobs" meta="Jobs" />
      {/* End Breadcrumb */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar />
              </div>
            </div>

            {/* Content Column */}
            <div className="content-column">
              <div className="">
                <div className="tabs-navigation flex space-x-4 border-b border-gray-300 mb-4 ms-80">
                  <button
                    className={`tab-button py-2 px-4 ${
                      activeTab === "tab1"
                        ? "border-b-2 rounded-sm border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("tab1")}
                  >
                    Jobs
                  </button>
                  <button
                    className={`tab-button py-2 px-4 ${
                      activeTab === "tab2"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("tab2")}
                  >
                    Companies
                  </button>
                  <button
                    className={`tab-button py-2 px-4 ${
                      activeTab === "tab3"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("tab3")}
                  >
                    Courses
                  </button>
                </div>

                {/* Tabs Content */}
                <div className="tabs-content">
                  {activeTab === "tab1" && (
                    <div className="border-gray-300 rounded-lg">
                      <FilterJobsBox />
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div className="p-4 bg-white border border-gray-300 rounded-lg">
                      <Companieslist />
                    </div>
                  )}
                  {activeTab === "tab3" && (
                    <div className="p-4 bg-white border border-gray-300 rounded-lg">
                      <Courselist/>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* End Content Column */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* End Listing Page Section */}

      <FooterDefault footerStyle="alternate5" />
      {/* End Main Footer */}
    </>
  );
};

export default Index;
