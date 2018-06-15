import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, withRouter } from 'react-router-dom'
import Gikou from './Gikou';
import Footer from './components/Footer';

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to ようこそ</p>
  </div>
)

const Site = ({children}) => (
  <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
    {children}
  </div>
)

const Content = ({children}) => (
  <div style={{flex: 1}}>{children}</div>
)

const Routes = withRouter(({history}) => {

  const handleClickFooter = val => history.push(val);

  return (
    <Site>
      <Content>
          <Route exact path='/' component={Home} />
          <Route exact path='/gikou' component={Gikou} />
      </Content>
      <Footer onClick={handleClickFooter}/>
    </Site>
  )

})

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)

export default App;
