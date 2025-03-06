import { useEffect } from 'react'; // Import useEffect
import { useState } from 'react';
import moment from 'moment';
import { Form, Input, Button, DatePicker, Select, Row, Col, Alert, Tabs, Spin } from 'antd';
import CustomCard from '../../../components/Card';
import Layout from '@/components/Layout';
import router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyDatePicker from '@/components/Custom/DatePickerAntd';
import Servicepurchased from './service-purchase';

const { Option } = Select;
const { TabPane } = Tabs;

const ManagePurchaseForm = () => {
    const [form] = Form.useForm();
    const [purchase, setPurchase] = useState(null);
    const [activeTab, setActiveTab] = useState("1");
    const [loading, setLoading] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false);
    const [customers, setCustomers] = useState([]); // State for customers

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/GetCustomersName`);
                if (response.ok) {
                    const data = await response.json();
                    setCustomers(data); // Set customers data
                } else {
                    throw new Error('Failed to fetch customers');
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
                toast.error('Failed to load customers. Please try again.');
            }
        };

        fetchCustomers(); // Fetch customers on component mount
    }, []);

    const onFinish = async (values) => {
        const newPurchase = {
            TransactionId: values.transactionId,
            Customerid: values.user, // This should be the customer ID
            CreditsPurchased: values.creditsPurchased,
            PurchaseDate: values.purchaseDate.format('YYYY-MM-DDTHH:mm:ss'),
            ExpirationDate: values.expirationDate.format('YYYY-MM-DDTHH:mm:ss'),
            PaymentMethod: values.paymentMethod || 'N/A',
            Status: values.status || 'Pending',
            Notes: values.notes || 'N/A',

        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPurchase),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success('Purchase created successfully!');
                form.resetFields();
            } else if (response.status === 409) {
                const errorData = await response.json();
                toast.error(errorData.message);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error creating purchase:', error);
            toast.error('Failed to create purchase. Please try again.');
        }
    };

    const handlePurchaseDateChange = (date) => {
        if (date) {
            const expirationDate = date.clone().add(3, 'years');
            form.setFieldsValue({ expirationDate });
        }
    };

    const handleTabChange = async (key) => {
        if (key === "2") {
            if (formDisabled) {
                setActiveTab("2");
                return;
            }

            setLoading(true);

            try {
                const values = await form.validateFields();

                if (!values.transactionId) {
                    toast.error("Transaction ID is required before proceeding.");
                    setLoading(false);
                    return;
                }

                await onFinish(values);

                setTimeout(() => {
                    setPurchase(values);
                    setActiveTab("2");
                    setFormDisabled(true);
                    toast.success("Data stored successfully!");
                    setLoading(false);
 }, 2000);

            } catch (error) {
                toast.error("Please complete all required fields before proceeding.");
                setLoading(false);
            }
        } else if (key === "1") {
            setActiveTab("1");

            if (purchase) {
                setFormDisabled(true);
            } else {
                setFormDisabled(false);
            }
        } else {
            setActiveTab(key);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <CustomCard title="Manage Purchase Form">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="Purchase" key="1">
                        <Spin spinning={loading} tip="Please wait, storing...">
                            <Form form={form} initialValues={{ purchaseDate: moment(), status: 'Pending' }} layout="vertical">
                                <Form.Item label="Transaction ID (Mandatory)" name="transactionId">
                                    <Input placeholder="TXNxxxxx" disabled={formDisabled} />
                                </Form.Item>
                                <Form.Item label="Customer" name="user" rules={[{ required: true, message: 'Please select a user!' }]}>
                                    <Select placeholder="Select a user" disabled={formDisabled}>
                                        {customers.map(customer => (
                                            <Option key={customer.id} value={customer.Id}>{customer.fullName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Credits Purchased" name="creditsPurchased" rules={[{ required: true, message: 'Please input credits purchased!' }]}>
                                    <Input type="number" placeholder="100" disabled={formDisabled} />
                                </Form.Item>
                                <Alert style={{ marginBottom: '16px' }} closable message="Informational Notes" description="Default, the purchase will expire after 3 years from the purchase date." type="info" showIcon />
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Purchase Date" name="purchaseDate" rules={[{ required: true }]}>
                                            <MyDatePicker onChange={handlePurchaseDateChange} showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} disabled={formDisabled} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Expiration Date" name="expirationDate" rules={[{ required: true }]}>
                                            <MyDatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} disabled={formDisabled} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item label="Payment Method (Optional)" name="paymentMethod">
                                    <Select placeholder="Select payment method" disabled={formDisabled}>
                                        <Option value="Credit Card">Credit Card</Option>
                                        <Option value="Bank Transfer">Bank Transfer</Option>
                                        <Option value="PayPal">PayPal</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Status" name="status">
                                    <Select disabled={formDisabled}>
                                        <Option value="Completed">Completed</Option>
                                        <Option value="Pending">Pending</Option>
                                        <Option value="Canceled">Canceled</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Notes (Optional)" name="notes">
                                    <Input.TextArea placeholder="Additional details about the purchase" disabled={formDisabled} />
                                </Form.Item>
                            </Form>
                        </Spin>
                    </TabPane>
                    <TabPane tab="Services" key="2">
                        <Servicepurchased purchase={purchase} />
                    </TabPane>
                </Tabs>
                <ToastContainer />
            </CustomCard>
        </Layout>
    );
};

export default ManagePurchaseForm;