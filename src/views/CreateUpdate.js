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
import {createPost} from '../graphql/mutations'
import {listUsers, listPosts} from '../graphql/queries'
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

Amplify.configure(aws_exports);

var Sponsors = [
    
  ];

  var Students = [
    
  ];

  var Challenges = [];

class CreateUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
        title: '',
        description: '',
        postType: 'UPDATE',
        users: [],
        comments: '',
        sponsors: [],
        students: [],
        sponsorOptions: [],
        studentOptions:[],
        challenge: '',
        challengeOptions:[],
        currentUser: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSponsorDropdown = this.handleSponsorDropdown.bind(this);
    this.handleStudentDropdown = this.handleStudentDropdown.bind(this);
    this.handleChallengeDropdown = this.handleChallengeDropdown.bind(this);
  }

  async componentDidMount(){
    this.getCurrentUser();
    this.getChallenges();
    
     
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.createPostFunction();
  }

  handleSponsorDropdown(event){
      this.setState({sponsors : event})
      //console.log(this.state.sponsors);
  }

  handleStudentDropdown(event){
    this.setState({students : event})
    //console.log(this.state.students);
}

handleChallengeDropdown(event){
    this.setState({challenge:event})
}

async getChallenges(){
    try {
        const challenges = await API.graphql(graphqlOperation(listPosts, {filter:{postType:{eq:'CHALLENGE'}}}))
        console.log('challenges:', challenges)
        this.setState({
          challengeOptions: challenges.data.listPosts.items
        })
      } catch (err) {
        console.log('error fetching challenges...', err)
      }
      this.state.challengeOptions.forEach(element => {
          Challenges.push({label: element.title, value:element.id})
      });

}

async getCurrentUser(){
    let user = await Auth.currentAuthenticatedUser();
    this.setState({currentUser: user.username});
    console.log(user.username);
  }



async getSponsors(){
    
    try {
        const sponsors = await API.graphql(graphqlOperation(listUsers, {filter:{userType:{eq:'SPONSOR'}}}))
        //console.log('sponsors:', sponsors)
        this.setState({
          sponsorOptions: sponsors.data.listUsers.items
        })
      } catch (err) {
        console.log('error fetching sponsors...', err)
      }
      this.state.sponsorOptions.forEach(element => {
          Sponsors.push({label: element.name, value:element.id})
      });

}

async getStudents(){
    
    try {
        const students = await API.graphql(graphqlOperation(listUsers, {filter:{userType:{eq:'ALUMNI'}}}))
        //console.log('students:', students)
        this.setState({
         studentOptions: students.data.listUsers.items
        })
      } catch (err) {
        console.log('error fetching students...', err)
      }
      
      this.state.studentOptions.forEach(element => {
        Students.push({label: element.name, value:element.id})
    });

}

  async createPostFunction(){
    console.log(this.state.sponsors)
    console.log(this.state.students)
    let userList= []
    userList.push(this.state.sponsors)
    this.state.students.forEach(element => {
        userList.push(element)
    });

      let post = {
        
        title: this.state.title,
        description: this.state.description,
        postType: this.state.postType,
        sponsor: this.state.currentUser
                         
      }
      //console.log(post);
      
      try {
        await API.graphql(graphqlOperation(createPost, {input: post}));
        console.log('Created post!')
        alert('Created Update!')
      }catch(err){
          console.log("Error creating post", err);

      }

  }


  
  render() {

   
    return (
      <>
      
        
        <div className="content">
          <Row>
            <Col md="8">
            
              <Card>
                <CardHeader>
                  <h5 className="title">Create Update</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            onChange={this.handleChange}
                            name="title"
                            placeholder="Title"
                            type="text"
                            value={this.state.title}
                            
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Challenge</label>
                          <Select
                             onChange={this.handleChallengeDropdown}
                              options={Challenges}
                             // value={this.state.sponsors}
                              //name="sponsors"
                          />
                          
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                  
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                           name="description"
                           onChange={this.handleChange}
                            placeholder="Description"
                            type="textarea"
                            value={this.state.description}
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col className="pl-md-1" md="6">
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
                      </Col> */}
                    </Row>
                   
                    {/* <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            name="password"
                            onChange={this.handleChange}
                            placeholder="City"
                            type="text"
                            value={this.state.password}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            onChange={this.handleChange}
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md="8">
                       
                      </Col>
                    </Row>
                    <Button className="btn-fill" color="primary" type="submit">
                    CREATE UPDATE
                  </Button>
                  </Form>
                </CardBody>
               
              </Card>
               
            </Col>
            
          </Row>
        </div>
        
  
      </>
    );
  }
}

export default CreateUpdate;
