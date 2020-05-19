import React from 'react';
import request from '../../util/request';
import { Modal } from 'react-responsive-modal';
import TopPanel from './TopPanelTask';
import Search from '../atoms/SearchBox';
import AddTask from '../atoms/AddTask';

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
// import AddTask from '../components/atoms/AddTask';

class API extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: { msg: '', tasks: [], _id: [] },
      name: '',
      addTaskModal: false,
      editTaskModal: false,
      isEditing: false,
    };
  }

  getTasks = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/tasks',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      console.log(response);
      this.setState({ tasks: response, taskModlShow: false });
    });
  };

  componentDidMount = () => {
    this.getTasks();
  };

  /********************************************/
  // Modals Toggle

  onOpenModalEdit = () => {
    this.setState({ editTaskModal: true });
  };

  onCloseModalEditclose = () => {
    this.setState({ editTaskModal: false });
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
  // // Update task
  // handleUpdateTask = (id) => {
  //   const data = {
  //     name: this.state.name,
  //     completed: true,
  //   };
  //   request({
  //     url: `https://dev.teledirectasia.com:3092/tasks/${this.props.taskId}`,
  //     method: 'PUT',
  //     data: data,
  //     withCredentials: false,
  //   }).then((response) => {
  //     //   this.props.getTask();
  //     this.getTasks();
  //   });
  // };

  // handleChangeUpdateTask = (e) => {
  //   this.setState({ name: e.target.value });
  // };

  // handleListEdit = (id) => {
  //   const name = 'John Test'; // Find in the task array with same as id
  //   this.setState({
  //     addMode: false,
  //     taskModlShow: true,
  //     editTaskId: id,
  //     editTaskName: name,
  //   });
  // };

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
  // Update Task
  handleListUpdate = (id) => {
    // let tasks = this.state.tasks;
    let updateTask = this.state.tasks.tasks.map((task) => task._id);

    // const name = updateTask.name;

    console.log(updateTask);

    console.log(this.state.tasks.tasks.map((task) => task._id));

    const data = {
      name: this.state.name,
      completed: true,
      id: updateTask,
    };

    console.log(data);
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'PUT',
      data: data,
      withCredentials: false,
    }).then((response) => {
      //   this.props.getTask();
      this.getTasks();
    });
  };

  handleChangeUpdateTask = (e) => {
    this.setState({ name: e.target.value });
  };

  // Mark Completed
  markedCompleted = (id) => {
    const tasks = {
      name: this.state.name,
      completed: true,
    };
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'PUT',
      data: tasks,
      withCredentials: false,
    }).then((response) => {
      //   this.props.getTask();
      this.getTasks();
    });
    console.log(tasks);

    return tasks;
  };

  /********************************************/

  render() {
    // console.log(this.state);

    // Loop List
    const tasksList = this.state.tasks.tasks.map((task) => {
      return (
        <li key={task._id}>
          <InputGroup.Checkbox
            onClick={this.markedCompleted.bind(this, task._id)}
            style={{ marginRight: '0.3rem' }}
          />
          <span className={task.completed ? 'johhDoe' : ''}>{task.name}</span>
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
        {/* Top Panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '10px',
          }}
        >
          <TopPanel title="Task completed">
            <span style={{ fontSize: '2rem', color: '#007bff' }}>
              {this.props.tasksCompleted}
            </span>
            <span style={{ color: '#949494' }}>/{this.props.totalTasks}</span>
          </TopPanel>
          <TopPanel title="Latest Create Task">{this.props.lTask}</TopPanel>
        </div>

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
          <AddTask
            addItems={this.handleAddTask}
            addTaskInput={this.handleChangeAddTask}
            addTaskVal={this.state.name}
          />
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
            <Button
              onClick={this.handleListUpdate.bind(
                this,
                this.state.tasks.tasks._id
              )}
              variant="primary"
            >
              Update Task
            </Button>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default API;
