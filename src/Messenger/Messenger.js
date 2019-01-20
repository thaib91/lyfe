import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';


export default class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: {
                recipient: '',
                text: ''
            }
        }
    }

    handleChange(prop, value){
        this.setState({[prop]:value})
    }

     sendText = async() => {

        const {value: text} = await Swal({
            title: 'Send a Text To A LYFER!',
            input: 'textarea',
            inputPlaceholder: 'Motivate A LYFER To Be Accountable! Maybe One Will Motivate You!',
            showConfirmButton: true
          })
          
          if (text) {
            axios.get(`/sms?text=${text}`)
          }

    }





    render() {
        return (
            <div>
                {/* <input className='recipient' onChange={(e)=>{this.handleChange('recipient', e.target.value)}} placeholder='recipient'/>
                <input className='text' onChange={(e)=>{this.handleChange('text', e.target.value)}} placeholder='text'/> */}
                <Button onClick={()=>{this.sendText()}}> Text Message! </Button>
            </div>
        )
    }
}