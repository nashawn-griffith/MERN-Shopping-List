import React, {Component} from 'react';
import './App.css';
import {Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Landing from './components/Landing';
import ShoppingList from './components/ShoppingList';
import {connect} from 'react-redux';
import {loadUser} from './actions/authActions';

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Container>
        <Router>
          <AppNavbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/items' component={ShoppingList} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default connect(
  null,
  {loadUser}
)(App);
