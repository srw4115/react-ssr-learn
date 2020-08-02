import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/detail";

export default (
  <React.Fragment>
    <Route path="/" exact component={Home} />
    <Route path="/detail" component={Detail} />
  </React.Fragment>
);
