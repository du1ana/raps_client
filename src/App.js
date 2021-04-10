import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./components/home.component"




function App() {
  return (
      <Router>
          <div className="">
          <Route path="/" component={Home}/>
          </div>
      </Router>
  );
}

export default App;
