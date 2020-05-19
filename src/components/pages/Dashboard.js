import React from 'react';
import request from '../../util/request';
import * as session from '../../util/session';
import { Link } from 'react-router-dom';
import TasksList from '../layout/TaskList';
import { Modal } from 'react-responsive-modal';
import TopPanel from '../atoms/TopPanelTask';

import { Container, Card, Button, Form } from 'react-bootstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: { msg: '', tasks: [], _id: [] },
      name: '',
      taskModlShow: false,
      addTaskModal: false,
    };
  }

  componentDidMount = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/dashboard',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      console.log(response);
      this.setState({ tasks: response });
    });
  };

  getTasks = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/tasks',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      console.log(response);
      this.setState({ tasks: response, taskModlShow: false });
    });

    // Clear task input
    this.setState({
      name: '',
    });
  };

  /********************************************/
  // Add Task
  handleAddTask = () => {
    const data = {
      name: this.state.name,
    };
    request({
      url: 'https://dev.teledirectasia.com:3092/tasks',
      method: 'POST',
      data: data,
      withCredentials: false,
    }).then((response) => {
      // this.props.addItem();
      this.getTasks();
    });

    // Clear task input
    this.setState({
      name: '',
    });
  };

  handleChangeAddTask = (e) => {
    this.setState({ name: e.target.value });
  };
  /********************************************/
  // On Chaneg Methods
  onLogout = () => {
    session.logout();
    this.setState({
      showDashboard: false,
      showLogin: true,
    });
  };

  onOpenModalAdd = () => {
    this.setState({ addTaskModal: true });
  };
  onCloseModalAddclose = () => {
    this.setState({ addTaskModal: false });
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
                      onClick={this.onOpenModalAdd}
                      variant="primary"
                      style={{ marginLeft: '0.7rem' }}
                    >
                      Add Task
                    </Button>
                    <Modal
                      open={this.state.addTaskModal}
                      onClose={this.onCloseModalAddclose}
                      center
                    >
                      <Form
                        onSubmit={(e) => e.preventDefault()}
                        style={{
                          display: 'flex',
                          flexFlow: 'column wrap',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChangeAddTask}
                            style={{ width: 'auto' }}
                          />
                        </Form.Group>
                        <Button onClick={this.handleAddTask} variant="primary">
                          New Task
                        </Button>
                      </Form>
                    </Modal>
                  </div>
                </div>
              </Card.Body>
            ) : (
              <React.Fragment>
                {/* Top Panel */}
                <div
                  className="topPanel"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '0.7rem',
                    marginBottom: '0.7rem',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <TopPanel title="Task completed">
                    <span style={{ fontSize: '2.3rem', color: '#007bff' }}>
                      {this.state.tasks.tasksCompleted}
                    </span>
                    <span style={{ color: '#949494' }}>
                      /{this.state.tasks.totalTasks}
                    </span>
                  </TopPanel>
                  <TopPanel title="Update">
                    <span>{this.state.tasks.msg}</span>
                  </TopPanel>
                </div>

                <TasksList />
              </React.Fragment>
            )}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
export default Dashboard;
