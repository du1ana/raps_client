import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../icon.png";

import Navbar from "./navbar.component";
import Content from "./content.component";

import { getFromStorage } from "../utils/storage"; //implement log out

export default class Home extends Component {
  constructor() {
    super();
    this.handleNavigation = this.handleNavigation.bind(this);
    this.state = {
      signedin: false,
      loading: false,
      data: {},
      token: 0,
      nav: "accidentsubmission",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const token = getFromStorage("road_accident_prevention_system_webtoken");
    console.log("token:" + token);
    axios
      .get("http://localhost:5000/police/verifysession/", {
        params: { token: token },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({
          signedin: true,
          loading: false,
          data: data,
          token: token,
        });
      });
  }

  handleNavigation(str) {
    this.setState({ nav: str });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="d-flex justify-content-center ">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      //not logged in
      if (!this.state.data.username) {
        return (
          <div className="content">
            <nav className="navbar navbar-dark bg-dark">
              <span className="navbar-brand mb-0 h1">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />&nbsp;
                Road Accident Prediction System
              </span>
            </nav>


            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Sign in to continue</h1>
                <p class="lead">
                  <a class="btn btn-warning btn-lg" href="" role="button">
                    <Link to="/signin">Sign in</Link>
                  </a>
                </p>

              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar
              adminRights={this.state.data.adminRights}
              token={this.state.token}
              navState={this.state.nav}
              handleNavigation={this.handleNavigation}
            />
            <div className="content">
              <Content nav={this.state.nav} token={this.state.token} />
            </div>
          </div>
        );
      }
    }
  }
}
