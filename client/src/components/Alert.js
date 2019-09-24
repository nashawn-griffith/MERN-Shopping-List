import React, {Component, Fragment} from 'react';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';

class AlertInfo extends Component {
  Alert = () => {
    const {type, message} = this.props;
    if (message) {
      return <Alert color={`${type}`}>{message}</Alert>;
    }
  };
  render() {
    return <Fragment>{this.Alert()}</Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    message: state.alert.message,
    type: state.alert.type
  };
};

export default connect(mapStateToProps)(AlertInfo);
