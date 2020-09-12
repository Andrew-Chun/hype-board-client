import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

class SignIn2 extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onFinish = values => {
    this.setState({
      email: values.email,
      password: values.password
    })
    this.onSignIn()
  }

  onSignIn = event => {
    // event.preventDefault()
    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/posts'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div>
        <h1 className="landing-name">HYPEBOARD</h1>
        <p className="landing-description">Hypeboard is a message board where you can share updates with friends and family.</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={this.onFinish}
        >
          <Form.Item>
            <p className="log-in-text">Log in to your account</p>
          </Form.Item>
          <Form.Item
            name="email"
            value={email}
            rules={[
              {
                required: true,
                message: 'Please input your Email Address!'
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="password"
            value={password}
            rules={[
              {
                required: true,
                message: 'Password must be atleast 6 characters!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <p className="log-in-text2">New to Hypeboard? <Link to={'/sign-up'}>Register now</Link></p>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(SignIn2)
