import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class PostCreate extends React.Component {
  state = {
    post: {
      title: '',
      body: ''
    }
  }
  handleInputChange = (post) => {
    // get the post key from the input name field
    const postKey = post.target.name
    // get the input value that the user typed in
    const value = post.target.value
    // make a copy of the current state
    const postCopy = Object.assign({}, this.state.post)
    // update the copy with the new user input
    postCopy[postKey] = value
    // update the state with our updated copy
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
          }
        })
      })
      .catch(console.error)
  }

  render () {
    return (
      <div className="row post-create">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h1>Create Post</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="postName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={this.state.post.title}
                placeholder="Title of Post"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="place">
              <Form.Label>Body</Form.Label>
              <Form.Control
                required
                type="text"
                name="body"
                value={this.state.post.body}
                placeholder="Body text"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button
              className="btn"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default PostCreate
