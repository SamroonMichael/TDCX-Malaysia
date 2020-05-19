import React from 'react';
import request from '../../util/request';
import * as session from '../../util/session';
import { Link } from 'react-router-dom';
import TaskList from '../layout/TaskList';
// import TaskList from '../layout/TaskList';
// import NewTaskt from '../layout/NewTaskList';

import { Container, Card, Button } from 'react-bootstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: { msg: '', tasks: [], _id: [], latestTask: [] },
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
    const tasksCompleted = this.state.tasks.tasksCompleted;
    const totalTasks = this.state.tasks.totalTasks;

    // console.log(
    //   this.state.tasks.latestTasks.map((newTask) => {
    //     return newTask.name;
    //   })
    // );
    // console.log(this.state.tasks.totalTasks);
    // console.log(this.state.tasks.msg);

    // const newTask = this.state.tasks.latestTasks.map(latestTask => {
    //   return (
    //   <li>{latestTask.name}</li>
    //   )
    // });

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
            <Card.Header
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#fff',
              }}
            >
              <h3>Welcome</h3>
              <Link
                onClick={this.onLogout}
                to="/"
                style={{
                  marginLeft: 'auto',
                  order: '2',
                  lineHeight: '2.5',
                }}
              >
                LogOut
              </Link>
            </Card.Header>
            {this.state.tasks.totalTasks === 0 ? (
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
                    <Button
                      variant="primary"
                      onClick={() => this.setState({ taskModlShow: true })}
                    >
                      New Task
                    </Button>
                  </div>
                </div>
              </Card.Body>
            ) : (
              <TaskList
                tasksCompleted={tasksCompleted}
                totalTasks={totalTasks}
              />
            )}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
export default Dashboard;
