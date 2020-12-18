/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import CreatePost from "views/CreatePost.js"
import CreateUpdate from "views/CreateUpdate";
import CurrentProfile from "views/CurrentProfile";
import Challenges from "views/Challenges";

let userID = "1234"


var routes = [
  {
    path: "/dashboard",
    name: "Updates",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/challenges",
    name: "Challenges",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bulb-63",
    component: Challenges,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },

  {
    path: "/current-profile",
    name: "Current Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: CurrentProfile,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Create Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-simple-add",
    component: UserProfile,
    layout: "/admin"
  },
  
  {
    path: "/create-post",
    name: "Create Challenge",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-simple-add",
    component: CreatePost,
    layout: "/admin"
  },
  {
    path: "/create-update",
    name: "Create Update",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-simple-add",
    component: CreateUpdate,
    layout: "/admin"
  }
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl"
  // }
];
export default routes;
