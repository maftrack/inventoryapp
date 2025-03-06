import { useState } from "react";
import { Table } from "antd";

const creditUsageData = [
  { key: 1, service: "Sensor Monitoring", category: "Suite Apps", creditsUsed: 25, usageDate: "2024-07-30" },
  { key: 2, service: "Report Generation", category: "Suite Apps", creditsUsed: 10, usageDate: "2024-07-29" },
  { key: 3, service: "System Audit", category: "Suite Consultancy", creditsUsed: 20, usageDate: "2024-07-28" },
];

export default function CreditUsageForm() {
  const [data, setData] = useState(creditUsageData);

  const columns = [
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Credits Used", dataIndex: "creditsUsed", key: "creditsUsed" },
    { title: "Usage Date", dataIndex: "usageDate", key: "usageDate" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Credit Usage</h2>
      <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
}
