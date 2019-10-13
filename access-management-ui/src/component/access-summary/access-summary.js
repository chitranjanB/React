import React from "react";
import { Row, Col, Card, Table } from "antd";

const dataSource = [
  {
    key: "1",
    developer: "Yes",
    appLead: "No",
    codeMerger: "-",
    prodSupport: "-",
    prodDeployer: "No"
  }
];

const columns = [
  {
    title: "Developer",
    dataIndex: "developer",
    key: "developer"
  },
  {
    title: "App Lead",
    dataIndex: "appLead",
    key: "appLead"
  },
  {
    title: "Code Merger",
    dataIndex: "codeMerger",
    key: "codeMerger"
  },
  {
    title: "Prod Support",
    dataIndex: "prodSupport",
    key: "prodSupport"
  },
  {
    title: "Prod Deployer",
    dataIndex: "prodDeployer",
    key: "prodDeployer"
  }
];

export default class AccessSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  notifyCompleted = form => {
    form
      ? this.props.oncomplete(form)
      : this.props.oncomplete({
          selectedAppcode: this.state.selectedAppcode
        });
  };
  createDatasource = () => dataSource;

  render() {
    return (
      <Row>
        <Col>
          <Row style={{ paddingBottom: 5 }}>
            <strong>Access Summary:</strong>
          </Row>
          <Card style={{ paddingBottom: 10 }}>
            <Table dataSource={this.createDatasource()} columns={columns} />;
          </Card>
        </Col>
      </Row>
    );
  }
}
