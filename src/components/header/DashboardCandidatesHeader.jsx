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
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
     
	<div className="header">
		<div className="container">
			<div className="header-menu">
				<div className="header-logo">
				<a  href="/">	<img src="https://htmlsentryspot.vercel.app/img/company_logo.png"/></a>
					<div className="main-menu ms-4">
						<ul>
							<li><a href="">AI Services</a></li>
							<li><a href="">Hiring Advice</a></li>
							<li><a href="">Companies</a></li>
							
						</ul>
					</div>
				</div>
				<div className="side-menu">
        <div className="btn-box">
            {userToken ? (
              <Button
                className="bg-gray-500 p-3 ml-2 duration-500 hover:bg-[#E60278]"
                title="logout"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <IoLogOutOutline size={24} className="" />
              </Button>
            ) : (
             <>	<a  href="#"
             data-bs-toggle="modal"
                  data-bs-target="#loginPopupModal"
                  >Sign in</a>
  
          </>
            )}
<i class="fa-solid fa-bell text-3xl mx-3 "></i>
          </div>


				
				</div>
			</div>
		</div>
	</div>
    </header>
  );
};

export default DashboardCandidatesHeader;


