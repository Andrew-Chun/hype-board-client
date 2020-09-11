import React from 'react'
import axios from 'axios'
import { Card, CardDeck } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'

class UserShow extends React.Component {
  state = {
    user: null,
    posts: [],
    comments: [],
    deleted: false
  }

  componentDidMount () {
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/posts/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        this.setState({
          posts: response.data
        })
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
      .then(() => {
        this.setState({
          deleted: true
        })
      })
      .catch(() => msgAlert({
        heading: 'Failed to Delete Post',
        message: 'Message Failure',
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    const { match, email } = this.props
    if (this.state.deleted === true) {
      return <Redirect to='/posts' />
    }

    let jsx
    if (this.state.posts === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <CardDeck className="card-deck">
          {this.state.posts.map(post => {
            if (post.owner.id === parseInt(match.params.id)) {
              return (
                <Card key={post.id}>
                  <Card.Body>
                    <Card.Title><Link to={`/posts/${post.id}`}>{post.title}</Link></Card.Title>
                    <Card.Text>
                      {post.body}
                    </Card.Text>
                    <Card.Footer>
                      <p>By: {post.owner.email}</p>
                      <small className="text-muted">Last updated {post.updated_at}</small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              )
            }
          })}
        </CardDeck>
      )
    }

    return (
      <div className="user-show">
        <h2>Posts by: {email}</h2>
        {jsx}
      </div>
    )
  }
}

export default UserShow
