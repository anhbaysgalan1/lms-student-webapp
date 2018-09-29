import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { modal, countDownTime } = this.props;
    this.state = {
      modal,
      countDownTime,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { modal, countDownTime } = this.props;
    if (nextProps.modal !== modal || nextProps.countDownTime !== countDownTime) {
      this.setState({
        modal: nextProps.modal,
        countDownTime: nextProps.countDownTime,
      });
    }
  }

  toggle() {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  render() {
    const { modal, countDownTime } = this.state;
    return (
      <div className=" d-flex justify-content-center align-items-center">
        <Button color="danger" onClick={this.toggle} style={{ display: modal ? 'none' : 'none' }} />
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            The NextVideo is autoplay in
            {' '}
            {countDownTime}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.cancelAutoNextVideo()}>Cancel</Button>
            {' '}
            <Button color="primary" onClick={() => this.props.handleNextVideo()}>Next Videos</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalPopup.propTypes = {
  countDownTime: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
};


export default ModalPopup;
