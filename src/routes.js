/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Dashboard from "views/Dashboard/Dashboard.jsx";

import TableList from "views/TableList/TableList.js";
// @material-ui/icons

import DashboardIcon from "@material-ui/icons/Dashboard";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },

  {
    path: "/tasks",
    name: "Tasks",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  }
];
export default dashRoutes;
