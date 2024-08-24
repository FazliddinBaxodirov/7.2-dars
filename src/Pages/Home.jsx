import React, { useContext, useEffect, useState } from 'react'
import TableCustom from '../Components/TableCustom'
import axios from 'axios'
import { Context } from '../Hooks/Context'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Input } from 'antd'

export default function Home() {
  const navigate = useNavigate()
  const {products,setProducts} = useContext(Context)
  const [isLoading,setIsloading] = useState(false)
  const [refresh,setRefresh] = useState(false)
  useEffect(() => {
    axios('http://localhost:3000/list')
    .then(res => {
      res.data.map((item,index) => {
        item.key = Math.random()
        item.ID = index + 1 
        item.action = <div className='flex items-center justify-between w-[100px] space-x-[6px]'>
          <button onClick={() => navigate(`update/${item.id}`)} className='text-green-500 border-[0.5px] border-green-500 rounded-[50%] hover:text-white hover:bg-green-500 hover:border-green-500 w-[30px] h-[30px] active:shadow-md active:shadow-green-300 '><EditOutlined/></button>
          <button onClick={() => handleDelete(item.id)} className='text-red-500 border-[0.5px] border-red-500 rounded-[50%] hover:text-white hover:bg-red-500 hover:border-red-500 w-[30px] h-[30px] active:shadow-md active:shadow-red-300 '><DeleteOutlined/></button>
          <button onClick={() => navigate(item.id)} className='text-blue-500 border-[0.5px] border-blue-500 rounded-[50%] hover:text-white hover:bg-blue-500 hover:border-blue-500 w-[30px] h-[30px] active:shadow-md active:shadow-red-300 '><MoreOutlined /></button>
        </div>
    })
    setProducts(res.data)
    setIsloading(false)
  })
  },[refresh])

  function handleDelete(id){
    axios.delete(`http://localhost:3000/list/${id}`).then(res => {
      setIsloading(true)
      setTimeout(() => 
        {setRefresh(!refresh)
          toast.success('Successfully deleted!')
      },800)
    })
  }

  function handleSearch(e){
    const value = e.target.value.toLowerCase()
    const searchedList = products.filter(item => item.name.toLowerCase().includes(value))
    setIsloading(true)
    if(value){
      setTimeout(() => {
        setProducts(searchedList)
        setIsloading(false)
      }, 800);
    }
    else{
      setRefresh(!refresh)
      setIsloading(false)
    }
  }
  return (
    <div className='mx-auto w-[900px] mt-[80px]'>
      <Toaster position="top-right" reverseOrder={false}/>
      <div className='flex items-center justify-between mb-[20px]'>
        <h2 className='font-bold text-[35px]'>Products</h2>
        <p className='font-medium text-[22px]'>Count({products.length})</p>
      </div>
      <div>
        <Input onChange={handleSearch} type='text' placeholder='Search...' className='p-[4px] my-[15px] py-[10px] pl-[15px]'/>
      </div>
      <div>
        <TableCustom isLoading={isLoading}/>
      </div>
      <button onClick={() => navigate('/add')} className='w-[120px] font-bold text-white bg-[#8b5800] py-[9px] rounded-md mt-[18px] ml-[87%]'>Add Products</button>
    </div>
  )
}
