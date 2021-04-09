import React, { Component } from "react";
import axios from "axios";
import logo from "../icons/icon.png";
import { Navbar, Nav, NavItem, Dropdown, NavLink } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faUserPlus, faPlus, faAmbulance, faCarCrash, faListAlt, faExclamationTriangle, faEnvelopeOpenText,faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default class Navbar2 extends Component {
  constructor(props) {
    super(props);

    this.LogOut = this.LogOut.bind(this);
  }

  LogOut(t) {
    console.log("logged out");
    //window.location.reload(true);

    axios
      .get("http://localhost:5000/police/logout/", { params: { token: t } })
      .then((response) => response.data)
      .then((data) => {
        if(data.success){
          this.props.handleLogOut();
        }
      });
  }

  render() {
    const adminRights = this.props.adminRights;
    const token = this.props.token;

    return (
      <Navbar bg="dark" variant="dark" className="d-flex" fixed="top">
        <Navbar.Brand>
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="RAPS icon"/>
          &nbsp; <span className="nav_brand_label"> Road Accident Prevention System </span>
          <span className="nav_brand_label_short"> RAPS </span>
        </Navbar.Brand>
          <Nav className="d-flex justify-content-center" fill variant="pills">
          <Dropdown as={NavItem} style={{ display: adminRights ? "block" : "none" }}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faUser} />&nbsp;
              <span className="nav_item_label"> Police </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("addpolice")} className="dropdown-item">
                  <FontAwesomeIcon icon={faUserPlus} />&nbsp;
                  Add User
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("policelist")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  User List
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={NavItem} style={{ display: adminRights ? "block" : "none" }}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faAmbulance} />&nbsp;
              <span className="nav_item_label"> Emergency Teams </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("addeteam")} className="dropdown-item">
                  <FontAwesomeIcon icon={faUserPlus} />&nbsp;
                  Add Emergency Team
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("removeeteam")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  Emergency Team List
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faCarCrash} />&nbsp;
              <span className="nav_item_label"> Accidents </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("accidentsubmission")} className="dropdown-item">
                  <FontAwesomeIcon icon={faPlus} />&nbsp;
                  Accident Submission
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("accidentlist")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  Accident List
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
              <span className="nav_item_label"> Events </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("eventsubmission")} className="dropdown-item">
                  <FontAwesomeIcon icon={faPlus} />&nbsp;
                  Event Submission
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => this.props.handleNavigation("eventlist")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  Event List
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

            <div as={NavItem} className="">
              <a onClick={() => this.props.handleNavigation("incidentlist")} className="nav-link">
                <FontAwesomeIcon icon={faEnvelopeOpenText} />&nbsp;
                <span className="nav_item_label"> Incidents </span>
              </a>
            </div>

            <div as={NavItem} className="">
              <a onClick={() => this.props.handleNavigation("holiday")} className="nav-link">
                <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                <span className="nav_item_label"> Holidays </span>
              </a>
            </div>

          </Nav>
          <Nav className="ml-auto">
            <div as={NavItem}>
                <button
                  onClick={this.LogOut.bind(this, token)}
                  className="btn btn-outline-danger text-secondary"
                >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span className="nav_item_label_log_out"> Log Out </span>
                </button>
            </div>
          </Nav>
      </Navbar>
    );
  }
}
