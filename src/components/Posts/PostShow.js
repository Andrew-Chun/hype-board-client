import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'

class PostShow extends React.Component {
  state = {
    post: null,
    deleted: false
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/posts/${id}`,
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
  }

  deletePost = () => {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    console.log(user)
    axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${id}/`,
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
            <section>
              <h3>{this.state.post.title}</h3>
              <h4>{this.state.post.body}</h4>
              <h4>{this.state.post.created_at}</h4>
              <h4>{this.state.post.updated_at}</h4>
              <button className="btn" onClick={this.deletePost}>Delete Post</button>
            </section>
          </div>
        </div>
      )
    }
    return (
      <div className="post-show">
        <h2>Individual Post</h2>
        {jsx}
      </div>
    )
  }
}

export default PostShow
