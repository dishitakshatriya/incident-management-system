import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Button,Form,Jumbotron,Container} from 'react-bootstrap';
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit.bind(this);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            errorMessage: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post('/api/technicianRegisterRoute', data, {config})
            .then(response => {
                this.props.history.push("/opentickets")
            })
            .catch(error => {
                if(data.email!='') 
                this.setState({ errorMessage: 'A technician with this email address already exists' });
                else
                this.setState({ errorMessage: 'Please enter technician email address' });
                //console.log(error.response.data.errors[0].msg);
            });
        console.log(this.state.email);
    }
    render() {
        var styles = { color: 'red' }
        return (
            <Container>
            <h1>Add Technician</h1>
            <Jumbotron>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="First Name" onChange={this.handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Last Name" onChange={this.handleInputChange}/>
                </Form.Group>
                {<p style={styles}>{this.state.errorMessage}</p>}
                <Button variant="primary" type="submit">
                    Add Technician
                </Button>
            </Form>
            </Jumbotron>
            </Container>
      )       
    }
}
export default withRouter(Register);