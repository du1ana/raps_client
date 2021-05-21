import React from "react";

import AddPolice from "./addpolice.component.js";
import AddETeam from "./addeteam.component.js";
import ETeamList from "./eteamlist.component.js";
import AccidentSubmission from "./accidentsubmission.component.js";
import AccidentList from "./accidentlist.component.js";
import EventSubmission from "./eventsubmission.component.js";
import EventList from "./eventlist.component.js";
import ValidateIncident from "./validateincident.component.js";
import Holiday from "./holiday.component.js";
import ChangePassword from "./changepassword.component.js";

import PoliceList from "./policelist.component.js";

export default class Content extends React.Component {
  render() {
    const pageSize = 5;
    const d = new Date();

    const defaultAccident = {
      accidentDate: d,
      accidentTime: d.toString().match(/(\d\d:\d\d)/)[0],
      driverAge: 17,
      driverGender: false,
      weather: false,
      roadSurface: false,
      vehicleType: 0,
      vehicleYOM: d.getFullYear(),
      licenseIssueDate: d,
      drivingSide: false,
      severity: 0,
      reason: 0,
      kmPost: 0,
      suburb: 0,
      operatedSpeed: 0,
      vehicle_condition: false,
      token: this.props.token,
      res: "",
    };

    const defaultEvent = {
      eventDate: d,
      eventTime: d.toString().match(/(\d\d:\d\d)/)[0],
      type: 0,
      drivingSide: false,
      severity: 0,
      kmPost: 0,
      suburb: 0,
      token: this.props.token,
      res: "",
    };

    switch (this.props.nav) {
      case "addpolice":
        return <AddPolice token={this.props.token} />;
      case "addeteam":
        return <AddETeam token={this.props.token} />;
      case "eteamlist":
        return <ETeamList token={this.props.token} pageSize={pageSize} />;
      case "accidentsubmission":
        return (
          <AccidentSubmission
            token={this.props.token}
            accident={defaultAccident}
            isModal={false}
          />
        );
      case "accidentlist":
        return <AccidentList token={this.props.token} pageSize={pageSize/2 +1} />;
      case "eventsubmission":
        return (
          <EventSubmission
            token={this.props.token}
            event={defaultEvent}
            isModal={false}
          />
        );
      case "eventlist":
        return <EventList token={this.props.token} pageSize={pageSize} />;
      case "incidentlist":
        return (
          <ValidateIncident token={this.props.token} pageSize={pageSize} />
        );
      case "policelist":
        return <PoliceList token={this.props.token} pageSize={pageSize} />;
      case "holiday":
        return <Holiday token={this.props.token} pageSize={pageSize} />;
      case "changepassword":
        return <ChangePassword token={this.props.token} />;
      default:
        return <h1>{this.props.nav} </h1>;
    }
  }
}
