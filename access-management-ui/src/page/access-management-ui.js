import React from "react";
import AppcodeSubmodule from "../component/appcode-submodule/appcode-submodule";
import InfoBanner from "../component/information-banner/information-banner";
import OnboardedTools from "../component/onboarded-tools/onboarded-tools";

import { Card } from "antd";
import ButtonContainer from "../component/button-container/button-container";

export default class AccessMngUI extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedAppcode: "",
      selectedModule: "",
      tools: [],
      roles: [],
      requestSummary: []
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

  onOnboardedToolsComplete = form => {
    this.setState({ ...form });
  };

  render() {
    return (
      <Card
        style={{ margin: 20, borderRadius: 10, backgroundColor: "#ebebeb" }}
      >
        <AppcodeSubmodule oncomplete={this.onAppcodeComplete} />
        {this.state.selectedAppcode ? <InfoBanner /> : null}
        {this.state.tools.length !== 0 ? (
          <OnboardedTools
            appcode={this.state.selectedAppcode}
            module={this.state.selectedModule}
            roles={this.state.roles}
            tools={this.state.tools}
            oncomplete={this.onOnboardedToolsComplete}
          />
        ) : null}
        {this.state.tools.length !== 0 ? (
          <ButtonContainer requestSummary={this.state.requestSummary} />
        ) : null}
      </Card>
    );
  }
}
