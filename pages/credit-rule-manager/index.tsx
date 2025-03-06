import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Layout, Typography, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; // For generating GUIDs
import LayoutComponent from '../../components/Layout';
import CustomCard from '@/components/Card';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;

const CreditRuleForm = () => {
    const router = useRouter();
    const [creditRules, setCreditRules] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [form] = Form.useForm();

    // Fetch credit rules from the API
    const fetchCreditRules = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creditrules`);
            if (!response.ok) {
                throw new Error('Failed to fetch credit rules');
            }
            const data = await response.json();
            setCreditRules(data);
        } catch (error) {
            toast.error('Failed to fetch credit rules');
        }
    };

    useEffect(() => {
        fetchCreditRules();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const newCreditRule = {
                id: uuidv4(), // Generate a new GUID
                creditrulename: values.name,
                description: values.description,
                // DateCreated will be set on the server
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creditrules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCreditRule),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add credit rule');
            }

            const addedCreditRule = await response.json();
            setCreditRules([...creditRules, addedCreditRule]);
            handleCancel();
            toast.success('Credit Rule added successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to add credit rule');
        }
    };

    const handleDelete = async (id, creditrulename) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creditrules/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete credit rule');
            }

            setCreditRules(creditRules.filter((rule) => rule.id !== id));
            toast.success(`Credit Rule "${creditrulename}" deleted successfully!`);
        } catch (error) {
            toast.error(error.message || 'Failed to delete credit rule');
        }
    };

    const showEditModal = (rule) => {
        setEditingRule(rule);
        setIsEditModalVisible(true);
        form.setFieldsValue({
            name: rule.creditrulename,
            description: rule.description,
        });
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setEditingRule(null);
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedRule = {
                ...editingRule,
                creditrulename: values.name,
                description: values.description,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creditrules/${editingRule.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRule),
            });

            if (!response.ok) {
                throw new Error('Failed to update credit rule');
            }

            setCreditRules(creditRules.map((rule) => (rule.id === updatedRule.id ? updatedRule : rule)));
            handleEditCancel();
            toast.success('Credit Rule updated successfully!');
        } catch (error) {
            toast.error('Failed to update credit rule');
        }
    };

    const columns = [
        { title: 'Credit Rule Name', dataIndex: 'creditrulename', key: 'creditrulename' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                  <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />}>
  
</Button>

<Popconfirm
  title={`Are you sure to delete "${record.creditrulename}"?`}
  onConfirm={() => handleDelete(record.id, record.creditrulename)}
  okText="Yes"
  cancelText="No"
>
  <Button type="link" danger icon={<DeleteOutlined />}>
    
  </Button>
</Popconfirm>
                </>
            ),
        },
    ];

    return (
        <LayoutComponent>
            <CustomCard title="Credit Rule Management">
                <div className="p-6">
                    <Title level={4}>Manage Credit Rules</Title>
                    <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                        Add Credit Rule
                    </Button>
                    <Table
                        dataSource={creditRules}
                        columns={columns}
                        rowKey="id"
                        bordered
                        pagination={{ pageSize: 5 }} // Client-side pagination
                    />

                    <Modal title="Add Credit Rule" visible={isModalVisible} onCancel={handleCancel} onOk={handleSave}>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Credit Rule Name"
                                rules={[{ required: true, message: 'Please enter credit rule name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal title="Edit Credit Rule" visible={isEditModalVisible} onCancel={handleEditCancel} onOk={handleEditSave}>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Credit Rule Name"
                                rules={[{ required: true, message: 'Please enter credit rule name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </CustomCard>
            <ToastContainer />
        </LayoutComponent>
    );
};

export default CreditRuleForm;