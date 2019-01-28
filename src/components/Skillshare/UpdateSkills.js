import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class UpdateSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills_posts: this.props.skills_posts,
            years: this.props.years,
            description: this.props.description,
            img: this.props.img,
            open: false
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

    updateSkillsPosts = () => {
        const { updateSkills, id } = this.props;
        const { skills_posts, years, description, img } = this.state;
        // console.log(this.state);
        updateSkills(id, { skills_posts, years, description, img });
        this.setState({
            skills_posts: '',
            years: '',
            description: '',
            img: '',
        })

    }

    render() {
        return (

            <div className='edit-skills-inp'>
            <button onClick={this.toggleModal}>Edit</button>
                <div className='create-skillshare'>


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
                        <Button className='post-btn' onClick={() => { this.updateSkillsPosts() }}>Edit Post</Button>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
                    {/* <input onChange={(e) => { this.handleChange('skills_posts', e.target.value) }} placeholder='skills-posts' value={this.state.skills_posts} />
                    <input onChange={(e) => { this.handleChange('years', e.target.value) }} placeholder='years' value={this.state.years} />
                    <input onChange={(e) => { this.handleChange('description', e.target.value) }} placeholder='description' value={this.state.description} />
                    <input onChange={(e) => { this.handleChange('img', e.target.value) }} placeholder='img' value={this.state.img} /> */}
                    {/* <button className='post-btn' onClick={() => { this.updateSkillsPosts() }}>Edit Post</button> */}
                </div>
            </div>
        )
    }
}