import { Form, Input, Select } from "antd";
import React from "react";
import ModalComponent from "../common/ModalComponent";
import SquadButton from "../common/SquadButton";

const AddUserGroupModal = ({ show, setShow, setLoading }: any) => {
  return (
    <ModalComponent
      show={show}
      setShow={setShow}
      title="Add Existing Users to Group"
    >
      <Form style={{ marginTop: "5rem", marginBottom: "2rem" }}>
        <Form.Item name="Add Users">
          <Select
            showSearch
            placeholder="Select Users to Add to this group"
            className="search-bar-common-select"
            style={{ width: "100%" }}
          >
            <Select.Option>Kathan</Select.Option>
            <Select.Option>Dhruv</Select.Option>
            <Select.Option>Situ</Select.Option>
          </Select>
        </Form.Item>
        <SquadButton
          type="primary"
          htmlType="submit"
          style={{ marginTop: "1rem" }}
        >
          Add
        </SquadButton>
      </Form>
    </ModalComponent>
  );
};

export default AddUserGroupModal;
