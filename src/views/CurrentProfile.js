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
import {getUser, listPosts, listUsers} from '../graphql/queries'
import {v4 as uuidv4} from 'uuid';
import Select from 'react-select';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";


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

var Challenges = []
var currentSponsorName = ''
var currentSponsorType = ''
var currentSponsorAbout = ''

class CurrentProfile extends React.Component {
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
     step: 0,
     fullName: '',
     challengeOptions: [],
     profileName:'',
     currentSponsor:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRolesDropdown = this.handleRolesDropdown.bind(this);
  }

  async componentDidMount(){
    window.scrollTo(0, 0)
    //this.getCurrentUrl();
    //this.getCurrentUser();
    //this.getUserName();
    this.getChallenges();
   this.getUserWithName();
    
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
      }catch(err){
          console.log("Error creating profile", err);

      }

  }

  async getCurrentUser(){
    let user = await Auth.currentAuthenticatedUser();
    this.setState({currentUser: user});
    //console.log(user.username);
    
   
  }

  async getUserName(){
    const userData = await API.graphql(graphqlOperation(getUser, { id:"1234" }));
    this.setState({fullName: userData.data.getUser.name})
    this.setState({profileName:userData.data.getUser.name})
    this.setState({userType: userData.data.getUser.userType})
    //console.log(userData.data.getUser.name);
    //console.log(this.state.profileName)

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

getCurrentUrl(){
    
    let path = window.location.href;
    
    let temp = path.split("/").pop();
    console.log(temp)
    if(path.split("/").pop() === "current-profile"){
        this.getUserName();
    }
    this.setState({profileName:temp})
    //console.log(this.state.profileName)

    this.getUserWithName();
 
    
}
 
async getUserWithName(){
    //console.log(this.state.profileName)
    let path = window.location.href;
    let temp = path.split("/").pop();
    console.log(temp)

    try {
        const user = await API.graphql(graphqlOperation(listUsers, {filter:{name:{eq:temp}}}))
        console.log('user:', user)
        this.setState({
          currentSponsor: user.data.listUsers.items
        })
      } catch (err) {
        console.log('error fetching current Sponsor...', err)
      }
      
      console.log(this.state.currentSponsor)
      currentSponsorName = this.state.currentSponsor[0].name;
      currentSponsorType = this.state.currentSponsor[0].userType;
      currentSponsorAbout = this.state.currentSponsor[0].about;
}
  
  render() {

   
    return (
      <>
      
        
        <div className="content">
          <Row>
            <Col md="8">
              
                
                    <Card className="card-user" >
                    <CardBody>
                      <CardText />
                      <div className="author">
                        <div className="block block-one" />
                        <div className="block block-two" />
                        <div className="block block-three" />
                        <div className="block block-four" />
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="avatar"
                            src={require("assets/img/anime3.png")}
                          />
                          {/* <h5 className="title">{this.state.profileName}</h5> */}
                          <h5 className="title">{currentSponsorName}</h5>
                        </a>
                        <p className="description">{currentSponsorType}</p>
                      </div>
                      <h3>
                          {currentSponsorAbout}
                        
                      </h3>
                      <h4>Challenges:</h4>
                      <Select options={Challenges}/>
                      
                    </CardBody>
                    <CardFooter>
                      <div className="button-container">
                        <Button>Follow</Button>
                        <Button color='warning'>Message</Button>
                  
                      </div>
                    </CardFooter>
                  </Card>
                
  




            </Col>
            <Col md="4">
              
            </Col>
          </Row>
        </div>
        
  
      </>
    );
  }
}

export default CurrentProfile;
