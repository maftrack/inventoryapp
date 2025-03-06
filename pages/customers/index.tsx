import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout';
import CustomCard from '@/components/Card';

const { Title } = Typography;

const CustomersList = () => {
    const router = useRouter();
    const [customers, setCustomers] = useState([]);

    // Fetch customers from the API
    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            toast.error(error.message || 'Failed to fetch customers');
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAddCustomer = () => {
        router.push('/customers/add');
    };

    const handleEditCustomer = (customerId) => {
        router.push(`/customers/edit?id=${customerId}`);
    };
    
    const handleDeleteCustomer = async (id, fullName) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
     throw new Error('Failed to delete customer');
            }
    
            toast.success(`${fullName} has been deleted successfully`);
            // Refresh the customer list or update the state accordingly
        } catch (error) {
            toast.error(error.message || 'Failed to delete customer');
        }
    };

    const columns = [
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Telephone', dataIndex: 'telephone', key: 'telephone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEditCustomer(record.id)} icon={<EditOutlined />}>
                        Edit
                    </Button>
                    <Popconfirm
                        title={`Are you sure to delete "${record.fullName}"?`}
                        onConfirm={() => handleDeleteCustomer(record.id, record.fullName)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <Layout>
            <CustomCard title="Customers">
            <div style={{ padding: '20px' }}>
                <Title level={4}>Customer Management</Title>
                <Button type="primary" onClick={handleAddCustomer} style={{ marginBottom: '20px' }}>
                    Add Customer
                </Button>
                <Table
                    dataSource={customers}
                    columns={columns}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 5 }} // Client-side pagination
                />
                <ToastContainer />
            </div>
            </CustomCard>
        </Layout>
    );
};

export default CustomersList;