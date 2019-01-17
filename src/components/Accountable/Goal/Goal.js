import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserData } from '../../../ducks/reducer'


export default class Goal extends Component {
    constructor() {
        super();
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    getGoals(){
        this.props.get()
    }

    render() {
        return (
            <div className='goal-page'>

            </div>
        )
    }
}