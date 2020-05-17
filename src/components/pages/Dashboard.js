import React from 'react';
import request from '../../util/request';
import * as session from '../../util/session';
import { Link } from 'react-router-dom';
// import TaskModal from '../../components';
import TaskList from '../layout/TaskList';
// import MainDashboard from '../MainDashboard';

import { Container, Card, Button, ButtonToolbar } from 'react-bootstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      taskModlShow: false,
    };
  }

  componentDidMount = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/dashboard',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      console.log(response);
      this.setState({
        tasks: response,
      });
    });
  };

  onLogout = () => {
    session.logout();
    this.setState({
      showDashboard: false,
      showLogin: true,
    });
  };

  taskModlClose = () => {
    this.setState({ taskModlShow: false });
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
                  onClick={this.onLogout}
                  to="/"
                  style={{ marginLeft: 'auto', order: '2', lineHeight: '2.5' }}
                >
                  LogOut
                </Link>
              </Card.Header>
              <Card.Body style={{ backgroundColor: 'rgba(0,0,0,.03)' }}>
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
                    <p>You have no task</p>
                    {/* <Button variant="primary">New Task</Button> */}
                    <Button
                      variant="primary"
                      onClick={() => this.setState({ taskModlShow: true })}
                    >
                      New Task
                    </Button>
                    {/* <TaskModal
                      show={this.state.taskModlShow}
                      onHide={this.taskModlClose}
                    /> */}
                  </div>
                  <br />
                  <br />
                  {/* <TodoList /> */}
                </div>
              </Card.Body>
            </Card>

            {/* <MainDashboard /> */}
            <br />

            <TaskList />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
