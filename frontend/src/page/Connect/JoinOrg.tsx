import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

function JoinOrg({ provider }: { provider: any }) {
  const navigate = useNavigate();

  return (
    <Form
      onFinish={(values) => {
        console.log(values);
        navigate("/dashboard");
      }}
    >
      <Form.Item>
        <Input placeholder="Organization Address" />
        <Button>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default JoinOrg;
