import React, { Component } from 'react';
import axios from 'axios';

import { getLocalDate, getLocalTime, getSuburbName } from "../utils/displayformat";

const Event = props => (
  <tr>
    <td>
    {getLocalDate(props.event.datetime)}
    <br/>
    {getLocalTime(props.event.datetime)}
    </td>
    <td>{props.event.type}</td>
    <td>{props.event.drivingSide?"matara":"colombo"}</td>
    <td>{props.event.severity}</td>
    <td>{props.event.kmPost}</td>
    <td>{getSuburbName(props.event.suburb)}</td>
    <td>
      <button className="btn btn-sm btn-danger" onClick={() => { props.deleteEvent(props.event.id) }}>Delete</button>
    </td>
  </tr>
)

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this)

    this.state = {eventlist: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/event/list')
      .then(response => {
        this.setState({ eventlist: response.data.data })
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEvent(id) {
    axios.delete('http://localhost:5000/event/delete/', {data:{id:id,sessionToken:this.props.token}})
      .then(response => {
        console.log("id:",id)
        console.log(response.data)
      });

    this.setState({
      eventlist: this.state.eventlist.filter(el => el.id !== id)
    })
  }

  eventList() {
    return this.state.eventlist.map(currentevent => {
      return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent.id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Event List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date/Time</th>
              <th>Type</th>
              <th>Driving Side</th>
              <th>Severity</th>
              <th>KM Post</th>
              <th>Suburb</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.eventList() }
          </tbody>
        </table>
      </div>
    )
  }
}
