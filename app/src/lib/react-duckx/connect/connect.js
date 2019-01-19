import React from 'react';
import PropTypes from 'prop-types';

export default function connect(mapStateToProp = () => {}, mapDispatchToProps = () => {}) {
  return (WrappedComponent) => {
    return class Connector extends React.Component {
      static contextTypes = { store: PropTypes.object };

      store = this.context.store;
      state = this.store.getState();

      componentDidMount() {
        this.subscribe = this.context.store.subscribe(this.subscribeHandler);
      }

      subscribeHandler = () => {
        console.log('calling subscribe')
        if (this.state !== this.store.getState()) {
          this.forceUpdate()
        }
      }

      render() {
        return (
          <WrappedComponent
            {...mapStateToProp(this.store.getState(), this.props)}
            {...mapDispatchToProps(this.store.dispatch)}
            {...this.props}
            shouldComponentUpdate
          />
        )
      }
    }
  }
}