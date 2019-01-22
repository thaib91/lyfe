import React, { Component } from 'react';
import Toolbar from './components/NavBar/Toolbar/Toolbar';
import SideDrawer from './components/NavBar/SideDrawer/SideDrawer';
import Backdrop from './components/NavBar/Backdrop/Backdrop';
import route from './route';
import { withRouter } from 'react-router-dom';
import LiveChat from  './Messenger/LiveChat/LiveChat';


// import Modal from './components/Dashboard/Modal';

import './reset.css'
import './App.scss';

class App extends Component {
  state = {
    sideDrawerOpen: false,
    rooms: [],
    room: ''
  }

  newRoom = () => {
    this.setState({
      rooms: [...this.state.rooms, this.state.room],
      room: ''
    })
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

    let rooms=this.state.rooms.map(room => {
      return <LiveChat room={room}/>
    })

    return (
      <div style={{ height: '100vh' }}>

        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} close={this.drawerToggleClickHandler} />
        <LiveChat/>
      {backdrop}
        {route}
        {rooms}
      </div>
    );
  }
}
export default withRouter(App);
