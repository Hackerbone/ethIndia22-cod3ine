import { Form, Input } from 'antd'
import React from 'react'
import ModalComponent from '../common/ModalComponent'
import SquadButton from '../common/SquadButton'

const CreateGroupModal = ({show,setShow} : any) => {
  return (
    <ModalComponent show={show} setShow={setShow} title="Create a Group">
        <Form style={{marginTop:"5rem",marginBottom:"2rem"}}>
            <Form.Item >
                <Input placeholder="Group Name" className="search-bar-common" style={{width:"100%"}} />
            </Form.Item>
            <SquadButton>Add</SquadButton>
        </Form>
    </ModalComponent>
  )
}

export default CreateGroupModal