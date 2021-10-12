import React, {Component} from 'react';
import { AppBar, Container } from '@material-ui/core';
import List from './View/View';
import './App.css';

class App extends  Component
{
  render()
  {
   
    let defaultData : string="";
    return (
      
     
      <Container maxWidth="lg">
          <AppBar position="static" color="inherit">
            <h1>DAILY BITCOIN PRICES</h1>
          </AppBar>
          <List data={defaultData}/>
        </Container>
    );
  }
}

export default App;
