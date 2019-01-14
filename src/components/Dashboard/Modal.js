import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './Modal.css';
import Toolbar from '../NavBar/Toolbar/Toolbar'

export default class loginModal extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }


    toggleModal = () => {
        this.setState({ open: !this.state.open })
    };

    //try doing the conditional rendering in Toolbar and then run Modal. 
    //Give toolbar state and turn into class component


    render() {
        return (
            <div className="static-modal">

                <button onClick={this.toggleModal}>Open</button>

                {/* <Toolbar
                    clickNow={this.toggleModal}
                /> */}

                <Modal show={this.state.open} onHide={this.toggleModal}>

                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>One fine body...</Modal.Body>

                    <Modal.Footer>
                        <Button>Sign In</Button>
                        <Button bsStyle="primary">Register</Button>
                    </Modal.Footer>



                </Modal>
            </div>
        )
    }
};