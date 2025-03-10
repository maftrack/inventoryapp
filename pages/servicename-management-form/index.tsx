import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Typography, Popconfirm } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; // For generating GUIDs
import LayoutComponent from '../../components/Layout';
import CustomCard from '@/components/Card';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Option } = Select;

const ServiceListForm = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [form] = Form.useForm();

    // Fetch services from the API
    const fetchServices = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setServices(data);
            } else {
                throw new Error('Failed to fetch services');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                throw new Error('Failed to fetch categories');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchCategories();
    }, []);

    const handleAddService = async (values) => {
        console.log('Adding Service:', values); // Debugging line
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, id: uuidv4() }),
            });
            if (response.ok) {
                toast.success('Service added successfully');
                fetchServices();
                setIsModalVisible(false);
                form.resetFields();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add service');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleEditService = async (values) => {
        try {
            // Prepare the updated service data
            const updatedService = {
                Id: editingService.id,
               Servicename: values.servicename,
                Description: values.description,
                Categoryid: values.categoryid, 
            };
            console.log(editingService);
            // Send PUT request to update the service
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${editingService.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedService),
            });
    
            if (!response.ok) throw new Error('Failed to update service');
    
            toast.success('Service updated successfully');
    
            // Fetch updated list of services
            await fetchServices();
    
            // Hide the edit modal and reset the editing state
            setIsEditModalVisible(false);
            setEditingService(null);
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    

    const handleDeleteService = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('Service deleted successfully');
                fetchServices();
            } else {
                throw new Error('Failed to delete service');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <LayoutComponent>
            <CustomCard title="Service List">
                <div className="p-6">
                    <Title level={4}>Manage Services</Title>
                    <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                        Add Service
                    </Button>
                    <Table dataSource={services} rowKey="id" bordered pagination={{ pageSize: 5 }}>
    <Table.Column title="Service Name" dataIndex="servicename" />
    <Table.Column title="Description" dataIndex="description" />
    <Table.Column title="Category" dataIndex="categoryid" render={(categoryId) => {
        const category = categories.find(cat => cat.categoryid === categoryId); // Fix categoryId matching
        return category ? category.categoryName : 'N/A';
    }} />
    <Table.Column
        title="Actions"
        render={(text, record) => (
            <>
              <Button
  type="link" // Use 'link' type for a more icon-like appearance
  icon={<EditOutlined />}
  onClick={() => {
    setEditingService(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  }}
/>
<Popconfirm
  title="Are you sure to delete this service?"
  onConfirm={() => handleDeleteService(record.id)}
>
  <Button type="link" danger icon={<DeleteOutlined />} />
</Popconfirm>
            </>
        )}
    />
</Table>


                    <Modal
                        title="Add Service"
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                    >
                        <Form form={form} onFinish={handleAddService} layout="vertical">
                            <Form.Item
                                name="servicename"
                                label="Service Name"
                                rules={[{ required: true, message: 'Please input the service name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="Description" label="Description">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="categoryid"
                                label="Set the Category"
                                rules={[{ required: true, message: 'Please select the category!' }]}
                            >
                                <Select placeholder="Please select the category">
                                    {categories.map(category => (
                                        <Option key={category.categoryid} value={category.categoryid}>{category.categoryName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Add</Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        title="Edit Service"
                        visible={isEditModalVisible}
                        onCancel={() => {
                            setIsEditModalVisible(false);
                            setEditingService(null);
                        }}
                        footer={null}
                    >
                        <Form form={form} onFinish={handleEditService} layout="vertical">
                            <Form.Item
                                name="servicename"
                                label="Service Name"
                                rules={[{ required: true, message: 'Please input the service name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="categoryid"
                                label="Category"
                                rules={[{ required: true, message: 'Please select the category!' }]}
                            >
                                <Select placeholder="Please select the category">
                                    {categories.map(category => (
                                        <Option key={category.categoryid} value={category.categoryid}>{category.categoryName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Update</Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                    <ToastContainer />
                </div>
            </CustomCard>
        </LayoutComponent>
    );
};

export default ServiceListForm;