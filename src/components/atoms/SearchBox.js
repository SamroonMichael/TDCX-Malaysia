import React from 'react';

import { Form, FormControl, Button } from 'react-bootstrap';

const Search = (props) => {
  return (
    <Form inline onSubmit={(e) => e.preventDefault()}>
      <FormControl
        type="text"
        onChange={props.onSearchTask}
        placeholder="Search"
        className="mr-sm-2"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default Search;
