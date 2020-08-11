import React from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class CommentShow extends React.Component {
  state = {
    comment: null
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/comments/${id}`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        this.setState({
          comment: response.data
        })
      })
      .catch(console.error)
  }

  deleteComment = () => {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Comment Deleted Successfully',
        message: 'Message Success',
        variant: 'Success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed to Delete Comment',
        message: messages.commentDeleteFailure,
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id
    let jsx
    if (this.state.comment === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <Card style={{ width: '50vw' }}>
          <Card.Body>
            <Card.Title>{this.state.comment.title}</Card.Title>
            <Card.Text>
              {this.state.comment.body}
            </Card.Text>
            <Card.Footer>
              <p>By: {this.state.comment.owner.email}</p>
              <small className="text-muted">Last updated {this.state.comment.updated_at}</small>
            </Card.Footer>
            <Card.Link href={`#/posts/${this.state.comment.post_id}/comments/${id}/update`}>Update Comment</Card.Link>
            <Card.Link href={`#/posts/${this.state.comment.post_id}`} onClick={this.deleteComment}>Delete Comment</Card.Link>
          </Card.Body>
        </Card>
      )
    }
    return (
      <div className="comment-show">
        <h2>Comment</h2>
        {jsx}
      </div>
    )
  }
}

export default CommentShow
