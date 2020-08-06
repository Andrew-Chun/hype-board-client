import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class CommentCreate extends React.Component {
  state = {
    comment: {
      body: ''
    }
  }
  handleInputChange = (comment) => {
    const commentKey = comment.target.name
    const value = comment.target.value
    const commentCopy = Object.assign({}, this.state.comment)
    commentCopy[commentKey] = value
    this.setState({ comment: commentCopy })
  }
  handleSubmit = (comment) => {
    comment.preventDefault()
    const { msgAlert, user } = this.props
    axios({
      method: 'POST',
      url: `${apiConfig}/comments/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: {
        user_id: user.id,
        // post_id: ,
        comment: this.state.comment.body
      }

    })
      .then(() => msgAlert({
        heading: 'Comment Success',
        message: messages.commentsCreateSuccess,
        variant: 'Success'
      }))
      .then(res => {
        this.setState({
          comment: {
            body: ''
          }
        })
      })
      .catch(console.error)
  }

  render () {
    return (
      <div className="row comment-create">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h1>Create Comment</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="body">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                required
                type="text"
                name="body"
                value={this.state.comment.body}
                placeholder="Body text"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button className="btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default CommentCreate
