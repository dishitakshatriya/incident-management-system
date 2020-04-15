import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import OpenTicketsDash from './OpenTicketsDash';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
 import Ticket from './Ticket';
 import '../../App.css';
 import Navigation from './Navigation';
 import ViewTicketDetails from './ViewTicketDetails';
 import TechnicianRegistration from '../TechnicianComponents/TechnicianRegistration';
 import TechnicianList from '../AdminComponent/TechnicianList';
 import { withRouter } from 'react-router-dom'


 class AdminDashboard extends Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem('adminToken')==null){
          props.history.push("/")
          alert("Please login first!");
        }
    }
 render() { 
   return (
      <BrowserRouter>
           <Navigation/>
           <Route path='/ticket' component={Ticket}/>
           <Route path='/opentickets' component={OpenTicketsDash}/>
           <Route exact path='/admin/ticket/:ticket_id' component={ViewTicketDetails}/>
           <Route path='/technician/new' component={TechnicianRegistration}/>
           <Route path='/technicians/all' component={TechnicianList}/>
       </BrowserRouter>
   )
  }
  };
  export default withRouter(AdminDashboard);