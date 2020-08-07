import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'

class CommentShow extends React.Component {
  state = {
    post: null,
    comments: [],
    deleted: false
  }

  componentDidMount () {
    // const id = this.props.match.params.id
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/comments/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          comments: response.data
        })
      })
      .catch(console.error)
  }

  deleteComment = () => {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    console.log(user)
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
      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(() => msgAlert({
        heading: 'Failed to Delete Comment',
        message: 'Message Failure',
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id
    if (this.state.deleted === true) {
      return <Redirect to='/comments' />
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
              <button onClick={this.deleteComment}>Delete Comment</button>
              <Link to={`/comments/${id}/update`}>
                <button>Update Comment</button>
              </Link>
              <Link to={`/comments/${id}/comments`}>
                <button>Add a Comment</button>
              </Link>
            </section>
            <section className="comments">
              <h2>Comments</h2>
              <div className="row">
                <div className="col-sm-10 col-md-8 mx-auto mt-5 comment-index">
                  <ul>
                    {this.state.comments.map(comment => {
                      return (
                        <li key={comment.id}>
                          <h4>{comment.body}</h4>
                          <h4>{comment.owner}</h4>
                          <h6>{comment.created_at}</h6>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      )
    }
    return (
      <div className="post-show">
        <h2>Comment</h2>
        {jsx}
      </div>
    )
  }
}

export default CommentShow
