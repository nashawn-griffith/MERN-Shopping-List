import React from 'react';
import './App.css';
import {Container} from 'reactstrap';
import AppNavbar from './components/Navbar';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <Container>
      <AppNavbar />
      <ShoppingList />
    </Container>
  );
}

export default App;
