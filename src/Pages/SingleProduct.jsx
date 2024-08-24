import { ArrowLeftOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../Hooks/UseAxios'
import { Button, Modal } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import CustomModal from '../Components/CustomModal'

export default function SingleProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [singleDate, setSingleDate] = useState({})
  const [isOpenModal,setIsOpenModal] = useState(false)

  useEffect(() => {
    useAxios().get(`list/${id}`).then(res => {
      setSingleDate(res.data)
    })
  })

  function handleYes(){
    useAxios().delete(`list/${id}`).then(res => {
      setIsOpenModal(false)
      toast.success('Successfully deleted!')
      setTimeout(() => {
        navigate('/')
      },800)
    }).catch(() => toast.error('Something Error'))
  }
  return (
    <div className='w-[700px] mx-auto mt-[120px] space-y-[40px]'>
      <Toaster position="top-right" reverseOrder={false} />
      <div onClick={() => navigate(-1)} className='flex items-center w-full'>
        <button type='button'><ArrowLeftOutlined className='scale-125' /></button>
        <h2 className='w-[85%] text-center text-[25px] font-bold capitalize'>{singleDate.name}</h2>
      </div>
      <div className='w-full'>
        <ul className='w-full border-slate-400 border-[1px] p-[10px] py-[20px] rounded-xl space-y-[15px]'>
          <li>
            <span className='font-medium text-[16px] text-slate-400'>Name</span>
            <p className='font-bold text-[24px] leading-[24px] capitalize '>{singleDate.name}</p>
          </li>
          <li>
            <span className='font-medium text-[16px] text-slate-400'>Price</span>
            <p className='font-bold text-[24px] leading-[24px] capitalize '>{singleDate.price}</p>
          </li>
          <li>
            <span className='font-medium text-[16px] text-slate-400'>Type</span>
            <p className='font-bold text-[24px] leading-[24px] capitalize '>{singleDate.type}</p>
          </li>
          <li>
            <span className='font-medium text-[16px] text-slate-400'>Date</span>
            <p className='font-bold text-[24px] leading-[24px] capitalize '>{singleDate.date}</p>
          </li>
        </ul>
        <CustomModal handleYes={handleYes}  isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}/>
      </div>
      <div className='w-full flex justify-between'>
        <Button size='large' onClick={() => navigate(`/update/${id}`)} type='primary' htmlType='submit' className='w-[49%] !bg-green-500 active:shadow-xl hover:opacity-80'>Update Product</Button>
        <Button size='large' onClick={() => setIsOpenModal(true)} type='primary' htmlType='submit' className='w-[49%] !bg-red-500 active:shadow-xl hover:opacity-80'>Delete Product</Button>
      </div>
    </div>
  )
}
