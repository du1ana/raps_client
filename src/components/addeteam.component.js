import React, { Component } from "react";
import axios from "axios";

export default class AddPolice extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      name: "",
      password: "",
      password2: "",
      contactNumber: "",
      token: this.props.token,
      res: "",
    };
  }

  onChangeUsername(e) {
    var newusername = e.target.value;
    var pattern = /^[a-z0-9]*$/;
    if(pattern.test(newusername)){
      this.setState({username: e.target.value, res:""});
    }
  }

  onChangeName(e) {
    var newname = e.target.value;
    var pattern = /^[A-Za-z ]*$/;
    if(pattern.test(newname)){
      this.setState({name: e.target.value, res:""});
    }
  }

  onChangeContactNumber(e) {
    var newnum = e.target.value;
    var pattern = /^[0-9]*$/;
    if(pattern.test(newnum)){
      this.setState({contactNumber: e.target.value, res:""});
    }
  }

  onChangePassword(int,e) {
    if(int==1){
      this.setState({password: e.target.value,res: ""});
    }else{
      this.setState({password2: e.target.value,res: ""});
    }
  }


  onSubmit(e) {
    e.preventDefault();
    //validation
    if(this.state.password===this.state.password2){
      const eteam = {
        username: this.state.username,
        name: this.state.name,
        password: this.state.password,
        contactNumber: this.state.contactNumber,
        sessionToken: this.state.token,
      };
      axios.post("http://localhost:5000/police/eteam/add", eteam).then((res) => {
        this.setState({
          res: res.data.message,
          username: "",
          name: "",
          password: "",
          password2: "",
          contactNumber: "",
        });
      });
    }else{
        this.setState({
          res:"Passwords mismatched. Please re-check."
        })
    }




  }

  render() {
    return (
      <div>
        <h3>Create New Emergency Team</h3>
        <form onSubmit={this.onSubmit}>
        <div class="form-col">
          <div className="form-group col-sm-9 col-md-7 col-lg-6 col-xl-4">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              minlength="4"
              maxlength="15"
            />
          </div>
          <div className="form-group col-sm-9 col-md-7 col-lg-6 col-xl-4">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              minLength="5"
              maxLength="30"
            />
          </div>
          <div className="form-group col-sm-9 col-md-7 col-lg-6 col-xl-4">
            <label>Contact Number: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.contactNumber}
              onChange={this.onChangeContactNumber}
              minLength="3"
              maxLength="10"
            />
          </div>
          <div className="form-group col-sm-9 col-md-7 col-lg-6 col-xl-4">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={(e) => this.onChangePassword(1,e)}
              minlength="4"
              maxLength="20"
            />
          </div>
          <div className="form-group col-sm-9 col-md-7 col-lg-6 col-xl-4">
            <label>Re-Enter Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password2}
              onChange={(e) => this.onChangePassword(2,e)}
              minlength="4"
              maxLength="20"
            />
          </div>
          <div className="form-group col-sm-9 col-md-7 col-lg-6 col-xl-4">
            <input
              type="submit"
              value="Create Emergency Team"
              className="btn btn-primary"
            />
          </div>
          </div>
        </form>
        <div>{this.state.res}</div>
      </div>
    );
  }
}
