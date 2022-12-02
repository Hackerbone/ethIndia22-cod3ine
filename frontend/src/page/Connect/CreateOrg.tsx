import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

function CreateOrg() {
  const navigate = useNavigate();

  return (
    <Form>
      <Form.Item>
        <Input placeholder="Organization Name" />
        <Button onClick={() => navigate("/dashboard")}>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default CreateOrg;
