import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './LoginModal.scss';
// import Toolbar from '../NavBar/Toolbar/Toolbar';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginModal extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
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
        const { email, password } = this.state;
        const res = await axios.post('/auth/login', { email, password })
        // console.log(this)
        if (res.data.loggedIn) {
            this.props.history.push('/accountable')
        }
    }

    async registerUser() {
        const { password, email } = this.state;
        const res = await axios.post('/auth/register', { password, email })
        if (res.data.loggedIn) {
            this.props.history.push('/accountable')
        }
    }




    //try doing the conditional rendering in Toolbar and then run Modal. 
    //Give toolbar state and turn into class component


    render() {
        return (

        <div className='landing-page'>

            <p className="modal-button">
            
            <button onClick={this.toggleModal}>Login/Register</button>
            </p>


            <div className="static-modal">
                <Modal show={this.state.open} onHide={this.toggleModal}>

                    <Modal.Header>
                        <Modal.Title>Login/Register</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <p className='email-box'>
                            <span>E-mail: </span>
                            <input onChange={(e) => this.handleChange('email', e.target.value)} type='text' />
                        </p>
                        <p className='password-box'>
                            <span>Password: </span>
                            <input onChange={(e) => this.handleChange('password', e.target.value)} type='text' />
                        </p>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.loginUser()}>Sign In</Button>
                        <Button onClick={() => this.registerUser()} bsStyle="primary">Register</Button>
                    </Modal.Footer>



                </Modal>
            </div>
        </div>
        )
    }
};

export default withRouter(LoginModal);