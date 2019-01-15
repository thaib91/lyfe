import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './LoginModal.css';
import Toolbar from '../NavBar/Toolbar/Toolbar'
import axios from 'axios';

export default class LoginModal extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            username: '',
            password: '',
            email: ''
        }
    }

    handleChange = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }


    toggleModal = () => {
        this.setState({ open: !this.state.open })
    };

    async loginUser() {
        const { username, password } = this.state;
        const res = await axios.post('/auth/login', { username, password })   
    }

    async registerUser() {
        const {username, password, email} = this.state;
        const res = await axios.post('/auth/register', {username, password, email})
    }




    //try doing the conditional rendering in Toolbar and then run Modal. 
    //Give toolbar state and turn into class component


    render() {
        return (
            <div className="static-modal">

                <button onClick={this.toggleModal}>Open</button>

                <Modal show={this.state.open} onHide={this.toggleModal}>

                    <Modal.Header>
                        <Modal.Title>Login/Register</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className='username-box'>
                            <span>Username: </span>
                            <input onChange={(e)=>this.handleChange('username', e.target.value)} type='text'/>
                        </p>
                        <p className='email-box'>
                            <span>E-mail: </span>
                            <input onChange={(e)=>this.handleChange('email', e.target.value)} type='text'/>
                        </p>
                        <p className='password-box'>
                            <span>Password: </span>
                            <input onChange={(e)=>this.handleChange('password', e.target.value)} type='text'/>
                        </p>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=>this.loginUser()}>Sign In</Button>
                        <Button onClick={()=>this.registerUser()} bsStyle="primary">Register</Button>
                    </Modal.Footer>



                </Modal>
            </div>
        )
    }
};