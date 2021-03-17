import React, { Component } from 'react';
import axios from 'axios';


export default class AddETeam extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangecontactNumber = this.onChangecontactNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      name: '',
      password: '',
      contactNumber: '',
      token:this.props.token,
      res:''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      res:''
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
      res:''
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      res:''
    })
  }

  onChangecontactNumber(e) {
    this.setState({
      contactNumber: e.target.value,
      res:''
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const ETeam = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      contactNumber: this.state.contactNumber,
      sessionToken: this.state.token,
    }

    console.log(ETeam);

    axios.post('http://localhost:5000/police/eteam/add', ETeam)
      .then(res=>{
        this.setState({
          res: res.data.message,
          username: '',
          name: '',
          password: '',
          contactNumber:''
        })
      })

  }

  render() {
    return (
    <div>
      <h3>Create New Emergency Team</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group col-sm-3">
          <label>Username: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              minlength='4'
              />
        </div>
        <div className="form-group col-sm-3">
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
        </div>
        <div className="form-group col-sm-3">
          <label>Password: </label>
          <input  type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              minlength='4'
              />
        </div>
        <div className="form-group col-sm-3">
        <label>Contact Number </label>
        <input
            type="text"
            className="form-control"
            value={this.state.contactNumber}
            onChange={this.onChangecontactNumber}
            />
        </div>

        <div className="form-group col-sm-3">
          <input type="submit" value="Create Team" className="btn btn-primary" />
        </div>
      </form>
      <div>
      {this.state.res}
      </div>
    </div>
    )
  }
}
