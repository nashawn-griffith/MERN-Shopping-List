import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import AlertInfo from './Alert';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  onSubmit = async e => {
    e.preventDefault();
    const {name} = this.state;
    await this.props.addItem(name);
    this.setState({name: ''});

    if (this.props.alert.type === 'success') {
      setTimeout(() => {
        this.toggle();
      }, 2000);
    }
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Add Item
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Enter Item below</ModalHeader>
          <ModalBody>
            <AlertInfo />
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='new-item'>Shopping Item</Label>
                <Input
                  type='text'
                  name='item'
                  id='new-item'
                  placeholder='Enter Item '
                  value={this.state.name}
                  onChange={e => this.setState({name: e.target.value})}
                />
              </FormGroup>
              <Button color='primary' className='mr-3'>
                Submit
              </Button>
              <Button color='secondary' onClick={this.toggle}>
                Close
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    alert: state.alert
  };
};
export default connect(
  mapStateToProps,
  {addItem}
)(ItemModal);
