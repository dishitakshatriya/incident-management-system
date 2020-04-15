import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../components/AdminComponent/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Register from '../components/AdminComponent/Register';
import AdminDashboard from '../components/AdminComponent/AdminDashboard';
import TechnicianLogin from '../components/TechnicianComponents/TechnicianLogin';
import '../App.css'
import TechnicianDashboard from '../components/TechnicianComponents/TechnicianDashboard';


class AppRouter extends Component {
  render(){
  return (
      <BrowserRouter> 
          <Route exact path='/registration' component={Register} />
          <Route exact path='/' component={Login} />
          <Route exact path={"/opentickets"} render={props => (
          <AdminDashboard />
        )} />
          <Route exact path={"/ticket"} render={props => (
          <AdminDashboard />
        )} />

        <Route exact path={"/admin/ticket/:ticket_id"} render={props => (
          <AdminDashboard />
        )} />
        <Route exact path={"/technician/new"} render={props => (
          <AdminDashboard />
        )} />
        <Route exact path={"/technicians/all"} render={props => (
          <AdminDashboard />
        )} />
      <Route exact path='/technician' component={TechnicianLogin} />
      <Route exact path="/ticket/:ticket_id" render={props => (
          <TechnicianDashboard />
        )} />
      <Route exact path="/tickets" render={props => (
          <TechnicianDashboard />
        )} />
      </BrowserRouter>
  )
  }
  };
  
  export default AppRouter;