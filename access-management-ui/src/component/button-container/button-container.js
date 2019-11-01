import React from "react";
import { Row, Button, Col, Modal } from "antd";

export default class ButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  notifyCompleted = form => {
    form ? this.props.oncomplete(form) : this.props.oncomplete({});
  };

  oncompleteAccessRequest = form => {
    this.setState({ ...form });
  };

  //   validateRequest = () => {
  //     return this.props.requestSummary.some(
  //       e => e.requestedRoles.length > 0 || e.revokedRoles.length > 0
  //     );
  //   };

  //   buildRequest = () => {
  //     let { requestRoles, revokedRoles } = { ...this.props.requestSummary };
  //     return { requestRoles, revokedRoles };
  //   };

  submitRequest = () => {
    Modal.confirm({
      title: "Do you want to submit the access request?",
      content: "",
      onOk() {
        //validateRequest then buildRequest
        //TODO POST CALL with axios.post('url').body(request)
        Modal.success({
          content: "The Access request has been submitted for processing"
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      onCancel() {}
    });
  };

  render() {
    return (
      <Row style={{ padding: 10 }}>
        <Col offset={22}>
          <Button type="primary" onClick={this.submitRequest}>
            Submit
          </Button>
        </Col>
      </Row>
    );
  }
}
