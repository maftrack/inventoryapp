// pages/credit-settings-form/index.tsx
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
    message.success('Service Credit settings updated successfully!');
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Layout>
      <div className="p-6">
        <CustomCard
          title="Service Credit Settings Form"
          fullWidth={!isSidebarOpen}
        >
          <Title level={4}>Master Data - Credit Settings</Title>
          <p style={{ fontStyle: '16px' }}>
            Configure the Service credit settings for each service. Select the Service and specify the credit rule,
            and set the credit value accordingly.
          </p>
        <br />
        <Form form={form} onFinish={onFinish} layout="vertical">
  {/* Service Category Dropdown */}
  <Form.Item
    label="Service Name"
    name="service"
    rules={[{ required: true, message: 'Please select a service' }]}
  >
  <Select placeholder="Select a service">
  <Select.Option value="dataInsights">Data Insights</Select.Option>
  <Select.Option value="energyManager">Energy Manager</Select.Option>
  <Select.Option value="marketingInsights">Marketing Insights</Select.Option>
  <Select.Option value="businessAudit">Business Audit</Select.Option>
  <Select.Option value="strategyConsulting">Strategy Consulting</Select.Option>
  <Select.Option value="financialAdvisory">Financial Advisory</Select.Option>
  <Select.Option value="softwareDevelopment">Software Development</Select.Option>
  <Select.Option value="systemIntegration">System Integration</Select.Option>
  <Select.Option value="cloudSolutions">Cloud Solutions</Select.Option>
  <Select.Option value="socialMediaManagement">Social Media Management</Select.Option>
  <Select.Option value="contentCreation">Content Creation</Select.Option>
  <Select.Option value="seoOptimization">SEO Optimization</Select.Option>
  <Select.Option value="technicalSupport">Technical Support</Select.Option>
  <Select.Option value="customerService">Customer Service</Select.Option>
  <Select.Option value="itHelpdesk">IT Helpdesk</Select.Option>
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

  {/* Credit Value (Number Input with Dynamic Width) */}
  <Form.Item
    label="Credit Value"
    name="creditValue"
    rules={[{ required: true, message: 'Please enter the credit value' }]}
  >
    <Input type="number" placeholder="Enter credit value" style={{ maxWidth: 200 }} />
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
