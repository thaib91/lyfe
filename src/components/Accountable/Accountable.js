import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateInterests from './UpdateInterests';
import Goal from './Goal/Goal'
import './Accountable.scss'


class Accountable extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            editInput: '',
            goalInput:'',
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
        this.getData();
    }
    // generic get to get from all end points
    getData = async () => {
        const res = await axios.get(`/api/user/get_goals/`)
        this.setState({
            userGoals: res.data,
            userFriends: res.data
        })
    }
    createGoals = async () => {
        const {goalInput} = this.state;
        const res = await axios.post(`/api/user/goals`, {goalInput});
        this.setState({
            // ...userGoals,
            userGoals: res.data,
            userInput: ''
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

    // this.state.userInterests[0].interests_id
    render() {
        // console.log(this.props);
        const { id, email, username } = this.props.user;
        const { userInterests, userGoals } = this.state;

        let goals = userGoals.map((goal, i) => {
            console.log(goal)
            return (
                <div key={i}>
                    {goal.goal}
                    {/* <Goal
                        createGoal={this.createGoals}
                        goalText={this.state.userInput}
                        // id={goal.goal_id}
                    /> */}



                </div>
            )
        })

        let interests = userInterests.map((interest, i) => {
            return (
                <div key={i}>
                    {interest.user_interests}
                    <UpdateInterests
                        updateInterest={this.updateInterests}
                        text={this.state.editInput}
                        id={interest.interests_id}
                    />

                    <button onClick={() => this.deleteInterests(interest.interests_id)}>Delete</button>
                    <div>

                    </div>
                </div>
            )
        })
        return (

            
            <div className='accountable-content'>
                <p>Accountable</p>
                <p>{username}</p>
                <p>{id}</p>
                <p>{email}</p>
                <div>
                    <div>{interests}</div>
                    <div>{goals}</div>


                </div >
                <div className='create-buttons'>
                <input className='goal-input' onChange={(e)=>this.handleChange('goalInput', e.target.value)} value={this.state.goalInput}/>
                <button className='goal-button' onClick={()=>this.createGoals()}>Create Goal</button>

                <input className='create-input-box' onChange={(e) => this.handleChange('userInput', e.target.value)} value={this.state.userInput} />
                <button onClick={() => { this.createInterests() }}>Add</button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(withRouter(Accountable));
