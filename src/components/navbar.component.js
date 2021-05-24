import React, { Component } from "react";
import axios from "../utils/axios";
import logo from "../icons/icon.png";
import { Navbar, Nav, NavItem, Dropdown, NavLink } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faUserPlus, faPlus, faAmbulance, faCarCrash, faListAlt, faExclamationTriangle, faEnvelopeOpenText,faCalendarAlt, faSignOutAlt, faCog, faUserLock } from '@fortawesome/free-solid-svg-icons'

export default class Navbar2 extends Component {
  constructor(props) {
    super(props);

    this.LogOut = this.LogOut.bind(this);
  }

  LogOut(t) {
    console.log("logged out");
    //window.location.reload(true);

    axios
      .get("police/logout/", { params: { token: t } })
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
              <Dropdown.Item onClick={() => this.props.handleNavigation("addpolice")}>
                <button className="dropdown-item">
                  <FontAwesomeIcon icon={faUserPlus} />&nbsp;
                  Add User
                </button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.handleNavigation("policelist")}>
                <button className="dropdown-item">
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
              <Dropdown.Item onClick={() => this.props.handleNavigation("addeteam")}>
                <button className="dropdown-item">
                  <FontAwesomeIcon icon={faUserPlus} />&nbsp;
                  Add Emergency Team
                </button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.handleNavigation("eteamlist")}>
                <button className="dropdown-item">
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
              <Dropdown.Item onClick={() => this.props.handleNavigation("accidentsubmission")}>
                <button className="dropdown-item">
                  <FontAwesomeIcon icon={faPlus} />&nbsp;
                  Accident Submission
                </button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.handleNavigation("accidentlist")}>
                <button className="dropdown-item">
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
              <Dropdown.Item onClick={() => this.props.handleNavigation("eventsubmission")}>
                <button className="dropdown-item">
                  <FontAwesomeIcon icon={faPlus} />&nbsp;
                  Event Submission
                </button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.handleNavigation("eventlist")}>
                <button className="dropdown-item">
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
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faCog} />&nbsp;
              <span className="nav_item_label"> </span>
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
              <Dropdown.Item onClick={this.LogOut.bind(this, token)}>
                  <button
                    className="btn text-danger"
                  >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span> Log Out </span>
                  </button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.handleNavigation("changepassword")}>
                <button className="btn">
                  <FontAwesomeIcon icon={faUserLock} />&nbsp;
                   Change password
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Nav>
      </Navbar>
    );
  }
}
