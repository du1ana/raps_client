import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../icons/icon.png";
import "./css/home.component.css";
import { Container, Col, Row } from "react-bootstrap";
import SVGsign1 from "../Assets/signin1.svg";
import { motion } from "framer-motion";

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
        <div className="loading">
          <svg>
            <circle
              r="40"
              cx="150"
              cy="75"
              stroke="#999"
              stroke-width="10px"
              fill="none"
            />
          </svg>
        </div>
      );
    } else {
      //not logged in
      if (!this.state.data.username) {
        return (
          <div className="content">
            <div className="background1">
              <motion.div
                className="box-one"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="container">
                  <Row>
                    <Col className="welcome1">
                      <h2>Welcome to</h2>
                      <h3>Road Accident Prevention System!</h3>
                      <p className="desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud anim
                        id est laborum.
                      </p>
                      <p class="lead">
                        <h6>Let's get started</h6>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          class="btn btn-warning btn-lg"
                        >
                          <Link className="link" to="/signin">
                            Sign in
                          </Link>
                        </motion.button>
                      </p>
                    </Col>
                    <Col>
                      <img className="signin-img-1" src={SVGsign1} />
                    </Col>
                    <Col></Col>
                  </Row>
                </div>
              </motion.div>
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
