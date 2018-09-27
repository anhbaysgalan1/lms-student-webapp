import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class ModalPopup extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      modal: this.props.modal,
      countDownTime: this.props.countDownTime,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal !== this.props.modal || nextProps.countDownTime !== this.props.countDownTime) {
      this.setState({
        modal: nextProps.modal,
        countDownTime: nextProps.countDownTime,
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    console.log(this.state.modal);
    return (
      <div className=" d-flex justify-content-center align-items-center">
        <Button color="danger" onClick={this.toggle} style={{display: this.state.modal ? "none" : "none"}} />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            The NextVideo is autoplay in
            {' '}
            {this.state.countDownTime}
          </ModalBody>
          <ModalFooter>
            {/* <Button color="secondary" onClick={this.props.cancelAutoNextVideo}>Cancel</Button>
            {' '}
            <Button color="primary" onClick={this.toggle}>Next Videos</Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default ModalPopup;
