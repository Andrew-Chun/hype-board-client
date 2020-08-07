import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'

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
        message: 'Message Failure',
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    // const postId = this.props.match.id
    if (this.state.deleted === true) {
      return <Redirect to='/posts' />
    }

    let jsx
    if (this.state.post === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <div className="row post-show">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <section className="post-details">
              <h3>{this.state.post.title}</h3>
              <h4>{this.state.post.body}</h4>
              <h4>{this.state.post.created_at}</h4>
              <h4>{this.state.post.updated_at}</h4>
              <button onClick={this.deletePost}>Delete Post</button>
              <Link to={`/posts/${this.state.postId}/update`}>
                <button>Update Post</button>
              </Link>
              <Link to={`/posts/${this.state.postId}/comments`}>
                <button>Add a Comment</button>
              </Link>
            </section>
          </div>
        </div>
      )
    }

    // let jsx2
    // if (this.state.comments.findIndex((comment) => comment.post_id === this.state.postId) === -1) {
    //   console.log(this.state.comments.findIndex((comment) => comment.post_id === this.state.postId) === -1)
    //   jsx2 = <h3>No Comments</h3>
    // } else {
    const comments = this.state.comments.filter(comment => {
      console.log(comment.post_id)
      console.log(this.state.postId)
      return comment.post_id === this.state.postId
    })
    console.log(comments)
    const jsx2 = (
      <section className="comments">
        <h2>Comments</h2>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5 comment-index">
            <ul>
              {this.state.comments.map(comment => {
                // console.log(comment.post_id)
                // console.log(this.state.postId)
                return (
                  <li key={comment.id}>
                    <h4>{comment.body}</h4>
                    <h4>{comment.owner.email}</h4>
                    <h6>{comment.created_at}</h6>
                    <h6>PostID:{comment.post_id}</h6>
                  </li>
                )
              }
              )}
            </ul>
          </div>
        </div>
      </section>
    )
    // }

    return (
      <div className="post-show">
        <h2>Individual Post</h2>
        {jsx}
        {jsx2}
      </div>
    )
  }
}

export default PostShow
