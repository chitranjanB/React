import React from "react";
import { Select, Row, Col } from "antd";
import QueueAnim from "rc-queue-anim";
const { Option } = Select;

export default class AppcodeSubmodule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAppcode: "",
      selectedModule: "",
      appsList: []
    };
  }

  componentDidMount() {
    //get the appsList as an API call
    let appsList = [
      {
        appcode: "ASOT",
        appname: "ASOT (Apple Singular Office Technology)",
        primaryManager: "ChampakLal Gada",
        secondaryManager: "JethaLal Gada",
        modules: ["NONE", "NEWONE", "NEWTEST", "TEST"]
      },
      {
        appcode: "BCIF",
        appname: "BCIF (Broadcom India Federation)",
        primaryManager: "Tarak Mehta",
        secondaryManager: "Anjali Mehta",
        modules: ["NONE", "NEWONE", "NEWTEST", "TEST"]
      },
      {
        appcode: "CLIN",
        appname: "CLIN (Cisco Linter Technology)",
        primaryManager: "Popat Lal",
        secondaryManager: "...",
        modules: ["NONE", "NEWONE", "NEWTEST", "TEST"]
      }
    ];
    this.setState({ appsList });
  }

  onAppcodeChange = selectedAppcode => {
    let selectedModule = "NONE";
    this.setState({ selectedAppcode, selectedModule });
    //Make an API call and fetch all the submodules
    let form = {
      selectedAppcode,
      selectedModule: this.getSelectedModuleValue(selectedModule)
    };
    this.notifyCompleted(form);
  };

  onModuleChange = selectedModule => {
    this.setState({ selectedModule });
    let form = {
      selectedAppcode: this.state.selectedAppcode,
      selectedModule: this.getSelectedModuleValue(selectedModule)
    };
    this.notifyCompleted(form);
  };

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

  renderProjectDetails = () => {
    let appData = this.state.appsList.find(e => {
      return this.state.selectedAppcode === e.appcode;
    });
    return this.state.selectedModule ? (
      <QueueAnim delay={300} className="queue-simple">
        <Row style={{}}>
          <Row style={{ padding: 10, paddingLeft: 0 }}>
            <strong>Project Name:</strong> {appData.appcode}
          </Row>
          <Row style={{ padding: 10, paddingLeft: 0 }}>
            <strong>Primary Manager:</strong> {appData.primaryManager}
          </Row>
          <Row style={{ padding: 10, paddingLeft: 0 }}>
            <strong>Secondary Manager:</strong> {appData.secondaryManager}
          </Row>
        </Row>
      </QueueAnim>
    ) : null;
  };

  render() {
    return (
      <Row>
        <Col xs={24} sm={12} lg={12}>
          <Row style={{ paddingBottom: 5 }}>
            <strong>Appcode:</strong>
          </Row>
          <Row style={{ paddingBottom: 10 }}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Select an appcode"
              optionFilterProp="children"
              onChange={this.onAppcodeChange}
              value={this.state.selectedAppcode}
            >
              {this.state.appsList.map(appData => (
                <Option key={appData.appcode} value={appData.appcode}>
                  {appData.appname}
                </Option>
              ))}
            </Select>
          </Row>
          <Row style={{ paddingBottom: 5 }}>
            <strong>Submodule:</strong>
          </Row>
          <Row style={{ paddingBottom: 10 }}>
            <Select
              showSearch
              style={{ width: "50%" }}
              placeholder="Select a module"
              optionFilterProp="children"
              onChange={this.onModuleChange}
              //notFoundContent={fetching ? <Spin size="small" /> : null}
              notFoundContent=""
              value={this.state.selectedModule}
            >
              {this.state.selectedAppcode &&
                this.state.appsList
                  .find(
                    appData => appData.appcode === this.state.selectedAppcode
                  )
                  .modules.map(module => (
                    <Option
                      key={`${this.state.selectedAppcode}_${module}`}
                      value={module}
                    >
                      {module}
                    </Option>
                  ))}
            </Select>
          </Row>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 2 }}>
          {this.renderProjectDetails()}
        </Col>
      </Row>
    );
  }
}
