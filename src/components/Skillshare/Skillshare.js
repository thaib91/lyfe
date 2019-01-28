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

//GridList with Material-UI
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        border: '1px solid black !important',
        //   borderRadius: '50%',
        //   padding: 'vh',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});
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
            if (res.data === 'brain') {
                const res = await axios.get(`/brain`)
                // console.log(res.data)
                this.setState({
                    userSkills: res.data
                })
            } else if (res.data === 'body') {
                const res = await axios.get('/body')
                console.log(res.data)
                this.setState({
                    userSkills: res.data
                })
            } else {
                // const res = await axios.get(`/api/get_skills`)
                // // console.log(res.data);
                // this.setState({ userSkills: res.data })
            }
        }

    }

    render() {
        const { userSkills, mySkills } = this.state;

        let mapSkills = userSkills.map((skill, i) => {
            return (
                <div className='skillshare-map' key={i}>
                    <GridList cellHeight={300} style={{ width: 350 }}>
                        <GridListTile key={skill.img} cols={2} >
                            <img className='skills-img' src={skill.img} alt='skills-images' />
                            <GridListTileBar
                                title={skill.skills_posts}
                            />
                        </GridListTile>
                    </GridList>
                    <p className='skills'> Years Experience: {skill.years}</p>
                    <p className='skills'> Description: {skill.description}</p>
                    <p className='skills'> What I Can Share: {skill.skills_posts} </p>
                    <br />

                    {this.props.user.id === skill.user_id ?
                        (<div className='update-skills'>
                            <button onClick={() => { this.deleteSkills(skill.skills_id) }}>Delete</button>

                            <UpdateSkills
                                updateSkills={this.updateSkills}
                                skills_posts={this.skills_posts}
                                years={this.years}
                                description={this.description}
                                img={this.img}
                                id={skill.skills_id}

                            /> </div>)

                        : null
                    }

                </div>
            )
        })
        return (
            <div className='skillshare-page'>Skillshare
                <div className='buttons' style={{ paddingTop: '10vh' }}>
                    <p className='modal-btn'>
                        <button onClick={this.toggleModal}>Want To Share Your Skill?</button>
                    </p>
                    <p>
                        <Button className='recommendation-button' onClick={() => { this.getRecommendation() }}> What Are You Trying To Learn Or Train For?</Button>
                    </p>
                </div>
                <div className='all-skills'>
                    {mapSkills}
                </div>

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

export default connect(mapStateToProps, { getUserData })(withRouter(withStyles(styles)(Skillshare)));