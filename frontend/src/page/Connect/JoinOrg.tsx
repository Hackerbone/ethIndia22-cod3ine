import React from "react";
import { Form, Input } from "antd";

function JoinOrg() {
  return (
    <Form>
      <Form.Item>
        <Input placeholder="Organization Name" />
      </Form.Item>
    </Form>
  );
}

export default JoinOrg;
