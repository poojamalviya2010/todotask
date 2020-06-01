import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,Col,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import {showTask } from "../../redux/users/action";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentWillMount() {
    this.props.showTask();
  }

  logout = () => {
    // const  usertype =localStorage.removeItem("usertype")
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <button style={{ float: "right" }} onClick={this.logout}>
              Logout
        </button>
        <Row>
        <Col xs="12" md="12" lg="4">
          <Card className="todo1">
            <CardTitle>ToDo</CardTitle>
            <CardBody>
              <div>
                  {this.props.todolist.map((data,key)=>{
                  return(               
                  <div>                                      
                          <p id="question_desc">{data.todo_task}</p>                                              
                  </div>                      
                  )              
                })}             
             </div>           
          </CardBody>
        </Card>

        </Col>
        <Col xs="12" md="12" lg="4">
        <Card className="todo2">
           <CardTitle>INPROGRESS</CardTitle>
            <CardBody>
            <div>
                  {this.props.todolist.map((data,key)=>{
                  return(               
                  <div>                                           
                      <p id="question_desc">{data.inprogress}</p>                                               
                  </div>                      
                  )              
                })}             
             </div> 
            </CardBody>
          </Card>
          
        </Col>
        <Col xs="12" md="12" lg="4">
        <Card className="todo3">
        <CardTitle>COMPLETED</CardTitle>
            <CardBody>
            <div>
                  {this.props.todolist.map((data,key)=>{
                  return(               
                  <div>                                                              
                      <p id="question_desc">{data.completed}</p>                       
                  </div>                      
                  )              
                })}             
             </div> 
            </CardBody>
          </Card>
          
        </Col>
        </Row>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.users.Data,
    message: state.users.Message,
    todolist:state.users.usertask
  };
};

export default connect(mapStateToProps, {showTask})(Users);
