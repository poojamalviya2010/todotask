import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody, 
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  delete_task,showTaskByUserId,Update_Todo
} from "../../redux/users/action";

class AddTodo extends React.Component {
  constructor(props) {   
    super(props);
    this.toggletask = this.toggletask.bind(this);
    console.log(this.props.location.state);   
    this.UpdateTodo = this.UpdateTodo.bind(this);
    this.state = {todo:"", user_id:"", taskmodal: false,task_id:""};
  }

 
  UpdateTodo= (event) =>{
    event.preventDefault();
    const { todo, user_id, task_id } = this.state;
    console.log(
      "name, email,dob,designation, status",
      todo, user_id, task_id
    );
    this.props.Update_Todo(todo, user_id, task_id);
    alert("Task Updated successfully by admin");
}

toggletask() {
    this.setState({
        taskmodal: !this.state.taskmodal
    });
  }

back = () => {
    // const  usertype =localStorage.removeItem("usertype")
    this.props.history.push("/adminuser");
};

deleteTask = (id,user_id) => {
    console.log(id);
    confirmAlert({
      title: "Are you sure?",
      message: "It will be deleted permanently!",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.delete_task(id,user_id)
        },
        {
          label: "No",
          onClick: () => ""
        }
      ]
    });
  };

  redirectEdit = id => {
    console.log("question id", id);
    this.toggletask(id);
    this.props.showTaskByUserId(id);
    this.setState({ user_id: id });
  };

  componentWillReceiveProps = nextProps => {
    console.log("admin data", nextProps.shoTaskData, nextProps.shoTaskData.length);
    if (nextProps.shoTaskData.length > 0) {
      let data = nextProps.shoTaskData[0];
      this.setState({
        user_id: data.user_id,
        task_id: data.id,
        todo :data.todo_task
      });
    }
  };

  render() {    
      console.log("todo data", this.props.todoData)
      const data = this.props.todoData.map((data, key) => {
        return {
          user_id: data.username,
          todo_task: data.todo_task,
          inprogress:data.inprogress,
          completed:data.complete,
          actions: (
            // we've added some custom button actions
            <div className="text-center">
              <Button
                onClick={() => this.deleteTask(data.id,data.user_id)}
                color="inverse"
                size="sm"
                round="true"
                icon="true"
              >
                <i className="fa fa-trash" />
              </Button>{" "}
              &nbsp;
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => this.redirectEdit(data.id)}
                color="inverse"
                size="sm"
                round="true"
                icon="true"
              >
                <i className="fa fa-edit" />
              </Button>
            </div>
          )
        };
      });
    return (
      <div>
        <Card>
          <CardTitle className="mb-0 p-3 border-bottom bg-light">
            <i className="mdi mdi-border-right mr-2"></i>ToDo Task List 
            <Button style={{ float: "right" }} onClick={this.back}>
              Back
            </Button>
          </CardTitle>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "User Name",
                  accessor: "user_id"
                },
                {
                  Header: "Todo Task",
                  accessor: "todo_task"
                },    
                {
                    Header: "In-Progress",
                    accessor: "todo_inprogress"
                }, 
                {
                    Header: "Completed",
                    accessor: "completed"
                },             
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false
                }
              ]}
              defaultPageSize={10}
              showPaginationBottom={true}
              className="-striped -highlight"
              data={data}
              filterable
            />
          </CardBody>
        </Card>
        
        <Modal
          isOpen={this.state.taskmodal}
          toggle={this.toggletask}
          className="login-modal"
        >
          <ModalHeader toggle={this.toggletask}>Edit Todo Task</ModalHeader>
          <ModalBody>
            <form onSubmit={this.UpdateTodo}>
              <div className="form-group">
                <Label for="name">To Do Task : </Label>
                <Input type="textarea" rows="2" name="todo" id="todo" value={this.state.todo} onChange={e => this.setState({ todo: e.target.value })}/>
              </div>
              <div>
                <Button color="primary" onClick={this.toggletask} type="submit">
                  Add
                </Button>
                <Button
                  color="secondary"
                  className="ml-1"
                  onClick={this.toggletask}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    todoData: state.users.tododata,
    shoTaskData: state.users.showdata
  };
};

export default connect(mapStateToProps, {delete_task,showTaskByUserId,Update_Todo})(AddTodo);