import React from "react";

export default class AppcodeSubmodule extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "lightgrey",
          border: "15px solid green",
          padding: 20,
          margin: 10
        }}
      >
        <h1>Appcode Submodule Component</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend
        eu arcu et ultricies. Mauris maximus purus mollis sollicitudin pulvinar.
        Suspendisse iaculis, lacus nec pulvinar venenatis, arcu nibh aliquam
        eros, ac iaculis velit quam sit amet urna. Praesent sed elit ut tellus
        accumsan congue sed vitae tellus. Curabitur commodo turpis vehicula quam
        mattis, ut lobortis est hendrerit. Proin felis mauris, auctor iaculis
        mattis at, tristique eu nisi. Suspendisse ut ultricies mauris, at mollis
        sem. Suspendisse sed posuere massa.
      </div>
    );
  }
}
