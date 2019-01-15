import React, { Component } from 'react';
import Toolbar from './components/NavBar/Toolbar/Toolbar';
import SideDrawer from './components/NavBar/SideDrawer/SideDrawer';
import Backdrop from './components/NavBar/Backdrop/Backdrop';
import route from './route';
import { withRouter } from 'react-router-dom';
// import Modal from './components/Dashboard/Modal';

import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  }


  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  }

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div style={{ height: '100%' }}>

        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} close={this.drawerToggleClickHandler} />;
      {backdrop}

        <main style={{ marginTop: '55px' }}>
          <p>This is the landing page content</p>

        </main>
        {route}
      </div>
    );
  }
}
export default withRouter(App);
