import React, { Component } from 'react';


class CodeLive extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <iframe title="title" src="https://trinket.io/embed/python3/f7b50018b2" width="100%" height="93%" frameBorder="0" marginWidth="0" marginHeight="0" allowFullscreen />
    );
  }
}


export default CodeLive;
