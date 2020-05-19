import React from 'react';
import { Modal } from 'react-responsive-modal';

import { Button, Form } from 'react-bootstrap';

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = { addTaskModal: false };
  }

  onOpenModalAdd = () => {
    this.setState({ addTaskModal: true });
  };
  onCloseModalAddclose = () => {
    this.setState({ addTaskModal: false });
  };

  render() {
    return (
      <React.Fragment>
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
                value={this.props.addTaskVal}
                onChange={this.props.addTaskInput}
                style={{ width: 'auto' }}
              />
            </Form.Group>
            <Button onClick={this.props.addItems} variant="primary">
              New Task
            </Button>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddTask;
