import React from 'react';
import { Select } from 'antd';
const SelectCustom = ({setType,type}) => {
  function handleChange(id){
    setType(id)
  }
  return (
    <Select
    value={type}
    className='w-full'
    onChange={handleChange}
    size='large'
    showSearch
    placeholder={'Select type of product'}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'Fruits',
        label: 'Fruits',
      },
      {
        value: 'Vegetables',
        label: 'Vegetables',
      },
      {
        value: 'Spices',
        label: 'Spices',
      },
    ]}
    />
  )
};
export default SelectCustom;