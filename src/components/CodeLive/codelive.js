import React, { Component } from 'react';


class CodeLive extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <iframe title="iframe" src="https://trinket.io/embed/python3/d0bdae367e" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen />
      </div>
    );
  }
}


export default CodeLive;
