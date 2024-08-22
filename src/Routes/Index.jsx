import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, AddProduct, SingleProduct } from '../Pages'
import Header from '../Components/Header'

export default function Index() {
    return (
        <div className='flex'>
            <div className='w-[20%]'>
                <Header />
            </div>
            <div className='w-[80%]'>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/add' element={<AddProduct />} />
                    <Route path='/product/:id' element={<SingleProduct />} />
                </Routes>
            </div>
        </div>
    )
}
