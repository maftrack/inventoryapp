import React, { useState } from "react";
import { Table } from "antd";

const PricingTable = () => {
  const [data] = useState([
    { key: "1", tier: "Tier 1", quantity: "0-10", credit: 10 },
    { key: "2", tier: "Tier 2", quantity: "11-50", credit: 7 },
    { key: "3", tier: "Tier 3", quantity: "51-100", credit: 5 },
    { key: "4", tier: "Tier 4", quantity: "101-500", credit: 3 },
  ]);

  const columns = [
    {
      title: "Tier", // Header for the Tier column
      dataIndex: "tier",
      key: "tier",
    },
    {
      title: "Sensor Base Pricing", // Merged header for the remaining columns
      children: [
        {
          title: "Quantity [Sensor]",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Credit per Unit/Month",
          dataIndex: "credit",
          key: "credit",
        },
      ],
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      bordered
      style={{ tableLayout: "auto" }} // Ensure table layout is flexible
    />
  );
};

export default PricingTable;