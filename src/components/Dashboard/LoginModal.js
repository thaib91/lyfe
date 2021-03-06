import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './LoginModal.scss';
import Toolbar from '../NavBar/Toolbar/Toolbar';
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
         <Toolbar 
                toggle={this.toggleModal}
            />
            {/* <div className="modal-button"> */}
            
            {/* <button className='login-button' onClick={this.toggleModal}>Login/Register</button> */}
            {/* </div> */}
   

            <div className="static-modal">
                <Modal show={this.state.open} onHide={this.toggleModal}>

                    <Modal.Header>
                        <Modal.Title>Login/Register</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <div className='email-box'>
                            <span>E-mail: </span>
                            <input onChange={(e) => this.handleChange('email', e.target.value)} type='text' />
                        </div>
                        <div className='password-box'>
                            <span>Password: </span>
                            <input onChange={(e) => this.handleChange('password', e.target.value)} type='password' />
                        </div>

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