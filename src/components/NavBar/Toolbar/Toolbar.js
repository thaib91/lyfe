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

            <div className='toolbar_logo'><img style={{height:'50px', width:'55px'}}src="https://lh3.googleusercontent.com/63QFWXIt5a1Mu7AMeC08LCLy5MrwnzcPqSXOBNwVqtITvM6nBzMbp-tFk50II3zNpJe58ACdpWkRE46I29W1Evj59TNEYW86tNYVfJoQ-w7E8-TKtrXnFaKLXlJUe-49YRIhlbOGca3cbnHm_TGkhK7cr4iKS_MNoBAW-CMFx0SjftXEQzf1q8Doz8IeUP0UMog4r3PHqbhO7mQfuN-5l-oeSv1m1AfROEPI5OaIXUZWjSsb_z4Hmx_QCiF-AR36HS7OkBWYN-IdUcYb8VlIyE4oUBdOAUTx6a2hPTLfu_O1vlG2PcZ_aJ6OSPTVJ1TNQgj_n3aJGDa4Cn4VWahlaJpJeyJ_ZKNCSbxt1ML3KjMyG3xGw_yEU5P2sf8_UT5AwAueJEOoCDUmgXrYKvKY1R4CcbkYMmoxOMT-4gK_ybYv70WpMIZtvAXLqnW2SfmEGCcVm8j0xQhy5TfZZILSAYU1q9DUKn-PQDH1y8wbjdo--g7mTW8yRc4-fXxrK_JMf6KxC2KMRbb9OndetTjQk9BqiGMMmaY21YlR_Rl4oEA54nNRCwEEHY0GQX2LG9cZhlkbxhKCSh8qCus4FbmexZ8037xiEAcmh1Qe5lL5UwJRfqM2XonmsGVDZSc6zoXcl24k-SP2rzSl_fK4SF1JE24P=w336-h368-no" alt='logo'/></div>
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