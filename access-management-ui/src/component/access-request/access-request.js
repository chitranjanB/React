import React from "react";
import { Row, Col, Card, Checkbox } from "antd";

const availableRoles = [
  "Developer",
  "App Lead",
  "Code Merger",
  "Prod Support",
  "Prod Deployer"
];

export default class AccessRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestSummary: [],
      isAccessSummaryRequired: false
    };
  }

  componentDidMount() {
    let requestSummary = this.createEntryForUnvisited();
    this.setState({ requestSummary });
    this.notifyCompleted({
      requestSummary,
      isAccessSummaryRequired: this.state.isAccessSummaryRequired
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { appcode, module } = this.props;
    if (prevProps.appcode !== appcode || prevProps.module !== module) {
      if (!this.hasCurrentRequestSummaryData()) {
        //This is first visit to this module
        let requestSummary = this.createEntryForUnvisited();
        this.setState({ requestSummary });
        this.notifyCompleted({ requestSummary });
      }
    }
  }

  createEntryForUnvisited() {
    let checkedItems = [...this.props.roles];
    const requestedRoles = [];
    const revokedRoles = [];
    const queriedRoles = [];
    let requestSummary = [...this.state.requestSummary];

    let data = this.buildRequestSummaryData(
      checkedItems,
      requestedRoles,
      revokedRoles,
      queriedRoles
    );
    data.rolesAssigned = [...this.props.roles];

    requestSummary.push(data);
    return requestSummary;
  }

  notifyCompleted = form => {
    form
      ? this.props.oncomplete(form)
      : this.props.oncomplete({
          isAccessSummaryRequired: this.state.isAccessSummaryRequired
        });
  };

  isChecked(role) {
    if (this.hasCurrentRequestSummaryData()) {
      let { checkedItems } = this.getCurrentRequestSummaryData();
      return role && checkedItems && checkedItems.includes(role);
    }
    return false;
  }

  buildKey() {
    return `${this.props.appcode}_${this.props.module}`;
  }

  hasCurrentRequestSummaryData() {
    return (
      this.state.requestSummary &&
      this.state.requestSummary.some(e => e.key === this.buildKey())
    );
  }

  getCurrentRequestSummaryData() {
    let requestSummaryForAppcodeModule =
      this.state.requestSummary &&
      this.state.requestSummary.find(e => e.key === this.buildKey());

    return { ...requestSummaryForAppcodeModule };
  }

  updateCheckedStatus = (role, isChecked) => {
    if (!this.hasCurrentRequestSummaryData) {
      //fallback, in exceptional cases
      throw new Error("no request summary while updateCheckedStatus");
    }
    let { checkedItems } = this.getCurrentRequestSummaryData();
    checkedItems = [...checkedItems];
    let modifiedRoles = [];
    if (isChecked) {
      modifiedRoles = [...new Set([role, ...checkedItems])];
    } else {
      modifiedRoles = checkedItems.filter(e => e !== role);
    }
    checkedItems = [...modifiedRoles];
    return checkedItems;
  };

  updateRequestedRoles = (role, isChecked) => {
    if (!this.hasCurrentRequestSummaryData) {
      //fallback, in exceptional cases
      throw new Error("no request summary while updateRequestedRoles");
    }
    let requestSummary = this.getCurrentRequestSummaryData();
    let { requestedRoles } = requestSummary;
    let { rolesAssigned } = requestSummary;
    if (isChecked) {
      //include role if checked and not already assigned
      requestedRoles = rolesAssigned.includes(role)
        ? [...new Set([...requestedRoles])]
        : [...new Set([...requestedRoles, role])];
    } else {
      //remove role if unchecked
      requestedRoles = requestedRoles.filter(e => e !== role);
    }
    return requestedRoles;
  };

  updateRevokedRoles = (role, isChecked) => {
    let rolesAssigned = [...this.props.roles];
    if (!this.hasCurrentRequestSummaryData) {
      throw new Error("no request summary while updateRevokedRoles");
    }
    let { revokedRoles } = this.getCurrentRequestSummaryData();
    if (isChecked) {
      //remove the role from revokedRoles
      revokedRoles = revokedRoles.filter(e => e !== role);
    } else {
      //if unchecked role is in roles assigned, then add to revoked roles array
      revokedRoles = rolesAssigned.includes(role)
        ? [...new Set([...revokedRoles, role])]
        : [...revokedRoles];
    }
    return revokedRoles;
  };

  updateQueriedRoles = role => {
    let { queriedRoles } = this.getCurrentRequestSummaryData();
    queriedRoles = [...new Set([...queriedRoles, role])];
    return queriedRoles;
  };

  onChange = e => {
    let currentRole = e.target.name;
    let isChecked = e.target.checked;

    let checkedItems = this.updateCheckedStatus(currentRole, isChecked);
    let requestedRoles = this.updateRequestedRoles(currentRole, isChecked);
    let revokedRoles = this.updateRevokedRoles(currentRole, isChecked);
    let queriedRoles = this.updateQueriedRoles(currentRole);
    let rolesAssigned = [...this.props.roles];

    let requestSummary = [...this.state.requestSummary];
    //if request summary is having key, update
    if (requestSummary.some(e => e.key === this.buildKey())) {
      requestSummary = requestSummary.map(e => {
        if (e.key === this.buildKey()) {
          let data = this.buildRequestSummaryData(
            checkedItems,
            requestedRoles,
            revokedRoles,
            queriedRoles
          );
          data.rolesAssigned = rolesAssigned;
          return data;
        }
        return e;
      });
    } else {
      let data = this.buildRequestSummaryData(
        checkedItems,
        requestedRoles,
        revokedRoles,
        queriedRoles
      );
      data.rolesAssigned = rolesAssigned;
      requestSummary.push(data);
    }
    //else request summary not having key, push
    this.setState({ requestSummary, isAccessSummaryRequired: true });
    this.notifyCompleted({ requestSummary, isAccessSummaryRequired: true });
  };

  buildRequestSummaryData(
    checkedItems,
    requestedRoles,
    revokedRoles,
    queriedRoles
  ) {
    let data = {};
    data.key = this.buildKey();
    data.checkedItems = checkedItems;
    data.requestedRoles = requestedRoles;
    data.revokedRoles = revokedRoles;
    data.queriedRoles = queriedRoles;
    return data;
  }

  render() {
    return (
      <Row>
        <Col>
          <Row style={{ paddingBottom: 5 }}>
            <strong>Access Request:</strong>
          </Row>
          <Card style={{ paddingBottom: 10, backgroundColor: "lightgrey" }}>
            <Row>
              {availableRoles.map(role => (
                <Checkbox
                  name={role}
                  key={role}
                  onChange={this.onChange}
                  checked={this.isChecked(role)}
                >
                  {role}
                </Checkbox>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
