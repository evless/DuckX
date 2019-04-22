import React, { Component } from 'react';
import Todo from '../todo'
import Header from '../header'

class App extends Component {
  state = {
    test: 'test'
  }

  handleChangeProps = () => {
    this.setState({
      test: Math.random()
    })
  }
  render() {
    return (
      <div className="App">
        <Header onChangeProps={this.handleChangeProps} />
        <Todo test={this.state.test} />
      </div>
    );
  }
}

export default App;