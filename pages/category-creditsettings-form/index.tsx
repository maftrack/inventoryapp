// pages/credit-settingsform/index.tsx
import React from 'react';
import { Form, Input, Button, Select, message, Row, Col, Space, Typography } from 'antd';
import Layout from '../../components/Layout';
import CustomCard from '../../components/Card';

const { Title } = Typography;

interface CreditSettingsFormInput {
  serviceCategory: string;
  creditRule: string;
  creditValue: number;
}

interface CreditSettingsFormProps {
  isSidebarOpen: boolean;
}

const CreditSettingsForm: React.FC<CreditSettingsFormProps> = ({ isSidebarOpen }) => {
  const [form] = Form.useForm();

  const onFinish = (values: CreditSettingsFormInput) => {
    console.log('Form Data:', values);
    message.success('Credit settings updated successfully!');
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Layout>
      <div className="p-6">
        <CustomCard
          title="Credit Settings Form"
          fullWidth={!isSidebarOpen}
        >
          <Title level={4}>Master Data - Credit Settings</Title>
          <p style={{ fontStyle: '16px' }}>
            Configure the credit settings for each service category. Select the category and specify the credit rule accordingly.
          </p>
        <br />
        <Form form={form} onFinish={onFinish} layout="vertical">
  {/* Service Category Dropdown */}
  <Form.Item
    label="Service Category"
    name="serviceCategory"
    rules={[{ required: true, message: 'Please select a service category' }]}
  >
    <Select placeholder="Select a service category">
      <Select.Option value="suiteApps">Suite Apps</Select.Option>
      <Select.Option value="suiteConsultancy">Suite Consultancy</Select.Option>
      <Select.Option value="suiteEngineering">Suite Engineering</Select.Option>
    </Select>
  </Form.Item>

  {/* Credit Rule Dropdown */}
  <Form.Item
    label="Credit Rule"
    name="creditRule"
    rules={[{ required: true, message: 'Please select a credit rule' }]}
  >
    <Select placeholder="Select a credit rule">
      <Select.Option value="perSensor">Per Sensor / Tag</Select.Option>
      <Select.Option value="perSensorPlusReport">Per Sensor / Tag + Per Report Template</Select.Option>
      <Select.Option value="perReport">Per Report</Select.Option>
      <Select.Option value="perAsset">Per Asset</Select.Option>
    </Select>
  </Form.Item>



  {/* Buttons */}
  <Form.Item>
    <Space>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
      <Button onClick={() => form.resetFields()}>
        Reset
      </Button>
    </Space>
  </Form.Item>
</Form>

        </CustomCard>
      </div>
    </Layout>
  );
};

export default CreditSettingsForm;
