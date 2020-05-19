import React from 'react';
import request from '../../util/request';
import { Modal } from 'react-responsive-modal';
import Search from '../atoms/SearchBox';

import 'react-responsive-modal/styles.css';

import {
  Card,
  Button,
  ButtonToolbar,
  Form,
  Container,
  InputGroup,
} from 'react-bootstrap';
import { FaTrash, FaPen } from 'react-icons/fa';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: { msg: '', tasks: [], _id: [] },
      name: '',
      addTaskModal: false,
      editTaskModal: false,
    };
  }

  getTasks = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/tasks',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      this.setState({ tasks: response, taskModlShow: false });
    });
  };

  componentDidMount = () => {
    this.getTasks();
  };

  /********************************************/
  // On Change Methods
  onOpenModalEdit = () => {
    this.setState({ editTaskModal: true });
  };

  onCloseModalEditclose = () => {
    this.setState({ editTaskModal: false });
  };

  onOpenModalAdd = () => {
    this.setState({ addTaskModal: true });
  };
  onCloseModalAddclose = () => {
    this.setState({ addTaskModal: false });
  };

  /********************************************/
  // Add Tasks
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
  // Remove task
  handleRemoveTask = (id) => {
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'DELETE',
      withCredentials: false,
    }).then((response) => {
      this.getTasks();
    });
  };
  /********************************************/
  // Search
  handleSearchTask = (query) => {
    let searchTerm = query.target.value;
    let tasks = this.state.tasks;
    if (searchTerm.length !== 0) {
      let newTaskList = tasks.tasks.filter(function (task) {
        return task.name.toLowerCase().includes(searchTerm);
      });
      tasks.tasks = newTaskList;
      this.setState({
        tasks: tasks,
      });
    }
    if (searchTerm.length === 0) {
      this.getTasks();
    }
  };

  /********************************************/
  // Update Task // FUNCTION HAS A BUG
  handleListEdit = (id) => {
    let tasks = this.state.tasks;
    let editTask = tasks.tasks.filter(function (task) {
      return task._id === id;
    });
    const name = editTask.name;
    const data = {
      name: name,
    };

    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'PUT',
      data: data,
      withCredentials: false,
    }).then((response) => {
      this.setState(
        {
          addMode: false,
          taskModlShow: true,
          editTaskId: id,
          editTaskName: name,
        },
        this.getTasks()
      );
    });
  };

  handleChangeUpdateTask = (e) => {
    this.setState({ name: e.target.value });
  };

  // Mark Completed
  markedCompleted = (id) => {
    const tasks = {
      completed: true,
    };
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'PUT',
      data: tasks,
      withCredentials: false,
    }).then((response) => {
      this.getTasks();
    });
    return tasks;
  };

  /********************************************/

  render() {
    // Loop List
    const tasksList = this.state.tasks.tasks.map((task) => {
      return (
        <li key={task._id}>
          <InputGroup.Checkbox
            onClick={this.markedCompleted.bind(this, task._id)}
            style={{ marginRight: '0.3rem' }}
          />
          <span className={task.completed ? 'strikethrough' : ''}>
            {task.name}
          </span>
          <span style={{ marginLeft: 'auto', order: 2, cursor: 'pointer' }}>
            <FaPen
              style={{ marginRight: '1rem' }}
              onClick={this.onOpenModalEdit}
            ></FaPen>
            <FaTrash onClick={this.handleRemoveTask.bind(this, task._id)}>
              Remove
            </FaTrash>
          </span>
        </li>
      );
    });

    return (
      <React.Fragment>
        {/* Add new Task Form & Search */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            margin: '0.3rem',
            padding: '0.79rem',
          }}
        >
          <Search onSearchTask={this.handleSearchTask} />
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

        {/* Show Task List */}
        <div>{tasksList}</div>

        {/* Edit Task Form */}
        <Modal
          open={this.state.editTaskModal}
          onClose={this.onCloseModalEditclose}
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
                value={this.state.name || ''}
                onChange={this.handleChangeUpdateTask}
                style={{ width: 'auto' }}
              />
            </Form.Group>
            <Button onClick={this.handleListEdit} variant="primary">
              Update Task
            </Button>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TaskList;
