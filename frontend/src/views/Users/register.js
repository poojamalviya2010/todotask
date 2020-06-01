import React from "react";
import { Field, reduxForm } from "redux-form";
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
import { sign_up, check_email, reset_message } from "../../redux/users/action";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      password: "",
      dob: "",
      designation: "",
    };
  }

  checkEmail=(e)=>{   
		if(e===""){
		  this.props.reset_message()
		 }else{
		  this.props.check_email(e)
		 }	
    }

  onSubmit = formValues => {
    console.log(formValues);
    this.props.sign_up(formValues);
    alert("user register successfully");
    this.props.history.push("/")
  };

  renderInput = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    id
  }) => {
    return (
      <div>
        <label>{label} </label>
        <input type={type} {...input} className="form-control" />
        {touched &&
          ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-danger">{warning}</span>))}
      </div>
    );
  };

  renderEmailInput=({input, placeholder, label,type, meta: { touched, error, warning }})=>{    
    return(
      <div >
        <input type={type} placeholder={placeholder} {...input} autoComplete="off" className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-danger">{warning}</span>))}
        </div>
    )
  }

  componentWillMount() {
    // this.props.show_User();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="form_div"
        >
          <div className="container">
            <div className="custom_form">
              <div className="form-group">
                <h2>User Registarion Form</h2>
                <p>Please fill in this form to create an account.</p>
                <hr />
                <div className="form-group">
                  <Label>
                    <b>Full Name</b>
                  </Label>
                  <Field
                    type="text"
                    name="full_name"
                    id="full_name"                  
                    component={this.renderInput}                                      
                  />
                </div>                
                <div className="form-group">
                  <Label>
                    <b>Email</b>
                  </Label>
                  <Field
                    name="email"
                    component={this.renderEmailInput}
                    id="email"
                    type="email"
                    onChange={(event) => {this.checkEmail(event.target.value)}}/>
                  <span style={{color:"red"}}>{this.props.message}</span>                  
                </div>
                <div className="form-group">
                  <Label>
                    <b>Password</b>
                  </Label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    component={this.renderInput}
                  />
                </div>
                <div className="form-group">
                  <Label>
                    <b>Dob</b>
                  </Label>
                  <Field
                    type="date"
                    name="dob"
                    id="dob"
                    component={this.renderInput}
                  />
                </div>
                <div className="form-group">
                  <Label>
                    <b>Designation</b>
                  </Label>
                  <Field
                    type="text"
                    name="designation"
                    id="designation"
                    component={this.renderInput}
                  />
                </div>
                <div>
                  <button color="primary" type="submit">
                    Register
                  </button>
                </div>
                <div className="container_signin">
                    <p>Already Register <Link to="/">Login Here</Link></p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.full_name) {
    errors.full_name = "You must enter a full name";
  }
  if (!formValues.email) {
    errors.email = "You must enter a email";
  }
  if (!formValues.password) {
    errors.password = "You must enter a Password";
  }
  if (!formValues.dob) {
    errors.dob= "You must enter a dob";
  }
  if (!formValues.designation) {
    errors.designation = "You must enter a designation";
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    userList: state.users.Data,
    message: state.users.Message
  };
};

const formWrapped = reduxForm({
  form: "registerForm",
  validate
})(Register);

export default connect(mapStateToProps, {
  sign_up,
  check_email,
  reset_message
})(formWrapped);