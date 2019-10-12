import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import AccessMngUI from "./page/access-management-ui";

const App = () => (
  <Router>
    <div>
      <Route path="/" component={AccessMngUI} />
    </div>
  </Router>
);

export default App;
