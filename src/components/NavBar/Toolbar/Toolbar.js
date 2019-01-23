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

            <div className='toolbar_logo'><img style={{height:'40px', width:'65px'}}src="https://lh3.googleusercontent.com/FJDJ-NzGIU5lpPW6SOWumpFpKKRplIbGCibzV8-dKT7PA5z2ngR5oWjJ-2xvaYKG7yDmiPuchb_PgaLYEK4thDdqBb0wsLe8tSD1dFrHNvVoL6Vx9MoufSj3cIEfdIGY2YieOM-LhmzATkStNZjOUkFG58idPaI4KXwQrXqMwXx7YsPJ-lsauQFaVuU59IV2qgpthMaz3OLtZgen1EtexyJadVGsBLQCS-pewaZx1PVI71ZYU8ilH4X6Q_5rwsl7GTvPOt1yVqNJEENH-pKgIGbmhubYwkuYIKTROw6Q9qIVuwnaM5FHXL6uIr32bljTN04FZqROQFOAV1DzQhN5JHSpFKxyZFEiJ7lsRbPPDz15JLc3K8u9uMUrkB1ActFKRV3oMD3bY5l4Rj2HfrVfUXT73O1GdJYjmdoVPJQjyZT1yyO5iwJLB_D7_N3vP7wyzKEZiy7YmbnuJJkZHKMozKaHpO8TV2m7Dc-w45Pwiih-ieUc66FGcXm6KsPgDOlk0yeswCUX29SjfqGjXdeyXfHEpxHzqo_JSDSBuzOrkCZ0TXrKSlZBdiwILI3CF5iOJydv6RMHGC_lHsNCFl1MNPZg3jxdF8GkosImGHcwCRg1nFxcn70AGu6LV04DGAKMkjX-JxekUEGeEJyMOW8mkxgq=w660-h338-no" alt='logo'/></div>
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