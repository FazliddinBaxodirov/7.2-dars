import { Modal } from 'antd'
import React from 'react'

export default function CustomModal({isOpenModal,handleYes,setIsOpenModal}) {

  return (
    <Modal
        title="Are you sure delete this product"
        open={isOpenModal}
        onOk={handleYes}
        okText='Yes'
        onCancel={() => setIsOpenModal(false)}
        cancelText='No'
      >
      </Modal>
  )
}
