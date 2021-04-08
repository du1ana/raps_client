import React, { Component } from "react";
import axios from "axios";

import { getLocalDate, getLocalTime } from "../utils/displayformat";
import "./css/modal.css";

import AccidentSubmission from "./accidentsubmission.component";
import EventSubmission from "./eventsubmission.component";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

const Incident = (props) => (
  <tr>
    <td>
      {getLocalDate(props.incident.datetime)}
      <br />
      {getLocalTime(props.incident.datetime)}
    </td>
    <td>{props.incident.isAccident ? "Accident" : "Event"}</td>
    <td>{props.incident.drivingSide ? "Ma To Col" : "Col to Mat"}</td>
    <td>{props.incident.lat}</td>
    <td>{props.incident.lng}</td>
    <td>
      {props.incident.status === 0
        ? "Reported"
        : props.incident.status === 2
        ? "E Team Dispatched"
        : "Handled"}
    </td>
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

const AccidentModal = (props) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button modal-close-btn" onClick={props.handleClose}>
          X
        </button>
        {props.children}
      </section>
    </div>
  );
};

const EventModal = (props) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button modal-close-btn" onClick={props.handleClose}>
          X
        </button>
        {props.children}
      </section>
    </div>
  );
};

export default class ValidateIncident extends Component {
  constructor(props) {
    super(props);

    this.deleteIncident = this.deleteIncident.bind(this);
    this.validateIncident = this.validateIncident.bind(this);

    this.showAccidentModal = this.showAccidentModal.bind(this);
    this.showEventModal = this.showEventModal.bind(this);
    this.hideAccidentModal = this.hideAccidentModal.bind(this);
    this.hideEventModal = this.hideEventModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      incidentlist: [],
      showAccident: false,
      showEvent: false,
      pageSize: this.props.pageSize,
      currentPage: 1,
    };
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

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  validateIncident(incident) {
    console.log(incident);
    if (incident.isAccident) {
      this.showAccidentModal();
    } else {
      this.showEventModal();
    }
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

  incidentlist(props) {
    return props.map((currentIncident) => {
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

  showAccidentModal = () => {
    this.setState({ showAccident: true });
    console.log("showing Accident Modal");
  };

  showEventModal = () => {
    this.setState({ showEvent: true });
    console.log("showing Event Modal");
  };

  hideAccidentModal = () => {
    this.setState({ showAccident: false });
    console.log("hiding Accident Modal");
  };

  hideEventModal = () => {
    this.setState({ showEvent: false });
    console.log("showing Event Modal");
  };

  render() {
    const { length: count } = this.state.incidentlist;
    const { pageSize, currentPage, incidentlist: allIncident } = this.state;

    if (count === 0) return <p>There are no Incident in the database</p>;

    const incidents = paginate(allIncident, currentPage, pageSize);

    return (
      <div>
        <h3>Incident List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date/Time</th>
              <th>Incident Type</th>
              <th>Driving Side</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.incidentlist(incidents)}</tbody>
        </table>
        <AccidentModal
          show={this.state.showAccident}
          handleClose={this.hideAccidentModal}
        >
          <AccidentSubmission token={this.props.token} />
        </AccidentModal>
        <EventModal
          show={this.state.showEvent}
          handleClose={this.hideEventModal}
        >
          <EventSubmission token={this.props.token} />
        </EventModal>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}
