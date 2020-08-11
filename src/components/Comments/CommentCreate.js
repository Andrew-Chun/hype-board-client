import React from 'react'
import axios from 'axios'
import apiConfig from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

class CommentCreate extends React.Component {
  state = {
    comment: {
      body: ''
    },
    commeneted: false
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
    const { msgAlert, match, user } = this.props
    axios({
      method: 'POST',
      url: `${apiConfig}/comments/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: {
        comment: {
          body: this.state.comment.body,
          owner_id: user.id,
          post_id: match.params.id
        }
      }

    })
      .then(() => msgAlert({
        heading: 'Comment Success',
        message: messages.commentCreateSuccess,
        variant: 'Success'
      }))
      .then(() => {
        this.setState({
          comment: {
            body: ''
          }
        })
      })
      .then(() => {
        this.setState({
          commented: true
        })
      })
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id
    if (this.state.commented === true) {
      return <Redirect to={`/posts/${id}`} />
    }

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
