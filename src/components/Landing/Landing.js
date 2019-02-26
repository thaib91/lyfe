import React from 'react';
import LoginModal from '../Dashboard/LoginModal'
import './Landing.scss'
import { Button, Popover, Modal } from 'react-bootstrap';

const Landing = props => (
    <div>
        <p className='login-modal'> <LoginModal /> </p>
        <div className='walk-background'/>
        <div className='landing-main'>

            <img className='main-logo' src="Images/bears.gif" />

            <Popover
                id="popover-basic"
                title="We Can Show You The BARE Necessities of LYFE"
            >
                <h1 className='main-text'>Join a growing community of learners and teachers in sharing their own knowledge at Lyfe!</h1>
            </Popover>


        </div>
    </div>
)

export default Landing;