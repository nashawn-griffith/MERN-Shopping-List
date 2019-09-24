import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink
} from 'reactstrap';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    message: null
  };

  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    const {name, email, password} = this.state;
    const body = {
      name,
      email,
      password
    };

    this.props.registerUser(body);

    this.toggle();
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Enter User information below
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  placeholder='Enter username'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  placeholder='Enter email'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  placeholder='Enter Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark' block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  {registerUser}
)(RegisterModal);
