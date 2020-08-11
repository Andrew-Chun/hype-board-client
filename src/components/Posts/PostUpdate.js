import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class PostUpdate extends React.Component {
  state = {
    post: {
      title: '',
      body: ''
    },
    updated: false
  }
  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/posts/${id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => this.setState({ post: response.data }))
      .catch(console.error)
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
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: {
        post: this.state.post
      }
    })
      .then(response => {
        this.setState({
          updated: true,
          post: response.data
        })
      })
      .then(() => msgAlert({
        heading: 'Post updated successfully!',
        message: messages.postsUpdateSuccess,
        variant: 'Success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed to Update Post',
        message: messages.postsUpdateFailure,
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id

    if (this.state.updated) {
      return <Redirect to={`/posts/${id}`} />
    }

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h1>Update Post</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={this.state.post.title} placeholder="Title" onChange={this.handleInputChange}/>
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control type="text" name="body" value={this.state.post.body} placeholder="Body" onChange={this.handleInputChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default PostUpdate
