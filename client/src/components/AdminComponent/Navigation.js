import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom'

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnClick.bind(this);
    this.handleOnClickLogout.bind(this);
  }
  handleOnClick=event=>{
    this.props.history.push("/ticket")
  }
  handleOnClickLogout=event=>{
    sessionStorage.removeItem('adminToken');
    this.props.history.push("/")
  }
  handleOnClickViewTech=event=>{
    this.props.history.push("/technicians/all")
  }
  handleOnClickCreateTech=event=>{
    this.props.history.push("/technician/new")
  }
  render() {
    return (
      <>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Incident Management System</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link  onClick={this.handleOnClickCreateTech}>Create a Technician</Nav.Link>
            <Nav.Link  onClick={this.handleOnClickViewTech}>View all Technician</Nav.Link>
            <Button variant="outline-info" onClick={this.handleOnClick}>Create Ticket</Button>
          </Nav>
          <Form inline>
            {/* <FormControl type="text" placeholder="Search Ticket" className="mr-sm-2" /> */}
            <Button variant="outline-info" onClick={this.handleOnClickLogout}>Logout</Button>
          </Form>
        </Navbar>
      </>
    )
  }
}

export default withRouter (Navigation);