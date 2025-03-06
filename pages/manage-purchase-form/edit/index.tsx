import { useEffect, useState, useRef } from 'react'; // Import useRef
import moment from 'moment';
import { Form, Input, Button, Select, Alert, Tabs, Row, Col } from 'antd';
import CustomCard from '../../../components/Card';
import Layout from '@/components/Layout';
import router from 'next/router';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import MyDatePicker from '@/components/Custom/DatePickerAntd';
import ServicePurchasedEdit from '../addPurchase/service-purchased';

const { Option } = Select;
const { TabPane } = Tabs;

const EditPurchaseForm = () => {
  const [form] = Form.useForm();
  const [purchaseData, setPurchaseData] = useState(null);
  const [customers, setCustomers] = useState([]); // State for customers
  const initialPurchaseDateRef = useRef(null); // Ref to store initial purchase date

  // Fetch existing purchase data based on transactionId
  useEffect(() => {
    const transactionId = new URLSearchParams(window.location.search).get('transactionId');

    const fetchPurchaseData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Purchase/${transactionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchase data');
        }
        const data = await response.json();
        setPurchaseData(data);
        initialPurchaseDateRef.current = moment(data.purchaseDate).toDate(); // Store initial purchase date as Date object
        form.setFieldsValue({
          transactionId: data.transactionId,
          customerName: data.customerid, // Set customer ID here
          creditsPurchased: data.creditsPurchased,
          purchaseDate: moment(data.purchaseDate),
          expirationDate: moment(data.expirationDate),
          paymentMethod: data.paymentMethod,
          status: data.status,
          notes: data.notes,
        });
      } catch (error) {
        toast.error(error.message);
      }
    };
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data); // Assuming the API returns an array of customers
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPurchaseData();
    fetchCustomers(); // Fetch customers when the component mounts
  }, [form]);

  const handlePurchaseDateChange = (date) => {
    if (date) {
      const expirationDate = date.clone().add(3, 'years');
      form.setFieldsValue({ expirationDate });
    }
  };

  // Function to fetch total credits used
  const fetchTotalCreditsUsed = async (transactionId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageServices/total-credits-used/${transactionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch total credits used');
      }
      const data = await response.json();
      return data.totalCreditsUsed || 0; // Assuming the API returns an object with totalCreditsUsed
    } catch (error) {
      toast.error(error.message);
      return 0; // Return 0 if there's an error
    }
  };

  const onFinish = async (values) => {
    const totalCreditsUsed = await fetchTotalCreditsUsed(values.transactionId);
    const creditsPurchased = values.creditsPurchased;
  
    // Logic to deny purchase edit if total credits used exceeds credits purchased
    if (totalCreditsUsed > creditsPurchased) {
      toast.error('Cannot edit purchase: total credits used exceeds credits purchased.');
      return;
    }
  
    // Debugging: Log the expiration date and current date
    const currentDate = moment();
    const initialPurchaseDate = moment(initialPurchaseDateRef.current);
    const expirationDate = moment(values.expirationDate); // Get the expiration date
    const purchaseDate = moment(values.purchaseDate); // Get the purchase date
  
    console.log('Current Date:', currentDate.format());
    console.log('Initial Purchase Date:', initialPurchaseDate.format());
    console.log('Expiration Date:', expirationDate.format());
    console.log('Purchase Date:', purchaseDate.format()); // Log the purchase date
  
    // Logic to deny purchase date if less than current date
    if (purchaseDate.startOf('day').isBefore(currentDate.startOf('day'))) {
      toast.error('Cannot edit purchase: purchase date must be today or in the future.');
      return;
    }
  
    // Logic to deny expiration date if less than current date or current purchase date
    if (expirationDate.isBefore(currentDate) || expirationDate.isBefore(initialPurchaseDate)) {
      toast.error('Cannot edit purchase: expiration date must be greater than the current date and the purchase date.');
      return;
    }
  
    // Convert Moment objects to ISO strings
    const updatedValues = {
      ...values,
      purchaseDate: values.purchaseDate.toISOString(),
      expirationDate: values.expirationDate.toISOString(),
      Customerid: values.customerName // Change this to the correct field name if necessary
    };
  
    // Log the values being sent
    console.log('Values being sent:', updatedValues); // Log the values
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Purchase/${updatedValues.transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        console.error('Error details:', errorData); // Log error details
        throw new Error('Failed to update purchase');
      }
      toast.success('Purchase updated successfully', {
        onClose: () => {
          router.push('/manage-purchase-form/');
        },
        autoClose: 3000, // Duration in milliseconds
      }); // Redirect after successful update
    } catch (error) {
      console.error('Error updating purchase:', error);
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <CustomCard title="Edit Purchase">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Purchase Details" key="1">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item label="Transaction ID" name="transactionId">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Customer" name="customerName" rules={[{ required: true, message: 'Please select a user!' }]}>
                <Select placeholder="Select a user">
                  {customers.map(customer => (
                    <Option key={customer.id} value={customer.id}>{customer.fullName}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Credits Purchased"
                name="creditsPurchased"
                rules={[{ required: true, message: 'Please input credits purchased!' }]}
              >
                <Input type="number" placeholder="100" />
              </Form.Item>

              <Alert
                style={{ marginBottom: '16px' }}
                closable
                message="Informational Notes"
                description="Default, the purchase will expire after 3 years from the purchase date."
                type="info"
                showIcon
              />

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Purchase Date" name="purchaseDate" rules={[{ required: true }]}>
                    <MyDatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }}
                      onChange={(date) => {
                        handlePurchaseDateChange(date);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12 }>
                  <Form.Item label="Expiration Date" name="expirationDate" rules={[{ required: true }]}>
                    <MyDatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Payment Method" name="paymentMethod">
                <Select placeholder="Select payment method">
                  <Option value="Credit Card">Credit Card</Option>
                  <Option value="Bank Transfer">Bank Transfer</Option>
                  <Option value="PayPal">PayPal</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Select>
                  <Option value="Completed">Completed</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Canceled">Canceled</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Notes (Optional)" name="notes">
                <Input.TextArea placeholder="Additional details about the purchase" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Purchase
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Service Details" key="2">
            <ServicePurchasedEdit purchase={purchaseData} />
          </TabPane>
        </Tabs>
      </CustomCard>
      <ToastContainer />
    </Layout>
  );
};

export default EditPurchaseForm;