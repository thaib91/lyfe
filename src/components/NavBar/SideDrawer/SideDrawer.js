import React from 'react';
import './SideDrawer.scss'
// import route from '../../../route'
import {Link} from 'react-router-dom';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <Link to='/'><li onClick={props.close}>Logout</li></Link>
                <Link to='/accountable'><li onClick={props.close}>Accountable</li></Link>
                <Link to='/skillshare'><li onClick={props.close}>Skillshare</li></Link>
            </ul>
        </nav>
    );
};

export default sideDrawer;
