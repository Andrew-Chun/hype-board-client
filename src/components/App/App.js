import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import PostCreate from '../Posts/PostCreate'
import PostIndex from '../Posts/PostIndex'
import PostShow from '../Posts/PostShow'
import PostUpdate from '../Posts/PostUpdate'
import CommentCreate from '../Comments/CommentCreate'
import CommentShow from '../Comments/CommentShow'
import CommentUpdate from '../Comments/CommentUpdate'
import UserIndex from '../Users/UserIndex'
import UserShow from '../Users/UserShow'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      posts: [],
      comments: [],
      users: [],
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  setPosts = posts => this.setState({ posts: posts })

  setComments = comments => this.setState({ comments: comments })

  setUsers = users => this.setState({ users: users })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-post' render={() => (
            <PostCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts' render={() => (
            <PostIndex setPosts={this.setPosts} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id' render={({ match }) => (
            <PostShow setComments={this.setComments} msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id/update' render={({ match }) => (
            <PostUpdate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id/comments' render={({ match }) => (
            <CommentCreate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id/comments/:id' render={({ match }) => (
            <CommentShow msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id/comments/:id/update' render={({ match }) => (
            <CommentUpdate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/users' render={() => (
            <UserIndex setUsers={this.setUsers} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/users/:id' render={({ match }) => {
            const selectedUser = this.state.users.find(user => user.id.toString() === match.params.id)
            return <UserShow msgAlert={this.msgAlert} email={selectedUser.email} match={match} user={user} />
          }} />
        </main>
      </Fragment>
    )
  }
}

export default App
