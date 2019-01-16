import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';



class Accountable extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
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
        const {userInput, userInterests} = this.state;
        const res = await axios.post('/api/user/interests/', {userInput})
        console.log(res.data)
        this.setState({
            ...userInterests,
            userInterests: res.data,
            userInput: ''
        })

    }


    // componentDidMount(){
    //     axios.get('/api/user/data').then((res) => {
    //         this.props.getUserData(res.data)
    //     }).catch((e)=>{
    //         if(e.value)
    //         this.props.history.push('/landing')
    //     })
    // }


    render() {
        // console.log(this.props);
        const { id, email, username } = this.props.user;
        const { userInterests } = this.state;
        console.log(userInterests)

        let interests = userInterests.map((interest, i) => {
            return (
                <div key={i}>{interest.user_interests}</div>
            )
        })


        return (
            <div>
                <p>Accountable</p>
                <p>{username}</p>
                <p>{id}</p>
                <p>{email}</p>
                <div>{interests}</div>
                <input onChange={(e)=>this.handleChange('userInput', e.target.value)} value={this.state.userInput}/>
                <button onClick={()=>{this.createInterests()}}>Add</button>
            </div>
            );
        };
    };
    
    const mapStateToProps = (reduxState) => reduxState;
    
export default connect(mapStateToProps, {getUserData})(withRouter(Accountable));
