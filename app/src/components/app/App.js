import React, { Component } from 'react';
import { connect } from '../../lib/react-duckx';
import { addTodo } from '../../redux/todo';
import './App.css';

class App extends Component {
  static defaultProps = {
    todo: []
  }

  handleClick = () => {
    this.props.addTodo(Math.random())
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Add Todo</button>
        <ul>
          {this.props.todo.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state)
  return {
    todo: state.todo,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (payload) => dispatch(addTodo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
