import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

function JoinOrg() {
  const navigate = useNavigate();

  return (
    <Form>
      <Form.Item>
        <Input placeholder="Organization Address" />
        <Button onClick={() => navigate("/dashboard")}>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default JoinOrg;
