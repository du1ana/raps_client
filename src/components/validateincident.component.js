import React, { Component } from "react";
import axios from "axios";

import { getLocalDate, getLocalTime } from "../utils/displayformat";
import "./css/modal.css";

const Incident = (props) => (
  <tr>
    <td>
      {getLocalDate(props.incident.datetime)}
      <br />
      {getLocalTime(props.incident.datetime)}
    </td>
    <td>{props.incident.isAccident ? "Accident" : "Event"}</td>
    <td>{props.incident.kmPost}</td>
    <td>{props.incident.suburb}</td>
    <td>
      <button
        className="btn btn-sm btn-warning m-2"
        onClick={() => {
          props.validateIncident(props.incident);
        }}
      >
        Validate
      </button>
      <button
        className="btn btn-sm btn-danger m-2"
        onClick={() => {
          props.deleteIncident(props.incident.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

const Modal = (props) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <button type="button" onClick={props.handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default class ValidateIncident extends Component {
  constructor(props) {
    super(props);

    this.deleteIncident = this.deleteIncident.bind(this);
    this.validateIncident = this.validateIncident.bind(this);

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.state = { incidentlist: [], show: false };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/incident/list")
      .then((response) => {
        this.setState({ incidentlist: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validateIncident(incident) {
    console.log(incident);
    this.showModal();
  }

  deleteIncident(id) {
    axios
      .delete("http://localhost:5000/incident/delete/", {
        data: { id: id, sessionToken: this.props.token },
      })
      .then((response) => {
        console.log("id:", id);
        console.log(response.data);
      });

    this.setState({
      incidentlist: this.state.incidentlist.filter((el) => el.id !== id),
    });
  }

  incidentlist() {
    return this.state.incidentlist.map((currentIncident) => {
      return (
        <Incident
          incident={currentIncident}
          deleteIncident={this.deleteIncident}
          validateIncident={this.validateIncident}
          key={currentIncident.id}
        />
      );
    });
  }

  showModal = () => {
    this.setState({ show: true });
    console.log("showing Modal");
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <h3>Incident List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date/Time</th>
              <th>incidentType</th>
              <th>kmPost</th>
              <th>Suburb</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.incidentlist()}</tbody>
        </table>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
      </div>
    );
  }
}
