import React from "react";
import { Row, Icon } from "antd";

const InfoBanner = () => (
  <Row xs={5}>
    <Row style={{ padding: 5, paddingLeft: 0 }}>
      <Icon type="check-circle" style={{ paddingRight: 5, color: "green" }} />
      Request access for all the below tools
    </Row>
    <Row style={{ padding: 5, paddingLeft: 0 }}>
      <Icon type="check-circle" style={{ paddingRight: 5, color: "green" }} />
      Access will be granted in over 3 business days
    </Row>
    <Row style={{ padding: 5, paddingLeft: 0, paddingBottom: 25 }}>
      <Icon type="check-circle" style={{ paddingRight: 5, color: "green" }} />
      Choose the correct role for the module
    </Row>
  </Row>
);

export default InfoBanner;
