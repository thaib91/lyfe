import React, { Component } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { getUserData } from '../../../ducks/reducer'


export default class Goal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: props.goalText
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    deleteUserGoals(){
        this.props.deleteGoal(this.props.id)
    }

    render() {
        return (
            <div className='goal-page'>
            <div>
                <button className='delete-goal-btn'
                    onClick={()=>{this.deleteUserGoals()}}>Delete Goal</button>

            </div>

            </div>
        )
    }
}