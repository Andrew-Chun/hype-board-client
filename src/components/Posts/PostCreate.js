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
          <h2>Create a post</h2>
          <Form className="create-post" onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" name="title" value={this.state.post.title} onChange={this.handleInputChange} placeholder="Title of Post" />
              <Form.Text muted>
                Ex. My puppy did the coolest thing this morning!
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Label>Description</Form.Label>
              <Form.Control required as="textarea" rows="3" type="text" name="body" value={this.state.post.body} onChange={this.handleInputChange} placeholder="Tell us about it." />
              <Form.Text muted>
                Max 300 characters.
              </Form.Text>
            </Form.Group>
            <Button className="btn" variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default PostCreate
