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
      rolesAssigned: [],
      requestedRoles: [],
      revokedRoles: [],
      queriedRoles: []
    };
  }

  notifyCompleted = form => {
    form
      ? this.props.oncomplete(form)
      : this.props.oncomplete({
          isAccessSummaryRequired: true
        });
  };

  updateRolesAssigned = (role, isChecked) => {
    let rolesAssigned = [...this.state.rolesAssigned];
    if (isChecked) {
      rolesAssigned = new Set([role, ...rolesAssigned]);
    } else {
      rolesAssigned = rolesAssigned.filter(item => role !== item);
    }
    this.setState({ rolesAssigned });
  };

  updateRequestedRoles = (role, isChecked) => {
    let requestedRoles = [...this.state.requestedRoles];
    if (isChecked) {
      //include role if checked
      requestedRoles = [...new Set([...requestedRoles, role])];
    } else {
      //remove role if unchecked
      requestedRoles = requestedRoles.filter(e => e !== role);
    }
    this.setState({ requestedRoles });
  };

  updateRevokedRoles = (role, isChecked) => {
    let rolesAssigned = [...this.props.roles];
    let revokedRoles = [...this.state.revokedRoles];
    if (isChecked) {
      //remove the role from revokedRoles
      revokedRoles = revokedRoles.filter(e => e !== role);
    } else {
      //if unchecked role is in roles assigned, then add to revoked roles array
      revokedRoles = rolesAssigned.includes(role)
        ? [...new Set([...revokedRoles, role])]
        : [...revokedRoles];
    }
    this.setState({ revokedRoles });
  };

  updateQueriedRoles = role => {
    let queriedRoles = [...new Set([...this.state.queriedRoles, role])];
    this.setState({ queriedRoles });
  };

  onChange = e => {
    let currentRole = e.target.name;
    let isChecked = e.target.checked;

    this.updateRolesAssigned(currentRole, isChecked);
    this.updateRequestedRoles(currentRole, isChecked);
    this.updateRevokedRoles(currentRole, isChecked);
    this.updateQueriedRoles(currentRole);

    this.notifyCompleted();
  };

  render() {
    let checkedRoles = [
      ...new Set([...this.props.roles, ...this.state.requestedRoles])
    ];
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
                  checked={checkedRoles.includes(role)}
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
