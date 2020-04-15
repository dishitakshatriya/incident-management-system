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
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
            errorMessage: []
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
            password: this.state.password,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            phone: this.state.phone
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match");
        } else {
        axios.post('/api/adminRegisterRoute', data, {config})
            .then(response => {
                this.props.history.push("/")
            })
            .catch(error => {
                //console.log(error.response.data.errors[0].msg);
            });
        }
        console.log(this.state.email);
    }
    render() {
        return (
            <Container>
            <h1>Registration</h1>
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
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleInputChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Jumbotron>
            </Container>
      )       
    }
}
export default withRouter(Register);