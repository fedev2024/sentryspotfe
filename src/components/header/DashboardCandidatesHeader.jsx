import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../public/company_logo.png"




import candidatesMenuData from "../../data/candidatesMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
// import logo from "../../Images/logo.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";


const DashboardCandidatesHeader = () => {

  const [isOpen, setIsOpen] = useState(false);

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#user-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  const dispatch = useDispatch();
  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shadow ${navbar ? "fixed-header" : ""}`}
    >
      <div className="header">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="header-logo flex items-center">
              <a href="/">
                <img src={logo} alt="Company Logo" className="h-10 w-auto" />
              </a>
              <div className="main-menu ms-4 hidden md:flex">
                <ul className="flex space-x-4">
                  <li>
                    <a href="" className="text-gray-700 hover:text-blue-600">
                      AI Services
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-gray-700 hover:text-blue-600">
                      Hiring Advice
                    </a>
                  </li>
                  <li>
                    <a
                      href="/job-list-v7#tab2"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Companies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/job-list-v3"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Jobs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="side-menu flex items-center">
              <span className="icon la la-bell text-3xl  text-blue-900"></span>

              <i class="las la-comment text-3xl mx-4 text-blue-900"></i>

              {/* <i class="las la-user text-3xl text-blue-900 me-3"></i> */}
              <div id="user-dropdown" className=" ">
                <i
                  className="las la-user text-3xl text-blue-900 me-3 flex items-center focus:outline-none cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                ></i>

                {isOpen && (
                  <div className=" profile-dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700 ">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Saved Searches
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Saved Jobs
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Applied Jobs
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Recommended Jobs
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100  "
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2  hover:bg-gray-100  "
                        >
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="btn-box">
                {userToken ? (
                  <Button
                    className="bg-gray-500 p-2 duration-500 hover:bg-[#E60278] flex items-center"
                    title="logout"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <IoLogOutOutline size={24} />
                  </Button>
                ) : (
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#loginPopupModal"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Sign in
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Responsive Menu for Mobile Devices */}
        </div>
      </div>
    </header>
  );
};

export default DashboardCandidatesHeader;


