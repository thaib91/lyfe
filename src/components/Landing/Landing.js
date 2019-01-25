import React from 'react';
import LoginModal from '../Dashboard/LoginModal'
import './Landing.scss'
import { Button, Popover, Modal } from 'react-bootstrap';

const Landing = props => (
    <div className='landing-main'>
        {/* <img src='https://i2.wp.com/ptech-llc.com/wp-content/uploads/2016/07/landing-background-1.jpg?ssl=1' /> */}
        {/* <PageHeader className='landing-header'>
            Take Control Of Your LYFE
       </PageHeader> */}

        <img className='main-logo' src="https://lh3.googleusercontent.com/44FhPqrVh-DDFLK2ib62WslQp51yBLEofyAYlCUY7l1fracl1o9JjuRWHILLvn8N48wELxlnU5ErnQNUZM_GWfYS4zllBs4U6rtunvD-u1ZpDrXIif37cEnYsj4OOms8_-UfhbQDXhEkaCtjSH5kVj5maDkkUbBSF7qxoyDhY4p_mZ6UHGTCWtgnLfhomowE2fRfNI_TfsojK5yhhM6ucrcM3jlSC7kilhnOQA6qBX9YseCNakzLHBdCqkSdY8fPwzboSIci_UH7WS6TLTBCSv57USOnscVtmioiC4dL151V7aYzaL0f2ARd-1A-I5J868X1VciRxWSudXfsdiV6J9o1ocsHcpglSb2wcE5_cWFjVO62pV7G9snuCbwIpgzOo3-VaW8opD7jY2tv40J_Aiyp68sfSqkZQRZKSFugpwaLZfMPPc8ZMCimV4TUqvlTqAY73WNxMeFDg7avy_VZwdakJFOhA8uChsZ8I8bwMLsuwUB4aNGIF-_VbcVqBBPHFusVE2-r4Z98yUS3PN9hN7QnUibVXa2tI9msLETXjgZ1vqB4q2H1b6igxy_PX_Q46V2WVIYrpARcU6e3-64FOkWWia17TfPWTwPkakQOXkcUIamROdyNat90DU1CTSjdASC_IYSwT2KrIcLaf7QgcI0x=w771-h578-no" />
        {/* <img className='rocket-ship' src='https://thumbs.gfycat.com/MajorWhoppingGalapagosmockingbird-max-1mb.gif' /> */}
        <p className='login-modal'> <LoginModal /> </p>
        {/* <div className='popover'> */}
        <Popover
            id="popover-basic"
            // placement="right"
            // positionLeft={200}
            // positionTop={50}
            title="We Can Show You The BARE Necessities of LYFE"
        >
            Join a growing community of learners and teachers in sharing their own knowledge at Lyfe!
            </Popover>

{/*         
            <Modal.Dialog className='static-modal'>
                <Modal.Header>
                    <Modal.Title>
                        Come Join Team LYFE!
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>One fine body...</Modal.Body>

                <Modal.Footer>
                    <Button>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog> */}
  
        {/* </div>; */}
    </div>
)

export default Landing;