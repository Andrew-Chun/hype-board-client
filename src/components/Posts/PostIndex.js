import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiConfig from '../../apiConfig'

class PostIndex extends React.Component {
  state = {
    posts: null
  }

  componentDidMount () {
    const { setPosts, user } = this.props
    console.log(user)
    axios({
      method: 'GET',
      url: `${apiConfig}/posts/`,
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
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5 post-index">
            <ul>
              {this.state.posts.map(post => {
                return (
                  <li key={post.id}>
                    <h4><Link to={`/posts/${post.id}`}>{post.title}</Link></h4>
                    <h4>{post.body}</h4>
                    <h4>{post.created_at}</h4>
                    <h4>{post.updated_at}</h4>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
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
