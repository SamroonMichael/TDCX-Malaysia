import React from 'react';

import { Card } from 'react-bootstrap';

const PanelTasks = (props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.children}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PanelTasks;
