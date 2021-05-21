import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import logo from "../icons/icon.png";

import Navbar from "./navbar.component";
import Content from "./content.component";
import SignIn from "./signin.component";
import Loading from "./common/loading";

import { getFromStorage } from "../utils/storage"; //implement log out

export default class Home extends Component {
  constructor() {
    super();
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleSignIn= this.handleSignIn.bind(this);
    this.handleLogOut= this.handleLogOut.bind(this);
    this.verifySession = this.verifySession.bind(this);
    this.state = {
      signedin: false,
      loading: false,
      data: {},
      token: 0,
      nav: "accidentsubmission",
    };
  }

  componentDidMount() {
    this.verifySession();
  }

  verifySession(){
    this.setState({ loading: true });
    const token = getFromStorage("road_accident_prevention_system_webtoken");
    console.log("token:" + token);
    axios
      .get("police/verifysession/", {
        params: { token: token },
      })
      .then((response) => response.data)
      .then((data) => {
        if(data.success){
          this.setState({
            signedin: true,
            loading: false,
            adminRights: data.adminRights,
            token: token,
          });
        }else{
          this.setState({
            signedin: false,
            loading: false
          });
        }
      });
  }

  handleNavigation(str) {
    this.setState({ nav: str });
  }

  handleSignIn(adminRights,token) {
    this.setState({ signedin: true, adminRights: adminRights, token: token, nav:"accidentsubmission" });
  }

  handleLogOut(str) {
    this.setState({ signedin: false, adminRights: null, token: null, nav:"accidentsubmission" });
  }


  render() {
    if (this.state.loading) {
      return (
        <div>
        <Loading/>
        </div>
      );
    } else {
      //not logged in
      if (!this.state.signedin) {
        return (
          <div>
          <SignIn
            handleSignIn={this.handleSignIn}
          />
          </div>
        );
      } else {
        return (
          <div>
            <Navbar
              adminRights={this.state.adminRights}
              token={this.state.token}
              navState={this.state.nav}
              handleNavigation={this.handleNavigation}
              handleLogOut={this.handleLogOut}
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
