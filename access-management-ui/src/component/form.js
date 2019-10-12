import React from "react";
import { Form, Select, Input, Button } from "antd";
import "../App.css";

const { Option } = Select;
const FormComponent = () => (
  <Form style={{ marginTop: 32 }}>
    <Form.Item
      label="Project Name"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    >
      <Select defaultValue="Select" style={{ width: 192 }}>
        <Option value="AWER">AWER</Option>
        <Option value="SING">SING</Option>
        <Option value="BERN">BERN</Option>
      </Select>
    </Form.Item>

    <Form.Item label="Type" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Select defaultValue="Select" style={{ width: 192 }}>
        <Option value="Jira">Jira</Option>
        <Option value="Confluence">Confluence</Option>
        <Option value="Jira&Confluence">Jira and Confluence</Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Primary Owner"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    >
      <Select defaultValue="Select" style={{ width: 192 }}>
        <Option value="Rahul Dev">Rahul Dev</Option>
        <Option value="Shankar Krishnan">Shankar Krishnan</Option>
        <Option value="Mehak Singh">Mehak Singh</Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Secondary Owner"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    >
      <Select defaultValue="Select" style={{ width: 192 }}>
        <Option value="Rahul Dev">Rahul Dev</Option>
        <Option value="Shankar Krishnan">Shankar Krishnan</Option>
        <Option value="Mehak Singh">Mehak Singh</Option>
      </Select>
    </Form.Item>

    <Form.Item label="Remarks" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Input.TextArea rows={4} />
    </Form.Item>

    <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button style={{ marginLeft: 8 }}>Cancel</Button>
    </Form.Item>
  </Form>
);

export default FormComponent;
