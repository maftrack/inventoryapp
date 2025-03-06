
import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Select, Card, Space } from "antd";
import CustomCard from "@/components/Card";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import {useRouter} from "next/router";

const { Option } = Select;

const PricingTable = () => {
    const router = useRouter();
  ////  const { categoryId } = router.query;
  const {pricingCategory } = router.query; 
    const [credit, setCredit] = useState('');
  const [services, setServices] = useState([]);
  const [serviceTiers, setServiceTiers] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedService, setSelectedService] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [currentTierIndex, setCurrentTierIndex] = useState(null); // Track the index of the tier being updated
  const [currentServiceId, setCurrentServiceId] = useState(null); // Track the current service ID for operations
  
  // Static category ID
//  const categoryId = "06ababc0-965c-4334-bae8-97835655895c"; // Your static category ID

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

  // Fetch tiers for all services
  const fetchTiersForAllServices = async () => {
    try {
      const allTiers = {};

      // Fetch tiers for each service
      for (const service of services) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers/pricingcategory/${service.id}`);
        if (response.ok) {
          const data = await response.json();
          allTiers[service.id] = data.map((tier) => ({
            tier: `Tier ${tier.tierNumber}`,
            quality: tier.qualityRange,
            credit: tier.creditPerUnit,
          }));
        } else {
          console.error(`Failed to fetch tiers for service ${service.id}:`, response.statusText);
        }
      }

      // Update the serviceTiers state with all fetched tiers
      setServiceTiers(allTiers);
    } catch (error) {
      console.error("Error fetching tiers for all services:", error);
    }
  };
  //fetch category credit
// //   useEffect(() => {
// //     if (categoryId) {
// //         // Fetch the initial category credit using fetch
// //         fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorypricing/${categoryId}`)
// //             .then(response => response.json())
// //             .then(data => {
// //                 setCredit(data.credit);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching category credit:', error);
// //             });
// //     }
// // }, [categoryId]);


// // //update category credit
// // const handleSetCredit = () => {
// //     const data = {
// //         categoryId,
// //         credit: parseFloat(credit)
// //     };
// //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorypricing`, {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(data)
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //         toast.success('Category credit updated');
// //     })
// //     .catch(error => {
// //         toast.error('Error updating category credit');
// //     });
// // };

  // Fetch services and tiers when the component mounts
  useEffect(() => {
    fetchServicesByCategory();
  }, []);

//   Fetch tiers for all services when the services list is updated
  useEffect(() => {
    if (services.length > 0) {
      fetchTiersForAllServices();
    }
  }, [services]);

  // Open modal for adding a new tier
  const showModal = (serviceId) => {
    setCurrentServiceId(serviceId); // Set the current service ID for adding tiers
    setIsModalVisible(true);
  };

  // Open modal for updating a tier
  const showUpdateModal = (serviceId, index) => {
    setCurrentServiceId(serviceId);
    setCurrentTierIndex(index);
    const tierToUpdate = serviceTiers[serviceId][index];
    form.setFieldsValue({
      quality: tierToUpdate.quality,
      credit: tierToUpdate.credit,
    });
    setIsUpdateModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsUpdateModalVisible(false);
    form.resetFields(); // Reset form fields
  };

  // Add new tier
  const handleAddTier = (values) => {
    const currentTiers = serviceTiers[currentServiceId] || [];
    const tierNumber = currentTiers.length + 1; // Auto-increment tier number
    const updatedTiers = [...currentTiers, { tier: `Tier ${tierNumber}`, ...values }];

    setServiceTiers((prev) => ({
      ...prev,
      [currentServiceId]: updatedTiers, // Update tiers for the current service
    }));

    setIsModalVisible(false);
    form.resetFields(); // Reset form fields
  };

  // Update tier
  const handleUpdateTier = (values) => {
    const updatedTiers = [...serviceTiers[currentServiceId]];
    updatedTiers[currentTierIndex] = {
      ...updatedTiers[currentTierIndex],
      quality: values.quality,
      credit: values.credit,
    };

    setServiceTiers((prev) => ({
      ...prev,
      [currentServiceId]: updatedTiers, // Update tiers for the current service
    }));

    setIsUpdateModalVisible(false);
    form.resetFields(); // Reset form fields
  };

  // Delete tier
  const deleteTier = (serviceId, index) => {
    const updatedTiers = serviceTiers[serviceId].filter((_, i) => i !== index);
    setServiceTiers((prev) => ({
      ...prev,
      [serviceId]: updatedTiers, // Update tiers for the specific service
    }));
  };

  // Handle service selection
  const handleServiceSelect = (value) => {
   /// print(value)
    setSelectedService(value);
    if (showAll) {
      setShowAll(false); // Reset to single mode when a service is selected
    }
  };

  // Show all services
  const handleShowAll = () => {
    setShowAll((prev) => {
      const newShowAll = !prev;
      if (newShowAll) {
        setSelectedService(null); // Reset the selected service when showing all
      }
      return newShowAll;
    });

    
  };
    // Collect table data for posting
    const collectTableData = () => {
      const data = [];
  
      for (const [serviceId, tiers] of Object.entries(serviceTiers)) {
        const service = services.find((s) => s.id === serviceId);
        if (!service) continue;
  
        tiers.forEach((tier) => {
          const tierNumber = parseInt(tier.tier.replace("Tier ", ""), 10);
  
          data.push({
            PricingCategoryId: service.id, // Match the DTO property
            TierNumber: tierNumber, // Match the DTO property
            QualityRange: tier.quality, // Match the DTO property
            CreditPerUnit: tier.credit, // Match the DTO property
          });
        });
      }
  
      return data;
    };
  
  const handlePostData = async () => {
    const data = collectTableData(); // Collect the data to be sent
    console.log(data);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the array of TierCreateDto
      });

      if (response.ok) {
        toast.success("Tiers posted successfully!");
        // Optionally, refresh the service tiers after posting
        fetchTiersForAllServices(); // Refresh all tiers
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error("An error occurred while posting data.");
    }
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
        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
      }
    >
      <Option value="" disabled>Select a service</Option>
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
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            textAlign: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "rgb(0 0 0 / 23%) 5px 5px 10px 6px"
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd" }}></th>
              <th
                colSpan={3}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: 'white',
                  background:
                    'linear-gradient(90deg, rgb(0 79 155) 0%, rgb(0 79 155) 35%, rgba(0, 212, 255, 1) 100%)',
                }}
              >
                {services.find((service) => service.id === selectedService)
                  ?.pricingCategoryName || selectedService}
              </th>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                }}
              >
                Tier
              </th>
              <th style={{ border: "1px solid #ddd", color: 'white', padding: "8px", background: 'linear-gradient(359deg, #8bd4ff 0%, #0015ff 100%)' }}>
  Quality [Sensor]
</th>
<th style={{ border: "1px solid #ddd", color: 'white', padding: "8px", background: 'linear-gradient(359deg, #8bd4ff 0%, #0015ff 100%)' }}>
  Credit per Unit/month
</th>
<th style={{ border: "1px solid #ddd", color: 'white', padding: "8px", background: 'linear-gradient(359deg, #8bd4ff 0%, #0015ff 100%)' }}>
  Action
</th>
            </tr>

          </thead>
          <tbody>
            {(serviceTiers[selectedService] || []).map((tier, index) => (
              <tr
                key={index}
                style={{
                  background:
                    index % 2 === 0
                      ? 'linear-gradient(160deg, #e0f7fa 0%, #80deea 100%)' // Gradient for even rows
                      : 'linear-gradient(160deg, #ffebee 0%, #9ab8ef 100%)', // Gradient for odd rows
                }}
              >
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                  }}
                >
                  {tier.tier}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {tier.quality}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {tier.credit}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <Button
                    type="primary"
                    onClick={() => showUpdateModal(selectedService, index)}
                  >
                    Update
                  </Button>
                  <Button
                    type="danger btn-danger"
                    onClick={() => deleteTier(selectedService, index)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomCard>
  </div>

)} 


          {/* Render all services tables */}
         {showAll && (
  <div style={{ marginTop: "20px" }}>
    {services.map((service) => (
      <CustomCard key={service.id} title={service.pricingCategoryName}>
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
              boxShadow: "rgb(0 0 0 / 23%) 5px 5px 10px 6px"
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd" }}></th>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    color: 'white',
                    background: 'linear-gradient(90deg, rgb(0 79 155) 0%, rgb(0 79 155) 35%, rgba(0, 212, 255, 1) 100%)',
                  }}
                >
                  {service.pricingCategoryName}
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                    color: 'white'
                  }}
                >
                  Tier
                </th>
                <th style={{ border: "1px solid #ddd", color: 'white', padding: "8px", background: 'linear-gradient(359deg, #8bd4ff 0%, #0015ff 100%)' }}>
  Quality [Sensor]
</th>
<th style={{ border: "1px solid #ddd", color: 'white', padding: "8px", background: 'linear-gradient(359deg, #8bd4ff 0%, #0015ff 100%)' }}>
  Credit per Unit/month
</th>
<th style={{ border: "1px solid #ddd", color: 'white', padding: "8px", background: 'linear-gradient(359deg, #8bd4ff 0%, #0015ff 100%)' }}>
  Action
</th>

              </tr>
            </thead>
            <tbody>
              {(serviceTiers[service.id] || []).map((tier, index) => (
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0
                      ? 'linear-gradient(160deg, #e0f7fa 0%, #80deea 100%)' // Gradient for even rows
                      : 'linear-gradient(160deg, #ffebee 0%, #9ab8ef 100%)', // Gradient for odd rows
                  }}
                >
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                    }}
                  >
                    {tier.tier}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {tier.quality}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {tier.credit}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <Button
                      type="primary"
                      onClick={() => showUpdateModal(service.id, index)}
                    >
                      Update
                    </Button>
                    <Button
                      type="danger"
                      className="btn-danger"
                      onClick={() => deleteTier(service.id, index)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomCard>
    ))}
  </div>
)} 

        </div>
      </CustomCard>

      {/* Ant Design Modal for Adding New Tier */}
      <Modal title="Add New Tier" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleAddTier}>
          <Form.Item name="quality" label="Quality" rules={[{ required: true, message: 'Please input the quality!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="credit" label="Credit" rules={[{ required: true, message: 'Please input the credit!' }]}>
            <Input />
          </Form.Item>
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
          <Form.Item name="quality" label="Quality" rules={[{ required: true, message: 'Please input the quality!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="credit" label="Credit" rules={[{ required: true, message: 'Please input the credit!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Tier
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    
    <ToastContainer></ToastContainer>
    </Layout>

  );
};

export default PricingTable;
