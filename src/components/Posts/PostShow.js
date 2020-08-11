import React from 'react'
import axios from 'axios'
import { Card, ListGroup } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class PostShow extends React.Component {
  state = {
    post: null,
    postId: this.props.match.params.id,
    comments: [],
    deleted: false
  }

  componentDidMount () {
    const { setComments, user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/posts/${this.state.postId}`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        this.setState({
          post: response.data
        })
      })
      .catch(console.error)

    axios({
      method: 'GET',
      url: `${apiUrl}/comments/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        this.setState({
          comments: response.data
        })
        setComments(response.data)
      })
      .catch(console.error)
  }

  deletePost = () => {
    const { msgAlert, user } = this.props
    axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${this.state.postId}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Post Deleted Successfully',
        message: 'Message Success',
        variant: 'Success'
      }))
      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(() => msgAlert({
        heading: 'Failed to Delete Post',
        message: messages.postsDeleteFailure,
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    if (this.state.deleted === true) {
      return <Redirect to='/posts' />
    }

    let jsx
    if (this.state.post === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <Card style={{ width: '50vw' }}>
          <Card.Body>
            <Card.Title>{this.state.post.title}</Card.Title>
            <Card.Text>
              {this.state.post.body}
            </Card.Text>
            <Card.Footer>
              <p>By: {this.state.post.owner.email}</p>
              <small className="text-muted">Last updated {this.state.post.updated_at}</small>
            </Card.Footer>
            <Card.Link href={`#/posts/${this.state.postId}/update`}>Update Post</Card.Link>
            <Card.Link href={`#/posts/${this.state.postId}/comments`}>Add a Comment</Card.Link>
            <Card.Link href='#/posts' onClick={this.deletePost}>Delete Post</Card.Link>
          </Card.Body>
        </Card>
      )
    }

    let jsx2
    if (this.state.comments.findIndex((comment) => comment.post_id === parseInt(this.state.postId)) === -1) {
      jsx2 = <h3>No Comments</h3>
    } else {
      jsx2 = (
        <Card style={{ width: '50vw' }}>
          <Card.Header>Comments</Card.Header>
          <ListGroup variant="flush">
            {this.state.comments.map(comment => {
              if (comment.post_id === parseInt(this.state.postId)) {
                return (
                  <ListGroup.Item key={comment.id}>
                    <Link to={`/posts/${this.state.postId}/comments/${comment.id}`}>
                      <h4>{comment.body}</h4>
                    </Link>
                    <p>By: {comment.owner.email}</p>
                    <small className="text-muted">Updated at: {comment.updated_at}</small>
                  </ListGroup.Item>
                )
              }
            })}
          </ListGroup>
        </Card>
      )
    }

    return (
      <div className="post-show">
        {jsx}
        {jsx2}
      </div>
    )
  }
}

export default PostShow
