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
      <div className="input_search_bar">
        <input className="search_bar" type="text" size="60" placeholder="Search" name="searchbar" value={value} onChange={this.handleChange} />
        <span className="icon_search_bar"><i className="fas fa-search" /></span>
      </div>
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
