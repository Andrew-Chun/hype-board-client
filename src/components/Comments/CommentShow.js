import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class CommentShow extends React.Component {
  state = {
    comment: null,
    deleted: false
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
        message: messages.commentDeleteFailure,
        variant: 'Failure'
      }))
      .catch(console.error)
  }

  render () {
    const id = this.props.match.params.id
    if (this.state.deleted === true) {
      return <Redirect to={`/posts/${this.state.comment.post_id}`}/>
    }
    console.log(this.state.comment)
    let jsx
    if (this.state.comment === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <div className="row comment-show">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <section className="comment-details">
              <h3>{this.state.comment.body}</h3>
              <h3>{this.state.comment.owner.email}</h3>
              <h4>{this.state.comment.created_at}</h4>
              <h4>{this.state.comment.updated_at}</h4>
              <button onClick={this.deleteComment}>Delete Comment</button>
              <Link to={`/posts/${this.state.comment.post_id}/comments/${id}/update`}>
                <button>Update Comment</button>
              </Link>
            </section>
          </div>
        </div>
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
