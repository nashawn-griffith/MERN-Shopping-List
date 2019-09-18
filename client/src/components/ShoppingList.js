import React, {Component, Fragment} from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getItem, deleteItem} from '../actions/itemActions';
import ItemModal from './ItemModal';
import uuid from 'uuid';

class ShoppingList extends Component {
  removeItem = id => {
    console.log('remove item', id);
    this.props.deleteItem(id);
  };

  componentDidMount() {
    this.props.getItem();
  }

  displayData = () => {
    const {items} = this.props;
    if (items.length === 0) {
      return <div>No Items to display</div>;
    }

    //get items to display to the screen
    return items.map(({_id, name}) => {
      return (
        <ListGroupItem key={uuid()}>
          {name}
          <Button
            color='danger'
            className='danger-button'
            //onClick={this.removeItem.bind(this, _id)}
            onClick={e => this.removeItem(_id)}
          >
            &#967;
          </Button>
        </ListGroupItem>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <ItemModal />
        <ListGroup> {this.displayData()}</ListGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items
  };
};

export default connect(
  mapStateToProps,
  {getItem, deleteItem}
)(ShoppingList);
