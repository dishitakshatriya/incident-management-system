import React, { Component } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
class TechnicianList extends Component {
  constructor(props){
    super(props);
    this.handleSubmit.bind(this);
    this.state = {
      technicians: []
    }
  }

  componentDidMount() {
    axios.get('/api/technician')
      .then(res => {
        this.setState({ technicians: res.data });
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.delete('/api/technician/'+event.target.value)
      .then(res => {
      console.log(res);
      this.componentDidMount();
      });
  }
  handleOnClickBackBtn = (event) => {
    var link = '/opentickets';
    this.props.history.push(link);
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Link to="/technician/new" className="btn btn-success addcompetition">Add Technician</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive="md">
                <thead>
                  <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th className="stu-hide">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.technicians.map(technician => {
                    return <tr key={technician._id}>
                      <td>{technician.firstName}</td>
                      <td>{technician.lastName}</td>
                      <td className="stu-hide">{technician.email}</td>
                      <td>
                      <Button className="btn btn-danger btn-judge" 
                      key = {technician._id} value= {technician._id} 
                      onClick={this.handleSubmit.bind(technician._id)}>Delete</Button></td>
                    </tr>
                  })}

                </tbody>
              </Table>
            </Col>
          </Row>
          <Button variant="primary" type="submit" onClick={this.handleOnClickBackBtn}>
                Return to ticket list
          </Button>
        </Container>
      </div>
    )
  }
}
export default withRouter(TechnicianList);