import React from 'react';
import request from '../../util/request';
import AddTask from '../atoms/AddTask';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tasks: [] };
  }

  getTasks = () => {
    request({
      url: 'https://dev.teledirectasia.com:3092/tasks',
      method: 'GET',
      withCredentials: false,
    }).then((response) => {
      console.log(response.tasks);
      this.setState({
        tasks: response.tasks,
      });
    });
  };

  componentDidMount = () => {
    this.getTasks();
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <p>{this.state.tasks.msg}</p>
        {/* <ul>{this.generateLatestTaskList}</ul> */}
        {/* Tasks Message: {this.state.tasks.msg}
        <br />
        Task Name: {this.state.tasks.name} */}
        <div>
          <AddTask addItem={this.getTasks} />
        </div>
      </div>
    );
  }
}

export default TaskList;
