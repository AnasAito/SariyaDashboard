import TableList from "views/TableList/TableList.js";
// @material-ui/icons

var dashRoutes = [
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
