import React, { Component } from 'react';
import loader from './loader.gif';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <img src={loader} alt="loading" />
      </div>
    );
  }
}


export default Loading;
