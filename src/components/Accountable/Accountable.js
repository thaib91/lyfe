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
            user_interests: [],
        }

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
    }

    getInterests = async () => {
        const res = await axios.get(`/api/user/interests/${this.props.user.id}`)
        console.log(res.data)
        this.setState({
            user_interests: res.data.userData.user_interests
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
        const { user_interests } = this.state;
        console.log(user_interests)

        let interests = user_interests.map((interest, i)=>{
            return(
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
                <button onClick={this.getInterests}></button>



            </div>
        );
    };
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(withRouter(Accountable));
