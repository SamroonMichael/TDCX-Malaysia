import React from 'react';
import request from '../../util/request';
import TaskItem from './TaskItem';
import TaskList from './TaskItem';

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
  }

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
      this.props.getTasks();
    });
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              value={this.state.name || ''}
              onChange={this.handleChange}
            />
            <button onClick={this.handleAddTask}>Submit</button>
          </form>
          {/* <TaskList updateList={this.handleAddTask} /> */}
        </div>
      </React.Fragment>
    );
  }
}

export default AddTask;
