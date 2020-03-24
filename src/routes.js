import TableList from "views/TableList/TableList.js";
import BagsPage from "views/TableList/bagsPage.js";
import BagsPagen from "views/TableList/nonconfirmed";
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
    path: "/bagsc",
    name: "Bags - pending",
    rtlName: "",
    icon: "shoppingBasket",
    component: BagsPage,
    layout: "/admin"
  },
  {
    path: "/bagsnonc",
    name: "Bags - confirmed",
    rtlName: "",
    icon: "shoppingBasket",
    component: BagsPagen,
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
