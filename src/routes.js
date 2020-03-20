import TableList from "views/TableList/TableList.js";
import BagsPage from "views/TableList/bagsPage.js";
import AddProduct from "views/TableList/addproduct";
var dashRoutes = [
  {
    path: "/products",
    name: "products",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/bags",
    name: "Bags",
    rtlName: "",
    icon: "shoppingBasket",
    component: BagsPage,
    layout: "/admin"
  },
  {
    path: "/create",
    name: "CreateProduct",
    rtlName: "",
    icon: "create",
    component: AddProduct,
    layout: "/admin"
  }
];
export default dashRoutes;
