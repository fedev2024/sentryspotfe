

// import { Link } from "react-router-dom";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import candidatesuData from "../../data/candidatesMenuData";
// import { isActiveLink } from "../../utils/linkActiveChecker";

// import { useDispatch, useSelector } from "react-redux";
// import { menuToggle } from "../../features/toggle/toggleSlice";

// import { useLocation } from "react-router-dom";
// const DashboardCandidatesSidebar = () => {
//   const { pathname } = useLocation();
//   const { menu } = useSelector((state) => state.toggle);
//   const percentage = 30;


//   const dispatch = useDispatch();
//   // menu togggle handler
//   const menuToggleHandler = () => {
//     dispatch(menuToggle());
//   };

//   return (
//     <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
//       {/* Start sidebar close icon */}
//       <div className="pro-header text-end pb-0 mb-0 show-1023">
//         <div className="fix-icon" onClick={menuToggleHandler}>
//           <span className="flaticon-close"></span>
//         </div>
//       </div>
//       {/* End sidebar close icon */}

//       <div className="sidebar-inner">
//         <Link to="/candidates-dashboard/my-profile">
//           <div className="flex gap-4 justify-center items-center p-4 border border-gray-200 mb-2 rounded-lg bg-blue-700 text-white">
//             <div className="h-12 w-12 ">
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
//                 alt=""
//                 className="rounded-full w-full h-full"
//               />
//             </div>
//             <div className="text-white ">
//               <p className="text-white font-bold">user name</p>
//               <p className="text-white font-bold">profile</p>
//             </div>
//           </div>
//         </Link>
//         <ul className="navigation">
//           {candidatesuData.map((item) => (
//             <li
//               className={`${
//                 isActiveLink(item.routePath, pathname) ? "active" : ""
//               } mb-1`}
//               key={item.id}
//               onClick={menuToggleHandler}
//             >
//               <Link to={item.routePath}>
//                 <i className={`la ${item.icon}`}></i> {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//         {/* End navigation */}

//         <div className="skills-percentage">
//           <h4>Skills Percentage</h4>
//           <p>
//             `Put value for <strong>Cover Image</strong> field to increase your
//             skill up to <strong>85%</strong>`
//           </p>
//           <div style={{ width: 200, height: 200, margin: "auto" }}>
//             <CircularProgressbar
//               background
//               backgroundPadding={6}
//               styles={buildStyles({
//                 backgroundColor: "#7367F0",
//                 textColor: "#fff",
//                 pathColor: "#fff",
//                 trailColor: "transparent",
//               })}
//               value={percentage}
//               text={`${percentage}%`}
//             />
//           </div>{" "}
//           {/* <!-- Pie Graph --> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCandidatesSidebar;




import { Link, useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { Constant } from "@/utils/constant/constant";

const DashboardCandidatesSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const { user } = useSelector((state) => state.auth); // Assuming auth state has user info
  const percentage = 30;

  const dispatch = useDispatch();

  // Menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        {/* Dynamic User Profile */}
        <Link to="/candidates-dashboard/my-profile">
          <div className="flex gap-4 justify-center items-center p-4 border border-gray-200 mb-2 rounded-lg bg-blue-700 text-white">
            <div className="flex-1 h-12 w-12">
              <img
                src={user?.photo || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="rounded-full w-full h-full"
              />
            </div>
            <div className="text-white flex-1 flex-col ">
              <p className="text-white ">{user?.first_name || "Anonymous"}</p>
              <p className="text-white ">{user?.profile || "Profile"}</p>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        {/* <ul className="navigation ">
          {candidatesuData.map((item) => (
            <li
              className={` font-bold ${
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
        </ul> */}
        <ul className="navigation">
  {candidatesuData.map((item) => (
    <>
      <li
        className={`font-bold ${
          isActiveLink(item.routePath, pathname) ? "active" : ""
        } mb-1`}
        key={item.id}
        onClick={menuToggleHandler}
      >
        <Link to={item.routePath}>
          <i className={`la ${item.icon}`}></i> {item.name}
        </Link>
      </li>
      {item.id === 15 && (
        // <hr key="separator" className="my-4 border-2 border-gray-900" />
        <div
        className="my-4 w-full h-1 bg-gray-400"
        style={{
          height: "2px", // Adjust thickness
          backgroundColor: "#333", // Dark gray line
        }}
      ></div>

      )}
    </>
  ))}
</ul>


        {/* Skills Percentage */}
        <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>.
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
