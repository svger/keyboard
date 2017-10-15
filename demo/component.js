import React from 'react';
import Keyboard from '../src/index';

class App extends React.Component {
  state = {}

  handleKeyPress = (value) => {
    console.log('handleKeyPress:', value);
  }

  handleKeyValueDelete = () => {
    console.log('handleKeyValueDelete');
  }

  handleHideKeyboard = () => {
    this.setState({
      showKeyboard: false
    });
  }

  clearValue = () => {
    console.log('clearValue');
  }

  handleToggleKeyboard = () => {
    this.setState({
      showKeyboard: !this.state.showKeyboard
    })
  }

  render() {
    return (
       <div>
         <div style={{fontSize: '.14rem'}}>Keyboard Demo</div>
         <button onClick={this.handleToggleKeyboard}>Show or hide Keyboard</button>

         <Keyboard
             type="stock"
             showKeyboard={this.state.showKeyboard}
             onPress={this.handleKeyPress}
             onDelete={this.handleKeyValueDelete}
             onHide={this.handleHideKeyboard}
             onClear={this.clearValue}
         />
       </div>

    );
  }
}

export default App;
