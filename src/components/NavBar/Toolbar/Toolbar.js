import React from 'react';
import './Toolbar.scss';
import { Link } from 'react-router-dom';
// import Modal from '../../Dashboard/LoginModal';
import DrawerToggle from '../SideDrawer/DrawerToggle';
import LoginModal from '../../Dashboard/LoginModal'
import LiveChat from '../../../Messenger/LiveChat/LiveChat'
require('dotenv').config();






const toolbar = props => (
    <header className='toolbar'>
        <nav className='toolbar_navigation'>
            <div className='toolbar_toggle-button'>
                <DrawerToggle click={props.drawerClickHandler} />
            </div>

            <div className='toolbar_logo'><img style={{height:'47px', width:'55px'}}src="Images/toolbarlogo.png" alt='logo'/></div>
            <div className='spacer'></div>
            <div className='toolbar_navigation-items'>

                <ul className='toolbar-navigation'>
                    {/* <li><i className="far fa-comments fa-2x" onClick={()=>{this.toggleLiveChat()}}></i></li> */}
                      <Link to='/accountable'><li>Accountable</li></Link>
                    <Link to='/skillshare'><li>Skillshare</li></Link>
                    {
                        props.toggle ? (
                            <a> <li onClick={() => props.toggle()}>Login</li> </a>
                        ) : (   
                         
                                <a href={process.env.REACT_APP_LYFE_SERVER_LOGOUT}>  <li >Logout</li> </a>

                            )
                    }

                </ul>
            </div>

        </nav>
        <hr className='line' />
        {/* <Modal /> */}
    </header>
);

export default toolbar;