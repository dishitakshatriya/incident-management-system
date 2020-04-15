import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
 import '../../App.css';
 import TechnicianNavigation from './TechnicianNavigation';
 import { withRouter } from 'react-router-dom';
import UpdateTicketDetails from './UpdateTicketDetails';
import UpdateTicket from './UpdateTicket';


 class TechnicianDashboard extends Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem('technicianToken')==null){
          props.history.push("/technician")
          alert("Please login first!");
        }
    }
 render() { 
   return (
      <BrowserRouter>
           <TechnicianNavigation/>
           <Route exact path="/ticket/:ticket_id" component={UpdateTicketDetails}/>
           <Route exact path="/tickets" component={UpdateTicket}/>
       </BrowserRouter>
   )
  }
  };
  export default withRouter(TechnicianDashboard);