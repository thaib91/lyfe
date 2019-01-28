import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateInterests from './UpdateInterests';
import Goal from './Goal/Goal'
import './Accountable.scss'
import Messenger from '../../Messenger/Messenger'
import { ProgressBar, Well } from 'react-bootstrap';

class Accountable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            editInput: '',
            goalInput: '',
            goalEdit: '',
            userInterests: [],
            userGoals: [],
            userFriends: []
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/api/user/data');
            //invoke action creator and passing in logged in users data
            this.props.getUserData(res.data)
        } catch (e) {
            console.log('Error: not logged in', e)
            Swal({
                type: 'error',
                title: 'Oops...',
                text: 'Did you sign up or log in?',
                // footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.value) {
                    this.props.history.push('/landing')
                }
            })
        }
        this.getInterests();
        this.getGoals();
    }
    // generic get to get from all end points
    getGoals = async () => {
        const res = await axios.get(`/api/user/get_goals/`)
        this.setState({
            userGoals: res.data,
            userFriends: res.data
        })
    }
    createGoals = async () => {
        const { goalInput } = this.state;
        const res = await axios.post(`/api/user/goals`, { goalInput });
        this.setState({
            userGoals: res.data,
            goalInput: ''
            // dateInput: ''
        })
    }

    deleteGoals = async (id) => {
        const res = await axios.delete(`/api/user/deleteGoals/${id}`)
        this.setState({
            userGoals: res.data
        })
    }

    updateGoals = async (id, goalEdit) => {
        const { userGoals } = this.state;
        const res = await axios.put(`/api/user/updateGoal/${id}`, { goalEdit })
        this.setState({
            ...userGoals,
            userGoals: res.data,
            goalEdit: ''
        })
    }

    //functions for interests 
    getInterests = async () => {
        const { id } = this.props.user;
        const res = await axios.get(`/api/user/my_interests/${id}`)
        // console.log(res.data)
        this.setState({
            userInterests: res.data
        })

    }
    //create interests using id from sessions which is then updated to redux. 
    createInterests = async () => {
        // const {id} = this.props.user;
        const { userInput, userInterests } = this.state;
        const res = await axios.post(`/api/user/interests/`, { userInput })
        this.setState({
            ...userInterests,
            userInterests: res.data,
            userInput: ''
        })

    }

    deleteInterests = async (id) => {
        const res = await axios.delete(`/api/user/delete/${id}`)
        this.setState({
            userInterests: res.data
        })
    }

    updateInterests = async (id, editInput) => {

        // console.log(id)
        const { userInterests } = this.state;
        const res = await axios.put(`/api/user/update_interests/${id}`, { editInput })
        this.setState({
            ...userInterests,
            userInterests: res.data,
            editInput: ''
        })
    }

    render() {
        const { id, email } = this.props.user;
        const { userInterests, userGoals } = this.state;

        let goals = userGoals.map((goal, i) => {
            return (
                <div className='user-goals' key={i}>
                    <Well><strong>Goals</strong><div>{goal.goal}</div></Well>
                    <Goal
                        updateGoals={this.updateGoals}
                        deleteGoal={this.deleteGoals}
                        id={goal.goal_id}
                        text={this.state.goalEdit}
                    />




                </div>
            )
        })

        let interests = userInterests.map((interest, i) => {
            return (
                <div className='user-interests' key={i}>

                    <Well><strong>Interests:</strong><br/><div>{interest.user_interests}</div></Well>

                    <button id='accountable-buttons' onClick={() => this.deleteInterests(interest.interests_id)}>Delete Interests</button>

                    <UpdateInterests
                        updateInterest={this.updateInterests}
                        text={this.state.editInput}
                        id={interest.interests_id}
                    />

                    <div>

                    </div>
                </div>
            )
        })
        return (
            <div className='accountable-main'>
                <div className='create-buttons'>
                    <div className='create-goal'>
                        {/* <input className='date-input' onChange={(e) => this.handleChange('dateInput', e.target.value)} value={this.state.dateInput} /> */}
                        <input className='goal-input' onChange={(e) => this.handleChange('goalInput', e.target.value)} value={this.state.goalInput} />
                        <button id='accountable-buttons' className='goal-button' onClick={() => this.createGoals()}>Create Goal</button>
                    </div>
                    <div className='create-input'>
                        <input className='create-input-box' onChange={(e) => this.handleChange('userInput', e.target.value)} value={this.state.userInput} />
                        <button id='accountable-buttons' onClick={() => { this.createInterests() }}>Share Interests</button>
                    </div>
                </div>
                <div className='message-btns'>
                    <Messenger />
                </div>
                <ProgressBar active now={45} />
                 <div className='accountable-input'>
                    <input className='goal-input' onChange={(e) => this.handleChange('goalInput', e.target.value)} value={this.state.goalInput} />
                    <button id='accountable-buttons' className='goal-button' onClick={() => this.createGoals()}>Create Goal</button>

                    <input className='create-input-box' onChange={(e) => this.handleChange('userInput', e.target.value)} value={this.state.userInput} />
                    <button id='accountable-buttons' onClick={() => { this.createInterests() }}>Share Interests</button>
                </div>
                <div className='accountable-content' style={{backgroundImage: 'url("https://wallimpex.com/data/out/459/inspirational-background-pictures-8283639.jpg")'}}>
                    {/* <div className='user-display'>
                        <p>Accountable</p>
                        <p>{id}</p>
                        <p>{email}</p>
                    </div> */}
                    <div className='accountable-list'>
                            <div className='interests'>{interests} <br/></div>
                            <div className='goals'>{goals}</div>
                            <hr/>
                            {/* <div className='goals'>{goals}</div> */}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(withRouter(Accountable));
