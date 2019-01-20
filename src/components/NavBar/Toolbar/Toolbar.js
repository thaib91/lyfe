import React from 'react';
import './Toolbar.scss';
import { Link } from 'react-router-dom';
// import Modal from '../../Dashboard/LoginModal';
import DrawerToggle from '../SideDrawer/DrawerToggle';
// import LoginModal from '../../Dashboard/Modal'






const toolbar = props => (
    <header className='toolbar'>
        <nav className='toolbar_navigation'>
            <div className='toolbar_toggle-button'>
                <DrawerToggle click={props.drawerClickHandler} />
            </div>
            <div className='toolbar_logo'><a href='/'>The Logo</a></div>
            <div className='spacer'></div>
            <div className='toolbar_navigation-items'>

                <ul>
                    <a href='http://localhost:4343/auth/logout'><li>Logout</li></a>
                    <Link to='/accountable'><li>Accountable</li></Link>
                    <Link to='/skillshare'><li>Skillshare</li></Link>
                </ul>
            </div>

        </nav>
        <hr className='line' />
        {/* <Modal /> */}
    </header>
);

export default toolbar;