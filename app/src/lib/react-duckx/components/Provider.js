import React from 'react'
import PropTypes from 'prop-types'

export default class Provider extends React.Component {
  store = this.props.store;

  static childContextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
    })
  }

  getChildContext() {
    return { store: this.store };
  }

  render() {
    return this.props.children;
  }
}