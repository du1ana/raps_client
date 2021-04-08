import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faEdit,
  faBan,
  faTrashAlt,
  faSave,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

const Police = (props) => {
  if (props.police.username === props.edit_username) {
    //edit mode
    return (
      <tr className="table-secondary">
        <td>{props.police.username}</td>
        <td>
          <input
            type="text"
            required
            className="form-control"
            value={props.edit_name}
            onChange={props.onChangeName}
            minlength="4"
          ></input>
        </td>
        <td>
          <input
            type="checkbox"
            value={props.edit_adminRights}
            checked={props.edit_adminRights}
            onChange={props.onChangeAdminRights}
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
              props.updatePolice(
                props.police.username,
                props.edit_name,
                props.edit_adminRights
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
        <td>{props.police.username}</td>
        <td>{props.police.name}</td>
        <td>{props.police.adminRights ? "Admin" : "User"}</td>
        <td>
          <button
            className="btn btn-sm btn-info"
            onClick={() => {
              props.editPolice(props.police);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              props.deletePolice(props.police.username);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    );
  }
};

export default class PoliceList extends Component {
  constructor(props) {
    super(props);

    this.deletePolice = this.deletePolice.bind(this);
    this.editPolice = this.editPolice.bind(this);
    this.updatePolice = this.updatePolice.bind(this);
    this.discardEdit = this.discardEdit.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAdminRights = this.onChangeAdminRights.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      policelist: [],
      loading: true,
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
    let res = await axios.get("http://localhost:5000/police/list");
    this.setState({ policelist: res.data.data, updateFlag: false });
    console.log("state_set:");
    console.log(res.data.data);
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deletePolice(username) {
    await axios
      .delete("http://localhost:5000/police/delete/", {
        data: { username: username, sessionToken: this.props.token },
      })
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      updateFlag: true,
    });
    this.refresh();
  }

  async updatePolice(username, name, adminRights) {
    await axios
      .post("http://localhost:5000/police/update/", {
        username: username,
        name: name,
        adminRights: adminRights,
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
      edit_adminRights: null,
    });
    this.refresh();
  }

  editPolice(police) {
    this.setState({
      edit_username: police.username,
      edit_name: police.name,
      edit_adminRights: police.adminRights,
      updateFlag: true,
    });
  }

  discardEdit() {
    this.setState({
      edit_username: null,
      edit_name: null,
      edit_adminRights: null,
      updateFlag: true,
    });
  }

  refresh() {
    this.setState({
      updateFlag: true,
    });
  }

  onChangeName(e) {
    this.setState({
      edit_name: e.target.value,
    });
  }

  onChangeAdminRights(e) {
    this.setState({
      edit_adminRights: e.target.checked,
    });
  }

  policeList(props) {
    return props.map((currentpolice) => {
      return (
        <Police
          police={currentpolice}
          deletePolice={this.deletePolice}
          editPolice={this.editPolice}
          updatePolice={this.updatePolice}
          discardEdit={this.discardEdit}
          onChangeName={this.onChangeName}
          onChangeAdminRights={this.onChangeAdminRights}
          key={currentpolice.username}
          edit_username={this.state.edit_username}
          edit_name={this.state.edit_name}
          edit_adminRights={this.state.edit_adminRights}
        />
      );
    });
  }

  render() {
    const { length: count } = this.state.policelist;
    const { pageSize, currentPage, policelist: allPolice } = this.state;

    if (count === 0) return <p>There are no Police Users in the database</p>;

    const police = paginate(allPolice, currentPage, pageSize);
    return (
      <div>
        <h3>
          {" "}
          <FontAwesomeIcon icon={faUsers} /> Police List&nbsp;
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
              <th>Admin Rights</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.policeList(police)}</tbody>
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
