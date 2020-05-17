import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container, Card, Button } from 'react-bootstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { task: null };
  }

  componentDidMount = () => {
    axios
      .request({
        url: 'https://dev.teledirectasia.com:3092/dashboard',
        method: 'GET',
      })
      .then((res) => {
        console.log(res);
        this.setState({ tasks: res });
      })
      .catch((err) => console.log(`This is the ${err}`));
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
            }}
          >
            <Card>
              <Card.Header
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                }}
              >
                <h1>Welcome </h1>
                <Link
                  to="/"
                  style={{ marginLeft: 'auto', order: '2', lineHeight: '2.5' }}
                >
                  LogOut
                </Link>
              </Card.Header>
              <Card.Body
                style={{ height: '100vh', backgroundColor: 'rgba(0,0,0,.03)' }}
              >
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
                  <div
                    style={{
                      width: '18rem',
                      padding: '1.7rem',
                      boxShadow: '0px 1px 22px -2px rgba(0,0,0,0.45)',
                      borderRadius: '10px',
                      textAlign: 'center',
                      background: '#fff',
                    }}
                  >
                    <p>You have no task.</p>
                    <Button variant="primary">New Task</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
