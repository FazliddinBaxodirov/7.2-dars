import React, { useContext } from 'react';
import { Table } from 'antd';
import { Context } from '../Hooks/Context';
const columns = [
  {
    title: 'ID',
    dataIndex:'ID'
  },
    {
      title: 'Name',
      dataIndex: 'name',
    },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const TableCustom = ({isLoading}) => {
    const {products} = useContext(Context)
    return(
        <Table
        loading={isLoading}
        columns={columns}
        dataSource={products}
        onChange={onChange}
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
      />
    )
};
export default TableCustom;