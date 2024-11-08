

import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

import { useLocation } from "react-router-dom";
const DashboardCandidatesSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;


  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
         <div className="flex gap-4 justify-center items-center p-4 border border-gray-200 mb-2 rounded-lg bg-blue-700 text-white">
           <div className="h-12 w-12 ">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s" alt=""
             className="rounded-full w-full h-full"
            />
           </div>
            <div className="text-white">
            <p className="text-white">
              user name
            </p>
            <p className="text-white">
              profile
            </p>
            </div>
          </div>
        <ul className="navigation">
         
          {candidatesuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, pathname) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
            >
              <Link to={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* End navigation */}

        <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            `Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>`
          </p>
          <div style={{ width: 200, height: 200, margin: "auto" }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#7367F0",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>{" "}
          {/* <!-- Pie Graph --> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
