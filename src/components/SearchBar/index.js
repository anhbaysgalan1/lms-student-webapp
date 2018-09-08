import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Search } from '../../actions/searchAction';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { SearchAction } = this.props;
    this.setState({
      value: event.target.value,
    });
    SearchAction(event.target.value);
  }

  render() {
    const { value } = this.state;
    return (
      <input type="text" name="searchbar" value={value} onChange={this.handleChange} />
    );
  }
}

SearchBar.propTypes = {
  SearchAction: PropTypes.func.isRequired,
};

function mapsToReducer({ searchReducer }) {
  return { searchReducer };
}

const actions = {
  SearchAction: Search,
};

export default connect(mapsToReducer, actions)(SearchBar);
