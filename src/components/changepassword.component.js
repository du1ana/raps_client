import React, { Component } from "react";
import axios from "axios";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      oldpassword:"",
      password: "",
      password2: "",
      token: this.props.token,
      res: "",
    };
  }


  onChangePassword(int,e) {
    if(int==1){
      this.setState({password: e.target.value,res: ""});
    }else if(int==2){
      this.setState({password2: e.target.value,res: ""});
    }else{
      this.setState({oldpassword: e.target.value,res: ""});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    //validation
    if(this.state.password===this.state.password2){
      const body = {
        oldpassword: this.state.oldpassword,
        newpassword: this.state.password,
        sessionToken: this.state.token
      };
      axios.post("http://localhost:5000/police/changepassword", body).then((res) => {
        this.setState({
          res: res.data.message,
          oldpassword: "",
          password: "",
          password2: ""
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
        <h3>Change Password</h3>
        <form onSubmit={this.onSubmit}>
        <div class="form-col">
          <div className="form-group col-sm-9 col-md-7 col-lg-6 col-xl-4">
            <label>Old password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.oldpassword}
              onChange={(e) => this.onChangePassword(0,e)}
              minlength="4"
              maxlength="20"
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
              value="Change Password"
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
