import React from 'react'
import axios from 'axios'
import { Card, CardDeck } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'

class PostShow extends React.Component {
  state = {
    user: null,
    posts: [],
    comments: [],
    deleted: false
  }

  componentDidMount () {
    const { match, user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/users/${match.params.id}`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        this.setState({
          user: response.data
        })
      })
      .catch(console.error)

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
      .then(response => {
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
    const { match } = this.props
    if (this.state.deleted === true) {
      return <Redirect to='/posts' />
    }

    let jsx
    if (this.state.post === null) {
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
        // <section className="posts">
        //   <h2>{user.email}s posts</h2>
        //   <div className="row">
        //     <div className="col-sm-10 col-md-8 mx-auto mt-5 comment-index">
        //       <ul>
        //         {this.state.posts.map(post => {
        //           console.log(post)
        //           if (post.owner.id === parseInt(match.params.id)) {
        //             return (
        //               <li key={post.id}>
        //                 <Link to={`/posts/${post.id}`}>
        //                   <h4>{post.title}</h4>
        //                 </Link>
        //                 <h4>{post.body}</h4>
        //                 <h4>{post.owner.email}</h4>
        //                 <h6>{post.created_at}</h6>
        //                 <h6>PostID:{post.id}</h6>
        //               </li>
        //             )
        //           }
        //         }
        //         )}
        //       </ul>
        //     </div>
        //   </div>
        // </section>
      )
    }

    return (
      <div className="user-show">
        {jsx}
      </div>
    )
  }
}

export default PostShow
