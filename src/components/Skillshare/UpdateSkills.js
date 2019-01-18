import React, { Component } from 'react';

export default class UpdateSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills_posts: this.props.skills_posts,
            years: this.props.years,
            description: this.props.description,
            img: this.props.img,
        }
    }

    handleChange(prop, value) {
        this.setState({
            [prop]: value
        })
    }

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
                <div className='create-skillshare'>
                    <input onChange={(e) => { this.handleChange('skills_posts', e.target.value) }} placeholder='skills-posts' value={this.state.skills_posts} />
                    <input onChange={(e) => { this.handleChange('years', e.target.value) }} placeholder='years' value={this.state.years} />
                    <input onChange={(e) => { this.handleChange('description', e.target.value) }} placeholder='description' value={this.state.description} />
                    <input onChange={(e) => { this.handleChange('img', e.target.value) }} placeholder='img' value={this.state.img} />
                    <button className='post-btn' onClick={() => { this.updateSkillsPosts() }}>Edit Post</button>
                </div>
            </div>
        )
    }
}