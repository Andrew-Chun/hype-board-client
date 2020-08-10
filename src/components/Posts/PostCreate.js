import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class PostCreate extends React.Component {
  state = {
    post: {
      title: '',
      body: ''
    },
    created: false
  }

  handleInputChange = (post) => {
    const postKey = post.target.name
    const value = post.target.value
    const postCopy = Object.assign({}, this.state.post)
    postCopy[postKey] = value
    this.setState({ post: postCopy })
  }

  handleSubmit = (post) => {
    post.preventDefault()
    const { msgAlert, user } = this.props
    axios({
      method: 'POST',
      url: `${apiConfig}/posts/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: {
        post: this.state.post
      }

    })
      .then(() => msgAlert({
        heading: 'Post Create Success',
        message: messages.postsCreateSuccess,
        variant: 'Success'
      }))
      .then(res => {
        this.setState({
          post: {
            title: '',
            body: ''
          },
          created: true
        })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.created === true) {
      return <Redirect to={'/posts'}/>
    }
    return (
      <div className="row post-create">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h1>Create Post</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="postName">
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" name="title" value={this.state.post.title} placeholder="Title of Post" onChange={this.handleInputChange}/>
            </Form.Group>
            <Form.Group controlId="place">
              <Form.Label>Body</Form.Label>
              <Form.Control required type="text"name="body" value={this.state.post.body} placeholder="Body text" onChange={this.handleInputChange}/>
            </Form.Group>
            <Button className="btn" variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default PostCreate
