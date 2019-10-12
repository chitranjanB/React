import React from "react";
import AppcodeSubmodule from "../component/appcode-submodule/appcode-submodule";

export default class AccessMngUI extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onAppcodeComplete = form => {
    console.log("data is ", form);
    this.setState({ ...form });
  };

  render() {
    return (
      <div>
        <AppcodeSubmodule oncomplete={this.onAppcodeComplete} />
      </div>
    );
  }
}
