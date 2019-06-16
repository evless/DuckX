import React, { Component } from 'react';
import { connect } from '../../lib/react-duckx';
import { addTodo } from '../../redux/todo';

class Todo extends Component {
  static defaultProps = {
    todo: []
  }

  handleClick = () => {
    this.props.actions.addTodo(Math.random())
  }

  render() {
    console.log('rerender todo')

    return (
      <div className="App">
        <h1>Todo</h1>
        <button onClick={this.handleClick}>Add Todo</button>
        <ul>
          {this.props.todo.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    todo: state.todo || [],
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (payload) => dispatch(addTodo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
