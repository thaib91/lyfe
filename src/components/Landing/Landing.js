import React from 'react';
import LoginModal from '../Dashboard/LoginModal'
import './Landing.scss'
import { Jumbotron, Button, PageHeader } from 'react-bootstrap';

const Landing = props => (
    <div className='landing-main'>
    {/* <img src='https://i2.wp.com/ptech-llc.com/wp-content/uploads/2016/07/landing-background-1.jpg?ssl=1' /> */}
       <PageHeader className='landing-header'>
         Take Control Of <br/> Your LYFE <br/> With Help <br/> From A Friend Or Two
       </PageHeader>
       <img classname='rocket-ship' src='https://thumbs.gfycat.com/MajorWhoppingGalapagosmockingbird-max-1mb.gif'/>
        <p className='login-modal'> <LoginModal /> </p>
    </div>
)

export default Landing;