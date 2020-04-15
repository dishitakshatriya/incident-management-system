import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Button,Form,Jumbotron,Container} from 'react-bootstrap';
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: "",
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
            password: this.state.password
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post('/api/adminLogin', data, {config})
            .then(response => {
                sessionStorage.setItem('adminToken', response.data.token);
                this.props.history.push("/opentickets")
            })
            .catch(error => {
                this.setState({ errorMessage: 'Invalid Login credentials' });
            });
        console.log(this.state.email);
    }

    technicianSignin = (event) => {
        var link = '/technician';
        this.props.history.push(link);
      }
    render() {
        var styles = { color: 'red' }
        return (
            <Container>
            <h1>Sign In</h1>
            <Jumbotron>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                </Form.Group>
                {<p style={styles}>{this.state.errorMessage}</p>}
                <Button variant="primary" type="submit">
                    Sign in
                </Button>
            </Form>
            <Form.Text className="text-muted">
              Don't have Account?
              <a className="fp1" href="/registration">Create New Account</a>
            </Form.Text>
            <Button variant="primary" type="submit" onClick={this.technicianSignin}>
                    Technician Sign in
                </Button>
            </Jumbotron>
            </Container>
      )       
    }
}
export default withRouter(Login);