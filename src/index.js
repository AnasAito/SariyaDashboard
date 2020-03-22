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
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";
import ChartTest from "views/chartTest";
import tableTest from "views/tableTest";
import Fast from "views/FastSearch";
import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
const client = new ApolloClient({
  uri: "https://backend-saira.now.sh/"
});
const hist = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        <Route path="/rtl" component={RtlLayout} />
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/chart" component={ChartTest} />
        <Route path="/table" component={tableTest} />
        <Route path="/fast" component={Fast} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
