import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Gikou from './Gikou';

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to ようこそ</p>
  </div>
)

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/gikou'>Gikou</Link></li>
      </ul>
      <Route exact path='/' component={Home} />
      <Route exact path='/gikou' component={Gikou} />
    </div>
  </BrowserRouter>
)

export default App;
