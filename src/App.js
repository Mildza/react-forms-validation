import React from 'react';
import {Router, Route} from 'react-router-dom';

import { history } from './shared/history';
import Header from './shared/Header/Header'
import SimpleForm from './pages/simpleForm/SimpleForm'
import ComplexForm from './pages/complexForm/ComplexForm';

function App() {
  return (
    <>
    <Router history={history}>
      <Header />
      <Route path="/simple/"><SimpleForm /></Route>
      <Route path="/complex/"><ComplexForm /></Route>
      <Route exact path="/"><SimpleForm /></Route>
    </Router>
    </>
  );
}

export default App;
