import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './Modal.css';

export default class loginModal extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }


    onModalClick = () => {
        this.setState({ open: true })
    };

    onClose = () => {
        this.setState({ open: false })
    };

    render() {
        const { open } = this.state;
        return (
                <div className="static-modal" open={open} onHide={this.onClose}>
                <button onClick={this.onModalClick}>Open</button>
                <Modal show={this.state.open} onHide={this.onClose}>                
                 
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