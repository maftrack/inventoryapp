import React, { useState, useMemo } from 'react';
import { Form, Input, Button, Typography, Select } from 'antd';
import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
} from '@tanstack/react-table';
import Layout from '@/components/Layout';
import CustomCard from '@/components/Card';

const { Title } = Typography;
const { Option } = Select;

const AdminServiceNameManagementForm = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [serviceNames, setServiceNames] = useState([]);

  const serviceCategories = ['Suite Apps', 'Suite Consultancy']; // Example categories

  const handleAddServiceName = () => {
    if (serviceName && selectedCategory) {
      const newService = {
        key: serviceNames.length + 1,
        name: serviceName,
        description: serviceDescription,
        category: selectedCategory,
      };
      setServiceNames((prev) => [...prev, newService]);
      setServiceName('');
      setServiceDescription('');
      setSelectedCategory('');
    }
  };

  const handleDeleteServiceName = (name) => {
    setServiceNames((prev) => prev.filter((s) => s.name !== name));
  };

  // Define columns for TanStack Table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'category', // Add category to columns for grouping
        header: 'Category',
      },
      {
        accessorKey: 'name',
        header: 'Service Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'name', // Use 'name' as the key for the delete action
        header: 'Action',
        cell: ({ getValue }) => (
          <Button onClick={() => handleDeleteServiceName(getValue())}>Delete</Button>
        ),
      },
    ],
    []
  );

  // Use TanStack Table
  const table = useReactTable({
    data: serviceNames,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    initialState: useMemo(() => ({
      grouping: ['category'], // Group by category
      expanded: true, // Keep groups expanded by default
    }), []),
    state: useMemo(() => ({
      grouping: ['category'], // Force grouping by category
    }), []),
  });
  

  return (
    <Layout>
      <CustomCard title="Credit Rule Manager" style={{ maxWidth: 800, margin: 'auto' }}>
        <Title level={3}>Manage Service Names</Title>
        <Form layout="vertical">
          <Form.Item label="Service Name" required>
            <Input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Enter service name"
            />
          </Form.Item>
          <Form.Item label="Service Description" required>
            <Input.TextArea
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              placeholder="Enter service description"
              rows={4}
            />
          </Form.Item>
          <Form.Item label="Service Category" required>
            <Select onChange={setSelectedCategory} placeholder="Select a service category">
              {serviceCategories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleAddServiceName}>
              Add Service Name
            </Button>
          </Form.Item>
        </Form>

        <div className="w-full overflow-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ padding: '8px', border: '1px solid #ddd' }}
                    >
                      {cell.getIsGrouped() ? (
                        <span
                          style={{ cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={row.getToggleExpandedHandler()}
                        >
                          {row.getIsExpanded() ? '-' : '+'} {cell.getValue()} ({row.subRows.length})
                        </span>
                      ) : cell.getIsAggregated() ? (
                        flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                      ) : cell.getIsPlaceholder() ? null : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomCard>
    </Layout>
  );
};

export default AdminServiceNameManagementForm;
