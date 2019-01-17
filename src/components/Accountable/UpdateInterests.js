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
        this.props.update(this.props.id, this.state.editInput)
    }

    render() {
        return (
            <div className='edit-interests'>

                <input className='edit-input-box' onChange={(e) => this.handleChange('editInput', e.target.value)} value={this.state.editInput} />
                <div>
                    <button onClick={() => this.updateInterests()}>Edit</button>
                </div>
            </div>
        )
    }
}