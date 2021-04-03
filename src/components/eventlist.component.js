import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faEdit,
  faBan,
  faTrashAlt,
  faSave,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  getLocalDate,
  getLocalTime,
  getSuburbName,
} from "../utils/displayformat";

import "react-datepicker/dist/react-datepicker.css";

const Event = (props) => {
  if (props.event.id === props.edit_id) {
    //edit mode
    return (
      <tr className="table-secondary">
        <td>
          {getLocalDate(props.edit_eventDate)}
          <br/>
          <input
            type="date"
            value={props.edit_eventDate}
            onChange={props.onChangeEventDate}
          />
          </td>
          <td>
          {props.edit_eventTime}<br/>
          <input
            type="time"
            className="form-control-sm"
            value={props.edit_eventTime}
            onChange={props.onChangeEventTime}
            style={{ width: 130 }}
          />
        </td>
        <td>
          <select className="form-control" onChange={props.onChangeEventType}>
            <option selected={props.edit_type === 0} value="0">
              Fallen Tree
            </option>
            <option selected={props.edit_type === 1} value="1">
              Landslide
            </option>
            <option selected={props.edit_type === 2} value="2">
              Flooding
            </option>
            <option selected={props.edit_type === 3} value="3">
              Other
            </option>
          </select>
        </td>
        <td>
          <select className="form-control" onChange={props.onChangeDrivingSide}>
            <option value="colombo">Colombo</option>
            <option selected={props.edit_drivingSide} value="matara">
              Matara
            </option>
          </select>
        </td>
        <td>
          <select
            className="form-control"
            style={{ width: 100 }}
            onChange={props.onChangeSeverity}
          >
            <option selected={props.edit_severity === 0} value="0">
              Minor
            </option>
            <option selected={props.edit_severity === 1} value="1">
              Intermediate
            </option>
            <option selected={props.edit_severity === 2} value="2">
              Major
            </option>
          </select>
        </td>
        <td>
          <select
            className="form-control"
            style={{ width: 100 }}
            onChange={props.onChangeSuburb}
          >
            <option selected={props.edit_suburb === 0} value="0">
              {getSuburbName(0)}
            </option>
            <option selected={props.edit_suburb === 1} value="1">
              {getSuburbName(1)}
            </option>
            <option selected={props.edit_suburb === 2} value="2">
              {getSuburbName(2)}
            </option>
            <option selected={props.edit_suburb === 3} value="3">
              {getSuburbName(3)}
            </option>
            <option selected={props.edit_suburb === 4} value="4">
              {getSuburbName(4)}
            </option>
            <option selected={props.edit_suburb === 5} value="5">
              {getSuburbName(5)}
            </option>
            <option selected={props.edit_suburb === 6} value="6">
              {getSuburbName(6)}
            </option>
            <option selected={props.edit_suburb === 7} value="7">
              {getSuburbName(7)}
            </option>
            <option selected={props.edit_suburb === 8} value="8">
              {getSuburbName(8)}
            </option>
            <option selected={props.edit_suburb === 9} value="9">
              {getSuburbName(9)}
            </option>
            <option selected={props.edit_suburb === 10} value="10">
              {getSuburbName(10)}
            </option>
          </select>
        </td>
        <td className="text-muted">
          <input
            type="number"
            className="form-control"
            value={props.edit_kmPost}
            onChange={props.onChangeKmPost}
            style={{ width: 80 }}
            min="0"
            max="127"
            step=".1"
          />
        </td>
        <td>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              props.discardEdit();
            }}
          >
            <FontAwesomeIcon icon={faBan} />
          </button>
          &nbsp;
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              props.updateEvent(
                props.event.id,
                props.edit_eventDate,
                props.edit_eventTime,
                props.edit_type,
                props.edit_drivingSide,
                props.edit_severity,
                props.edit_kmPost,
                props.edit_suburb
              );
            }}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>
          {getLocalDate(props.event.datetime)}
        </td>
        <td>
          {getLocalTime(props.event.datetime)}
        </td>
        <td>
          {props.event.type === 0
            ? "Fallen Tree"
            : props.event.type === 1
            ? "LandSlide"
            : props.event.type === 2
            ? "Flooding"
            : "Other"}
        </td>
        <td>{props.event.drivingSide ? "Matara" : "Colombo"}</td>
        <td>
          {props.event.severity === 0
            ? "Minor"
            : props.event.severity === 1
            ? "Intermediate"
            : "Major"}
        </td>
        <td>{getSuburbName(props.event.suburb)}</td>
        <td>{props.event.kmPost}</td>
        <td>
          <button
            className="btn btn-sm btn-info"
            onClick={() => {
              props.editEvent(props.event);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              props.deleteEvent(props.event.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    );
  }
};

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.editEvent = this.editEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.discardEdit = this.discardEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.refresh = this.refresh.bind(this);

    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeEventTime = this.onChangeEventTime.bind(this);
    this.onChangeEventType = this.onChangeEventType.bind(this);
    this.onChangeDrivingSide = this.onChangeDrivingSide.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);
    this.onChangeKmPost = this.onChangeKmPost.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);

    this.state = { eventlist: [], loading: true };
  }

  async componentDidMount() {
    await this.getList();
  }

  getList = async () => {
    let res = await axios.get("http://localhost:5000/event/list");
    this.setState({ eventlist: res.data.data, updateFlag: false });
    console.log("state_set:");
    console.log(res.data.data);
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deleteEvent(id) {
    await axios
      .delete("http://localhost:5000/event/delete/", {
        data: { id: id, sessionToken: this.props.token },
      })
      .then((response) => {
        console.log(response.data);
      });

    // this.setState({
    //   updateFlag: true,
    // });
    this.refresh();
  }

  async updateEvent(
    id,
    eventDate,
    eventTime,
    type,
    drivingSide,
    severity,
    kmPost,
    suburb
  ) {

    console.log("Update date format");
    const accDate = new Date(eventDate);
    const datetime = new Date(
      accDate
        .toISOString()
        .replace(/(\d\d:\d\d)/, eventTime)
        .slice(0, -1)
    );
    console.log(accDate.toISOString());
    console.log(eventTime);
    console.log("update datetime:");
    console.log(datetime);
    console.log("Update req:");
    console.log(id+" "+datetime+" "+type);
    await axios
      .post("http://localhost:5000/event/update/", {
        id: id,
        datetime: datetime,
        type: type,
        drivingSide: drivingSide,
        severity: severity,
        kmPost: kmPost,
        suburb: suburb,
        sessionToken: this.props.token,
      })
      .then((response) => {
        console.log(response.data);
      });
    this.setState({
      updateFlag: true,
      edit_id: null,
      edit_eventDate: null,
      edit_eventTime: null,
      edit_type: null,
      edit_drivingSide: null,
      edit_severity: null,
      edit_kmPost: null,
      edit_suburb: null,
    });
    this.refresh();
  }

  async editEvent(event) {
    await this.setState({
      updateFlag: true,
      edit_id: event.id,
      edit_eventDate: event.datetime,
      edit_eventTime: getLocalTime(event.datetime),
      edit_type: event.type,
      edit_drivingSide: event.drivingSide,
      edit_severity: event.severity,
      edit_kmPost: event.kmPost,
      edit_suburb: event.suburb,
    });
    console.log("edited state:");
    console.log(this.state);
  }

  discardEdit() {
    this.setState({
      edit_id: null,
      edit_eventDate: null,
      edit_eventTime: null,
      edit_type: null,
      edit_drivingSide: null,
      edit_severity: null,
      edit_kmPost: null,
      edit_suburb: null,
      updateFlag: true,
    });
  }

  refresh() {
    this.setState({
      updateFlag: true,
    });
  }

  onChangeEventDate(e) {
    this.setState({
      edit_eventDate: e.target.value,
    });
  }

  onChangeEventTime(e) {
    this.setState({
      edit_eventTime: e.target.value,
    });
  }

  onChangeEventType(e) {
    this.setState({
      edit_type: parseInt(e.target.value),
    });
  }

  onChangeDrivingSide(e) {
    this.setState({
      edit_drivingSide: e.target.value === "colombo" ? false : true,
    });
  }
  onChangeSeverity(e) {
    this.setState({
      edit_severity: parseInt(e.target.value),
    });
  }

  onChangeKmPost(e) {
    this.setState({
      edit_kmPost: e.target.value,
    });
  }
  onChangeSuburb(e) {
    this.setState({
      edit_suburb: parseInt(e.target.value),
    });
    switch (parseInt(e.target.value)) {
      case 0:
        this.setState({ edit_kmPost: 0 });
        break;
      case 1:
        this.setState({ edit_kmPost: 5.9 });
        break;
      case 2:
        this.setState({ edit_kmPost: 13.7 });
        break;
      case 3:
        this.setState({ edit_kmPost: 34.8 });
        break;
      case 4:
        this.setState({ edit_kmPost: 46 });
        break;
      case 5:
        this.setState({ edit_kmPost: 67.6 });
        break;
      case 6:
        this.setState({ edit_kmPost: 79.8 });
        break;
      case 7:
        this.setState({ edit_kmPost: 95.3 });
        break;
      case 8:
        this.setState({ edit_kmPost: 108 });
        break;
      case 9:
        this.setState({ edit_kmPost: 116.5 });
        break;
      case 10:
        this.setState({ edit_kmPost: 127 });
        break;
      default:
        break;
    }
  }

  //array = [1,2,3,4,5];

  eventList() {
    return this.state.eventlist.map((currentevent) => {
      return (
        <Event
          event={currentevent}
          deleteEvent={this.deleteEvent}
          editEvent={this.editEvent}
          updateEvent={this.updateEvent}
          discardEdit={this.discardEdit}
          onChangeEventDate={this.onChangeEventDate}
          onChangeEventTime={this.onChangeEventTime}
          onChangeEventType={this.onChangeEventType}
          onChangeDrivingSide={this.onChangeDrivingSide}
          onChangeSeverity={this.onChangeSeverity}
          onChangeKmPost={this.onChangeKmPost}
          onChangeSuburb={this.onChangeSuburb}
          key={currentevent.id}
          edit_id={this.state.edit_id}
          edit_eventDate={this.state.edit_eventDate}
          edit_eventTime={this.state.edit_eventTime}
          edit_type={this.state.edit_type}
          edit_drivingSide={this.state.edit_drivingSide}
          edit_severity={this.state.edit_severity}
          edit_kmPost={this.state.edit_kmPost}
          edit_suburb={this.state.edit_suburb}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>
          {" "}
          <FontAwesomeIcon icon={faExclamationTriangle} /> Event List&nbsp;
          <button
            className="btn btn-sm btn-light"
            onClick={() => {
              this.refresh();
            }}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Driving Side</th>
              <th>Severity</th>
              <th>Suburb</th>
              <th>KM Post</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.eventList()}</tbody>
        </table>
      </div>
    );
  }
}
