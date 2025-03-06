import { useState } from "react";
import { Modal, Select, InputNumber, Card, Button, Typography, Space } from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

const servicesData = {
  "Suite Apps": [
    { name: "Sensor Monitoring", description: "Monitors sensors in real-time.", creditCost: 10, tiers: [10, 9] },
    { name: "Report Generation", description: "Generates detailed reports.", creditCost: 5, tiers: [5, 4] },
  ],
  "Suite Consultancy": [
    { name: "System Audit", description: "Audits system performance.", creditCost: 20, tiers: [20, 18] },
  ],
};

export default function UserServiceCatalogueForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSelectService = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleConfirmSelection = () => {
    const tierPricing = selectedService.tiers[quantity > 10 ? 1 : 0];
    const totalCost = quantity * tierPricing;
    setSelectedServices([...selectedServices, { ...selectedService, quantity, totalCost }]);
    setOpenModal(false);
  };

  return (
    <div className="p-4">
      <Title level={2}>Service Catalogue</Title>
      <Select value={selectedCategory} onChange={setSelectedCategory} style={{ width: 200 }}>
        <Option value="">Select Category</Option>
        {Object.keys(servicesData).map((category) => (
          <Option key={category} value={category}>{category}</Option>
        ))}
      </Select>

      {selectedCategory && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {servicesData[selectedCategory].map((service) => (
            <Card key={service.name} title={service.name} bordered>
              <Text>{service.description}</Text>
              <p>Credit Cost: {service.creditCost} per unit</p>
              <Button type="primary" onClick={() => handleSelectService(service)}>Select</Button>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for Service Details */}
      <Modal open={openModal} onCancel={() => setOpenModal(false)} onOk={handleConfirmSelection} title="Service Details">
        <Text>{selectedService?.description}</Text>
        <Space direction="vertical" className="w-full mt-2">
          <InputNumber min={1} value={quantity} onChange={setQuantity} />
          <p>Total Cost: {quantity * (selectedService?.tiers[quantity > 10 ? 1 : 0] || 0)} credits</p>
        </Space>
      </Modal>

      {/* Selected Services List */}
      {selectedServices.length > 0 && (
        <div className="mt-6">
          <Title level={3}>Selected Services</Title>
          {selectedServices.map((s, index) => (
            <Card key={index} className="my-2">
              <Text>{s.name} - {s.quantity} units - {s.totalCost} credits</Text>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
