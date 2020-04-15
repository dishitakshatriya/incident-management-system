import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Table,Jumbotron,Container} from 'react-bootstrap';
import decode from 'jwt-decode';
import Button from 'react-bootstrap/Button';

class OpenTicketsDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ticketList:[],
          domainList:[],
          priorityList:[],
          statusList:[]
      };
    }
    componentDidMount() {
      let decodeddata = decode(sessionStorage.getItem('adminToken'));
            axios
            .get('/api/ticket')
            .then(response => {
              console.log("anusha")
               response.data.map(d=>{
                if(d.createdBy===decodeddata.admin.id){
                    // this.setState({ticketList:d})
                    console.log(d)
                    this.setState({ticketList:[...this.state.ticketList, d]})
                }
              })
            })
            .catch(error => {
              console.log('error ', error);
          });
          axios
              .get('/api/domain')
              .then(response => {
                  this.setState({domainList:response.data});
              })
              .catch(error => {
                console.log('error ', error);
            });
              axios
              .get('/api/priority')
              .then(response => {
                  this.setState({priorityList:response.data})
                  console.log(response.data);
              })
              .catch(error => {
                console.log('error ', error);
            });
              axios
              .get('/api/status')
              .then(response => {
                  this.setState({statusList:response.data})
                  console.log(response.data);
              })
            .catch(error => {
                console.log('error ', error);
            });
    }
    handleShowTicket(ticket_id) {
      var link = '/admin/ticket/' + ticket_id
      this.props.history.push(link);
    }
    handleOnClick = (event) => {
      var link = '/technicians/all';
      this.props.history.push(link);
    }
    render() {
        return (
            <Container>
            <h1>Tickets Created by you</h1>
            <Jumbotron>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Domain</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ticketList.map(t=>{
                return <tr key={t._id} onClick={this.handleShowTicket.bind(this, t._id)}>
                  <td>{t.description}</td>
                  {this.state.domainList.map(d=>{
                    if(d._id===t.domain)
                    return <td key={d._id}>{d.name}</td>
                  })}
                  {this.state.statusList.map(s=>{
                    if(s._id===t.status)
                    return <td key={s._id}>{s.status}</td>
                  })}
                  {this.state.priorityList.map(p=>{
                    if(p._id===t.priority)
                    return <td key={p._id}>{p.type}</td>
                  })}
                </tr>
                })}
              </tbody>
            </Table>
            <Button variant="primary" size="lg" onClick={this.handleOnClick}>View all Technicians</Button>
            </Jumbotron>
            </Container>
      )       
    }
}
export default withRouter(OpenTicketsDash);