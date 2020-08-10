import React from 'react'
import axios from 'axios'
import { Card, CardDeck } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'

class PostIndex extends React.Component {
  state = {
    posts: null
  }

  componentDidMount () {
    const { setPosts, user } = this.props
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
        setPosts(response.data)
      })
      .catch(console.error)
  }

  render () {
    let jsx
    if (this.state.posts === null) {
      jsx = <p>Loading...</p>
    } else if (this.state.posts.length === 0) {
      jsx = <p>No posts, please add a post</p>
    } else {
      jsx = (
        <CardDeck className="card-deck">
          {this.state.posts.map(post => {
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
          })}
        </CardDeck>
      )
    }

    return (
      <div className="post-index">
        <h2>All Posts</h2>
        {jsx}
      </div>
    )
  }
}

export default PostIndex
