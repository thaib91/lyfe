import React, { Component } from 'react';
import './LiveChat.scss'
import io from 'socket.io-client';
// import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';


export default class LiveChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: '',
            userTyping: false,

        };
        this.socket = io.connect(":4343");
        this.socket.on('generate general response', data => this.generalResponse(data));
        this.socket.on('generate room response', data => this.roomResponse(data));
        // this.socket.on('user is typing', data => this.setUserTyping(data));
        // this.socket.on('user not typing', data => this.removeUserTyping(data));
    }

    componentDidMount() {
        if (this.props.room) {
            this.socket.emit('join room', { room: this.props.room })
        }
    }

    generalResponse(data) {
        if (!this.props.room) {
            this.setState({ messages: [...this.state.messages, data.message] })
        }
        console.log(data)
    }

    // roomResponse(data) {
    //     this.setState({ messages: [...this.state.messages, data.message] })
    //     console.log(data)
    // }

    // setUserTyping(data) {
    //     if (data.room === this.props.room) {
    //         this.setState({ userTyping: false })
    //     } else if (!data.room && !this.props.room) {
    //         this.setState({ userTyping: true })
    //     }
    // }

    // removeUserTyping(data) {
    //     if (data.room === this.props.room) {
    //         this.setState({ userTyping: false });
    //     } else if (!data.room && !this.props.room) {
    //         this.setState({ userTyping: false })
    //     }
    // }

    sendMessage = (type, message) => {

        if (!this.props.room) {
            this.socket.emit(`${type} message to general`, { message })
        } else {
            this.socket.emit(`${type} message to room`, {
                message,
                room: this.props.room
            });
        }
        this.setState({ message: '' }, () => {
            if (this.state.message) {
                this.socket.emit('user is typing', { room: this.props.room });
            } else {
                this.socket.emit('user not typing', { room: this.props.room });
            }
        });
    }

    updateInput(val) {
        this.setState({ message: val }, () => {
            if (this.state.message) {
                this.socket.emit('user is typing', { room: this.props.room });
            } else {
                this.socket.emit('user not typing', { room: this.props.room });
            }
        })
    }




    render() {
        const messages = this.state.messages.map(message => {
            return (
                <p>{message}</p>
            )
        })
        return (
            <div className='live-chat'>

                <p>
                    {this.props.room ? `Room: ${this.props.room}` : 'Global Lobby'}
                    <hr />
                    <input
                        className='input-chat'
                        type='text'
                        onChange={(e) => this.updateInput(e.target.value)}
                        value={this.state.message}
                    />
                </p>
                <button className='chat-button' onClick={() => { this.sendMessage('blast', this.state.message) }}>Send</button>
                <hr />
                <div className='display-messages'>{messages}</div>
                {/* {this.state.userTyping && (
                    <p className='user-typing'>Another User is Typing</p>
                )} */}

            </div>
        )
    }

}