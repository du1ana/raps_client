import React, { Component } from "react";
import axios from "axios";

import { getLocalDate, getLocalTime } from "../utils/displayformat";

const Incident = (props) => (
  <tr>
    <td>
    {getLocalDate(props.incident.datetime)}
    <br/>
    {getLocalTime(props.incident.datetime)}
    </td>
    <td>{props.incident.isAccident?"Accident":"Event"}</td>
    <td>{props.incident.kmPost}</td>
    <td>{props.incident.suburb}</td>
    <td>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => {
          props.deleteIncident(props.incident.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class ValidateIncident extends Component {
  constructor(props) {
    super(props);

    this.deleteIncident = this.deleteIncident.bind(this);

    this.state = { incidentlist: [] };
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
          key={currentIncident.id}
        />
      );
    });
  }

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
      </div>
    );
  }
}
