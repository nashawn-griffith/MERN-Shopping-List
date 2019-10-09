import React, {Component, Fragment} from 'react';
import {ListGroup, ListGroupItem, Button, Spinner} from 'reactstrap';
import {connect} from 'react-redux';
import {getItem, deleteItem} from '../actions/itemActions';

class ShoppingList extends Component {
  removeItem = id => {
    this.props.deleteItem(id);
  };

  async componentDidMount() {
    await this.props.getItem();
  }

  noData = () => {
    return <div>No Items to display</div>;
  };

  loadingData = () => {
    return <Spinner color='dark' type='grow' />;
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

  renderData = () => {
    const {items, loading} = this.props;

    /*loading data*/
    if (loading) {
      return this.loadingData();
    }

    /*display data. loading complete*/
    if (items.length !== 0 && !loading) {
      return this.displayData();
    }

    return this.noData();
  };

  render() {
    const {items, loading} = this.props;

    return (
      <Fragment>
        <ListGroup>{this.renderData()}</ListGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items,
    loading: state.items.loading
  };
};

export default connect(
  mapStateToProps,
  {getItem, deleteItem}
)(ShoppingList);
