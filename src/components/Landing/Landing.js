import React from 'react';
import LoginModal from '../Dashboard/LoginModal'
import './Landing.scss'

const Landing = props => (
    <div className='landing-main'>
    <img src='https://i2.wp.com/ptech-llc.com/wp-content/uploads/2016/07/landing-background-1.jpg?ssl=1'/>
       <p className='login-modal'> <LoginModal/> </p>
    </div>
)

export default Landing;