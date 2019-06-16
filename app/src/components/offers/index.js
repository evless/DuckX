import React, { Component } from 'react';
import { connect } from '../../lib/react-duckx';
import { addOffer } from '../../redux/offer';

class Offers extends Component {
  static defaultProps = {
    todo: []
  }

  handleClick = () => {
    this.props.actions.addTodo(Math.random())
  }

  render() {
    console.log('rerender offers')

    return (
      <div className="App">
        <h1>Offer</h1>
        <button onClick={this.handleClick}>Add Offer</button>
        <ul>
          {this.props.offers.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    offers: state.offer,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (payload) => dispatch(addOffer(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Offers)
