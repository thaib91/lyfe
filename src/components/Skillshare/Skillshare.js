import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Skillshare.scss'
import UpdateSkills from './UpdateSkills';
// import RecommendLanding from './RecommendLanding'
import { Modal, Button } from 'react-bootstrap';
import LikeToggle from './LikeToggle';

// import LoginModal from '../Dashboard/LoginModal'

class Skillshare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills_posts: '',
            years: '',
            description: '',
            img: '',
            userSkills: [],
            mySkills: [],
            open: false,
            text: ''
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

    toggleModal = () => {
        this.setState({ open: !this.state.open })
    };

    async componentDidMount() {
        const res = await axios.get(`/api/get_skills`)
        // console.log(res.data);
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
        this.getMySkills();
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

    updateSkills = async (id, body) => {
        const res = await axios.put(`/api/update_skills/${id}`, { body })
        this.setState({
            skills_posts: res.data.skills_posts,
            years: res.data.years,
            description: res.data.description,
            img: res.data.img,
        })
        this.getMySkills();

    }

    getRecommendation = async () => {

        const { value: text } = await Swal({
            title: 'What is it?',
            input: 'textarea',
            inputPlaceholder: 'Ex. I want to learn how to code!',
            showConfirmButton: true
        })
        if (text) {
          const res = await axios.get(`/recommend?text=${text}`)
            console.log(res.data)
            if(res.data == 'brain'){
                const res = await axios.get(`/brain`)
                // console.log(res.data)
                this.setState({
                    userSkills: res.data
                })
            }else if(res.data == 'body'){
                const res = await axios.get('/body')
                console.log(res.data)
                this.setState({
                    userSkills:res.data
                })
            }else{
                // const res = await axios.get(`/api/get_skills`)
                // // console.log(res.data);
                // this.setState({ userSkills: res.data })
            }
        }

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
                <div key={i}>

                    <div className='update_skills'>

                        {mySkill.skills_posts}
                        {mySkill.description}
                        {mySkill.years}
                        <button onClick={() => { this.deleteSkills(mySkill.skills_id) }}>Delete</button>

                        <UpdateSkills
                            updateSkills={this.updateSkills}
                            skills_posts={this.skills_posts}
                            years={this.years}
                            description={this.description}
                            img={this.img}
                            id={mySkill.skills_id}
                        />

                    </div>
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
                    <LikeToggle />
                </div>
            )
        })
        return (
            <div className='skillshare-page'>Skillshare
            {mapSkills}
                {mapMySkills}


                <p className='modal-btn'>
                    <button onClick={this.toggleModal}>Want To Share Your Skill?</button>
                </p>
                <p>
                    <Button onClick={() => { this.getRecommendation() }}> What Are You Trying To Learn Or Train For?</Button>
                    {/* <LoginModal/> */}
                </p>

                <Modal
                    {...this.props}
                    show={this.state.open}
                    onHide={this.toggleModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            Create A New Skill To Share!
                         </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='create-skillshare'>
                            <input onChange={(e) => { this.handleChange('skills_posts', e.target.value) }} placeholder='skills-posts' value={this.state.skills_posts} />
                            <input onChange={(e) => { this.handleChange('years', e.target.value) }} placeholder='years' value={this.state.years} />
                            <input onChange={(e) => { this.handleChange('description', e.target.value) }} placeholder='description' value={this.state.description} />
                            <input onChange={(e) => { this.handleChange('img', e.target.value) }} placeholder='img' value={this.state.img} />
                            {/* <button className='post-btn' onClick={() => { this.createSkills() }}>Create Post</button> */}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='post-btn' onClick={() => { this.createSkills() }}>Create New Post</Button>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }
}


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(withRouter(Skillshare));