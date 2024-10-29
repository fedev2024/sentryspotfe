import { Constant } from "@/utils/constant/constant";

// Retrieve the token from local storage
const token = localStorage.getItem(Constant.USER_TOKEN);

// Define the candidateMenus array with the token added to the "AI Resume Builder" routePath
const candidateMenus = [
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/candidates-dashboard/dashboard",
    active: "active",
  },
  {
    id: 2,
    name: "My Profile",
    icon: "la-user-tie",
    routePath: "/candidates-dashboard/my-profile",
    active: "",
  },
  {
    id: 3,
    name: "AI Resume Builder",
    icon: "la la-robot",
    routePath: `https://sentryspot-new-rb-fe.vercel.app?${token}`,
    active: "",
  },
  {
    id: 9,
    name: "AI skill Assessment",
    icon: "la-box",
    routePath: "/candidates-dashboard/packages",
    active: "",
  },
  {
    id: 4,
    name: "Skill History",
    icon: "la la-file-invoice",
    routePath: "/candidates-dashboard/skilllistpage",
    active: "",
  },
  {
    id: 5,
    name: "Applied Jobs",
    icon: "la-briefcase",
    routePath: "/candidates-dashboard/applied-jobs",
    active: "",
  },
  {
    id: 6,
    name: "Saved Jobs",
    icon: "la la-heart",
    routePath: "/candidates-dashboard/job-alerts",
    active: "",
  },
  {
    id: 7,
    name: "Communtity",
    icon: "la la-safari",
    routePath: "/community",
    active: "",
  },
  {
    id: 10,
    name: "Messages",
    icon: "la-comment-o",
    routePath: "/candidates-dashboard/messages",
    active: "",
  },
  {
    id: 11,
    name: "Notification",
    icon: "la la-bell",
    routePath: "",
    active: "",
  },
  {
    id: 12,
    name: "My Company",
    icon: "las la-copyright",
    routePath: "",
    active: "",
  },
  {
    id: 13,
    name: "My Courses",
    icon: "las la-folder",
    routePath: "",
    active: "",
  },
  {
    id: 14,
    name: "Certifications",
    icon: "las la-graduation-cap",
    routePath: "",
    active: "",
  },
  {
    id: 15,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/candidates-dashboard/change-password",
    active: "",
  },
  {
    id: 16,
    name: "Logout",
    icon: "la-sign-out",
    routePath: "/login",
    active: "",
  },
  {
    id: 17,
    name: "Delete Profile",
    icon: "la-trash",
    routePath: "/",
    active: "",
  },
];

export default candidateMenus;
