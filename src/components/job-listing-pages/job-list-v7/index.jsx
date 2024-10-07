import FooterDefault from "../../footer/common-footer";
import Breadcrumb from "../../common/Breadcrumb";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterJobsBox from "./FilterJobsBox";
import FilterSidebar from "./FilterSidebar";
import { useState } from "react";
import Companieslist from "./Companieslist";
const index = () => {

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Find Jobs" meta="Jobs" />
      {/* <!--End Breadcrumb Start--> */}

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
            {/*   <div className="filters-column hidden-1023 col-lg-3 col-md-12 col-sm-12">
              <FilterSidebar />
            </div> */}

          
            {/* <!-- End Filters Column --> */}

            <div className="content-column ">
              <div className="">
              <div className="tabs-navigation flex space-x-4 border-b border-gray-300 mb-4 ms-80">
                  <button
                    className={`tab-button py-2 px-4 ${
                      activeTab === "tab1"
                        ? "border-b-2 rounded-sm border-blue-500 text-blue-500 "
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
                    <div className="  border-gray-300 rounded-lg">
                       <FilterJobsBox />
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div className="p-4 bg-white border border-gray-300 rounded-lg">
                      <Companieslist/>
                    </div>
                  )}
                  {activeTab === "tab3" && (
                    <div className="p-4 bg-white border border-gray-300 rounded-lg">
                      Courses
                    </div>
                  )}
                </div>
                {/* <!-- ls Switcher --> */}
              </div>
            </div>

{/* Tabs Navigation */}



            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
