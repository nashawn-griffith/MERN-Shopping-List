import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import {getItem} from '../actions/itemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  addItem = () => {
    const {name} = this.state;
    if (name.trim().length > 0) {
      this.props.addItem(name);
      this.setState({name: ''});
    }
  };

  render() {
    return (
      <div>
        <Button className='mb-4' color='dark' onClick={this.toggle}>
          Click to add item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Enter Item below</ModalHeader>
          <ModalBody>
            <input
              type='text'
              name='item'
              value={this.state.name}
              onChange={e => this.setState({name: e.target.value})}
            />
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={this.addItem}>
              Submit
            </Button>
            <Button color='secondary' onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  {addItem, getItem}
)(ItemModal);
