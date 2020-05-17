import React from 'react';
import request from '../util/request';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: { msg: '', task: [], name: '' },
    };
  }

  getTasks = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/tasks',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      console.log(response);
      this.setState({
        tasks: response,
      });
    });
  };

  componentDidMount = () => {
    this.getTasks();
  };

  generateTask = (tasks) => {
    return tasks.map((task) => {
      return <li>{task.name}</li>;
    });
  };

  //   generateLatestTaskList = (tasks) => {
  //     return tasks.map(function (task, index) {
  //       return (
  //         <li key={index}>
  //           Name: {task.name} - Created: {task.createdAt} -Completed:{' '}
  //           {task.completed ? 'Yes' : 'No'}
  //         </li>
  //       );
  //     }, this);
  //   };

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
  };

  handleRemoveTask = () => {
    const id = '5eba62d195466c2105a18fb2';
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'DELETE',
      withCredentials: false,
    }).then((response) => {
      this.getTasks();
    });
  };

  handleUpdateTask = () => {
    const id = '5eba62d195466c2105a18fb2';
    const data = {
      name: '',
      completed: true,
    };
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${id}`,
      method: 'PUT',
      data: data,
      withCredentials: false,
    }).then((response) => {
      this.getTasks();
    });
  };

  render() {
    console.log(this.state);
    if (this.state.tasks === null) {
      console.log('NO');
    }
    return (
      <React.Fragment>
        <div>
          <ul>Tasks:{this.state.tasks.msg}</ul>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name || ''}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
            <button onClick={this.handleAddTask}>Submit</button>
          </div>

          <div>
            <button onClick={this.handleRemoveTask}>Remove Task</button>
          </div>

          <div>
            <button onClick={this.handleUpdateTask}>Update Task</button>
          </div>

          {/* {this.state.tasks && (
            <h3>Total Tasks: {this.state.tasks.totalTasks}</h3>
          )}

          {this.state.tasks && (
            <h4>Completed tasks: {this.state.tasks.tasksCompleted}</h4>
          )}
          <ul>
            {this.state.tasks &&
              this.generateLatestTaskList(this.state.tasks.latestTasks)}
          </ul> */}
        </div>

        {/* <TaskList updateTask={this.getTasks} /> */}
      </React.Fragment>
    );
  }
}

export default Dashboard;
