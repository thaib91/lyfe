import React from 'react';
import './Toolbar.scss';
import { Link } from 'react-router-dom';
// import Modal from '../../Dashboard/LoginModal';
import DrawerToggle from '../SideDrawer/DrawerToggle';
import LoginModal from '../../Dashboard/LoginModal'






const toolbar = props => (
    <header className='toolbar'>
        <nav className='toolbar_navigation'>
            <div className='toolbar_toggle-button'>
                <DrawerToggle click={props.drawerClickHandler} />
            </div>

            <div className='toolbar_logo'><img style={{height:'50px', width:'45px'}}src="https://lh3.googleusercontent.com/eWTl3nTTr-OiY2wjRGzW3iAKoetOGfbFSWKlUwx4mkNLjmGW1jsTLMUEN8ziLqhtEthrlZalXV_cFw4ImWmRicpwpA-ikok5fIf1-qJ6KbetqLN9Sa43iZh0YSsCUQtdlj5XxDEDcSSB2OmL9K6O4Lpl1QMM_OJzqYfj076jnMuIPROLbE9VVlKBCaNNyiCOJNWcXd6dlLABmC8WgdjZ2WopAZGYmbFEiLo_5S8ttFjg3EL4VW4w4_meNn8zhNBUY01nSQr1gA73fnAWdHP4CFDTomXz3ENObcYMoH9v25YRjMvwQe9yAYnO811gaZIpcGpwIuH0MRcXc9j1N-A-ckU8-rDZHL00uMcXSSohn42ZEGL_vhLsMovdmy8IxKpcpv8mw-xpBOvDiVn6N0gKxxCPQoKZpEH-Ad7aTHNjCaz3Ty2Fx8mK5df57ENfvzG8D3gCuNtmchkQoEtlqsdakyKTMvOBR1d3exbFx7JFwPUHOsxDf1w5JW-wyydABD018ye4O-RNrhdlVXS7pHf83ZRpAVPJqD1loQQsJc5icguNdf4of1GHIOAv42RhFYPfZ7e2GX_0DUuVnTScBjAHo8BgFUVTFeccFXlqp8zXREWL5OmjepqP6OCUg7SjyF5whBmgbybsemgxqNOGcPY7OND2=w222-h272-no" alt='logo'/></div>
            <div className='spacer'></div>
            <div className='toolbar_navigation-items'>

                <ul>
                      <Link to='/accountable'><li>Accountable</li></Link>
                    <Link to='/skillshare'><li>Skillshare</li></Link>
                    {
                        props.toggle ? (
                            <a> <li onClick={() => props.toggle()}>Login</li> </a>
                        ) : (   
                         
                                <a href='http://localhost:4343/auth/logout'>  <li >Logout</li> </a>

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