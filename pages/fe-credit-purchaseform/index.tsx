import { useState } from "react";
import { Card, Button, InputNumber, Form, Select, message } from "antd";

export default function CreditPurchaseForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handlePurchase = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`Successfully purchased ${values.credits} credits.`);
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Credit Purchase</h2>
      <Card className="max-w-md mx-auto">
        <Form form={form} layout="vertical" onFinish={handlePurchase}>
          <Form.Item label="User" name="user" initialValue="Current User">
            <Select disabled>
              <Select.Option value="Current User">Current User</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Credits to Purchase"
            name="credits"
            rules={[{ required: true, message: "Please enter the amount of credits" }]}
          >
            <InputNumber min={1} max={1000} className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Purchase
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
