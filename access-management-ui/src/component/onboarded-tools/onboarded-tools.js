import React from "react";
import { Row, Col, Card, Icon } from "antd";
import AccessRequest from "../access-request/access-request";
import AccessSummary from "../access-summary/access-summary";

export default class OnboardedTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAppcode: "",
      selectedModule: "",
      isAccessSummaryRequired: false
    };
  }

  availableTools = [
    "bitbucket",
    "svn",
    "nexus",
    "binaryNexus",
    "jenkins",
    "devJenkins",
    "ca",
    "releaseWorkflow"
  ];

  componentDidMount() {}

  notifyCompleted = form => {
    form
      ? this.props.oncomplete(form)
      : this.props.oncomplete({
          selectedAppcode: this.state.selectedAppcode,
          selectedModule: this.getSelectedModuleValue(this.state.selectedModule)
        });
  };

  getSelectedModuleValue = selectedModule =>
    selectedModule === "" || selectedModule === "NONE" ? null : selectedModule;

  oncompleteAccessRequest = form => {
    this.setState({ ...form });
  };

  render() {
    return (
      <Row>
        <Col>
          <Row style={{ paddingBottom: 5 }}>
            <strong>Onboarded Tools:</strong>
          </Row>
          <Card style={{ paddingBottom: 10 }}>
            <Row>
              {this.availableTools
                .filter(tool => this.props.tools.includes(tool))
                .map(tool => {
                  return (
                    <span
                      key={tool}
                      style={{
                        borderStyle: "solid",
                        borderColor: "green",
                        marginRight: 10,
                        padding: 5,
                        marginBottom: 20,
                        lineHeight: 3
                      }}
                    >
                      <Icon type="tool" style={{ paddingRight: 5 }} />
                      {tool}
                    </span>
                  );
                })}
            </Row>
            <Row>
              <AccessRequest
                roles={this.props.roles}
                oncomplete={this.oncompleteAccessRequest}
              />
            </Row>
            {this.state.isAccessSummaryRequired ? (
              <Row>
                <AccessSummary />
              </Row>
            ) : null}
          </Card>
        </Col>
      </Row>
    );
  }
}
