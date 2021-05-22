import React from "react";
import { Row, Col, Card, Table } from "antd";
import styled from "styled-components";

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #000000d4;
    color: white;
  }
`;

const columns = [
  {
    title: "App Code",
    dataIndex: "appcode",
    key: "appcode"
  },
  {
    title: "Module",
    dataIndex: "module",
    key: "module"
  },
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

  /**
   * Concats the appcode and module and builds the key
   */
  buildKey() {
    return `${this.props.appcode}_${this.props.module}`;
  }

  /**
   * Splits key in requestSummary props delimited with underscore(_)
   */
  splitKey(key) {
    return key && key.split("_");
  }

  /**
   * Creates a datasource to drive the access summary table.
   */
  createDatasource = () => {
    let dataSource = [...this.props.requestSummary]
      //remove elements that are not changed
      .filter(e => {
        let { requestedRoles, revokedRoles, queriedRoles } = e;
        return (
          requestedRoles.length !== 0 ||
          queriedRoles.length !== 0 ||
          revokedRoles.length !== 0
        );
      })
      .map((e, i) => {
        let [appcode, module] = this.splitKey(e.key);
        return {
          key: i,
          appcode: appcode,
          module: module === "null" ? "NONE" : module,
          developer: this.isAccessNeeded(e, "Developer"),
          appLead: this.isAccessNeeded(e, "App Lead"),
          codeMerger: this.isAccessNeeded(e, "Code Merger"),
          prodSupport: this.isAccessNeeded(e, "Prod Support"),
          prodDeployer: this.isAccessNeeded(e, "Prod Deployer")
        };
      });
    return dataSource;
  };

  /**
   * This method identifies whether user needs access to show in access summary table
   */
  isAccessNeeded(currentSummary, role) {
    let {
      rolesAssigned,
      requestedRoles,
      revokedRoles,
      queriedRoles
    } = currentSummary;
    if (requestedRoles.includes(role)) {
      return "Yes";
    } else if (
      queriedRoles.includes(role) &&
      rolesAssigned.includes(role) &&
      !requestedRoles.includes(role) &&
      !revokedRoles.includes(role)
    ) {
      return "Yes";
    } else if (revokedRoles.includes(role) || queriedRoles.includes(role)) {
      return "No";
    } else if (!queriedRoles.includes(role)) {
      return "-";
    }
  }

  /**
   * Idenfifies whether the user has requested/revoked/queried for any role
   */
  isAccessSummaryNeeded() {
    return this.props.requestSummary.length !== 0
      ? this.props.requestSummary.some(
          e =>
            e.requestedRoles.length !== 0 ||
            e.revokedRoles.length !== 0 ||
            e.queriedRoles.length !== 0
        )
      : false;
  }

  render() {
    return (
      <div>
        {this.isAccessSummaryNeeded() ? (
          <Row>
            <Col>
              <Row style={{ paddingBottom: 5 }}>
                <strong>Access Summary:</strong>
              </Row>
              <Card style={{ paddingBottom: 10 }}>
                <StyledTable
                  dataSource={this.createDatasource()}
                  columns={columns}
                  pagination={false}
                  bordered={true}
                />
              </Card>
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }
}
