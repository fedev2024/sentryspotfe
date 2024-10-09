import { Link } from "react-router-dom";
import { useEffect, useState } from "react";





import candidatesMenuData from "../../data/candidatesMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
import logo from "../../Images/logo.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";


const DashboardCandidatesHeader = () => {


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
<header className={`main-header header-shadow ${navbar ? "fixed-header" : ""}`}>
  <div className="header">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-3">
        <div className="header-logo flex items-center">
          <a href="/">
            <img
              src="https://htmlsentryspot.vercel.app/img/company_logo.png"
              alt="Company Logo"
              className="h-10 w-auto"
            />
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
                <a href="" className="text-gray-700 hover:text-blue-600">
                  Companies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="side-menu flex items-center">
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
          <i className="fa-solid fa-bell text-2xl mx-3"></i>
        </div>
      </div>
      {/* Responsive Menu for Mobile Devices */}
      
    </div>
  </div>
</header>

  );
};

export default DashboardCandidatesHeader;


