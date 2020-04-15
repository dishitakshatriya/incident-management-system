import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Table,Jumbotron,Container} from 'react-bootstrap';
import decode from 'jwt-decode';

class UpdateTicket extends Component {
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
      let decodeddata = decode(sessionStorage.getItem('technicianToken'));
            axios
            .get('/api/ticket')
            .then(response => {
               response.data.map(d=>{
                if(d.technicianAssigned!=undefined){
                  console.log(d.technicianAssigned)
                  if(d.technicianAssigned===decodeddata.technician.email){
                      console.log("hey")
                      this.setState({ticketList:[...this.state.ticketList, d]})
                  }
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
      var link = '/ticket/' + ticket_id
      this.props.history.push(link);
    }
    render() {
        return (
            <Container>
            <h1>Tickets Assigned/Closed by you</h1>
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
            </Jumbotron>
            </Container>
      )       
    }
}
export default withRouter(UpdateTicket);