import React from 'react';
import request from '../../util/request';
import AddTask from '../atoms/AddTask';
import TaskItem from '../atoms/TaskItem';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tasks: { msg: '', tasks: [], _id: [] } };

    // this.handleRemoveTask = this.handleRemoveTask.bind(this);
  }

  getTasks = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/tasks',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      console.log(response);
      this.setState({ tasks: response });
    });
  };

  componentDidMount = () => {
    this.getTasks();
  };

  // Remove itmes
  handleRemoveTask = () => {
    const id = this.state.tasks.tasks._id;
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'DELETE',
      withCredentials: false,
    }).then((response) => {
      this.getTasks();
    });
  };

  render() {
    console.log(this.state.tasks);

    const tasks = this.state.tasks.tasks.map((task) => {
      return (
        <div>
          <div key={task._id}>{task.name}</div>
          <button onClick={this.handleRemoveTask.bind(this, task._id)}>
            Rmove
          </button>
        </div>
      );
    });

    return (
      <div>
        <p>{this.state.tasks.msg}</p>
        <div>{tasks}</div>

        {/* <div>{test}</div> */}

        <div>
          {/* <TaskItem list={tasks} /> */}
          <AddTask addItem={this.getTasks} />
          <button>Remove Task</button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default TaskList;
