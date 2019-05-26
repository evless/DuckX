import React, { Component } from 'react';
import Todo from '../todo'
import Offers from '../offers'
import Header from '../header'

class App extends Component {
  state = {
    random: Math.random()
  }

  handleChangeProps = () => {
    this.setState({
      random: Math.random()
    })
  }

  render() {
    return (
      <div className="App">
        <Header onChangeProps={this.handleChangeProps} />
        <Todo />
        <Offers />
      </div>
    );
  }
}

export default App;