import React, { Component } from 'react';
// import { FacebookProvider, Like } from 'react-facebook';
import { Button } from 'react-bootstrap';

export default class UpdateSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            dislike: false
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    // like will increase each users preference for certain categories. Each like is a +value and that will then be kept track of on the user. 
    // it will mulitply by the users constraints/weights of what he would like the most. 
    //Also attempting to use mindjs


    render() {
        return (
            <div className='like-toggle'>


            </div>
        )
    }
}