import React, { Component } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faCalendarPlus, faEdit, faBan, faTrashAlt, faSave, faSyncAlt  } from '@fortawesome/free-solid-svg-icons'
import { getLocalDate } from "../utils/displayformat";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Holiday = props => {
  if(props.holiday.id === props.edit_id){
    //edit mode
      return(
      <tr className="table-secondary">
        <td>
        <input
              type="text"
              required
              className="form-control"
              value={props.edit_name}
              onChange={props.onChangeEditName}
              minlength="4"
            >
            </input>
        </td>
        <td>
              {getLocalDate(props.edit_date)}
              <input type="date"
              value={props.edit_date}
              onChange={props.onChangeEditDate}/>
        </td>
        <td>
                <button className="btn btn-sm btn-secondary" onClick={() => { props.discardEdit() }}>
                  <FontAwesomeIcon icon={faBan} />
                </button>&nbsp;
                <button className="btn btn-sm btn-success" onClick={() => { props.updateHoliday(props.holiday.id,props.edit_name,props.edit_date) }}>
                  <FontAwesomeIcon icon={faSave} />
                </button>

        </td>
        </tr>
    )
  }else{
  //normal mode
    return(
      <tr>
        <td>{props.holiday.name}</td>
        <td>{getLocalDate(props.holiday.date)}</td>
        <td>
          <button className="btn btn-sm btn-info" onClick={() => { props.editHoliday(props.holiday) }}>
              <FontAwesomeIcon icon={faEdit} />
          </button>&nbsp;
          <button className="btn btn-sm btn-danger" onClick={() => { props.deleteHoliday(props.holiday.id) }}>
              <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    )}
}

export default class HolidayList extends Component {
  constructor(props) {
    super(props);

    this.deleteHoliday = this.deleteHoliday.bind(this)
    this.editHoliday = this.editHoliday.bind(this)
    this.updateHoliday = this.updateHoliday.bind(this)
    this.discardEdit = this.discardEdit.bind(this)

    this.onChangeEditName = this.onChangeEditName.bind(this);
    this.onChangeEditDate = this.onChangeEditDate.bind(this);
    this.refresh = this.refresh.bind(this)

    this.onChangeHolidayDate = this.onChangeHolidayDate.bind(this);
    this.onChangeName = this.onChangeName.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    const d= new Date();

    this.state = {holidaylist: [],
    loading: true,
    edit_id: null,
    holidayDate:d,
    name: '',
    token:this.props.token,
    res:''};
  }


  async componentDidMount() {
     await this.getList();
  }

  getList = async () => {
    let res = await axios.get("http://localhost:5000/holiday/list");
    this.setState({ holidaylist: res.data.data, updateFlag: false })
    console.log("state_set:")
    console.log(res.data.data)
  };

  async componentDidUpdate(){
    if(this.state.updateFlag===true){
      await this.getList();
    }
    console.log(this.state);
  }



  async deleteHoliday(id) {
    await axios.delete('http://localhost:5000/holiday/delete/', {data:{id:id,sessionToken:this.props.token}})
      .then(response => {
        console.log(response.data)
      });

    this.setState({
       updateFlag: true
    })
    this.refresh();
  }

  async updateHoliday(id,name,date) {
    await axios.post('http://localhost:5000/holiday/update/', {id:id,name:name,date:date,name:name,sessionToken:this.props.token})
      .then(response => {
        console.log(response.data)
      });
    this.setState({
       updateFlag: true,
       edit_id: null,
       edit_name: null,
       edit_date: null
    })
    this.refresh();
  }

  editHoliday(holiday) {
    this.setState({
       edit_id: holiday.id,
       edit_name: holiday.name,
       edit_date: holiday.date,
       updateFlag: true
    })
  }

  discardEdit() {
    this.setState({
       edit_id: null,
       edit_name: null,
       edit_date: null,
       updateFlag: true
    })
  }

  refresh() {
    this.setState({
       updateFlag: true
    })
  }

  onChangeEditName(e) {
    this.setState({
      edit_name: e.target.value
    });
  }

  onChangeEditDate(e) {
    this.setState({
      edit_date: e.target.value
    });
  }

  onChangeHolidayDate(date) {
      this.setState({
        holidayDate: date
      })
    }


  onChangeName(e) {
    this.setState({
      name: e.target.value,
      res:''
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    const holiday = {
      date:this.state.holidayDate.toString().replace(/(\d\d:\d\d:\d\d)/,'00:00:00'),
      name: this.state.name,
      sessionToken: this.state.token,
    }

    const d= new Date();
    await axios.post('http://localhost:5000/holiday/add', holiday)
      .then(res=>{
        document.getElementById('holiday-report-form').reset();
        this.setState({
          res: res.data.message,
          holidayDate:d,
          name: ''
        })
      })
      this.refresh();
  }


  holidayList() {
    return this.state.holidaylist.map(currentholiday => {
      return <Holiday
       holiday={currentholiday}
       deleteHoliday={this.deleteHoliday}
       editHoliday={this.editHoliday}
       updateHoliday={this.updateHoliday}
       discardEdit={this.discardEdit}
       onChangeEditName={this.onChangeEditName}
       onChangeEditDate={this.onChangeEditDate}
       key={currentholiday.id}
       edit_id={this.state.edit_id}
       edit_name={this.state.edit_name}
       edit_date={this.state.edit_date}
       />;
    })
  }

  render() {
    return (
      <div className="container w-100">
      <h3> <FontAwesomeIcon icon={faCalendarAlt}/> Public Holiday</h3>
      <br/>
        <div className="row">
            <div className="col-xs-12 col-md-6">
             <div className="add-holiday">
                <form id="holiday-report-form" onSubmit={this.onSubmit} >
                  <div className="header"><h5>Add Public Holiday </h5></div>
                    <br/>
                  <div>

                  <div className="form-group">
                    <div className="col-sm-12">
                      <label>Holiday Date: </label>
                    </div>
                   <div className="col-sm-12">
                      <div>
                        <DatePicker className="form-control"
                        selected={this.state.holidayDate}
                        onChange={this.onChangeHolidayDate}
                        />
                      </div>
                    </div>
                    </div>

                    <div className="form-group">
                    <div className="col-sm-12"><label>Name</label></div>
                    <div className="col-sm-12"><input  type="text"
                        className="form-control input-sm"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        /></div>
                    </div>



                    <div className="form">
                      <br/>
                    <input type="submit" value="Add holiday" onSubmit={this.onSubmit} className="btn btn-primary" /> {this.state.res}
                    <div>
                    <br/>

                    </div>

                  </div>

                </div>


                </form></div>

            </div>

            <div className="col-xs-12 col-md-6">
              <table className="table table-bordered">
                <thead className="thead-light">
                <tr>
                <th colspan="3">
                Holiday List&nbsp;
                  <button className="btn btn-sm btn-light" onClick={() => {this.refresh() }}><FontAwesomeIcon icon={faSyncAlt}/></button>

                </th>
                </tr>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { this.holidayList() }
                </tbody>
              </table>
            </div>
        </div>
      </div>
    )
  }
}
