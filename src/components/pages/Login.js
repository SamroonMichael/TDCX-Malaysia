import React from 'react';
import request from '../../util/request';
import * as session from '../../util/session';
import Dashboard from './Dashboard';
import { Redirect } from 'react-router-dom';

import { Container, Form, Button, Card } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {},
      id: '',
      name: '',
      user: {},
      isLoggedOut: true,
      showDashboard: false,
    };
  }

  componentDidMount = () => {
    // Check if the user is logged in or not
    if (session.loggedIn()) {
      this.setState({
        showDashboard: true,
        isLoggedOut: false,
      });
    }
  };

  onLogin = () => {
    const data = {
      name: this.state.name,
      apiKey: this.state.id,
    };
    request({
      url: 'https://dev.teledirectasia.com:3092/login',
      method: 'POST',
      data: data,
      withCredentials: false,
    })
      .then((response) => {
        session.setToken(response.token.token);
        this.setState({
          token: response.token,
          user: { name: response.token.name, img: response.image },
          showDashboard: true,
          isLoggedOut: false,
          user: { name: this.name },
        });
      })
      .catch((err) => console.log(`This is the ${err}`));
  };

  onChangeName = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  onChangeId = (e) => {
    e.preventDefault();
    this.setState({ id: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <Container style={{ height: '100vh' }} fluid>
          <div
            style={{
              height: '100%',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {this.state.isLoggedOut ? (
              <Card
                style={{
                  width: '18rem',
                  padding: '0.5rem',
                  boxShadow: '0px 1px 22px -2px rgba(0,0,0,0.45)',
                }}
              >
                <Card.Body>
                  <Form>
                    <h4>Login</h4>
                    <Form.Group controlId="formBasicId">
                      <Form.Control
                        type="text"
                        placeholder="Id"
                        value={this.state.id}
                        onChange={this.onChangeId}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                      />
                    </Form.Group>
                    <Button
                      onClick={this.onLogin}
                      variant="primary"
                      style={{
                        width: '100%',
                      }}
                    >
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            ) : null}

            {this.state.showDashboard ? (
              <Redirect to="/dashboard">
                {' '}
                <Dashboard />
              </Redirect>
            ) : null}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
