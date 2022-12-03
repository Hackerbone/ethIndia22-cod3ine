import { Form, Input, Select } from 'antd'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import ModalComponent from '../common/ModalComponent'
import SquadButton from '../common/SquadButton'

const InviteUsersModal = ({show,setShow} : any) => {
  return (
    <ModalComponent show={show} setShow={setShow} title="Invite User to Organisation">
        <Form style={{marginTop:"5rem",marginBottom:"2rem"}}>
            <Form.Item >
                <Input placeholder="User Name" className="search-bar-common" style={{width:"100%"}} />
            </Form.Item>
            <Form.Item >
                <Input prefix={<FaEthereum />} placeholder="User Wallet Address" className="search-bar-common" style={{width:"100%"}} />
            </Form.Item>
            <Form.Item name="organisation">
                <Select placeholder="Select Organisation" className="search-bar-common-select" style={{width:"100%"}} >
                    <Select.Option>Bugbase Security</Select.Option>
                    </Select>
            </Form.Item>
            <Form.Item name="groups">
                <Select mode="multiple" placeholder="Select Groups" className="search-bar-common-select" style={{width:"100%"}} >
                    <Select.Option value="dev">Dev</Select.Option>
                    <Select.Option value="hr">HR</Select.Option>
                    <Select.Option value="marketing">Marketing</Select.Option>
                    </Select>
            </Form.Item>
            <SquadButton style={{marginTop:"2rem"}}>Invite</SquadButton>
        </Form>
    </ModalComponent>
  )
}

export default InviteUsersModal