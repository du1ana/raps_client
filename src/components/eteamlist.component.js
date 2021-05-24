import React, { Component } from "react";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmbulance,
  faUsers,
  faEdit,
  faBan,
  faTrashAlt,
  faSave,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./common/pagination";
import Loading from "./common/loading";
import { paginate } from "../utils/paginate";
import { findNearestExit } from "../utils/location";

const ETeam = (props) => {
  let suburb = findNearestExit({
    latitude: props.eteam.lat,
    longitude: props.eteam.lng,
  })
  if (props.eteam.username === props.edit_username) {
    //edit mode
    return (
      <tr className="table-secondary">
        <td>{props.eteam.username}</td>
        <td>
          <input
            type="text"
            required
            className="form-control"
            value={props.edit_name}
            onChange={props.onChangeName}
            minLength="4"
            maxLength="20"
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={props.edit_contactNumber}
            onChange={props.onChangeContactNumber}
          />
        </td>
        <td>{props.eteam.availability&&props.eteam.lat!=0 &&props.eteam.lng!=0? (suburb? suburb: "")+" ("+props.eteam.lat+","+props.eteam.lng+")" : "-"}</td>
        <td>
          <button
            type="submit"
            className="btn btn-sm btn-secondary"
            onClick={() => {
              props.discardEdit();
            }}
          >
            <FontAwesomeIcon icon={faBan} />
          </button>
          &nbsp;
          <button type="submit"
            className="btn btn-sm btn-success"
            onClick={() => {
              props.updateETeam(
                props.eteam.username,
                props.edit_name,
                props.edit_contactNumber
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
        <td>{props.eteam.username}</td>
        <td>{props.eteam.name}</td>
        <td>{props.eteam.contactNumber}</td>
        <td>{props.eteam.availability&&props.eteam.lat!=0 &&props.eteam.lng!=0? (suburb? suburb: "")+" ("+props.eteam.lat+","+props.eteam.lng+")" : "-"}</td>
        <td>
          <button
            className="btn btn-sm btn-info"
            onClick={() => {
              props.editETeam(props.eteam);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          &nbsp;
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
                  props.deleteETeam(props.eteam.username);
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

export default class ETeamList extends Component {
  constructor(props) {
    super(props);

    this.deleteETeam = this.deleteETeam.bind(this);
    this.editETeam = this.editETeam.bind(this);
    this.updateETeam = this.updateETeam.bind(this);
    this.discardEdit = this.discardEdit.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      eteamlist: [],
      updateFlag: true,
      edit_username: null,
      pageSize: this.props.pageSize,
      currentPage: 1,
    };
  }

  async componentDidMount() {
    await this.getList();
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  getList = async () => {
    let res = await axios.get("eteam/list");
    this.setState({ eteamlist: res.data.data, updateFlag: false });
    console.log("state_set:");
    console.log(res.data.data);
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deleteETeam(username) {
    await axios
      .delete("police/eteam/delete/", {
        data: { username: username, sessionToken: this.props.token },
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
    });
    this.refresh();
  }

  async updateETeam(username, name, contactNumber) {
    if(!name || name.length<5 || !contactNumber || contactNumber.length<3){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid data",
      });
      return;
    }

    await axios
      .post("police/eteam/update/", {
        username: username,
        name: name,
        contactNumber: contactNumber,
        sessionToken: this.props.token,
      })
      .then((response) => {
        console.log(response.data);
        console.log("token:" + this.props.token);
      });
    this.setState({
      updateFlag: true,
      edit_username: null,
      edit_name: null,
      edit_contactNumber: null,
    });
    this.refresh();
  }

  editETeam(eteam) {
    this.setState({
      edit_username: eteam.username,
      edit_name: eteam.name,
      edit_contactNumber: eteam.contactNumber,
      updateFlag: true,
    });
  }

  discardEdit() {
    this.setState({
      edit_username: null,
      edit_name: null,
      edit_contactNumber: null,
      updateFlag: true,
    });
  }

  refresh() {
    this.setState({
      updateFlag: true,
    });
  }

  onChangeName(e) {
    var newname = e.target.value;
    var pattern = /^[A-Za-z0-9 ]+$/;
    console.log(pattern.test(newname));
    if(pattern.test(newname)){
      this.setState({edit_name: e.target.value});
    }
  }

  onChangeContactNumber(e) {
    var newnum = e.target.value;
    var pattern = /^[0-9]+$/;
    if(pattern.test(newnum)){
      this.setState({edit_contactNumber: e.target.value});
    }
  }

  eteamList(props) {
    return props.map((currenteteam) => {
      return (
        <ETeam
          eteam={currenteteam}
          deleteETeam={this.deleteETeam}
          editETeam={this.editETeam}
          updateETeam={this.updateETeam}
          discardEdit={this.discardEdit}
          onChangeName={this.onChangeName}
          onChangeContactNumber={this.onChangeContactNumber}
          key={currenteteam.username}
          edit_username={this.state.edit_username}
          edit_name={this.state.edit_name}
          edit_contactNumber={this.state.edit_contactNumber}
        />
      );
    });
  }

  render() {
    const { length: count } = this.state.eteamlist;
    const { pageSize, currentPage, eteamlist: allETeam } = this.state;
    if (this.state.updateFlag) return <Loading/>;
    if (count === 0) return <p>There are no ETeam Users in the database</p>;

    const eteam = paginate(allETeam, currentPage, pageSize);
    return (
      <div>
        <h3>
          {" "}
          <FontAwesomeIcon icon={faAmbulance} /> ETeam List&nbsp;
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
              <th>Username</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.eteamList(eteam)}</tbody>
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
