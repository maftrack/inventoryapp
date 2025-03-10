
import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Select, Card, Space, Popconfirm } from "antd";
import CustomCard from "@/components/Card";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;

const PricingTable = () => {
  const router = useRouter();
  const { pricingCategory } = router.query;
  const [credit, setCredit] = useState("");
  const [services, setServices] = useState([]);
  const [serviceTiers, setServiceTiers] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedService, setSelectedService] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [currentTierIndex, setCurrentTierIndex] = useState(null);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [dynamicColumnsSingle, setDynamicColumnsSingle] = useState([]); // For single mode
  const [dynamicColumnsAll, setDynamicColumnsAll] = useState([]); // For show all mode
  const [history, setHistory] = useState([]); // To keep track of previous states

  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev; // No history to undo
  
      const lastAction = prev[prev.length - 1]; // Get the last action
      setServiceTiers(lastAction.state); // Restore the last state
  
      // Remove the last action from history
      return prev.slice(0, -1);
    });
  };
  // Fetch services based on the static category ID
  const fetchServicesByCategory = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricingcategories`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        console.error("Failed to fetch services:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  const fetchDynamicColumns = async (tierId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers/dynamiccolumns/${tierId}`);
      console.log("Dynamic Columns:", dynamicColumnsSingle);
console.log("Service Tiers:", serviceTiers);
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : []; // Ensure data is an array
      } else {
        console.error("Failed to fetch dynamic columns:", response.statusText);
        return []; // Return an empty array if the request fails
      }
      
    } catch (error) {
      console.error("Error fetching dynamic columns:", error);
      return []; // Return an empty array if an error occurs
    }
  };
  const fetchDynamicColumnsForAllServices = async () => {
    try {
      const allDynamicColumns = {};
      for (const service of services) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers/dynamiccolumns/category/${service.id}`);
        if (response.ok) {
          const data = await response.json();
          allDynamicColumns[service.id] = Array.isArray(data) ? data : []; // Ensure it's always an array
        } else {
          console.error(`Failed to fetch dynamic columns for service ${service.id}:`, response.statusText);
          allDynamicColumns[service.id] = []; // Default to empty array if fetch fails
        }
      }
      console.log("All dynamic columns fetched:", allDynamicColumns);
      setDynamicColumnsAll(allDynamicColumns); // Update state with fetched dynamic columns
    } catch (error) {
      console.error("Error fetching dynamic columns for all services:", error);
    }
  };
  // Fetch tiers for all services
  const fetchTiersForAllServices = async () => {
    try {
      const allTiers = {};
      for (const service of services) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers/pricingcategory/${service.id}`);
        if (response.ok) {
          const data = await response.json();
          allTiers[service.id] = data; // Store the fetched tiers for each service
        } else {
          console.error(`Failed to fetch tiers for service ${service.id}:`, response.statusText);
        }
      }
      setServiceTiers(allTiers); // Update state with fetched tiers
    } catch (error) {
      console.error("Error fetching tiers for all services:", error);
    }
  };
  // const fetchTiersForAllServices = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers/all`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("API Response:", data); // Log the API response
  //       const allTiers = {};
  
  //       // Group tiers by pricingCategoryId
  //       data.forEach((tier) => {
  //         if (!allTiers[tier.PricingCategoryId]) {
  //           allTiers[tier.PricingCategoryId] = [];
  //         }
  //         allTiers[tier.PricingCategoryId].push(tier);
  //       });
  
  //       console.log("All fetched tiers:", allTiers); // Log the grouped tiers
  //       setServiceTiers(allTiers); // Update state with fetched tiers
  //     } else {
  //       console.error("Failed to fetch tiers for all services:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching tiers for all services:", error);
  //   }
  // };
  // Fetch services and tiers when the component mounts
  useEffect(() => {
    fetchServicesByCategory();
  }, []);
  useEffect(() => {
    console.log("serviceTiers:", serviceTiers);
  }, [serviceTiers]);
  // Fetch tiers for all services when the services list is updated
  useEffect(() => {
    if (services.length > 0) {
      fetchTiersForAllServices();
      fetchDynamicColumnsForAllServices(); 
    }
  }, [services]);

  // Open modal for adding a new tier
  const showModal = (serviceId) => {
    console.log("Current Service ID:", serviceId); // Log the serviceId
    setCurrentServiceId(serviceId);
    const dynamicColumnsForService = dynamicColumnsAll[serviceId] || [];
    setDynamicColumnsSingle(dynamicColumnsForService);
    setIsModalVisible(true);
  };
  
// Open modal for updating a tier
const showUpdateModal = (serviceId, index) => {
  setCurrentServiceId(serviceId);
  setCurrentTierIndex(index);
  const dynamicColumnsForService = dynamicColumnsAll[serviceId] || []; // Get dynamic columns for the specific category
  setDynamicColumnsSingle(dynamicColumnsForService); // Update dynamicColumnsSingle for the modal

  const tierToUpdate = serviceTiers[serviceId][index];
  form.setFieldsValue({
    quality: tierToUpdate.qualityRange,
    credit: tierToUpdate.creditPerUnit,
    // Populate dynamic column values
    ...tierToUpdate.tierDynamicColumns.reduce((acc, column) => {
      acc[`dynamicColumnValue_${column.columnHeader}`] = column.columnValue;
      return acc;
    }, {}),
  });
  setIsUpdateModalVisible(true);
};
  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsUpdateModalVisible(false);
    form.resetFields();
  };

  // Add new tier
  const handleAddTier = (values) => {
    const currentTiers = serviceTiers[currentServiceId] || [];
  
    // Save current state to history before making changes
    setHistory((prev) => [...prev, { action: 'add', state: { ...serviceTiers } }]);
  
    // Calculate the next tier number
    const tierNumber = currentTiers.length > 0 
      ? Math.max(...currentTiers.map(tier => tier.tierNumber)) + 1 
      : 1; // Start from 1 if there are no existing tiers
  
    const newTier = {
      pricingCategoryId: currentServiceId,
      tierNumber: tierNumber,
      qualityRange: values.quality,
      creditPerUnit: values.credit,
      tierDynamicColumns: dynamicColumnsSingle.map((column) => ({
        columnHeader: column.columnHeader,
        columnValue: values[`dynamicColumnValue_${column.columnHeader}`] || "",
      })),
    };
  
    // Update the service tiers state
    const updatedTiers = { 
      ...serviceTiers, 
      [currentServiceId]: [...currentTiers, newTier] 
    };
    console.log("Updated Tiers:", updatedTiers); // Log the updated state
    setServiceTiers(updatedTiers);
  
    setIsModalVisible(false);
    form.resetFields();
  };
  
// Update tier
const handleUpdateTier = (values) => {
  const updatedTiers = [...serviceTiers[currentServiceId]];
  const updatedTier = updatedTiers[currentTierIndex];

  // Save current state to history before making changes
  setHistory((prev) => [...prev, { action: 'update', state: { ...serviceTiers } }]);

  // Update static fields
  updatedTier.qualityRange = values.quality;
  updatedTier.creditPerUnit = values.credit;

  // Update dynamic columns
  updatedTier.tierDynamicColumns = dynamicColumnsSingle.map((column) => ({
    columnHeader: column.columnHeader,
    columnValue: values[`dynamicColumnValue_${column.columnHeader}`] || "",
  }));

  // Update the state
  setServiceTiers((prev) => ({
    ...prev,
    [currentServiceId]: updatedTiers,
  }));

  setIsUpdateModalVisible(false);
  form.resetFields();
};
  // Delete tier
  const deleteTier = (serviceId, index) => {
    const updatedTiers = serviceTiers[serviceId].filter((_, i) => i !== index);
    
    // Save current state to history before making changes
    setHistory((prev) => [...prev, { action: 'delete', state: { ...serviceTiers } }]);
  
    setServiceTiers((prev) => ({
      ...prev,
      [serviceId]: updatedTiers,
    }));
  };
  // Show all services
  const handleShowAll = async () => {
    setShowAll((prev) => {
      const newShowAll = !prev;
      if (newShowAll) {
        setSelectedService(null); // Deselect any single service
        fetchDynamicColumnsForAllServices(); // Fetch dynamic columns for all services
      }
      return newShowAll;
    });
  };
  const handleServiceSelect = async (value) => {
    setSelectedService(value);
    if (showAll) {
      setShowAll(false);
    }
    
    // Fetch dynamic columns for the selected category
    await fetchDynamicColumnsForCategory(value);
    console.log(value);
  };
  
  const fetchDynamicColumnsForCategory = async (categoryId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers/dynamiccolumns/category/${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        setDynamicColumnsSingle(Array.isArray(data) ? data : []); // Set for single mode
      } else {
        console.error("Failed to fetch dynamic columns:", response.statusText);
        setDynamicColumnsSingle([]); // Reset to an empty array if the request fails
      }
    } catch (error) {
      console.error("Error fetching dynamic columns:", error);
      setDynamicColumnsSingle([]); // Reset to an empty array if an error occurs
    }
  };
  
  const handlePostData = async () => {
    const data = collectTableData(); // Collect the data to be posted
    console.log(data);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        toast.success("Tiers posted successfully!");
        // Fetch updated tiers after posting
        await fetchTiersForAllServices(); // Call the function to fetch tiers again
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error("An error occurred while posting data.");
    }
  };
  
  const collectTableData = () => {
    const data = [];
    for (const [serviceId, tiers] of Object.entries(serviceTiers)) {
      const service = services.find((s) => s.id === serviceId);
      if (!service) continue;
  
      tiers.forEach((tier) => {
        // Use TierNumber instead of tier.tier
        const tierNumber = tier.tierNumber; // Ensure this is correctly referenced
  
        // Collect dynamic columns
        const dynamicColumnsSingle = tier.tierDynamicColumns.map((dc) => ({
          ColumnHeader: dc.columnHeader, // Use columnHeader (lowercase 'c')
          ColumnValue: dc.columnValue, // Use columnValue (lowercase 'c')
        }));
  
        // Add the tier data to the result
        data.push({
          PricingCategoryId: service.id,
          TierNumber: tierNumber,
          QualityRange: tier.qualityRange,
          CreditPerUnit: tier.creditPerUnit,
          DynamicColumns: dynamicColumnsSingle,
        });
      });
    }
    return data;
  };
  const renderDynamicRows = (dynamicColumnsSingle) => {
    if (!Array.isArray(dynamicColumnsSingle)) {
      return null; // Return null if dynamicColumnsSingle is not an array
    }
  
    return dynamicColumnsSingle.map((column, index) => (
      <td
        key={index}
        style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: index % 2 === 0 ? '#c4df9c' : '#ecf5e0' }}
      >
        {column.columnValue || "N/A"} {/* Display "N/A" if columnValue is missing */}
      </td>
    ));
  };
  const renderDynamicHeaders = (dynamicColumnsSingle) => {
    if (!Array.isArray(dynamicColumnsSingle)) {
      return null; // Return null if dynamicColumnsSingle is not an array
    }
  
    return dynamicColumnsSingle.map((column, index) => (
      <th
        key={index}
        style={{
          border: "1px solid #ddd",
          padding: "8px",
          background: "linear-gradient(359deg, #b2eb3f 0%, #6ea502 100%)",
          color: "white",
          whiteSpace: "normal", // Allow text wrapping
        }}
      >
        {column.columnHeader || "Dynamic Column"}
      </th>
    ));
  };

  return (
    <Layout>
      <CustomCard title="Service Pricing">
        <div style={{ padding: "20px" }}>
          <Select
            showSearch
            placeholder="Select a service"
            onChange={handleServiceSelect}
            style={{ width: 200, marginRight: 10 }}
            filterOption={(input, option) =>
              (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="" disabled>
              Select a service
            </Option>
            {services.map((service) => (
              <Option key={service.id} value={service.id}>
                {service.pricingCategoryName}
              </Option>
            ))}
          </Select>
          <Button style={{ marginLeft: "10px" }} onClick={handleShowAll}>
            {showAll ? "Hide All" : "Show All"}
          </Button>
          <Button type="primary" onClick={handlePostData} style={{ marginTop: "20px" }}>
            Submit
          </Button>

          {/* Render selected service table */}
          {selectedService && !showAll && (
            <div style={{ marginTop: "20px" }}>
              <CustomCard
                title={
                  services.find((service) => service.id === selectedService)
                    ?.pricingCategoryName || selectedService
                }
              >
                <div style={{ padding: "20px" }}>
                  <Button type="primary" onClick={() => showModal(selectedService)}>
                    Add Tier
                  </Button>
                  <br />
                  <Button onClick={handleUndo} disabled={history.length === 0}>
  Undo
</Button>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "20px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "rgb(0 0 0 / 23%) 5px 5px 10px 6px",
                    }}
                  >
<thead>
  <tr>
    <th
      colSpan={3 + (dynamicColumnsSingle?.length || 0)} // Merge all columns
      style={{
        color: '#4da72e',
        fontWeight: 'bolder',
        border: "1px solid #ddd",
        padding: "8px",
        textAlign: "center", // Center the text
        background: 'linear-gradient(90deg, rgb(127, 136, 145) 0%, rgb(175, 185, 194) 35%, rgb(123, 148, 153) 100%)',
      }}
    >
      {services.find((service) => service.id === selectedService)?.pricingCategoryName || selectedService}
    </th>
  </tr>
  <tr>
    <th
      style={{
        color: '#4da72e',
        fontWeight: 'bolder',
        border: "1px solid #ddd",
        padding: "8px",
        background: 'linear-gradient(90deg, rgb(127, 136, 145) 0%, rgb(175, 185, 194) 35%, rgb(123, 148, 153) 100%)',
      }}
    >
      Tier
    </th>
    <th
      style={{
        border: "1px solid #ddd",
        color: "white",
        padding: "8px",
        background: 'linear-gradient(359deg, #b2eb3f 0%, #6ea502 100%)',
      }}
    >
      Quality [Sensor]
    </th>
    <th
      style={{
        border: "1px solid #ddd",
        color: "white",
        padding: "8px",
        background: 'linear-gradient(359deg, rgb(15, 201, 2) 0%, rgb(12, 138, 0) 100%)',
      }}
    >
      Credit per Unit/month
    </th>
    {/* Render dynamic headers */}
    {dynamicColumnsSingle?.map((column, index) => (
      <th
        key={index}
        style={{
          border: "1px solid #ddd",
          padding: "8px",
          background: "linear-gradient(359deg, #b2eb3f 0%, #6ea502 100%)",
          color: "white",
          whiteSpace: "normal", // Allow text wrapping
        }}
      >
        {column.columnHeader || "Dynamic Column"}
      </th>
    ))}
    {/* Action column */}
    <th
      style={{
        color: '#4da72e',
        fontWeight: 'bolder',
        border: "1px solid #ddd",
        color: "white",
        padding: "8px",
        background: 'linear-gradient(258deg, rgb(68, 240, 115) 0%, rgb(34, 173, 9) 100%)',
      }}
    >
      <EditOutlined /> {/* Ant Design Edit Icon */}
    </th>
  </tr>
</thead>
<tbody>
  {(serviceTiers[selectedService] || [])
  .sort((a, b) => a.tierNumber - b.tierNumber) 
  .map((tier, index) => (
    <tr key={index}>
      {/* Tier Number */}
      <td
        style={{
          color: '#4da72e',
          fontWeight: 'bolder',
          border: "1px solid #ddd",
          padding: "8px",
          background: index % 2 === 0
            ? 'linear-gradient(90deg, rgb(127, 136, 145) 0%, rgb(175, 185, 194) 35%, rgb(123, 148, 153) 100%)'
            : 'linear-gradient(90deg, rgb(189, 196, 204) 0%, rgb(204, 207, 210) 35%, rgb(224, 237, 241) 100%)',
        }}
      >
        {`Tier ${tier.tierNumber}`} {/* Ensure this is correctly referenced */}
      </td>

      {/* Other static columns */}
      <td style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: index % 2 === 0 ? '#c4df9c' : '#ecf5e0' }}>
        {tier.qualityRange}
      </td>

      <td style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: index % 2 === 0 ? '#b1d373' : '#e7f1d4' }}>
        {tier.creditPerUnit}
      </td>

      {/* Dynamic Columns */}
      {dynamicColumnsSingle?.map((column, colIndex) => (
        <td
          key={colIndex}
          style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: index % 2 === 0 ? '#c4df9c' : '#ecf5e0' }}
        >
          {tier.tierDynamicColumns?.find((dc) => dc.columnHeader === column.columnHeader)?.columnValue || "N/A"}
        </td>
      ))}

      {/* Action Column */}
      <td style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: 'rgb(199 237 130)' }}>
          <Button
    type="primary"
    icon={<EditOutlined />}
    onClick={() => showUpdateModal(selectedService, index)}
  />
  <Popconfirm
    title={`Are you sure to delete "${tier.tierNumber}"?`}
    onConfirm={() => deleteTier(selectedService, index)}
    okText="Yes"
    cancelText="No"
  >
    <Button type="primary" danger icon={<DeleteOutlined />}>
      
    </Button>
  </Popconfirm>
      </td>
    </tr>
    
  ))}
</tbody>
<tfoot>
    <tr>
      <td>Volume Base</td>
      <td colSpan={3}>
        {services.find((service) => service.id === selectedService)?.volumeBase}
      </td>
    </tr>
  </tfoot>
      </table>
                </div>
              </CustomCard>
            </div>
          )}


          {/* Render all services tables */} 
                   {showAll && (


<div style={{ marginTop: "20px" }}>
  {services.map((service) => {
    const tiers = serviceTiers[service.id] || []; // Get tiers for the current service
    const dynamicColumnsForService = dynamicColumnsAll[service.id] || []; // Default to empty array if undefined

    return (
      <CustomCard key={service.id} title={service.pricingCategoryName || "Unknown Service"}>
        <div style={{ padding: "20px" }}>
          <Button type="primary" onClick={() => showModal(service.id)}>
            Add Tier
          </Button>
          <br />
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              textAlign: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "rgb(0 0 0 / 23%) 5px 5px 10px 6px",
            }}
          >
            <thead>
              <tr>
                <th
                  colSpan={3 + (dynamicColumnsForService.length || 0)} // Merge all columns
                  style={{
                    color: '#4da72e',
                    fontWeight: 'bolder',
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                    background: 'linear-gradient(90deg, rgb(127, 136, 145) 0%, rgb(175, 185, 194) 35%, rgb(123, 148, 153) 100%)',
                  }}
                >
                  {service.pricingCategoryName || "Unknown Service"}
                </th>
              </tr>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", background: 'linear-gradient(90deg, rgb(127, 136, 145) 0%, rgb(175, 185, 194) 35%, rgb(123, 148, 153) 100%)', color: '#4da72e', fontWeight: 'bolder' }}>
                  Tier
                </th>
                <th style={{ border: "1px solid #ddd", color: "white", padding: "8px", background: 'linear-gradient(359deg, #b2eb3f 0%, #6ea502 100%)' }}>
                  Quality [Sensor]
                </th>
                <th style={{ border: "1px solid #ddd", color: "white", padding: "8px", background: 'linear-gradient(359deg, rgb(15, 201, 2) 0%, rgb(12, 138, 0) 100%)' }}>
                  Credit per Unit/month
                </th>
                {/* Render dynamic headers */}
                {dynamicColumnsForService.map((column, index) => (
                  <th key={index} style={{ border: "1px solid #ddd", padding: "8px", background: "linear-gradient(359deg, #b2eb3f 0%, #6ea502 100%)", color: "white", whiteSpace: "normal" }}>
                    {column.columnHeader}
                  </th>
                ))}
                {/* Action column */}
                <th style={{ color: '#4da72e', fontWeight: 'bolder', border: "1px solid #ddd", color: "white", padding: "8px", background: 'linear-gradient(258deg, rgb(68, 240, 115) 0%, rgb(34, 173, 9) 100%)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.length > 0 ? (
                tiers.sort((a, b) => a.tierNumber - b.tierNumber).map((tier, index) => (
                  <tr key={tier.tierId}>
                    <td>{`Tier ${tier.tierNumber}`}</td>
                    <td>{tier.qualityRange}</td>
                    <td>{tier.creditPerUnit}</td>
                    {dynamicColumnsForService.map((column, colIndex) => (
                      <td key={colIndex}>
                        {tier.tierDynamicColumns?.find(dc => dc.columnHeader === column.columnHeader)?.columnValue || "N/A"}
                      </td>
                    ))}
                    <td>
                      <Button type="primary" icon={<EditOutlined />} onClick={() => showUpdateModal(service.id, index)} />
                      <Popconfirm title={`Are you sure to delete "${tier.tierNumber}"?`} onConfirm={() => deleteTier(service.id, index)} okText="Yes" cancelText="No">
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3 + (dynamicColumnsForService.length || 0)} style={{ textAlign: "center" }}>
                    No tiers available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CustomCard>
    );
  })}
</div>
)}
        </div>
      </CustomCard>

      {/* Ant Design Modal for Adding New Tier */}
      <Modal title="Add New Tier" visible={isModalVisible} onCancel={handleCancel} footer={null}>
  <Form form={form} onFinish={handleAddTier}>
    <Form.Item
      name="quality"
      label="Quality"
      rules={[{ required: true, message: "Please input the quality!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="credit"
      label="Credit"
      rules={[{ required: true, message: "Please input the credit!" }]}
    >
      <Input />
    </Form.Item>
    {/* Render dynamic column fields */}
    {dynamicColumnsSingle.map((column, index) => (
      <Form.Item
        key={index}
        name={`dynamicColumnValue_${column.columnHeader}`}
        label={column.columnHeader}
        rules={[{ required: true, message: `Please input the value for ${column.columnHeader}!` }]}
      >
        <Input />
      </Form.Item>
    ))}
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Add Tier
      </Button>
    </Form.Item>
  </Form>
</Modal>
      {/* Ant Design Modal for Updating a Tier */}
      <Modal title="Update Tier" visible={isUpdateModalVisible} onCancel={handleCancel} footer={null}>
  <Form form={form} onFinish={handleUpdateTier}>
    <Form.Item
      name="quality"
      label="Quality"
      rules={[{ required: true, message: "Please input the quality!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="credit"
      label="Credit"
      rules={[{ required: true, message: "Please input the credit!" }]}
    >
      <Input />
    </Form.Item>
    {/* Render dynamic column fields */}
    {dynamicColumnsSingle.map((column, index) => (
      <Form.Item
        key={index}
        name={`dynamicColumnValue_${column.columnHeader}`}
        label={column.columnHeader}
        rules={[{ required: true, message: `Please input the value for ${column.columnHeader}!` }]}
      >
        <Input />
      </Form.Item>
    ))}
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Update Tier
      </Button>
    </Form.Item>
  </Form>
</Modal>

      <ToastContainer />
    </Layout>
  );
};

export default PricingTable;