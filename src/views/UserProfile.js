/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import aws_exports from '../aws-exports';
import {createUser} from '../graphql/mutations'
import {v4 as uuidv4} from 'uuid';
import Select from 'react-select';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,UncontrolledDropdown,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { AmplifyUsernameField } from "@aws-amplify/ui-react";

Amplify.configure(aws_exports);
var Role = [
  {label:'ALUMNI', value: 0},
  {label:'CIC_STAFF', value: 1},
  {label:'SPONSOR', value: 2}
]

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     currentUser:'Michael Scott',
     firstName:'',
     lastName: '',
     post:'',
     userType: '',
     email:'',
     username: '',
     password: '',
     authenticationCode: '',
     step: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRolesDropdown = this.handleRolesDropdown.bind(this);
  }

  async componentDidMount(){
    this.getCurrentUser();
    
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.signUp();
    this.createUserProfile();
  }

  handleRolesDropdown(event){
    this.setState({userType : event.label})
  }

  signUp = async() =>{
    const {username, password, email} = this.state
    try{
      await Auth.signUp({username, password, attributes: {email}})
      console.log('successfuly signed up')
      this.setState({step: 1})
    }catch(err){
      console.log('error signing up for: ', err)
    }
  }

  confirmSignUp = async() =>{
    const {username, authenticationCode} = this.state
    try{
      await Auth.confirmSignUp({username, authenticationCode})
      console.log('user successfuly signed up')
    }catch(err){
      console.log('error confirming: ', err)
    }
  }

  async createUserProfile(){
    
   
      let profile = {
        
        id: uuidv4(),
        name: this.state.firstName + " " + this.state.lastName,
        email: this.state.email,
        userType: this.state.userType
       
      
      }
      console.log(profile);
      
      try {
        await API.graphql(graphqlOperation(createUser, {input: profile}));
        console.log('Created profile!')
        alert('Created Profile!')
      }catch(err){
          console.log("Error creating profile", err);

      }

  }

  async getCurrentUser(){
    let user = await Auth.currentAuthenticatedUser();
    this.setState({currentUser: user});
    console.log(user.username);
  }

 

  
  render() {

   
    return (
      <>
      
        
        <div className="content">
          <Row>
            <Col md="8">
              {
                this.state.step === 0 && (
              <Card>
                <CardHeader>
                  <h5 className="title">Create Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Role</label>
                          <Select
                             onChange={this.handleRolesDropdown}
                              options={Role}
                             // value={this.state.sponsors}
                              //name="sponsors"
                          />
                         
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            name="username"
                            onChange={this.handleChange}
                            placeholder="Username"
                            type="text"
                            value={this.state.username}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="mike@email.com" type="email"  value={this.state.email} onChange={this.handleChange}  name="email"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                           name="firstName"
                           onChange={this.handleChange}
                            placeholder="First Name"
                            type="text"
                            value={this.state.firstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            name="lastName"
                            onChange={this.handleChange}
                            placeholder="Last Name"
                            type="text"
                            value={this.state.lastName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                   
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            name="password"
                            onChange={this.handleChange}
                            placeholder="Password"
                            type="text"
                            value={this.state.password}
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <Row>
                      <Col md="8">
                     
                      </Col>
                    </Row>
                    <Button className="btn-fill" color="primary" type="submit">
                    CREATE PROFILE
                  </Button>
                  </Form>
                </CardBody>
               
              </Card>
                )
  }

{
                this.state.step === 2 && (
              <Card>
                <CardHeader>
                  <h5 className="title">Create Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            onChange={this.handleChange}
                            name="username"
                            placeholder="username"
                            type="text"
                            value={this.state.username}
                            
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Authentication Code</label>
                          <Input
                            name="authenticationCode"
                            onChange={this.handleChange}
                            placeholder="Authentication code"
                            type="text"
                            value={this.state.authenticationCode}
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <Button className="btn-fill" color="primary" type="submit" onClick={this.confirmSignUp}>
                    Confirm Sign Up
                  </Button>
                  </Form>
                </CardBody>
               
              </Card>
                )
  }


            </Col>
            <Col md="4">
             
            </Col>
          </Row>
        </div>
        
  
      </>
    );
  }
}

export default UserProfile;
