import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import apiConfig from '../../apiConfig'

class UserIndex extends React.Component {
  state = {
    users: null
  }

  componentDidMount () {
    const { setUsers, user } = this.props
    console.log(user)
    axios({
      method: 'GET',
      url: `${apiConfig}/users/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        this.setState({
          users: response.data
        })
        setUsers(response.data)
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.users === null) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5 post-index">
            <ul>
              {this.state.users.map(user => {
                return (
                  <li key={user.id}>
                    <h4>{user.email}</h4>
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
        <h2>All Registered Users</h2>
        {jsx}
      </div>
    )
  }
}

export default UserIndex
