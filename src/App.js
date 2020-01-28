import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './shared/Header/Header'
import SimpleForm from './pages/simpleForm/SimpleForm'
import ComplexForm from './pages/complexForm/ComplexForm';

function App() {
  return (
    <>
    <Router>
      <Header />
      <Route path="/simple"><SimpleForm /></Route>
      <Route path="/complex"><ComplexForm /></Route>
      <Route exact path="/"><SimpleForm /></Route>
    </Router>
    </>
  );
}

export default App;
