import React from 'react';

import './Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const toolbar = props => (
    <header className='toolbar'>
        <nav className='toolbar_navigation'>
            <div className='toolbar_toggle-button'>
                <DrawerToggle click={props.drawerClickHandler}/>
            </div>
            <div className='toolbar_logo'><a href='/'>The Logo</a></div>
            <div className='spacer'></div>
            <div className='toolbar_navigation-items'>
                <ul>
                    <li><a href='/'>Menu Button 1</a></li>
                    <li><a href='/'>Menu Button 2</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;