import logo from './logo.svg';
import FetchImage from './components/FetchImage'
import './App.css';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";


const HOME = '/nasaimage';


const ViewContainer = styled.div.attrs({
  className: 'view-container'
})`
  padding: 0% 10%;
  /* max-height: 100vh; */
`;


class App extends Component {
  render () {
    const Views = (
      <Switch>
        <Route exact path={HOME} component={FetchImage}></Route>
      </Switch>
    );
    return (
      <Router>
        <ViewContainer>
          {Views}
        </ViewContainer>
      </Router>
    )

  };
}

export default App;
