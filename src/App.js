import React, { Component } from "react";

import Info from "./Info";
import Hello from "./Hello";
import Cube from "./Cube";

class App extends Component {
  state = {
    displayInfo: false
  };

  onDisplayInfo = () => {
    this.setState({ displayInfo: true });
  };

  render() {
    return (
      <div>
        <Cube mount={this.mount} onDisplayInfo={this.onDisplayInfo} />
        {this.state.displayInfo ? <Info /> : <Hello />}
      </div>
    );
  }
}

export default App;
