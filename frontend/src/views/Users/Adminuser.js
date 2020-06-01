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
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import {
  show_User,
  delete_user,
  showUserById,
  adminAddUser,
  UpdateUser,
  Add_Todo,
  showTaskById
} from "../../redux/users/action";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class Adminuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      modal: false,
      adminmodal: false,
      name: "",
      email: "",
      password: "",
      dob: "",
      designation: "",
      status: "",
      todomodal : false,
      todo:""
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.toggleAdminModal = this.toggleAdminModal.bind(this);
  }

  componentWillMount() {
    this.props.show_User();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleTodo() {
    this.setState({
      todomodal: !this.state.todomodal
    });
  }

  toggleAdminModal() {
    this.setState({
      adminmodal: !this.state.adminmodal
    });
  }

  logout = () => {
    // const  usertype =localStorage.removeItem("usertype")
    this.props.history.push("/");
  };

  redirectEdit = id => {
    console.log("question id", id);
    this.toggle(id);
    this.props.showUserById(id);
    this.setState({ user_id: id });
  };

  redirectAddTask=(id)=>{
    console.log("question id", id);
    this.setState({ user_id: id });
    this.toggleTodo(id);
  }
  
  redirectShowTask=(id)=>{
    console.log("question id", id);
    this.props.showTaskById(id);
    this.props.history.push(`/todo/userid/${id}`)
  }

  deleteUser = user_id => {
    console.log(user_id);
    confirmAlert({
      title: "Are you sure?",
      message: "It will be deleted permanently!",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.delete_user(user_id)
        },
        {
          label: "No",
          onClick: () => ""
        }
      ]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password, dob, designation, status } = this.state;
    console.log(
      "name, email,dob,designation, status",
      name,
      email,
      password,
      dob,
      designation,
      status
    );
    this.props.adminAddUser(status, name, email, password, dob, designation);
    alert("User Added successfully by admin");
  };

  
  handleAddTodo = event => {
    event.preventDefault();
    const { todo, user_id } = this.state;
    console.log(
      "name, email,dob,designation, status",
      todo, user_id
    );
    this.props.Add_Todo(todo, user_id);
    alert("ToDo Task Added successfully by admin");
    this.props.history.push(`/todo/userid/${user_id}`)
  };

  handleUpdate = event => {
    event.preventDefault();
    const { user_id, name, email, dob, designation, status } = this.state;
    console.log(
      "name, email,dob,designation, status",
      name,
      email,
      dob,
      designation,
      status
    );
    this.props.UpdateUser(user_id, status, name, email, dob, designation);
    alert("User Updated successfully by admin");
  };

  componentWillReceiveProps = nextProps => {
    console.log("admin data", nextProps.userById, nextProps.userById.length);
    if (nextProps.userById.length > 0) {
      let data = nextProps.userById[0];
      this.setState({
        name: data.username,
        email: data.email,
        dob: data.dob,
        designation: data.designation,
        status: data.status,
        user_id: data.id
      });
    }
  };


  render() {
    console.log("user list", this.props.userList);
    const data = this.props.userList.map((data, key) => {
      return {
        name: data.username,
        email: data.email,
        dob: data.dob,
        designation: data.designation,
        status: data.status,
        addtask: (
					<div className="text-center">	
						<Button className="btn addAdminbtn" color="primary" onClick={()=>this.redirectAddTask(data.id)} >Add Todo Task</Button>					
					</div>
					),
        actions: (
          // we've added some custom button actions
          <div className="text-center">
            <Button
              onClick={() => this.deleteUser(data.id)}
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
            &nbsp;
            <Button
              onClick={() => this.redirectShowTask(data.id)}
              color="inverse"
              size="sm"
              round="true"
              icon="true"
            >
              <i className="fa fa-eye" />
            </Button>
          </div>
        )
      };
    });
    return (
      <div>
        <Card>
          <CardTitle className="mb-0 p-3 border-bottom bg-light">
            <i className="mdi mdi-border-right mr-2"></i>Admin
            <Button style={{ float: "right" }} onClick={this.logout}>
              Logout
            </Button>
            <Button
              className="btn"
              style={{ float: "right" }}
              color="primary"
              onClick={this.toggleAdminModal}
            >
              Add User
            </Button>
          </CardTitle>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Email",
                  accessor: "email"
                },
                {
                  Header: "Date Of Birth",
                  accessor: "dob"
                },
                {
                  Header: "Designation",
                  accessor: "designation"
                },
                {
                  Header: "Account status",
                  accessor: "status"
                },
                {
                  Header: "Add ToDo-Task",
                  accessor: "addtask"
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
          isOpen={this.state.adminmodal}
          toggle={this.toggleAdminModal}
          className="login-modal"
        >
          <ModalHeader toggle={this.toggleAdminModal}>Add User</ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <Label for="name">Full Name : </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <Label>Email : </Label>
                <Input
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <Label>Password : </Label>
                <Input
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>

              <div className="form-group">
                <Label for="name">Dob : </Label>
                <Input
                  type="date"
                  name="dob"
                  id="dob"
                  value={this.state.dob}
                  onChange={e => this.setState({ dob: e.target.value })}
                />
              </div>
              <div className="form-group">
                <Label for="name">Designation : </Label>
                <Input
                  type="text"
                  name="designation"
                  id="designation"
                  value={this.state.designation}
                  onChange={e => this.setState({ designation: e.target.value })}
                />
              </div>
              <div className="form-group">
                <Label for="name">Status : </Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={this.state.status}
                  onChange={e => this.setState({ status: e.target.value })}
                >
                  <option value="0"></option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Input>
              </div>
              <div>
                <Button
                  color="primary"
                  onClick={this.toggleAdminModal}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="ml-1"
                  onClick={this.toggleAdminModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="login-modal"
        >
          <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleUpdate}>
              <div className="form-group">
                <Label for="name">Name : </Label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <Label>Email : </Label>
                <input
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <Label for="name">Dob : </Label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={this.state.dob}
                  onChange={e => this.setState({ dob: e.target.value })}
                />
              </div>
              <div className="form-group">
                <Label for="name">Designation : </Label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={this.state.designation}
                  onChange={e => this.setState({ designation: e.target.value })}
                />
              </div>
              <div className="form-group">
                <Label for="name">Status : </Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={this.state.status}
                  onChange={e => this.setState({ status: e.target.value })}
                >
                  <option value="0"></option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Input>
              </div>
              <div>
                <Button color="primary" onClick={this.toggle} type="submit">
                  Update
                </Button>
                <Button
                  color="secondary"
                  className="ml-1"
                  onClick={this.toggle}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.todomodal}
          toggle={this.toggleTodo}
          className="login-modal"
        >
          <ModalHeader toggle={this.toggleTodo}>Add Todo</ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleAddTodo}>
              <div className="form-group">
                <Label for="name">To Do Task : </Label>
                <Input type="textarea" rows="2" name="todo" id="todo" value={this.state.todo} onChange={e => this.setState({ todo: e.target.value })}/>
              </div>
              <div>
                <Button color="primary" onClick={this.toggleTodo} type="submit">
                  Add
                </Button>
                <Button
                  color="secondary"
                  className="ml-1"
                  onClick={this.toggleTodo}
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
    userList: state.users.adminuser,
    message: state.users.Message,
    userById: state.users.Show
  };
};

export default connect(mapStateToProps, {
  show_User,
  delete_user,
  showUserById,
  adminAddUser,
  UpdateUser,
  Add_Todo,
  showTaskById
})(Adminuser);
