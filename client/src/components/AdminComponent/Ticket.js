import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import decode from 'jwt-decode';
//import { useAuth } from "../../contexts/auth";
import '../../App.css';
import axios from 'axios';

class Ticket extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit.bind(this);
        this.state = {
            desc: '',
            domain: '',
            priority: '',
            status: '',
            notes: '',
            errormsg: '',
            domainList:[],
            priorityList:[],
            statusList:[],
            technicianList:[],
            assignedTechnician:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        axios
            .get('/api/domain')
            .then(response => {
                this.setState({domainList:response.data});
                console.log(response.data);
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
            })
        axios.get('/api/technician')
            .then(res => {
              this.setState({ technicianList: res.data });
            })
    }
    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    handleSubmit = event => {
        event.preventDefault();
        //let decodeddata = decode(authToken);
        //console.log(decodeddata.admin.id);
        let decodeddata = decode(sessionStorage.getItem('adminToken'));
        console.log(decodeddata.admin.id);
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let data = {
            description: this.state.desc,
            domain: this.state.domain,
            status: this.state.status,
            priority: this.state.priority,
            notes:[{
                notesWritten: this.state.notes
            }],
            createdBy: decodeddata.admin.id,
            technicianAssigned: this.state.assignedTechnician
        }

        axios
            .post('/api/ticket', data, config)
            .then(response => {
                console.log(response.data);
                this.props.history.push("/opentickets")
            })
            .catch(error => {
                console.log(error)
                if(data.description=='') 
                this.setState({ errorMessage: 'Please enter description for the ticket' });
                else if(data.domain=='')
                this.setState({ errorMessage: 'Please select domain for the ticket' });
                else if(data.priority=='')
                this.setState({ errorMessage: 'Please select priority for the ticket' });
                else if(data.status=='')
                this.setState({ errorMessage: 'Please select status for the ticket' });
            })

        console.log(data);
    }
    
    render(){
    var styles = { color: 'red' }
    return (
        <Container className="form">
            <h1> Create New Ticket</h1>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="Type ticket description here" name='desc' value={this.state.desc} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDomain">
                        <Form.Label>Domain</Form.Label>
                        <Form.Control as="select" name='domain' onChange={this.handleInputChange}>
                            <option>Choose your option</option>
                            {this.state.domainList.map((domain) => <option key={domain._id} value={domain._id}>{domain.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control as="select" name='priority' onChange={this.handleInputChange}>
                            <option>Choose your option</option>
                            {this.state.priorityList.map((p) => <option key={p._id} value={p._id}>{p.type}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPriority">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" name='status' onChange={this.handleInputChange}>
                        <option>Choose your option</option>
                            {this.state.statusList.map((status) => {
                                if (status.status === 'Open') {
                                    return <option key={status._id} value={status._id}>{status.status}</option>
                                } else {
                                    return <option key={status._id} value={status._id} disabled>{status.status}</option>
                                }
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridNotes">
                    <Form.Label>Additional Notes</Form.Label>
                    <Form.Control placeholder="Type additional notes for the technician here" name='notes' value={this.state.notes}
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group  controlId="formGridAssignTechician">
                        <Form.Label>Assign Technician</Form.Label>
                        <Form.Control as="select" name='assignedTechnician' onChange={this.handleInputChange}>
                            <option>Choose your option</option>
                            {this.state.technicianList.map((t) => <option key={t._id} value={t.email}>{t.email}</option>)}
                        </Form.Control>
                </Form.Group>

                {<p style={styles}>{this.state.errorMessage}</p>}
                <Button variant="primary" type="submit">
                    Create Ticket
                    </Button>
            </Form>
        </Container>
    )
    }
}
export default Ticket;