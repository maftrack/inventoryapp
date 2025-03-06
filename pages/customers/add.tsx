import React from 'react';
import { Form, Input, Button, DatePicker, Typography } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import CustomCard from '@/components/Card';
import { useRouter } from 'next/router';

const { Title } = Typography;

const AddCustomer = () => {
    const router = useRouter();
    const [form] = Form.useForm();

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const newCustomer = {
                fullName: values.fullName,
                email: values.email,
                telephone: values.telephone,
                address: values.address,
                dob: values.dob.format('YYYY-MM-DD'), // Format date for API
                notes: values.notes,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add customer');
            }

            toast.success('Customer added successfully!');
            form.resetFields(); // Reset form fields after successful submission
        } catch (error) {
            toast.error(error.message || 'Failed to add customer');
        }
    };

    return (

        <Layout>
            <CustomCard title="Customers">
            <div style={{ padding: '20px' }}>
                <Title level={4}>Add Customer</Title>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Invalid email format' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="telephone"
                        label="Telephone"
                        rules={[{ required: true, message: 'Please enter telephone number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter address' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[{ required: true, message: 'Please select date of birth' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="notes" label="Notes">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                    <Button type="default" onClick={() => router.back()}>
                Back
            </Button>
                        <Button type="primary" htmlType="submit">
                            Add Customer
                        </Button>
                    </Form.Item>
                </Form>
                <ToastContainer />
            </div>
            </CustomCard>
        </Layout>
    );
};

export default AddCustomer;