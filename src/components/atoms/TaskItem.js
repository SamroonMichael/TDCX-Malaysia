import React from 'react';
import request from '../../util/request';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tasks: { msg: '', tasks: [] } };
  }
  handleRemoveTask = () => {
    const id = this.props.list.key;
    request({
      url: `https://dev.teledirectasia.com:3092/tasks`,
      method: 'DELETE',
      withCredentials: false,
    }).then((response) => {
      this.props.getTasks();
    });
  };
  render() {
    console.log(this.state);
    // console.log(this.props.list.li);
    // console.log(this.props.list.list);
    return (
      <div>
        <ul>{this.props.list}</ul>

        <button onClick={this.handleRemoveTask}>Remove Task</button>
      </div>
    );
  }
}

export default TaskList;
