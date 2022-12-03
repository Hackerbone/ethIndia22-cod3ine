import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ show, setShow, children, title, width }: any) => {
    return (
        <Modal open={show} onCancel={() => setShow(false)} title={title} width={width || 800} className="modal-modal-component" footer={null}>
            {children}
        </Modal>
    )
}

export default ModalComponent