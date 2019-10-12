import React from "react";
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button
} from "antd";
import "./App.css";

const { Option } = Select;

const App = () => (
  <Form style={{ marginTop: 32 }}>
    <Form.Item
      label="Input Number"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    >
      <InputNumber min={1} max={10} defaultValue={3} />
      <span className="ant-form-text"> </span>
      <a href="https://ant.design">antd</a>
    </Form.Item>
    <Form.Item label="Switch" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Switch defaultChecked />
    </Form.Item>
    <Form.Item label="Slider" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Slider defaultValue={70} />
    </Form.Item>
    <Form.Item label="Radio" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Select defaultValue="lucy" style={{ width: 192 }}>
        <Option value="jack">jack</Option>
        <Option value="lucy">lucy</Option>
        <Option value="disabled" disabled>
          disabled
        </Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="Datepicker"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    >
      <DatePicker />
    </Form.Item>
    <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button style={{ marginLeft: 8 }}>Cancel</Button>
    </Form.Item>
  </Form>
);

export default App;
