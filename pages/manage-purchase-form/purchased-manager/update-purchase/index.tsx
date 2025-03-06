import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, DatePicker, Select, message, Modal, Collapse } from 'antd';
import moment from 'moment';
import Layout from '@/components/Layout';
import CustomCard from '@/components/Card';
import { ToastContainer, toast } from 'react-toastify';
import MyDatePicker from '@/components/Custom/DatePickerAntd';

const { Option } = Select;

const NumericInput = ({ value = '', onChange }) => {
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const regex = /^\d+(\.\d{0,2})?$/;
    if (regex.test(inputValue) || inputValue === '') {
      onChange(inputValue);
    }
  };

  return <Input value={value} onChange={handleChange} placeholder="100.00" />;
};
const { Panel } = Collapse;
const UpdatePurchase = () => {
  const router = useRouter();
  const { data } = router.query; // Get the encoded data from the query
  const [loading, setLoading] = useState(true);
  const [xtransactionId, setTransactionId] = useState('');
  const [serviceId, setServiceId] = useState('');

  const [form] = Form.useForm();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState(''); // New state for service name
  const [csname, setCsname] = useState('');
  
  useEffect(() => {
    // Access localStorage only in the browser
    if (typeof window !== 'undefined') {
      const storedCsname = localStorage.getItem('csname');
      setCsname(storedCsname || '');
    }
  }, []);
  const handleBack = () => {
    if (typeof window !== 'undefined') {
    const transactionId = localStorage.getItem('transactionId');
    const totalPurchase = localStorage.getItem('totalPurchase');
    const csid = localStorage.getItem('csid');
    //const csname = localStorage.getItem('csname');

    // Check if the required data is available
    if (transactionId && totalPurchase && csid && csname) {
        // Navigate back to the PurchasedManager page with the necessary data
        router.push(`/manage-purchase-form/purchased-manager?data=${btoa(`transactionId=${transactionId}&totalPurchase=${totalPurchase}&csid=${csid}&csname=${csname}`)}`);
    } else {
        // If data is not available, just go back
        window.history.back();
    }
  }
}
 
  useEffect(() => {
    
    if (data) {
      // Decode the Base64 string and parse it back to an object
      const decodedString = atob(data);
      const serviceData = JSON.parse(decodedString);
      console.log('svrdata',serviceData);
      setTransactionId(serviceData.transactionId); // Set the transaction ID
      console.log('tras',xtransactionId);
      setServiceId(serviceData.serviceid); // Set the service ID
      setServiceName(serviceData.serviceName); // Set the service name
      // Populate the form with the decoded data
      form.setFieldsValue({
        transactionId: serviceData.transactionId,
        user: serviceData.customerName,
        creditsUsed: serviceData.creditUsed,
        purchaseDate: serviceData.expirationService ? moment(serviceData.expirationService) : null,
        paymentMethod: 'Credit Card', // Default value, adjust as needed
        status: serviceData.status || 'Pending', // Default to 'Pending' if status is null
        notes: '', // You can set this to a default value if needed
      });
  
            setLoading(false);
    }
  }, [data, form]);

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalOk = () => {
    setIsConfirmationModalVisible(true);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleConfirmationModalOk = async () => {
    const values = form.getFieldsValue();
    console.log('Updated Values:', values);

    const updateData = {
        transactionId: xtransactionId,
        serviceId: serviceId ? serviceId : '', // Ensure this is a valid GUID
        creditUsed: parseFloat(values.creditsUsed), // Ensure this is a decimal
        status: values.status,
        action: 'update credit used' // Add action if needed
    };

    console.log('Updated Data:', updateData);

    // Store the draft data in local storage if the status is 'Draft'
    if (values.status === 'Draft') {
        localStorage.setItem('draftPurchaseData', JSON.stringify(updateData));
        toast.success('Draft saved successfully!'); // Notify the user
        setIsUpdateModalVisible(false);
        setIsConfirmationModalVisible(false);
        return; // Exit early to prevent further processing
    }

    // Proceed with the API call for all statuses except Draft
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchaseservice/update-purchase`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Get the error response
            console.error('Error response:', errorData);
            throw new Error('Network response was not ok');
        }

        toast.success('Purchase updated successfully! This change can be seen in history.');
        setIsUpdateModalVisible(false);
        setIsConfirmationModalVisible(false);



    } catch (error) {
        toast.error('Failed to update purchase.');
        console.error('Error updating purchase:', error);
    }
};
  const handleConfirmationModalCancel = () => {
    setIsConfirmationModalVisible(false);
  };
  const handleDateChange = async (date, dateString) => {
    const updateData = {
      transactionId: xtransactionId,
      ServiceId: serviceId,
      CreditUsed : form.getFieldValue('creditsUsed'),
      Status : form.getFieldValue('status'),
      // Assuming dateString is in the format "YYYY-MM-DD HH:mm"
     // expiredServices: new Date(dateString.replace(' ', 'T')).toISOString(), // Convert to ISO string
      action : 'update credit used'
    };

  //     transactionId: xtransactionId,
  //     serviceId: serviceId,
  //     // Assuming dateString is in the format "YYYY-MM-DD HH:mm"
  //     expiredServices: new Date(dateString.replace(' ', 'T')).toISOString(), // Convert to ISO string
  // };
try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchaseservice/update-expired-date`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });
    console.log(updateData);
    if (!response.ok) {
        toast.error('Failed to update expired date.');
    }
    else{
    toast.success('Expired date updated successfully!');
 }
} catch (error) {
    console.error('Error updating expired date:', error);
}
};
// api/purchaseService.js


  return (
    <Layout>
     <CustomCard title={`Revise Purchase Transaction ${xtransactionId}`}>
        <div>
        <h4>Service {serviceName || 'Unknown Service'} - {csname || 'Unknown User'}</h4>

          <br />  
          <Form form={form} layout="vertical">
            <Form.Item label="Transaction ID" name="transactionId">
              <Input disabled />
            </Form.Item>
            
            <Form.Item label="Customer " name="user">
              <Input disabled />
            </Form.Item>

            <Collapse defaultActiveKey={['1', '2']}>
      {/* Expired Date Panel */}
      <Panel header="Expired Date" key="1">
        <Form.Item label="Expired Date" name="purchaseDate">
          <MyDatePicker 
            showTime 
            format="YYYY-MM-DD HH:mm" 
            style={{ width: '100%' }}
            onChange={handleDateChange}
          />
        </Form.Item>
      </Panel>

      {/* Credits Used Panel */}
      <Panel header="Credits Used" key="2">
        <Form.Item label="Credits Used">
          <label>{form.getFieldValue('creditsUsed')}</label> 
          <br /><br /> 
          <Button type="primary" onClick={showUpdateModal}>Update</Button>
        </Form.Item>
      </Panel>
    </Collapse>
            <Modal title="Update Credits Used" visible={isUpdateModalVisible} onOk={handleUpdateModalOk} onCancel={handleUpdateModalCancel}>
           
              <Form.Item label="Date" name="purchaseDate">
                <MyDatePicker disabled showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Value"
                name="creditsUsed"
                rules={[{ required: true, message: 'Please input value!' }]}
              >
                <NumericInput
                  value={form.getFieldValue('creditsUsed')}
                  onChange={(value) => form.setFieldsValue({ creditsUsed: value })}
                />
              </Form.Item>

              <Form.Item label="Status" name="status">
                <Select placeholder="Select status">
                  <Option value="Completed">Confirm</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Draft">Draft</Option>
                </Select>
              </Form.Item>
            </Modal>

            <Modal
              title="Confirmation"
              centered
              visible={isConfirmationModalVisible}
              onOk={handleConfirmationModalOk}
              onCancel={handleConfirmationModalCancel}
            >
              <p>Are you sure you want to update?</p>
              <p>This change will be reflected on the history page.</p>
            </Modal>

      


            {/* <Form.Item label="Payment Method" name="paymentMethod">
              <Select placeholder="Select payment method">
                <Option value="Credit Card">Credit Card</Option>
                <Option value="Bank Transfer">Bank Transfer</Option>
                <Option value="PayPal">PayPal</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Notes" name="notes">
              <Input.TextArea placeholder="Additional details about the purchase" />
            </Form.Item> */}

<Form.Item>
  <Button
    type="default"
    onClick={() => {
     handleBack();
    }}
    style={{ marginBottom: 16 }}
  >
    Back
  </Button>
</Form.Item>
          </Form>
        </div>
      </CustomCard>
      <ToastContainer></ToastContainer>
    </Layout>
  );
};

export default UpdatePurchase;