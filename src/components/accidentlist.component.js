import React, { Component } from 'react';
import axios from 'axios';

import { getLocalDate, getLocalTime } from "../utils/datetime";



const Accident = props => (
  <tr>
    <td>
        {getLocalDate(props.accident.datetime)}
        <br/>
        {getLocalTime(props.accident.datetime)}
    </td>
    <td>
        {props.accident.driverAge},
        <br/>
        {props.accident.driverGender}
    </td>
    <td>{props.accident.weather}</td>
    <td>
        {props.accident.vehicleType}
        <br/>
        [{props.accident.vehicleYOM}]
    </td>
    <td>{getLocalDate(props.accident.licenseIssueDate)}</td>
    <td>{props.accident.drivingSide}</td>
    <td>{props.accident.severity}</td>
    <td>{props.accident.reason}</td>
    <td>{props.accident.kmPost}</td>
    <td>{props.accident.suburb}</td>
    <td>{props.accident.operatedSpeed}</td>
    <td>{props.accident.status}</td>
    <td>
      <button className="btn btn-sm btn-danger" onClick={() => { props.deleteAccident(props.accident.id) }}>Delete</button>
    </td>
  </tr>
)

export default class AccidentList extends Component {
  constructor(props) {
    super(props);

    this.deleteAccident = this.deleteAccident.bind(this)

    this.state = {accidentlist: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/accident/list')
      .then(response => {
        this.setState({ accidentlist: response.data.data })
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteAccident(id) {
    axios.delete('http://localhost:5000/accident/delete/', {data:{id:id,sessionToken:this.props.token}})
      .then(response => {
        console.log("id:",id)
        console.log(response.data)
      });

    this.setState({
      accidentlist: this.state.accidentlist.filter(el => el.id !== id)
    })
  }

  accidentList() {
    return this.state.accidentlist.map(currentaccident => {
      return <Accident accident={currentaccident} deleteAccident={this.deleteAccident} key={currentaccident.id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Accident List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date/Time</th>
              <th>Driver</th>
              <th>Weather</th>
              <th>Vehicle</th>
              <th>License Issue Date</th>
              <th>Driving Side</th>
              <th>Severity</th>
              <th>Reason</th>
              <th>KM Post</th>
              <th>Suburb</th>
              <th>Operated Speed</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.accidentList() }
          </tbody>
        </table>
      </div>
    )
  }
}
