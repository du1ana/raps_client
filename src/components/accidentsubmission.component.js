import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class AccidentSubmission extends Component {
  constructor(props) {
    super(props);


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

    this.onSubmit = this.onSubmit.bind(this);

    const d= new Date();

    this.state = {
      accidentDate:d,
      accidentTime:d.toString().match(/(\d\d:\d\d)/)[0],
      driverAge: 17,
      driverGender: false,
      weather: false,
      roadSurface: false,
      vehicleType: 0,
      vehicleYOM: d.getFullYear(),
      licenseIssueDate:d,
      drivingSide: false,
      severity: 0,
      reason: 0,
      kmPost: 0,
      suburb: 0,
      operatedSpeed: 0,
      vehicle_condition: false,
      token:this.props.token,
      res:''
    }
  }


  onChangeAccidentDate(date) {
      this.setState({
        accidentDate: date
      })
    }

    onChangeLicenseIssueDate(date) {
        this.setState({
          licenseIssueDate: date
        })
      }


  onChangeAccidentTime(e) {
    this.setState({
      accidentTime: e.target.value,
      res:''
    })
  }

  onChangeDriverAge(e) {
    this.setState({
      driverAge: e.target.value,
      res:''
    })
  }
  onChangeDriverGender(e) {
    this.setState({
      driverGender: (e.target.value==="male"?false:true),
      res:''
    })
  }

  onChangeWeather(e) {
    this.setState({
      weather: (e.target.value==="clear"?false:true),
      res:''
    })
  }

  onChangeRoadSurface(e) {
    this.setState({
      roadSurface: (e.target.value==="dry"?false:true),
      res:''
    })
  }

  onChangeVehicleCondition(e) {
    this.setState({
      vehicle_condition: (e.target.value==="good"?false:true),
      res:''
    })
  }

  onChangeVehicleType(e) {
    this.setState({
      vehicleType: parseInt(e.target.value),
      res:''
    })
  }
  onChangeVehicleYOM(e) {
    this.setState({
      vehicleYOM: e.target.value,
      res:''
    })
  }


  onChangeDrivingSide(e) {
    this.setState({
      drivingSide: (e.target.value==="colombo"?false:true),
      res:''
    })
  }
  onChangeSeverity(e) {
    this.setState({
      severity: parseInt(e.target.value),
      res:''
    })
  }
  onChangeReason(e) {
    this.setState({
      reason: parseInt(e.target.value),
      res:''
    })
  }
  onChangeKmPost(e) {
    this.setState({
      kmPost: e.target.value,
      res:''
    })
  }
  onChangeSuburb(e) {
    this.setState({
      suburb: parseInt(e.target.value),
      res:''
    })
    switch(parseInt(e.target.value)){
      case 0:
      this.setState({kmPost:0})
      break;
      case 1:
      this.setState({kmPost:5.9})
      break;
      case 2:
      this.setState({kmPost:13.7})
      break;
      case 3:
      this.setState({kmPost:34.8})
      break;
      case 4:
      this.setState({kmPost:46})
      break;
      case 5:
      this.setState({kmPost:67.6})
      break;
      case 6:
      this.setState({kmPost:79.8})
      break;
      case 7:
      this.setState({kmPost:95.3})
      break;
      case 8:
      this.setState({kmPost:108})
      break;
      case 9:
      this.setState({kmPost:116.5})
      break;
      case 10:
      this.setState({kmPost:127})
      break;
      default:
      break;
    }
  }
  onChangeOperatedSpeed(e) {
    this.setState({
      operatedSpeed: e.target.value,
      res:''
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const datetime = new Date(this.state.accidentDate.toString().replace(/(\d\d:\d\d:\d\d)/,this.state.accidentTime))

    const accident = {
      datetime:datetime,
      driverAge: this.state.driverAge,
      driverGender: this.state.driverGender,
      weather: this.state.weather,
      roadSurface: this.state.roadSurface,
      vehicleType: this.state.vehicleType,
      vehicleYOM: this.state.vehicleYOM,
      vehicle_condition: this.state.vehicle_condition,
      licenseIssueDate: this.state.licenseIssueDate,
      drivingSide: this.state.drivingSide,
      severity: this.state.severity,
      reason: this.state.reason,
      kmPost: this.state.kmPost,
      suburb: this.state.suburb,
      operatedSpeed: this.state.operatedSpeed,
      sessionToken: this.state.token
    }

    console.log(accident);

    const d= new Date();

    axios.post('http://localhost:5000/accident/submit', accident)
      .then(res=>{
        console.log("submit res:");
        console.log(res);
        document.getElementById('accident-report-from').reset();
        this.setState({
          res: res.data.message,
          accidentDate:d,
          accidentTime:d.toString().match(/(\d\d:\d\d)/)[0],
          driverAge: 17,
          driverGender: false,
          weather: false,
          roadSurface: false,
          vehicleType: 0,
          vehicleYOM: d.getFullYear(),
          licenseIssueDate:d,
          drivingSide: false,
          severity: 0,
          reason: 0,
          kmPost: 0,
          suburb: 0,
          operatedSpeed: 0,
          vehicle_condition: false,
        })
      })

  }


  render() {
      return (
      <div className="acc">


      <form id="accident-report-from" onSubmit={this.onSubmit} >
        <div className="header"><h3>Accident Report </h3></div>
          <br/>
        <div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label>Accident Date: </label>
          </div>
         <div className="col-sm-3">
            <div>
              <DatePicker className="form-control"
              selected={this.state.accidentDate}
              onChange={this.onChangeAccidentDate}
              />
            </div>
          </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-3"><label>Accident Time: </label>
            </div>
            <div className="col-sm-3">
              <input  type="time"
              className="form-control"
              value={this.state.accidentTime}
              onChange={this.onChangeAccidentTime}
              />
            </div>
          </div>
          <div className="form-group row">
         <div className="col-sm-3"><label>Driver Age </label></div>
          <div className="col-sm-3"><input  type="number"
              className="form-control"
              value={this.state.driverAge}
              onChange={this.onChangeDriverAge}
              min='17'
              max='76'
              /></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Driver Gender </label></div>
          <div className="col-sm-3">
              <select className="form-control" onChange={this.onChangeDriverGender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
              </select>
              </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Weather </label></div>
          <div className="col-sm-3">
              <select className="form-control" onChange={this.onChangeWeather}>
                  <option value="clear">Clear</option>
                  <option value="rainy">Rainy</option>
              </select>
              </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Road Surface </label></div>
          <div className="col-sm-3">
              <select className="form-control" onChange={this.onChangeRoadSurface}>
                  <option value="dry">Dry</option>
                  <option value="wet">Wet</option>
              </select>
              </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Vehicle Type </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeVehicleType}>
              <option value="0">Car</option>
              <option value="1">HV</option>
              <option value="2">Dual Purpose</option>
              </select>
          </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Vehicle manufacture year </label></div>
          <div className="col-sm-3"><input  type="number"
              className="form-control"
              value={this.state.vehicleYOM}
              onChange={this.onChangeVehicleYOM}
              /></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Vehicle Condition </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeVehicleCondition}>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
              </select>
          </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>License Issue Date </label></div>
          <div className="col-sm-3"><DatePicker
                  className="form-control"
                  selected={this.state.licenseIssueDate}
                  onChange={this.onChangeLicenseIssueDate}
          /></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Driving Side </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeDrivingSide}>
              <option value="colombo">Colombo to Matara</option>
              <option value="matara">Matara to Colombo</option>
              </select>
          </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Severity </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeSeverity}>
              <option value="0">Property Damage</option>
              <option value="1">Injury</option>
              <option value="2">Fatality</option>
              </select></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Reason </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeReason}>
              <option value="0">Animal Crossing</option>
              <option value="1">Vehicle Issue</option>
              <option value="2">Speed</option>
              <option value="3">Tailgating</option>
              <option value="4">Sleep</option>
              <option value="5">Slipping</option>
              </select></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Suburb </label></div>
          <div className="col-sm-3">
          <select className="form-control" onChange={this.onChangeSuburb}>
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
              </select></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-3"><label>KM Post </label></div>
          <div className="col-sm-3"><input  type="number" step='0.1'
              className="form-control"
              value={this.state.kmPost}
              onChange={this.onChangeKmPost}
              min='0'
              max='127'
              /></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-3"><label>Operated Speed (km/h) </label></div>
          <div className="col-sm-3"><input  type="number"
              className="form-control"
              value={this.state.operatedSpeed}
              onChange={this.onChangeOperatedSpeed}
              min='0'
              /></div>
          </div>



          <div className="form">
            <br/>
          <input type="submit" value="Submit Report" onSubmit={this.onSubmit} className="btn btn-primary" /> {this.state.res}
          <div>

          </div>

        </div>

      </div>


      </form>


      </div>
      )
  }

}
