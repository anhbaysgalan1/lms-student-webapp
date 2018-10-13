import React from 'react';
import {
  Button, Modal, ModalBody, Row, Col,
} from 'reactstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

class ModalProfile extends React.Component {
  constructor(props) {
    super(props);
    const { ToggleModal } = this.props;
    this.state = {
      modal: ToggleModal,
    };
    this.clickHandle = this.clickHandle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { ToggleModal } = this.props;
    if (ToggleModal !== nextProps.ToggleModal) {
      this.setState({
        modal: nextProps.ToggleModal,
      });
    }
  }

  clickHandle(choose, id) {
    const { history, toggle } = this.props;
    if (choose === 1 && id === undefined) {
      history.push('/profile');
      toggle();
    } else if (choose === 2) {
      history.push(`/profile/${id}`);
      toggle();
    }
  }

  renderListPlaylist() {
    const { infoUser } = this.props;
    return (
      _.map(infoUser.yourPlaylist.playlist, playlist => (
        <li key={playlist.idClassroom} onClick={() => { this.clickHandle(2, playlist.idClassroom); }} role="presentation">
          {' '}
          {playlist.classroomName}
          {' '}
        </li>
      ))
    );
  }

  render() {
    const { toggle, infoUser } = this.props;
    const { info } = infoUser;
    const { modal } = this.state;
    if (_.isEqual(infoUser, {})) {
      return <div />;
    }
    return (
      <div>
        <Button color="danger" onClick={toggle} style={{ display: 'none' }} />
        <Modal isOpen={modal} toggle={toggle} className="modalProfile">
          <ModalBody className="background-color-modal text-light ModalRadius" style={{ height: '100%', padding: 0 }}>
            <Row className="p-3">
              {/* LEFT */}
              <Col md="5" className="border-right">
                <Col className="d-flex justify-content-center">
                  <img alt="avatar" style={{ width: '100%', height: '100%' }} className="avatarModal" src="https://via.placeholder.com/144x144" />
                </Col>
                <Col className="mt-3">
                  <div>
                    <p className="m-0 text-center textNameModal">
                      {`${info.user.firstName} ${info.user.lastName}`}
                    </p>
                    <div className="textFunctionModal colorPar text-md-left">
                      <p onClick={() => this.clickHandle(1)} role="presentation">
                        Change Password
                      </p>
                    </div>
                  </div>
                </Col>
              </Col>
              {/* RIGHT */}
              <Col md="7">
                <p className="colorPar" style={{ fontSize: '20px', fontWeight: 'bold', wordSpacing: '2px' }}> Participated In: </p>
                <div id="ListClass">
                  <ul>
                    {this.renderListPlaylist()}
                  </ul>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ModalProfile.propTypes = {
  toggle: PropTypes.func.isRequired,
  ToggleModal: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  infoUser: PropTypes.shape({
    info: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default ModalProfile;
