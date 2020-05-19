import React from 'react';

import { Form, FormControl, Button } from 'react-bootstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    // const fliterTask = this.props.tasks.tasks.fliter(
    //   (task) => task.name === 'Samroon'
    // );
    // console.log(fliterTask);

    return (
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    );
  }
}

export default Search;
