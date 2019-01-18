import React, { Component } from 'react';
import axios from 'axios';

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

    sendText = () => {
        const {text, recipient} = this.state;
        axios.get(`/sms?recipient=${recipient}&text=${text}`)
    }


    render() {
        return (
            <div>
                <input className='recipient' onChange={(e)=>{this.handleChange('recipient', e.target.value)}} placeholder='recipient'/>
                <input className='text' onChange={(e)=>{this.handleChange('text', e.target.value)}} placeholder='text'/>
                <button onClick={()=>{this.sendText()}}> Text Message! </button>
            </div>
        )
    }
}