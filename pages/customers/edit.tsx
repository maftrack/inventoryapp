import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Typography } from 'antd';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import CustomCard from '@/components/Card';
import Layout from '@/components/Layout';

const { Title } = Typography;

const EditCustomer = () => {
    const router = useRouter();
    const { id } = router.query; // Get the customer ID from the query parameters
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            fetchCustomerData(id);
        }
    }, [id]);

    const fetchCustomerData = async (customerId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch customer data');
            }
            const customer = await response.json();
            console.log(customer); // Log the customer data
    
            form.setFieldsValue({
                ...customer,
                dob: customer.dob ? moment(customer.dob) : null, // Convert to moment object
            });
        } catch (error) {
            toast.error(error.message || 'Failed to fetch customer data');
        }
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedCustomer = {
                id,
                fullName: values.fullName,
                email: values.email,
                telephone: values.telephone,
                address: values.address,
                dob: values.dob.format('YYYY-MM-DD'), // Format date for API
                notes: values.notes,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCustomer),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update customer');
            }

            toast.success('Customer updated successfully!');
            router.push('/customers'); // Redirect to the customers list after successful update
        } catch (error) {
            toast.error(error.message || 'Failed to update customer');
        }
    };

    return (
        <Layout>
            <CustomCard title="Edit Customers">
            <div style={{ padding: '20px' }}>
                <Title level={4}>Edit Customer</Title>
                <Form form={form} layout="vertical" onFinish={handleEditSave}>
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
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
                <ToastContainer />
            </div>
            </CustomCard>
        </Layout>
    );
};

export default EditCustomer;