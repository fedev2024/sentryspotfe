
import logo from "../../Images/logo.png"

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "../header/HeaderNavContent";


const Header = () => {
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
      className={`main-header header-style-four -type-16 ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="container-fluid">
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
            <div className="me-10">
              <Link to="/">
              <img
                                        alt="brand"
                                        src={logo}
                                       className="h-28 w-28"
                                    />
              </Link>
            </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            {/* <!-- Login/Register --> */}
            <div className="btn-box">
              <a
                href="#"
                className="theme-btn btn-style-six call-modal"
                data-bs-toggle="modal"
                data-bs-target="#loginPopupModal"
              >
                Login / Register
              </a>
              <Link
                to="/employers-dashboard/post-jobs"
                className="theme-btn btn-style-five"
              >
                Job Post
              </Link>
            </div>
          </div>
        </div>
        {/* <!-- Main box --> */}
      </div>
    </header>
  );
};

export default Header;
