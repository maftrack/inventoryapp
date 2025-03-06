import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Table, Select } from 'antd';
import CustomCard from '@/components/Card';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { Option } = Select;

const CreditRuleManager = () => {
  const [creditRuleName, setCreditRuleName] = useState('');
  const [selectedRule, setSelectedRule] = useState('');
  const [description, setDescription] = useState('');
  const [creditRules, setCreditRules] = useState([]);

  const ruleOptions = ['Per Sensor/Tag', 'Per Report', 'Per Usage']; // Example options

  const handleAddCreditRule = () => {
    if (creditRuleName && selectedRule) {
      const newRule = {
        key: creditRules.length + 1,
        name: creditRuleName,
        rule: selectedRule,
        description,
      };
      setCreditRules([...creditRules, newRule]);
      // Reset form fields
      setCreditRuleName('');
      setSelectedRule('');
      setDescription('');
    }
  };

  const handleDeleteRule = (name) => {
    setCreditRules(creditRules.filter((rule) => rule.name !== name));
  };

  const columns = [
    {
      title: 'Rule Name',
      dataIndex: 'name',
      key: 'name',
    },
 
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: { name: string }) => (
        <Button danger onClick={() => handleDeleteRule(record.name)}>Delete</Button>
      ),    },
  ];

  return (
    <Layout>

    <CustomCard  title="Credit Rule Manager" style={{ maxWidth: 800, margin: 'auto' }}>
      <Title level={3}>Manage Credit Rules</Title>
      <Form layout="vertical">
        <Form.Item label="Rule Name" required>
          <Input
            value={creditRuleName}
            onChange={(e) => setCreditRuleName(e.target.value)}
            placeholder="Enter rule name"
          />
        </Form.Item>
    
        <Form.Item label="Description">
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddCreditRule}>
            Add Credit Rule
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={creditRules}
        columns={columns}
        pagination={false}
        rowKey="name"
        style={{ marginTop: 16 }}
      />
    </CustomCard>
    </Layout>
  );
};

export default CreditRuleManager;