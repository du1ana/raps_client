import React, { Component } from "react";
import axios from "axios";
import "./css/signin.component.css";
import { Container, Row, Col } from "react-bootstrap";
import SVGsign from "../Assets/signin1.svg";
import logo from "../icons/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import { getFromStorage, setInStorage } from "../utils/storage";

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.onSignin = this.onSignin.bind(this);

    this.state = {
      isLoading: true,
      token: "",
      signInError: "",
      signInUsername: "",
      signInPassword: "",
      validUsername: false,
      validPassword: false,
      activateSubmit: false,
    };
  }

  componentDidMount() {
    const token = getFromStorage("road_accident_prevention_system_webtoken");

    if (token) {
      //verify token
      this.setState({ isLoading: false });
  }
}

  render(){
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
      activateSubmit,
    } = this.state;

    if (isLoading) {
      return (
        <div className="loading">
          <svg>
            <circle r="40" cx="150" cy="75" stroke="#999" stroke-width="10px" fill="none"/>
          </svg>
        </div>
      );
    }

    if (!token) {
      return (
        <div className="content">
          <div className="background">
            <div className="">
              <Container>
                <Row>
                  <div className="col-md-6">
                    <Row>

                      <div className="title mx-auto"><img src={logo} width="30" height="30" className="d-inline-block align-top" alt="RAPS icon"/> Road Accident Prevention System</div>
                    </Row>
                    <img className="sign-img d-none d-md-inline" src={SVGsign} height="350vh"/>
                  </div>
                  <div className="col-md-6 mt-5">
                    <div className="formside">
                      <div className="form-inside form-button">
                        <form>
                        <h3>Sign in</h3>
                          <div className="form-groupone">
                            <tr>
                              <td>
                                <FontAwesomeIcon
                                  className="icons"
                                  icon={faUser}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="forminput"
                                  value={signInUsername}
                                  onChange={this.onTextboxChangeUsername}
                                  placeholder="Username"
                                ></input>
                              </td>
                            </tr>
                          </div>
                          <div className="form-groupone">
                            <tr>
                              <td>
                                <FontAwesomeIcon
                                  className="icons"
                                  icon={faLock}
                                />
                              </td>
                              <td>
                                <input
                                  type="password"
                                  className="forminput"
                                  value={signInPassword}
                                  onChange={this.onTextboxChangePassword}
                                  placeholder="Password"
                                />
                              </td>
                            </tr>
                          </div>
                          <div className="signInError">
                            <p className="text-danger">{signInError}</p>
                          </div>
                        </form>
                        <button
                          className="btn btn-signin btn-block signin"
                          disabled={!activateSubmit}
                          onClick={this.onSignin}
                        >
                          Sign in
                        </button>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </div>
                    </div>
                  </div>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      );
    }
  }

  onTextboxChangeUsername(event) {
    const valid = event.target.value.length >= 4; //length check
    this.setState({
      signInUsername: event.target.value,
      validUsername: valid,
      activateSubmit: this.state.signInPassword && valid,
    });
  }

  onTextboxChangePassword(event) {
    const valid = event.target.value.length >= 4; //length check
    this.setState({
      signInPassword: event.target.value,
      validPassword: valid,
      activateSubmit: this.state.signInUsername && valid,
    });
  }

  onSignin() {
    //post request sigin in

    axios
      .post("http://localhost:5000/police/signin", {
        username: this.state.signInUsername,
        password: this.state.signInPassword,
      })
      .then((res) => res.data)
      .then((json) => {
        if (json.success) {
          setInStorage("road_accident_prevention_system_webtoken", json.token);
          this.props.handleSignIn(json.adminRights,json.token)
        } else {
          this.setState({
            signInError: json.message,
          });
        }
      });
  }
}
