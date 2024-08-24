import { Button, DatePicker, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import SelectCustom from '../Components/SelectCustom'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useAxios } from '../Hooks/UseAxios'
import dayjs from 'dayjs'
export default function AddProduct() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [name,setName] = useState('') 
  const [price,setPrice] = useState('') 
  const [type,setType] = useState('') 
  const [date,setDate] = useState('0000-00-00') 
  const changeDate = (date, dateString) => {
    setDate(dateString);
  };
  
  function handleSubmit(e){
    e.preventDefault()
    const object = {name,price,type,date}
    if(id){
      object.id = id
      useAxios().put(`list/${id}`,object)
      .then(res => {
        toast.success('Successfully updated!')
        setTimeout(() => {
          navigate('/')
        }, 800);
      }).catch(err => {
        toast.error('Something is wrong!!!')
      })
    }
    else{
      useAxios().post('list',object)
      .then(res => {
        toast.success('Successfully saved!')
        setTimeout(() => {
          navigate('/')
        }, 800);
      }).catch(err => {
        toast.error('Something is wrong!!!')
      })
    }
  }

  const dateFormat = "YYYY-MM-DD"
  useEffect(() => {
    if(id){
      useAxios().get(`/list/${id}`).then(res => {
        setName(res.data.name)
        setPrice(res.data.price)
        setType(res.data.type)
        setDate(res.data.date)
      })
    }
  },[])

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false}/>
      <form onSubmit={handleSubmit} className='w-[700px] mx-auto mt-[120px] space-y-[40px]'>
        <div onClick={() => navigate(-1)} className='flex items-center w-full'>
        <button type='button'><ArrowLeftOutlined className='scale-125' /></button>
        <h2 className='w-[85%] text-center text-[25px] font-bold '>{id ? "Update" : "Add"} Product</h2>
        </div>
         <Input required value={name} onChange={(e) => setName(e.target.value)} className='p-2' allowClear size='large' placeholder='Enter product name' name='name' type='text'/>
         <Input required value={price} onChange={(e) => setPrice(e.target.value)} className='p-2' allowClear size='large' placeholder='Enter product price' name='price' type='number'/>
         <SelectCustom type={type} setType={setType}/>
         <DatePicker value={dayjs(date, dateFormat)}  onChange={changeDate} size='large' className='p-2 w-full'/>
         <Button size='large'  type='primary' htmlType='submit' className='w-full !bg-[#8b5800] active:shadow-xl hover:opacity-80'>{id ? 'Update' : 'Save'} Product</Button>
      </form>
    </div>
  )
}
