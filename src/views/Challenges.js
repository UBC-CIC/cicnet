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
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import {AiOutlineLike, AiFillLike} from "react-icons/ai"
import {FaRegCommentAlt} from "react-icons/fa"

// reactstrap components
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  UncontrolledAlert,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listPosts } from '../graphql/queries';
import aws_exports from '../aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(aws_exports);

const items = [];
let cards = [];
let cards2 = [];
let cards3 = [];
let cards4 = [];

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      posts:[],
      test:"",
      liked: true,
      cardList: []
      
     
    };
  }

  async componentDidMount(){
    this.getPosts();
    
  }

  

  async getPosts(){
    try {
      const posts = await API.graphql(graphqlOperation(listPosts, {filter:{postType:{eq:'CHALLENGE'}}}))
      console.log('posts:', posts)
      this.setState({
        posts: posts.data.listPosts.items
      })
    } catch (err) {
      console.log('error fetching posts...', err)
    }
    
    this.makePostCard();
  
  }

  async changeLikeStatus(){
       
    
    this.setState({liked: !this.state.liked})
  }
  

  async makePostCard(){
    var numPerRow = 0
    var i = 0
   
   
  
            for(i = 0; i < this.state.posts.length; i++){
                cards.push(
                    
                    <Col lg="4" key={i}>
                    
                        <Card className="card-chart">
                            <CardHeader>
                            <h5 className="card-category">{this.state.posts[i].title}</h5>
                            <CardTitle tag="h3">
                               
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                            <div >
                            <img
                                    alt="..."
                                   
                                    src={require("assets/img/health.jpg")}
                                />
                                
                            </div>
                            </CardBody>
                        </Card> 
                    </Col>
           
            )
            
            }
            

            // for(i = 3; i < 6; i++){
            //     cards2.push(
                    
            //         <Col lg="4" key={i}>
                    
            //             <Card className="card-chart">
            //                 <CardHeader>
            //                 <h5 className="card-category">{this.state.posts[i].title}</h5>
            //                 <CardTitle tag="h3">
            //                     <i className="tim-icons icon-bell-55 text-info" />{" "}
            //                     763,215
            //                 </CardTitle>
            //                 </CardHeader>
            //                 <CardBody>
            //                 <div className="chart-area">
            //                     <Line
            //                     data={chartExample2.data}
            //                     options={chartExample2.options}
            //                     />
            //                 </div>
            //                 </CardBody>
            //             </Card> 
            //         </Col>
           
            // )
            
            // }
        

            // for(i = 6; i < 9; i++){
            //     cards3.push(
                    
            //         <Col lg="4" key={i}>
                    
            //             <Card className="card-chart">
            //                 <CardHeader>
            //                 <h5 className="card-category">{this.state.posts[i].title}</h5>
            //                 <CardTitle tag="h3">
            //                     <i className="tim-icons icon-bell-55 text-info" />{" "}
            //                     763,215
            //                 </CardTitle>
            //                 </CardHeader>
            //                 <CardBody>
            //                 <div className="chart-area">
            //                     <Line
            //                     data={chartExample2.data}
            //                     options={chartExample2.options}
            //                     />
            //                 </div>
            //                 </CardBody>
            //             </Card> 
            //         </Col>
           
            // )
            
            // }

 console.log(cards)
      for(i = 0; i < this.state.posts.length; i++){
          cards4.push(<Row key={i}>{cards[i]}</Row>)
      }
      console.log(cards4)
      this.setState({cardList: cards4})
    // cards = this.state.posts.map(challenge =>{
    //   return(
        
    //     <Col lg="4">
          
    //          <Card className="card-chart">
    //           <CardHeader>
    //             <h5 className="card-category">{challenge.title}</h5>
    //             <CardTitle tag="h3">
    //               <i className="tim-icons icon-bell-55 text-info" />{" "}
    //               763,215
    //             </CardTitle>
    //           </CardHeader>
    //           <CardBody>
    //             <div className="chart-area">
    //               <Line
    //                 data={chartExample2.data}
    //                 options={chartExample2.options}
    //               />
    //             </div>
    //           </CardBody>
    //         </Card> 
            
            
           
            
    //      </Col>
         
        
    //   )
    // })

    

  }


  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
      <>
      
        <div className="content">
            {this.state.cardList}
        {/* <Row>
        {cards}
        </Row>
        <Row>
        {cards2}
        </Row>
        <Row>
        {cards3}
        </Row> */}

          <Row>
            <Col xs="12">
 
            </Col>
          </Row>
          {/* <Row>
          <Col lg="4">
            
               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card> 
              
              
             
              
           </Col>

            <Col lg="4">

               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card> 
            </Col>

            <Col lg="4">
               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card> 
            </Col>
          </Row>

          <Row>
          <Col lg="4">
            
               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card> 
              
              
             
              
           </Col>
            <Col lg="4">

               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card> 
            </Col>
            <Col lg="4">
               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card> 
            </Col>
          </Row>
          <Row>
          <Col lg="4">
            
               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card> 
              
              
             
              
           </Col>
            <Col lg="4">

               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card> 
            </Col>
            <Col lg="4">
               <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card> 
            </Col>
          </Row>
          
          
          <Row>
            <Col lg="6" md="12">
                 
            </Col>
            <Col lg="6" md="12">
               
            </Col>
          </Row> */}
        </div>
      </>
    );
  }
}

export default Challenges;
