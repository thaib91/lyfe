import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';
// import Swal from 'sweetalert2';
import './Skillshare.scss'

class Skillshare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills_posts: '',
            years: '',
            description: '',
            img: '',
            userSkills: [],
            mySkills: []
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    async componentDidMount() {
        const res = await axios.get(`/api/get_skills`)
        this.setState({ userSkills: res.data })
        this.getMySkills();
    }

    createSkills = async () => {
        const { skills_posts, years, description, img } = this.state;
        const res = await axios.post(`/api/create_skills`, { skills_posts, years, description, img })

        this.setState({
            skills_posts: res.data.skills_posts,
            years: res.data.years,
            description: res.data.description,
            img: res.data.img,
        })
        this.setState({
            skills_posts: '',
            years: '',
            description: '',
            img: ''
        })
    }

    getMySkills = async () => {
        const res = await axios.get(`/api/get_my_skills`)
        this.setState({
            mySkills: res.data
        })
    }

    deleteSkills = async (id) => {
        const res = await axios.delete(`/api/delete_skills/${id}`);
        this.setState({
            mySkills: res.data
        })
    }

    // getSkills = async () => {
    //     const res = await axios.get(`/api/get_skills`)
    //     this.setState({
    //         userSkills: res.data
    //     })
    // } 

    //************* Try to turn create into a modal */

    render() {
        const { userSkills, mySkills } = this.state;
        let mapMySkills = mySkills.map((mySkill, i) => {
            return (
                <div>
                    {mySkill.skills_posts}
                    {mySkill.description}
                    {mySkill.years}
                    <button onClick={()=>{this.deleteSkills(mySkill.skills_id)}}>Delete</button>
                </div>
            )
        })


        // console.log(userSkills)
        let mapSkills = userSkills.map((skill, i) => {

            return (
                <div className='skillshare-map' key={i}>
                    {skill.skills_posts}
                    {skill.description}
                    {skill.years}
                </div>
            )
        })
        return (
            <div className='skillshare-page'>Skillshare
            {mapSkills}
                <div className='create-skillshare'>
                    <input onChange={(e) => { this.handleChange('skills_posts', e.target.value) }} placeholder='skills-posts' value={this.state.skills_posts} />
                    <input onChange={(e) => { this.handleChange('years', e.target.value) }} placeholder='years' value={this.state.years} />
                    <input onChange={(e) => { this.handleChange('description', e.target.value) }} placeholder='description' value={this.state.description} />
                    <input onChange={(e) => { this.handleChange('img', e.target.value) }} placeholder='img' value={this.state.img} />
                    <button className='post-btn' onClick={() => { this.createSkills() }}>Create Post</button>
                    {mapMySkills}
                </div>

            </div>

        )
    }
}


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(withRouter(Skillshare));