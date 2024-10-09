import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
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
    <>
      {!userToken && ( // Only show the top header if the user is not logged in
        <div className="TopHeader">
          <div className="container">
            <div className="TopMenu">
              <div className="TopSocial flex gap-2">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-linkedin-in"></i>
                <i className="fa-brands fa-instagram"></i>
              </div>
              <div className="TopMenu">
                <ul className="flex flex-wrap justify-center md:justify-start">
                  <li>
                    <a href="/job-list-v7">
                      <i className="fa-solid fa-compass"></i> Jobs
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-solid fa-medal"></i> Careers & Training
                    </a>
                  </li>
                  <li className="border-l-2"></li>
                  <li>
                    <a href="https://employer.sentryspot.co.uk/">
                      <i className="fa-solid fa-user"></i> Post Job
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`header ${navbar ? 'bg-white shadow-md' : 'bg-transparent'} transition-all duration-300`}>
        <div className="container">
          <div className="header-menu flex items-center justify-between flex-wrap">
            <div className="header-logo flex items-center">
              <a href="/">
                <img src="https://htmlsentryspot.vercel.app/img/company_logo.png" alt="Logo" className="h-10" />
              </a>
              <div className="main-menu ms-4 hidden md:flex">
                <ul className="flex space-x-4">
                  <li>
                    <a href="/sentry-spot">AI Services</a>
                  </li>
                  <li>
                    <a href="https://blog.sentryspot.co.uk/category/job-search-strategies/">Hiring Advice</a>
                  </li>
                  <li>
                    <a href="">Companies</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="side-menu flex items-center">
              <div className="btn-box flex-row flex-wrap">
                {userToken ? (
                  <Button
                    className="bg-gray-500 p-3 ml-2 duration-500 hover:bg-[#E60278]"
                    title="logout"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <IoLogOutOutline size={24} />
                  </Button>
                ) : (
                  <>  
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#loginPopupModal"
                      className=""
                    >
                      Sign in
                    </a>
                  </>
                )}
                {!userToken && ( // Hide button if user is logged in
                  <Link to={"/sentry-spot"}>
                    <button
                      type="button"
                      className="register-btn"
                    >
                      Create Your Sentry ID
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaulHeader2;
