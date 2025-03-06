// components/CreditHistoryTable.tsx
import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from '@tanstack/react-table';
import { Table, Typography, Input, Row, Col } from 'antd';
import CustomCard from '@/components/Card';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { Search } = Input;

const CreditHistoryTable = () => {
  const data = useMemo(
    () => [
      { id: '1', date: '2025-02-11 00:00', value: 1000, status: 'Complete', modifiedBy: 'Admin1' },
      { id: '2', date: '2025-02-10 14:30', value: 500, status: 'Pending', modifiedBy: 'Admin2' },
      { id: '3', date: '2025-02-09 09:15', value: 750, status: 'Complete', modifiedBy: 'Admin1' },
      { id: '4', date: '2025-02-08 11:45', value: 1200, status: 'Complete', modifiedBy: 'Admin3' },
      { id: '5', date: '2025-02-07 16:00', value: 300, status: 'Pending', modifiedBy: 'Admin2' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => new Date(a.date) - new Date(b.date) },
      { title: 'Value', dataIndex: 'value', key: 'value', sorter: (a, b) => a.value - b.value },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Modified By', dataIndex: 'modifiedBy', key: 'modifiedBy' },
    ],
    []
  );

  const [searchText, setSearchText] = useState('');

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(
      value => value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Layout>
        <div style={{ padding: '20px' }}>
      <CustomCard title="Credit History">
        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
          <Col>
            <Title level={3}>Credit History</Title>
          </Col>
          <Col>
            <Search
              placeholder="Search..."
              onChange={e => handleSearch(e.target.value)}
              style={{ width: '200px' }}  // Set the width of the search box
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </CustomCard>
    </div> 
    </Layout>
   
  );
};

export default CreditHistoryTable;
