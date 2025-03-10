import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Popconfirm } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; // For generating GUIDs
import LayoutComponent from '../../components/Layout';
import CustomCard from '@/components/Card';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PricingCategoryForm = () => {
    const [pricingCategories, setPricingCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form] = Form.useForm();
    const [dynamicColumns, setDynamicColumns] = useState([]); // State for dynamic columns

    // Fetch pricing categories from the API
    const fetchPricingCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricingcategories`);
            if (!response.ok) {
                throw new Error('Failed to fetch pricing categories');
            }
            const data = await response.json();
            console.log("Fetched Pricing Categories:", data); // Log the fetched data
            setPricingCategories(data);
        } catch (error) {
            toast.error('Failed to fetch pricing categories');
        }
    };

    useEffect(() => {
        fetchPricingCategories();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
        setDynamicColumns([]); // Reset dynamic columns when opening the modal
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const newPricingCategory = {
                id: uuidv4(), // Generate a new GUID
                pricingCategoryName: values.name,
                description: values.description,
                volumeBase: values.volumeBase,
                PricingCategoryDynamicColumns: dynamicColumns.map(col => ({ ColumnHeader: col.columnHeader })), // Prepare dynamic columns for saving
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricingcategories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPricingCategory),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add pricing category');
            }

            const addedPricingCategory = await response.json();
            setPricingCategories([...pricingCategories, addedPricingCategory]);
            handleCancel();
            toast.success('Pricing Category added successfully!');
            await fetchPricingCategories();
        } catch (error) {
            toast.error(error.message || 'Failed to add pricing category');
        }
    };

    const handleDelete = async (id, pricingCategoryName) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricingcategories/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete pricing category');
            }

            setPricingCategories(pricingCategories.filter((category) => category.id !== id));
            toast.success(`Pricing Category "${pricingCategoryName}" deleted successfully!`);
        } catch (error) {
            toast.error(error.message || 'Failed to delete pricing category');
        }
    };
    const showEditModal = (category) => {
        setEditingCategory(category);
        setIsEditModalVisible(true);
        form.setFieldsValue({
            name: category.pricingCategoryName,
            description: category.description,
            volumeBase: category.volumeBase,
        });
    
        // Check if pricingCategoryDynamicColumns exists and is an array
        const dynamicColumnsData = Array.isArray(category.pricingCategoryDynamicColumns)
            ? category.pricingCategoryDynamicColumns.map(col => ({ id: col.id, columnHeader: col.columnHeader }))
            : []; // Default to an empty array if it doesn't exist
    
        setDynamicColumns(dynamicColumnsData); // Load dynamic columns for editing
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setEditingCategory(null);
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedCategory = {
                ...editingCategory,
                pricingCategoryName: values.name,
                description: values.description,
                volumeBase: values.volumeBase,
                PricingCategoryDynamicColumns: dynamicColumns.map(col => ({ ColumnHeader: col.columnHeader })), // Prepare dynamic columns for saving
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricingcategories/${editingCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                throw new Error('Failed to update pricing category');
            }

            setPricingCategories(pricingCategories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));
            handleEditCancel();
            toast.success('Pricing Category updated successfully!');
        } catch (error) {
            toast.error('Failed to update pricing category');
        }
    };

    const handleAddDynamicColumn = () => {
        setDynamicColumns([...dynamicColumns, { id: uuidv4(), columnHeader: '' }]); // Add a new dynamic column
    };

    const handleDynamicColumnChange = (id, value) => {
        setDynamicColumns(dynamicColumns.map(col => (col.id === id ? { ...col, columnHeader: value } : col)));
    };

    const handleRemoveDynamicColumn = (id) => {
        setDynamicColumns(dynamicColumns.filter(col => col.id !== id)); // Remove the dynamic column
    };

    const columns = [
        { title: 'Pricing Category Name', dataIndex: 'pricingCategoryName', key: 'pricingCategoryName' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Volume Base', dataIndex: 'volumeBase', key: 'volumeBase' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />} />
                    <Popconfirm
                        title={`Are you sure to delete "${record.pricingCategoryName}"?`}
                        onConfirm={() => handleDelete(record.id, record.pricingCategoryName)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <LayoutComponent>
            <CustomCard title="Pricing Category Management">
                <div className="p-6">
                    <Title level={4}>Manage Pricing Categories</Title>
                    <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                        Add Pricing Category
                    </Button>
                    <Table
                        dataSource={pricingCategories}
                        columns={columns}
                        rowKey="id"
                        bordered
                        pagination={{ pageSize: 5 }} // Client-side pagination
                    />

                    <Modal title="Add Pricing Category" visible={isModalVisible} onCancel={handleCancel} onOk={handleSave}>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Pricing Category Name"
                                rules={[ { required: true, message: 'Please input the pricing category name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input the description!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="volumeBase"
                                label="Volume Base"
                                rules={[{ required: true, message: 'Please input the volume base!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <div>
                                <Title level={5}>Dynamic Columns</Title>
                                {dynamicColumns.map((col) => (
                                    <div key={col.id} style={{ display: 'flex', marginBottom: 8 }}>
                                        <Input
                                            placeholder="Column Header"
                                            value={col.columnHeader}
                                            onChange={(e) => handleDynamicColumnChange(col.id, e.target.value)}
                                            style={{ marginRight: 8 }}
                                        />
                                        <Button type="danger" onClick={() => handleRemoveDynamicColumn(col.id)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={handleAddDynamicColumn} style={{ width: '100%' }}>
                                    Add Dynamic Column
                                </Button>
                            </div>
                        </Form>
                    </Modal>

                    <Modal title="Edit Pricing Category" visible={isEditModalVisible} onCancel={handleEditCancel} onOk={handleEditSave}>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Pricing Category Name"
                                rules={[{ required: true, message: 'Please input the pricing category name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input the description!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="volumeBase"
                                label="Volume Base"
                                rules={[{ required: true, message: 'Please input the volume base!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <div>
                                <Title level={5}>Dynamic Columns</Title>
                                {dynamicColumns.map((col) => (
                                    <div key={col.id} style={{ display: 'flex', marginBottom: 8 }}>
                                        <Input
                                            placeholder="Column Header"
                                            value={col.columnHeader}
                                            onChange={(e) => handleDynamicColumnChange(col.id, e.target.value)}
                                            style={{ marginRight: 8 }}
                                        />
                                        <Button type="danger" onClick={() => handleRemoveDynamicColumn(col.id)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={handleAddDynamicColumn} style={{ width: '100%' }}>
                                    Add Dynamic Column
                                </Button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </CustomCard>
            <ToastContainer />
        </LayoutComponent>
    );
};

export default PricingCategoryForm;