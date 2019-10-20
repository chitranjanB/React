import React from "react";
import { Row, Col, Card, Icon } from "antd";
import AccessRequest from "../access-request/access-request";
import AccessSummary from "../access-summary/access-summary";

export default class OnboardedTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestSummary: [],
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

  notifyCompleted = form => {
    form ? this.props.oncomplete(form) : this.props.oncomplete({});
  };

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
                appcode={this.props.appcode}
                module={this.props.module}
                roles={this.props.roles}
                oncomplete={this.oncompleteAccessRequest}
              />
            </Row>
            {this.state.isAccessSummaryRequired ? (
              <Row>
                <AccessSummary
                  appcode={this.props.appcode}
                  module={this.props.module}
                  requestSummary={this.state.requestSummary}
                />
              </Row>
            ) : null}
          </Card>
        </Col>
      </Row>
    );
  }
}
