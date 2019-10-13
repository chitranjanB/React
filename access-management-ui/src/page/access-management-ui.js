import React from "react";
import AppcodeSubmodule from "../component/appcode-submodule/appcode-submodule";
import InfoBanner from "../component/information-banner/information-banner";
import OnboardedTools from "../component/onboarded-tools/onboarded-tools";

import { Card } from "antd";

export default class AccessMngUI extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedAppcode: "",
      selectedModule: "",
      tools: [],
      roles: []
    };
  }

  onAppcodeComplete = form => {
    //make api call and fetch the tools information
    let { selectedModule } = form;
    let roles = ["Developer", "Code Merger"];
    let tools = [
      "bitbucket",
      "svn",
      "nexus",
      "binaryNexus",
      "jenkins",
      "devJenkins",
      "ca",
      "releaseWorkflow"
    ];

    if (selectedModule === "NEWONE") {
      tools = ["nexus", "binaryNexus", "jenkins", "ca", "releaseWorkflow"];
      roles = ["Developer"];
    } else if (selectedModule === "NEWTEST") {
      tools = ["bitbucket", "svn", "jenkins", "devJenkins", "releaseWorkflow"];
      roles = ["App Lead", "Prod Deployer"];
    } else if (selectedModule === "TEST") {
      tools = ["devJenkins", "releaseWorkflow", "ca"];
      roles = ["App Lead", "Prod Support"];
    }
    this.setState({ ...form, tools, roles });
  };

  render() {
    return (
      <Card
        style={{ margin: 20, borderRadius: 10, backgroundColor: "#ebebeb" }}
      >
        <AppcodeSubmodule oncomplete={this.onAppcodeComplete} />
        {this.state.selectedAppcode ? <InfoBanner /> : null}
        {this.state.tools.length !== 0 ? (
          <OnboardedTools roles={this.state.roles} tools={this.state.tools} />
        ) : null}
      </Card>
    );
  }
}
