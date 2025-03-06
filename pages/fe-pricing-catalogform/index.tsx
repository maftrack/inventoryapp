import { useState } from "react";
import { Table, Select, Card } from "antd";

const pricingData = {
  "Suite Apps": [
    { tier: "Tier 1", minQty: 1, maxQty: 10, creditPerUnit: 10 },
    { tier: "Tier 2", minQty: 11, maxQty: 50, creditPerUnit: 9 },
  ],
  "Suite Consultancy": [
    { tier: "Tier 1", minQty: 1, maxQty: 5, creditPerUnit: 20 },
  ],
};

export default function PricingCatalogueForm() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const columns = [
    { title: "Tier Name", dataIndex: "tier", key: "tier" },
    { title: "Min Quantity", dataIndex: "minQty", key: "minQty" },
    { title: "Max Quantity", dataIndex: "maxQty", key: "maxQty" },
    { title: "Credit per Unit", dataIndex: "creditPerUnit", key: "creditPerUnit" },
  ];

  return (
    <Card title="Pricing Catalogue">
      <Select
        placeholder="Select Category"
        style={{ width: "100%", marginBottom: "16px" }}
        onChange={(value) => setSelectedCategory(value)}
      >
        {Object.keys(pricingData).map((category) => (
          <Select.Option key={category} value={category}>
            {category}
          </Select.Option>
        ))}
      </Select>

      {selectedCategory && (
        <Table
          dataSource={pricingData[selectedCategory]}
          columns={columns}
          rowKey="tier"
          pagination={false}
        />
      )}
    </Card>
  );
}
