import React from "react";
import { Button, Form, Input } from "antd";
import { addEmployee, getAllEmployees } from "../../services/services";

function AddEmployee() {
  return (
    <>
      <Form
        onFinish={async (values) => {
          console.log(values);
          const res = await addEmployee(
            values.employeeWalletAddress,
            values.employeeName
          );

          console.log("Add employee res", res);
        }}
        layout="vertical"
      >
        <h1 className="heading">Add an employee to your Organization</h1>
        <p>
          You just require the employee's wallet address and name to add them to
          your organization.
        </p>
        <br />
        <Form.Item
          label="Employee Name"
          name="employeeName"
          rules={[
            {
              required: true,
              message: "Please input your employee name!",
            },
          ]}
        >
          <Input placeholder="Someone Joe" />
        </Form.Item>
        <Form.Item
          label="Employee Wallet Address"
          name="employeeWalletAddress"
          rules={[
            {
              required: true,
              message: "Please input your employee EOC ID!",
            },
          ]}
        >
          <Input placeholder="0x..." />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Employee to Organization
        </Button>
      </Form>
    </>
  );
}

export default AddEmployee;
