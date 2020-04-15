import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button,Form,Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class ViewTicketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            desc: '',
            domain: '',
            priority: '',
            status: '',
            notes: [],
            errormsg: '',
            statusList:[],
            solution: '',
            additionalnotes:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        
        const{ticket_id} = this.props.match.params;
        axios.get('/api/ticket/'+ticket_id)
        .then(res=>{
            console.log(res.data.notes)
                this.setState({ ticket: res.data,
                desc:res.data.description,
                notes:res.data.notes,
                priority:res.data.priority,
                domain:res.data.domain,
                solution:res.data.solution,
                id:res.data._id});
            })
        
        .then(res => {
        axios
              .get('/api/domain/'+this.state.domain)
              .then(response => {
                  this.setState({domain:response.data.name});
              })
              .catch(error => {
                console.log('error ', error);
            });
              axios
              .get('/api/priority/' + this.state.priority)
              .then(response => {
                  this.setState({priority:response.data.type})
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
        });

    }
    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }


    handleSubmit = event => {
        event.preventDefault();    
      
        const data = {
            id: this.state.id,
            status: this.state.status,
            notesWritten: this.state.additionalnotes
        };  
        console.log(data);      
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(data); 
        axios.put('/api/ticket/updateByAdmin/'+data.id,data,config)
        .then(res => {
                console.log(res);
                this.props.history.push("/opentickets")
        })
        .catch(error => {
            console.log(error.response);
        });
        }
    render(){
        return(
            <Container className="form">
            <h1>View ticket</h1>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='desc' value={this.state.desc} disabled/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDomain">
                        <Form.Label>Domain</Form.Label>
                        <Form.Control value={this.state.domain} disabled name='domain'>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control value={this.state.priority} disabled name='priority'>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPriority">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" name='status' onChange={this.handleInputChange}>
                        <option>Choose your option</option>
                            {this.state.statusList.map((status) => {
                                return <option key={status._id} value={status._id}>{status.status}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridNotes">
                    <Form.Label>Additional Notes</Form.Label>
                    {this.state.notes.map(n=>{
                        return <Form.Control  key={n._id} value={n.notesWritten} disabled/> 
                    })}
                    <Form.Control  name='additionalnotes' placeholder='Add Additional notes' onChange={this.handleInputChange}/>
                </Form.Group>
                {/* <Form.Group controlId="formGridSolution">
                    <Form.Label>Solution</Form.Label>
                    <Form.Control name='solution' value={this.state.solution} onChange={this.handleInputChange}/>
                </Form.Group> */}

                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Update Ticket
                    </Button>
        </Container>
        );
    }
}

export default withRouter(ViewTicketDetails);