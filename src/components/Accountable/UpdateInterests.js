import React, { Component } from 'react';

export default class UpdateInterests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editInput: props.text,

        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    updateInterests() {
        this.props.updateInterest(this.props.id, this.state.editInput)
        this.setState({editInput: ''})
    }

    render() {
        return (
            <div className='edit-interests'>

                <div>
                    <input className='edit-input-box' onChange={(e) => this.handleChange('editInput', e.target.value)} value={this.state.editInput} />
                    <button className='edit-interest-btn' onClick={() => this.updateInterests()}>Edit</button>
                </div>
            </div>
        )
    }
}