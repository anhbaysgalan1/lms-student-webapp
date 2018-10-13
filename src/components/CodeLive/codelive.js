import React, { Component } from 'react';


class CodeLive extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.changeIframe = this.changeIframe.bind(this);
  }

  changeIframe() {
    console.log("Load Successfully");
    // let contentIframe = document.querySelector('.ace_content');
    
  }

  render() {
    return (
      <iframe title="title" onLoad={this.changeIframe} src="https://trinket.io/embed/python3/f7b50018b2" width="100%" height="93%" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen />
    );
  }
}


export default CodeLive;
