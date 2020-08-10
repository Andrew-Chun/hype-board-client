import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class CommentUpdate extends React.Component {
  state = {
    comment: null,
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
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    console.log(this.state)
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
        console.log(response)
        this.setState({
          updated: true,
          comment: response.data
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
    // const id = this.props.match.params.id
    if (this.state.updated) {
      console.log(this.state.comment)
      return <Redirect to={`/posts/${this.state.comment.post_id}`} />
    }

    let jsx
    if (this.state.comment === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
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
    return (
      <div className="comment-show">
        <h2>Update Comment</h2>
        {jsx}
      </div>
    )
  }
}

export default CommentUpdate
