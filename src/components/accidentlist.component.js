import React, { Component } from "react";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarCrash,
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
  getKmCat,
} from "../utils/displayformat";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Loading from "./common/loading";

const Accident = (props) => {
  if (props.accident.id === props.edit_id) {
    //edit mode
    return (
      <tr className="table-secondary">
        <td>
          {getLocalDate(props.edit_accidentDate)}
          <input
            type="date"
            value={props.edit_accidentDate}
            onChange={props.onChangeAccidentDate}
          />
        </td>
        <td>
          {props.edit_accidentTime}
          <input
            type="time"
            className="form-control"
            value={props.edit_accidentTime}
            onChange={props.onChangeAccidentTime}
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            value={props.edit_driverAge}
            onChange={props.onChangeDriverAge}
            min="17"
            max="76"
            style={{ width: 60 }}
          />
        </td>
        <td>
          <select
            className="form-control"
            onChange={props.onChangeDriverGender}
          >
            <option value="male">Male</option>
            <option selected={props.edit_driverGender} value="female">
              Female
            </option>
          </select>
        </td>
        <td>
          <select className="form-control" onChange={props.onChangeWeather}>
            <option value="clear">Clear</option>
            <option selected={props.edit_weather} value="rainy">
              Rainy
            </option>
          </select>
        </td>
        <td>
          <select className="form-control" onChange={props.onChangeRoadSurface}>
            <option value="dry">Dry</option>
            <option selected={props.edit_roadSurface} value="wet">
              Wet
            </option>
          </select>
        </td>
        <td>
          <select className="form-control" onChange={props.onChangeVehicleType}>
            <option selected={props.edit_vehicleType === 0} value="0">
              Car
            </option>
            <option selected={props.edit_vehicleType === 1} value="1">
              HV
            </option>
            <option selected={props.edit_vehicleType === 2} value="2">
              DP
            </option>
          </select>
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            value={props.edit_vehicleYOM}
            onChange={props.onChangeVehicleYOM}
            style={{ width: 80 }}
          />
        </td>
        <td>
          {getLocalDate(props.edit_licenseIssueDate)}
          <input
            type="date"
            value={props.edit_licenseIssueDate}
            onChange={props.onChangeLicenseIssueDate}
          />
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
              Property
            </option>
            <option selected={props.edit_severity === 1} value="1">
              Injury
            </option>
            <option selected={props.edit_severity === 2} value="2">
              Fatality
            </option>
          </select>
        </td>
        <td>
          <select
            className="form-control"
            style={{ width: 100 }}
            onChange={props.onChangeReason}
          >
            <option selected={props.edit_reason === 0} value="0">
              AnimalCrossing
            </option>
            <option selected={props.edit_reason === 1} value="1">
              VehicleIssue
            </option>
            <option selected={props.edit_reason === 2} value="2">
              Speed
            </option>
            <option selected={props.edit_reason === 3} value="3">
              Tailgaiting
            </option>
            <option selected={props.edit_reason === 4} value="4">
              Sleep
            </option>
            <option selected={props.edit_reason === 5} value="5">
              Slipping
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
        <td>
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
          <input
            type="number"
            className="form-control"
            value={props.edit_operatedSpeed}
            onChange={props.onChangeOperatedSpeed}
            style={{ width: 80 }}
            min="0"
          />
        </td>
        <td>
          <select
            className="form-control"
            onChange={props.onChangeVehicleCondition}
          >
            <option value="good">Good</option>
            <option selected={props.edit_vehicle_condition} value="bad">
              Bad
            </option>
          </select>
        </td>

        <td className="text-muted">
          {props.accident.day_cat === 0
            ? "Weekday"
            : props.accident.day_cat === 1
            ? "Weekend"
            : "PubHoliday"}
        </td>
        <td className="text-muted">
          {props.accident.hour_cat === 0
            ? "Free"
            : props.accident.hour_cat === 1
            ? "Rush"
            : "Normal"}
        </td>
        <td className="text-muted">
          {props.accident.month_cat ? "Off-peak" : "Peak"}
        </td>
        <td className="text-muted">
          {props.accident.vision === 0
            ? "Poor"
            : props.accident.vision === 1
            ? "Glare"
            : props.accident.vision === 2
            ? "Normal"
            : "Blurred"}
        </td>
        <td className="text-muted">
          {props.accident.age_cat === 0
            ? "Young"
            : props.accident.age_cat === 1
            ? "Mid"
            : "Older"}
        </td>
        <td className="text-muted">{getKmCat(props.accident.km_cat)}</td>
        <td className="text-muted">{props.accident.drowsiness ? "1" : "0"}</td>
        <td className="text-muted">{props.accident.enough_gap ? "1" : "0"}</td>
        <td className="text-muted">
          {props.accident.animal_crossing_problem ? "1" : "0"}
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
              props.updateAccident(
                props.accident.id,
                props.edit_accidentDate,
                props.edit_accidentTime,
                props.edit_driverAge,
                props.edit_driverGender,
                props.edit_weather,
                props.edit_roadSurface,
                props.edit_vehicleType,
                props.edit_vehicleYOM,
                props.edit_licenseIssueDate,
                props.edit_drivingSide,
                props.edit_severity,
                props.edit_reason,
                props.edit_kmPost,
                props.edit_suburb,
                props.edit_operatedSpeed,
                props.edit_vehicle_condition
              );
            }}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </td>
      </tr>
    );
  } else {
    //normal mode
    return (
      <tr>
        <td>{getLocalDate(props.accident.datetime)}</td>
        <td>{getLocalTime(props.accident.datetime)}</td>
        <td>{props.accident.driverAge}</td>

        <td>{props.accident.driverGender ? "Female" : "Male"}</td>
        <td>{props.accident.weather ? "Rain" : "Clear"}</td>
        <td>{props.accident.roadSurface ? "Wet" : "Dry"}</td>

        <td>
          {props.accident.vehicleType === 0
            ? "Car"
            : props.accident.vehicleType === 1
            ? "HV"
            : "DP"}
        </td>
        <td>{props.accident.vehicleYOM}</td>
        <td>{getLocalDate(props.accident.licenseIssueDate)}</td>

        <td>{props.accident.drivingSide ? "Matara" : "Colombo"}</td>

        <td>
          {props.accident.severity === 0
            ? "Property"
            : props.accident.severity === 1
            ? "Injury"
            : "Fatality"}
        </td>

        <td>
          {props.accident.reason === 0
            ? "AnimalCrossing"
            : props.accident.reason === 1
            ? "VehicleIssue"
            : props.accident.reason === 2
            ? "Speed"
            : props.accident.reason === 3
            ? "Tailgaiting"
            : props.accident.reason === 4
            ? "Sleep"
            : "Slipping"}
        </td>

        <td>{getSuburbName(props.accident.suburb)}</td>
        <td>{props.accident.kmPost}</td>

        <td>{props.accident.operatedSpeed}</td>
        <td>{props.accident.vehicle_condition ? "Bad" : "Good"}</td>

        <td className="text-muted">
          {props.accident.day_cat === 0
            ? "Weekday"
            : props.accident.day_cat === 1
            ? "Weekend"
            : "PubHoliday"}
        </td>
        <td className="text-muted">
          {props.accident.hour_cat === 0
            ? "Free"
            : props.accident.hour_cat === 1
            ? "Rush"
            : "Normal"}
        </td>
        <td className="text-muted">
          {props.accident.month_cat ? "Off-peak" : "Peak"}
        </td>
        <td className="text-muted">
          {props.accident.vision === 0
            ? "Poor"
            : props.accident.vision === 1
            ? "Glare"
            : props.accident.vision === 2
            ? "Normal"
            : "Blurred"}
        </td>
        <td className="text-muted">
          {props.accident.age_cat === 0
            ? "Young"
            : props.accident.age_cat === 1
            ? "Mid"
            : "Older"}
        </td>
        <td className="text-muted">{getKmCat(props.accident.km_cat)}</td>
        <td className="text-muted">{props.accident.drowsiness ? "1" : "0"}</td>
        <td className="text-muted">{props.accident.enough_gap ? "1" : "0"}</td>
        <td className="text-muted">
          {props.accident.animal_crossing_problem ? "1" : "0"}
        </td>

        <td>
          <button
            className="btn btn-sm btn-info"
            onClick={() => {
              props.editAccident(props.accident);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.deleteAccident(props.accident.id);
                }
              });
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    );
  }
};

export default class AccidentList extends Component {
  constructor(props) {
    super(props);

    this.deleteAccident = this.deleteAccident.bind(this);
    this.editAccident = this.editAccident.bind(this);
    this.updateAccident = this.updateAccident.bind(this);
    this.discardEdit = this.discardEdit.bind(this);

    this.refresh = this.refresh.bind(this);

    this.onChangeAccidentDate = this.onChangeAccidentDate.bind(this);
    this.onChangeAccidentTime = this.onChangeAccidentTime.bind(this);
    this.onChangeDriverAge = this.onChangeDriverAge.bind(this);
    this.onChangeDriverGender = this.onChangeDriverGender.bind(this);
    this.onChangeWeather = this.onChangeWeather.bind(this);
    this.onChangeRoadSurface = this.onChangeRoadSurface.bind(this);
    this.onChangeVehicleType = this.onChangeVehicleType.bind(this);
    this.onChangeVehicleYOM = this.onChangeVehicleYOM.bind(this);
    this.onChangeVehicleCondition = this.onChangeVehicleCondition.bind(this);
    this.onChangeLicenseIssueDate = this.onChangeLicenseIssueDate.bind(this);
    this.onChangeDrivingSide = this.onChangeDrivingSide.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onChangeKmPost = this.onChangeKmPost.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);
    this.onChangeOperatedSpeed = this.onChangeOperatedSpeed.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      accidentlist: [],
      loading: true,
      pageSize: this.props.pageSize,
      currentPage: 1,
      updateFlag: true,
    };
  }

  async componentDidMount() {
    await this.getList();
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  getList = async () => {
    let res = await axios.get("accident/list");
    this.setState({ accidentlist: res.data.data, updateFlag: false });
    console.log("state_set:");
    console.log(res.data.data);
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deleteAccident(id) {
    await axios
      .delete("accident/delete/", {
        data: { id: id, sessionToken: this.props.token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });

    this.setState({
      updateFlag: true,
    });
    this.refresh();
  }

  async updateAccident(
    id,
    accidentDate,
    accidentTime,
    driverAge,
    driverGender,
    weather,
    roadSurface,
    vehicleType,
    vehicleYOM,
    licenseIssueDate,
    drivingSide,
    severity,
    reason,
    kmPost,
    suburb,
    operatedSpeed,
    vehicle_condition
  ) {
    if(!accidentDate || !accidentTime || !driverAge || 17>driverAge || driverAge>76 || !licenseIssueDate || !vehicleYOM || !operatedSpeed ||  0>operatedSpeed || operatedSpeed>200 || !kmPost || 0>kmPost || kmPost>127){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid data",
      });
      return;

    }
    console.log("Update date format");
    const accDate = new Date(accidentDate);
    const datetime = new Date(
      accDate
        .toISOString()
        .replace(/(\d\d:\d\d)/, accidentTime)
        .slice(0, -1)
    );
    console.log(accDate.toISOString());
    console.log(accidentTime);
    console.log("update datetime:");
    console.log(datetime);
    await axios
      .post("accident/update/", {
        id: id,
        datetime: datetime,
        driverAge: driverAge,
        driverGender: driverGender,
        weather: weather,
        roadSurface: roadSurface,
        vehicleType: vehicleType,
        vehicleYOM: vehicleYOM,
        licenseIssueDate: licenseIssueDate,
        drivingSide: drivingSide,
        severity: severity,
        reason: reason,
        kmPost: kmPost,
        suburb: suburb,
        operatedSpeed: operatedSpeed,
        vehicle_condition: vehicle_condition,
        sessionToken: this.props.token,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    this.setState({
      updateFlag: true,
      edit_id: null,
      edit_accidentDate: null,
      edit_accidentTime: null,
      edit_driverAge: null,
      edit_driverGender: null,
      edit_weather: null,
      edit_roadSurface: null,
      edit_vehicleType: null,
      edit_vehicleYOM: null,
      edit_licenseIssueDate: null,
      edit_drivingSide: null,
      edit_severity: null,
      edit_reason: null,
      edit_kmPost: null,
      edit_suburb: null,
      edit_operatedSpeed: null,
      edit_vehicle_condition: null,
    });
    this.refresh();
  }

  async editAccident(accident) {
    await this.setState({
      updateFlag: true,
      edit_id: accident.id,
      edit_accidentDate: accident.datetime,
      edit_accidentTime: getLocalTime(accident.datetime),
      edit_driverAge: accident.driverAge,
      edit_driverGender: accident.driverGender,
      edit_weather: accident.weather,
      edit_roadSurface: accident.roadSurface,
      edit_vehicleType: accident.vehicleType,
      edit_vehicleYOM: accident.vehicleYOM,
      edit_licenseIssueDate: accident.licenseIssueDate,
      edit_drivingSide: accident.drivingSide,
      edit_severity: accident.severity,
      edit_reason: accident.reason,
      edit_kmPost: accident.kmPost,
      edit_suburb: accident.suburb,
      edit_operatedSpeed: accident.operatedSpeed,
      edit_vehicle_condition: accident.vehicle_condition,
    });
    console.log("edited state:");
    console.log(this.state);
  }

  discardEdit() {
    this.setState({
      edit_id: null,
      edit_accidentDate: null,
      edit_accidentTime: null,
      edit_driverAge: null,
      edit_driverGender: null,
      edit_weather: null,
      edit_roadSurface: null,
      edit_vehicleType: null,
      edit_vehicleYOM: null,
      edit_licenseIssueDate: null,
      edit_drivingSide: null,
      edit_severity: null,
      edit_reason: null,
      edit_kmPost: null,
      edit_suburb: null,
      edit_operatedSpeed: null,
      edit_vehicle_condition: null,
      updateFlag: true,
    });
  }

  refresh() {
    this.setState({
      updateFlag: true,
      currentPage:1
    });
  }

  onChangeAccidentDate(e) {
    this.setState({
      edit_accidentDate: e.target.value,
    });
  }

  onChangeAccidentTime(e) {
    this.setState({
      edit_accidentTime: e.target.value,
    });
  }

  onChangeLicenseIssueDate(e) {
    this.setState({
      edit_licenseIssueDate: e.target.value,
    });
  }

  onChangeDriverAge(e) {
    this.setState({
      edit_driverAge: e.target.value,
    });
  }
  onChangeDriverGender(e) {
    this.setState({
      edit_driverGender: e.target.value === "male" ? false : true,
    });
  }

  onChangeWeather(e) {
    this.setState({
      edit_weather: e.target.value === "clear" ? false : true,
    });
  }

  onChangeRoadSurface(e) {
    this.setState({
      edit_roadSurface: e.target.value === "dry" ? false : true,
    });
  }

  onChangeVehicleCondition(e) {
    this.setState({
      edit_vehicle_condition: e.target.value === "good" ? false : true,
    });
  }

  onChangeVehicleType(e) {
    this.setState({
      edit_vehicleType: parseInt(e.target.value),
    });
  }
  onChangeVehicleYOM(e) {
    this.setState({
      edit_vehicleYOM: e.target.value,
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
  onChangeReason(e) {
    this.setState({
      edit_reason: parseInt(e.target.value),
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
  onChangeOperatedSpeed(e) {
    this.setState({
      edit_operatedSpeed: e.target.value,
      res: "",
    });
  }

  accidentList(props) {
    return props.map((currentaccident) => {
      return (
        <Accident
          accident={currentaccident}
          deleteAccident={this.deleteAccident}
          editAccident={this.editAccident}
          updateAccident={this.updateAccident}
          discardEdit={this.discardEdit}
          onChangeAccidentDate={this.onChangeAccidentDate}
          onChangeAccidentTime={this.onChangeAccidentTime}
          onChangeDriverAge={this.onChangeDriverAge}
          onChangeDriverGender={this.onChangeDriverGender}
          onChangeWeather={this.onChangeWeather}
          onChangeRoadSurface={this.onChangeRoadSurface}
          onChangeVehicleType={this.onChangeVehicleType}
          onChangeVehicleYOM={this.onChangeVehicleYOM}
          onChangeVehicleCondition={this.onChangeVehicleCondition}
          onChangeLicenseIssueDate={this.onChangeLicenseIssueDate}
          onChangeDrivingSide={this.onChangeDrivingSide}
          onChangeSeverity={this.onChangeSeverity}
          onChangeReason={this.onChangeReason}
          onChangeKmPost={this.onChangeKmPost}
          onChangeSuburb={this.onChangeSuburb}
          onChangeOperatedSpeed={this.onChangeOperatedSpeed}
          key={currentaccident.id}
          edit_id={this.state.edit_id}
          edit_accidentDate={this.state.edit_accidentDate}
          edit_accidentTime={this.state.edit_accidentTime}
          edit_driverAge={this.state.edit_driverAge}
          edit_driverGender={this.state.edit_driverGender}
          edit_weather={this.state.edit_weather}
          edit_roadSurface={this.state.edit_roadSurface}
          edit_vehicleType={this.state.edit_vehicleType}
          edit_vehicleYOM={this.state.edit_vehicleYOM}
          edit_licenseIssueDate={this.state.edit_licenseIssueDate}
          edit_drivingSide={this.state.edit_drivingSide}
          edit_severity={this.state.edit_severity}
          edit_reason={this.state.edit_reason}
          edit_kmPost={this.state.edit_kmPost}
          edit_suburb={this.state.edit_suburb}
          edit_operatedSpeed={this.state.edit_operatedSpeed}
          edit_vehicle_condition={this.state.edit_vehicle_condition}
        />
      );
    });
  }

  render() {
    const { length: count } = this.state.accidentlist;
    const { pageSize, currentPage, accidentlist: allAccident } = this.state;
    if (this.state.updateFlag) return <Loading />;
    if (count === 0) return <p>There are no Accidents in the database</p>;

    const accidents = paginate(allAccident, currentPage, pageSize);
    return (
      <div>
        <h3>
          {" "}
          <FontAwesomeIcon icon={faCarCrash} /> Accident List&nbsp;
          <button
            className="btn btn-sm btn-light"
            onClick={() => {
              this.refresh();
            }}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </h3>
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th>Accident Date</th>
              <th>Accident Time</th>
              <th>Driver Age</th>
              <th>Gender</th>
              <th>Weather</th>
              <th>Road Surface</th>
              <th>Vehicle Type</th>
              <th>Vehicle YOM</th>
              <th>License Issue Date</th>
              <th>Driving Side</th>
              <th>Severity</th>
              <th>Reason</th>

              <th>Suburb</th>
              <th>KM Post</th>

              <th>Operated Speed</th>
              <th>Vehicle Condition</th>

              <th>Day_cat</th>
              <th>Hour_cat</th>
              <th>Month_cat</th>
              <th>Vision</th>
              <th>Age_cat</th>
              <th>KM_cat</th>
              <th>Drowsiness</th>
              <th>Enough_gap</th>
              <th>Animal_crossing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.accidentList(accidents)}</tbody>
        </table>
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
