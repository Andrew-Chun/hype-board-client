import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class CommentUpdate extends React.Component {
  state = {
    comment: {
      body: '',
      post_id: ''
    },
    updated: false
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/comments/${id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => this.setState({ comment: response.data }))
      .catch(console.error)
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
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/comments/${id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: {
        comment: {
          body: this.state.comment.body,
          post_id: this.state.comment.post_id
        }
      }
    })
      .then(response => {
        this.setState({
          comment: response.data,
          updated: true
        })
      })
      .then(() => msgAlert({
        heading: 'Comment updated successfully!',
        message: messages.commentsUpdateSuccess,
        variant: 'Success'
      }))
      .catch(console.error)
  }

  render () {
    if (this.state.updated) {
      return <Redirect to={`/posts/${this.state.comment.post_id}`} />
    }

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h1>Update Comment</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="body">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="text" name="body" value={this.state.comment.body} placeholder="Body" onChange={this.handleInputChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default CommentUpdate
