import React, {Component, Fragment} from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getItem, deleteItem} from '../actions/itemActions';

class ShoppingList extends Component {
  removeItem = id => {
    this.props.deleteItem(id);
  };

  componentDidMount() {
    this.props.getItem();
  }

  noData = () => {
    return <div>No Items to display</div>;
  };

  displayData = () => {
    const {items} = this.props;

    return items.map(({_id, name}) => {
      return (
        <ListGroupItem key={_id}>
          {name}
          <Button
            color='danger'
            className='danger-button'
            onClick={e => this.removeItem(_id)}
          >
            &#967;
          </Button>
        </ListGroupItem>
      );
    });
  };

  render() {
    const {items} = this.props;
    return (
      <Fragment>
        <ListGroup>
          {items.length !== 0 ? this.displayData() : this.noData()}
        </ListGroup>
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
