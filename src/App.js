import React from 'react';
import axios from 'axios';

class App extends React.Component {
  onClickData = () => {
    axios
      .post(`https://dev.teledirectasia.com:3092/`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>TDCX Malaysia</h1>
        <button
          style={{
            padding: '10px',
            marginTop: '10px',
            background: '#000',
            color: '#fff',
          }}
          onClick={this.onClickData}
        >
          Get Data
        </button>
      </div>
    );
  }
}

export default App;
