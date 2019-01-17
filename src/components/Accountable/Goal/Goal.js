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

    createGoals() {
        this.props.createGoal(this.state.userInput)
        this.setState({ userInput: '' })
    }

    render() {
        return (
            <div className='goal-page'>


            </div>
        )
    }
}