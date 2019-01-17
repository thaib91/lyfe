import React, { Component } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { getUserData } from '../../../ducks/reducer'


export default class Goal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editGoal: props.text
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    deleteUserGoals() {
        this.props.deleteGoal(this.props.id)
    }

    updateGoals() {
        this.props.updateGoals(this.props.id, this.state.editGoal)
        this.setState({ editGoal: '' })
    }


    render() {
        return (
            <div className='goal-page'>
                <div>
                    <button className='delete-goal-btn'
                        onClick={() => { this.deleteUserGoals() }}>Delete Goal</button>

                </div>
                <div>
                    <input className='edit-goal-box' onChange={(e) => this.handleChange('editGoal', e.target.value)} value={this.editGoal} />
                    <button className='edit-goal-btn' onClick={() => this.updateGoals()}>Edit</button>
                </div>

            </div>
        )
    }
}