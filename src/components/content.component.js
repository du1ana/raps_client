import React from "react";

import AddPolice from "./addpolice.component.js";
import AddETeam from "./addeteam.component.js";
import RemoveETeam from "./removeeteam.component.js";
import AccidentSubmission from "./accidentsubmission.component.js";
import AccidentList from "./accidentlist.component.js";
import EventSubmission from "./eventsubmission.component.js";
import EventList from "./eventlist.component.js";
import ValidateIncident from "./validateincident.component.js";
import Holiday from "./holiday.component.js";

import PoliceList from "./policelist.component.js";

export default class Content extends React.Component {
  render() {
    const pageSize = 5;
    switch (this.props.nav) {
      case "addpolice":
        return <AddPolice token={this.props.token} />;
      case "addeteam":
        return <AddETeam token={this.props.token} />;
      case "removeeteam":
        return <RemoveETeam token={this.props.token} pageSize={pageSize} />;
      case "accidentsubmission":
        return <AccidentSubmission token={this.props.token} />;
      case "accidentlist":
        return <AccidentList token={this.props.token} pageSize={pageSize} />;
      case "eventsubmission":
        return <EventSubmission token={this.props.token} />;
      case "eventlist":
        return <EventList token={this.props.token} pageSize={pageSize} />;
      case "incidentlist":
        return (
          <ValidateIncident token={this.props.token} pageSize={pageSize} />
        );
      case "policelist":
        return <PoliceList token={this.props.token} pageSize={pageSize} />;
      case "holiday":
        return <Holiday token={this.props.token} />;
      default:
        return <h1>{this.props.nav}</h1>;
    }
  }
}
