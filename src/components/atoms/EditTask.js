import React from 'react';
import request from '../../util/request';

import { Form, Button } from 'react-bootstrap';

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: this.props.taskName };
  }

  handleUpdateTask = (id) => {
    const data = {
      name: this.state.name,
      completed: true,
    };
    request({
      url: `https://dev.teledirectasia.com:3092/tasks/${this.props.taskId}`,
      method: 'PUT',
      data: data,
      withCredentials: false,
    }).then((response) => {
      this.props.getTask();
    });
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    // console.log(this.props.addItem);
    return (
      <React.Fragment>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="name"
              value={this.state.name || ''}
              onChange={this.handleChange}
              style={{ width: 'auto' }}
            />
          </Form.Group>
          <Button onClick={this.handleUpdateTask} variant="primary">
            Update Task
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddTask;
