import React from "react";

import { Button, Form, Input } from "antd";
import { addEmployee } from "../../services/services";
// import { useNavigate } from "react-router-dom";

function AddEmployee() {
  return (
    <Form
      onFinish={async (values) => {
        console.log(values);
        let res = await addEmployee(
          values.employeeAddress,
          values.employeeName
        );
        console.log(res);
        // navigate("/dashboard");
      }}
    >
      <Form.Item name="employeeAddress">
        <Input placeholder="Address of emp" />
      </Form.Item>

      <Form.Item name="employeeName">
        <Input placeholder="employeename" />
      </Form.Item>

      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}

export default AddEmployee;
