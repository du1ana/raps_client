import React, { Component } from "react";
import axios from "../utils/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EventSubmission extends Component {
  constructor(props) {
    super(props);

    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeEventTime = this.onChangeEventTime.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    this.onChangeDrivingSide = this.onChangeDrivingSide.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);

    this.onChangeKmPost = this.onChangeKmPost.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const d = new Date();

    this.state = {
      eventDate: this.props.event.eventDate,
      eventTime: this.props.event.eventTime,
      type: this.props.event.type,
      drivingSide: this.props.event.drivingSide,
      severity: this.props.event.severity,
      kmPost: this.props.event.kmPost,
      suburb: this.props.event.suburb,
      token: this.props.token,
      res: "",
    };
  }

  onChangeEventDate(date) {
    this.setState({
      eventDate: date,
    });
  }

  onChangeEventTime(e) {
    this.setState({
      eventTime: e.target.value,
      res: "",
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
      res: "",
    });
  }

  onChangeDrivingSide(e) {
    this.setState({
      drivingSide: e.target.value,
      res: "",
    });
  }
  onChangeSeverity(e) {
    this.setState({
      severity: e.target.value,
      res: "",
    });
  }

  onChangeKmPost(e) {
    this.setState({
      kmPost: e.target.value,
      res: "",
    });
  }
  onChangeSuburb(e) {
    this.setState({
      suburb: e.target.value,
      res: "",
    });
    switch (e.target.value) {
      case "0":
        this.setState({ kmPost: 0 });
        break;
      case "1":
        this.setState({ kmPost: 5.9 });
        break;
      case "2":
        this.setState({ kmPost: 13.7 });
        break;
      case "3":
        this.setState({ kmPost: 34.8 });
        break;
      case "4":
        this.setState({ kmPost: 46 });
        break;
      case "5":
        this.setState({ kmPost: 67.6 });
        break;
      case "6":
        this.setState({ kmPost: 79.8 });
        break;
      case "7":
        this.setState({ kmPost: 95.3 });
        break;
      case "8":
        this.setState({ kmPost: 108 });
        break;
      case "9":
        this.setState({ kmPost: 116.5 });
        break;
      case "10":
        this.setState({ kmPost: 127 });
        break;
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const d = new Date();

    if (!(this.state.eventDate instanceof Date)) {
      this.setState({
        res: "Validation Error: Date is invalid",
        eventDate: d,
        name: "",
      });
    } else {
      const datetime = new Date(
        this.state.eventDate
          .toString()
          .replace(/(\d\d:\d\d:\d\d)/, this.state.eventTime)
      );

      const event = {
        datetime: datetime,
        type: this.state.type,
        drivingSide: this.state.drivingSide,
        severity: this.state.severity,
        kmPost: this.state.kmPost,
        suburb: this.state.suburb,
        sessionToken: this.state.token,
      };

      console.log(event);

      const d = new Date();

      axios.post("event/submit", event).then((res) => {
        document.getElementById("event-report-from").reset();
        this.setState({
          res: res.data.message,
          eventDate: d,
          eventTime: d.toString().match(/(\d\d:\d\d)/)[0],
          type: 0,
          drivingSide: false,
          severity: 0,
          kmPost: 0,
          suburb: 0,
        });
      });
    }
  }

  refresh() {
    this.setState({
      eventDate: this.props.event.eventDate,
      eventTime: this.props.event.eventTime,
      type: this.props.event.type,
      drivingSide: this.props.event.drivingSide,
      severity: this.props.event.severity,
      kmPost: this.props.event.kmPost,
      suburb: this.props.event.suburb,
    });
  }

  render() {
    return (
      <div className="acc">
        <div className="header">
          <h3>Event Report </h3>
        </div>
        {this.props.isModal && (
          <button className="badge badge-primary" onClick={this.refresh}>
            Update form
          </button>
        )}
        <form id="event-report-from" onSubmit={this.onSubmit}>
          <br />
          <div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label>Event Date: </label>
              </div>
              <div className="col-sm-3">
                <div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.eventDate}
                    onChange={this.onChangeEventDate}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3">
                <label>Event Time: </label>
              </div>
              <div className="col-sm-3">
                <input
                  type="time"
                  className="form-control"
                  value={this.state.eventTime}
                  onChange={this.onChangeEventTime}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3">
                <label>Type </label>
              </div>
              <div className="col-sm-3">
                <select className="form-control" onChange={this.onChangeType}>
                  <option value="0">Fallen Tree</option>
                  <option value="1">Landslide</option>
                  <option value="2">Flooding</option>
                  <option value="3">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3">
                <label>Side </label>
              </div>
              <div className="col-sm-3">
                <select
                  className="form-control"
                  onChange={this.onChangeDrivingSide}
                  value={this.state.drivingSide ? "true" : "false"}
                >
                  <option value="false">Colombo to Matara</option>
                  <option value="true">Matara to Colombo</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label>Severity </label>
              </div>
              <div className="col-sm-3">
                <select
                  className="form-control"
                  onChange={this.onChangeSeverity}
                >
                  <option value="0">Minor</option>
                  <option value="1 ">Intermediate</option>
                  <option value="2">Major</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label>Suburb </label>
              </div>
              <div className="col-sm-3">
                <select
                  className="form-control"
                  onChange={this.onChangeSuburb}
                  value={this.state.suburb.toString()}
                >
                  <option value="0">Kottawa</option>
                  <option value="1">Kahathuduwa</option>
                  <option value="2">Gelanigama</option>
                  <option value="3">Dodangoda</option>
                  <option value="4">Welipanna</option>
                  <option value="5">Kurundugahahetekma</option>
                  <option value="6">Baddegama</option>
                  <option value="7">Pinnaduwa</option>
                  <option value="8">Imaduwa</option>
                  <option value="9">Kokmaduwa</option>
                  <option value="10">Godagama</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3">
                <label>KM Post </label>
              </div>
              <div className="col-sm-3">
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={this.state.kmPost}
                  onChange={this.onChangeKmPost}
                  min="0"
                  max="127"
                />
              </div>
            </div>

            <div className="form">
              <br />
              <input
                type="submit"
                value="Submit Report"
                onSubmit={this.onSubmit}
                className="btn btn-primary"
              />{" "}
              {this.state.res}
              <div></div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
