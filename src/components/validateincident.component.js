import React, { Component } from "react";
import axios from "axios";

import { getLocalDate, getLocalTime } from "../utils/displayformat";
import "./css/modal.css";

import AccidentSubmission from "./accidentsubmission.component";
import EventSubmission from "./eventsubmission.component";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { findNearestExit } from "../utils/location";
import { getSuburbInt, getKmPost } from "../utils/displayformat";

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
      {findNearestExit({
        latitude: props.incident.lat,
        longitude: props.incident.lng,
      })}
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
      <section className="modal-main ">
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
      verifiedAccident: {
        accidentDate: new Date(),
        accidentTime: new Date().toString().match(/(\d\d:\d\d)/)[0],
        driverAge: 17,
        driverGender: false,
        weather: false,
        roadSurface: false,
        vehicleType: 0,
        vehicleYOM: new Date().getFullYear(),
        licenseIssueDate: new Date(),
        drivingSide: false,
        severity: 0,
        reason: 0,
        kmPost: 0,
        suburb: 0,
        operatedSpeed: 0,
        vehicle_condition: false,
        token: this.props.token,
        res: "",
      },
      verifiedEvent: {
        eventDate: new Date(),
        eventTime: new Date().toString().match(/(\d\d:\d\d)/)[0],
        type: 0,
        drivingSide: false,
        severity: 0,
        kmPost: 0,
        suburb: 0,
        token: this.props.token,
        res: "",
      },
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

  async validateIncident(incident) {
    const latitude = parseFloat(incident.lat);
    const longitude = parseFloat(incident.lng);
    const suburb = getSuburbInt(
      findNearestExit({
        latitude: latitude,
        longitude: longitude,
      })
    );
    const kmPost = getKmPost(suburb);

    if (incident.isAccident) {
      const verifiedAccident = {
        accidentDate: new Date(Date.parse(incident.datetime)),
        accidentTime: new Date(Date.parse(incident.datetime))
          .toString()
          .match(/(\d\d:\d\d)/)[0],
        driverAge: 17,
        driverGender: false,
        weather: false,
        roadSurface: false,
        vehicleType: 0,
        vehicleYOM: new Date().getFullYear(),
        licenseIssueDate: new Date(),
        drivingSide: incident.drivingSide,
        severity: 0,
        reason: 0,
        kmPost: kmPost,
        suburb: suburb,
        operatedSpeed: 0,
        vehicle_condition: false,
        token: this.props.token,
        res: "",
      };
      await this.setState({ verifiedAccident: verifiedAccident }, () => {
        console.log("updated accident");
      });
      this.showAccidentModal();
    } else {
      const verifiedEvent = {
        eventDate: new Date(Date.parse(incident.datetime)),
        eventTime: new Date(Date.parse(incident.datetime))
          .toString()
          .match(/(\d\d:\d\d)/)[0],
        type: 0,
        drivingSide: incident.drivingSide,
        severity: 0,
        kmPost: kmPost,
        suburb: suburb,
        token: this.props.token,
        res: "",
      };
      await this.setState({ verifiedEvent: verifiedEvent }, () => {
        console.log("updated event");
      });

      this.showEventModal();
    }
  }

  deleteIncident(id) {
    axios
      .delete("http://localhost:5000/incident/police/delete/", {
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

    if (count === 0)
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
              <th>Suburb</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.incidentlist(incidents)}</tbody>
        </table>
        <AccidentModal
          show={this.state.showAccident}
          handleClose={this.hideAccidentModal}
        >
          <AccidentSubmission
            token={this.props.token}
            accident={this.state.verifiedAccident}
            isModal={true}
          />
        </AccidentModal>
        <EventModal
          show={this.state.showEvent}
          handleClose={this.hideEventModal}
        >
          <EventSubmission
            token={this.props.token}
            event={this.state.verifiedEvent}
            isModal={true}
          />
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
