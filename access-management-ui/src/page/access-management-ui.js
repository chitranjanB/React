import React from "react";
import AppcodeSubmodule from "../component/appcode-submodule/appcode-submodule";

export default class AccessMngUI extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <AppcodeSubmodule />
        <AppcodeSubmodule />
        <AppcodeSubmodule />
        <AppcodeSubmodule />
        <AppcodeSubmodule />
      </div>
    );
  }
}
