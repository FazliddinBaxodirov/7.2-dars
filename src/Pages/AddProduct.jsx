import { Button, DatePicker, Input } from 'antd'
import React, { useContext, useState } from 'react'
import SelectCustom from '../Components/SelectCustom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Hooks/Context'

export default function AddProduct() {
  const navigate = useNavigate()
  const [name,setName] = useState('') 
  const [price,setPrice] = useState('') 
  const [type,setType] = useState('') 
  const [date,setDate] = useState('') 
  const changeDate = (date, dateString) => {
    setDate(dateString);
  };
  
  function handleSubmit(e){
    e.preventDefault()
    const object = {name,price,type,date}
    axios.post('http://localhost:3000/list',object)
    .then(res => {
      toast.success('Successfully saved!')
      setTimeout(() => {
        navigate('/')
      }, 800);
    }).catch(err => {
      toast.error('Something is wrong!!!')
    })
  }
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false}/>
      <form onSubmit={handleSubmit} className='w-[700px] mx-auto mt-[120px] space-y-[40px]'>
        <h2 className='text-center text-[25px] font-bold mb-[35px]'>Add Product</h2>
         <Input value={name} onChange={(e) => setName(e.target.value)} className='p-2' allowClear size='large' placeholder='Enter product name' name='name' type='text'/>
         <Input value={price} onChange={(e) => setPrice(e.target.value)} className='p-2' allowClear size='large' placeholder='Enter product price' name='price' type='number'/>
         <SelectCustom type={type} setType={setType}/>
         <DatePicker  onChange={changeDate} size='large' className='p-2 w-full'/>
         <Button size='large'  type='primary' htmlType='submit' className='w-full !bg-[#8b5800] active:shadow-xl hover:opacity-80'>Save Product</Button>
      </form>
    </div>
  )
}
