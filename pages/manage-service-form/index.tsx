// import React, { useState, useMemo } from 'react';
// import { Button, Modal, Form, Select, Typography, Layout } from 'antd';
// import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getGroupedRowModel,
//   getExpandedRowModel,
//   flexRender,
// } from '@tanstack/react-table';
// import CustomCard from '../../components/Card';
// import LayoutComponent from '../../components/Layout';

// const { Title } = Typography;
// const { Option } = Select;

// // Sample Data (API data)
// const services = [
//   { id: 1, name: 'Data Insights with Custom Visualization', group: 'Data Insights', credit: 'per Sensor/Tag' },
//   { id: 2, name: 'Enterprise Energy Management, Building', group: 'Energy Management', credit: 'per Sensor/Tag' },
//   { id: 3, name: 'Alarm Management/Priority', group: 'Alarm Management', credit: 'per Sensor/Tag' },
//   { id: 4, name: 'Advanced Data Processing', group: 'Data Insights', credit: 'per report' },
//   { id: 5, name: 'Energy Usage Optimization', group: 'Energy Management', credit: 'per report template' },
//   { id: 6, name: 'Automated Alarm Response', group: 'Alarm Management', credit: 'per report' },
// ];

// const ManageServices = () => {
//   const [serviceData, setServiceData] = useState(services);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingService, setEditingService] = useState(null);
//   const [form] = Form.useForm();

//   const showModal = (service = null) => {
//     setEditingService(service);
//     setIsModalVisible(true);
//     form.setFieldsValue(service || { name: '', credit: '', group: '' });
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   const handleSave = () => {
//     form.validateFields().then((values) => {
//       const updatedData = editingService
//         ? serviceData.map((s) => (s.id === editingService.id ? { ...s, ...values } : s))
//         : [...serviceData, { id: Date.now(), ...values }];
//       setServiceData(updatedData);
//       handleCancel();
//     });
//   };

//   const handleDelete = (id) => {
//     setServiceData(serviceData.filter((s) => s.id !== id));
//   };

//   // Define columns for TanStack Table
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'group',
//         header: 'Group',
//       },
//       {
//         accessorKey: 'name',
//         header: 'Service Name',
//       },
//       {
//         accessorKey: 'credit',
//         header: 'Credit',
//       },
//       {
//         id: 'actions',
//         header: 'Action',
//         cell: ({ row }) => (
//           <>
//             <Button icon={<EditOutlined />} onClick={() => showModal(row.original)} style={{ marginRight: 8 }} />
//             <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(row.original.id)} />
//           </>
//         ),
//       },
//     ],
//     [serviceData]
//   );

//           </>
//         ),
//       },
//     ],
//     [serviceData]
//   );

//   // Use TanStack Table
//   const table = useReactTable({
//     data: serviceData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getGroupedRowModel: getGroupedRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     initialState: useMemo(() => ({
//       grouping: ['group'],
//       expanded: true,
//     }), []),
//     state: useMemo(() => ({
//       grouping: ['group'],
//     }), []),
//   });

//   return (
//     <LayoutComponent>
//       <div className="p-6">
//         <CustomCard title="Manage Services">
//           <Title level={4}>Manage Services</Title>
//           <p>Configure and manage the available service categories.</p>
//           <br />
//           <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: 16 }}>
//             Add Service
//           </Button>

//           {/* Table area */}
//           <div className="w-full overflow-auto">
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th
//                         key={header.id}
//                         style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}
//                       >
//                         {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
//                     {row.getVisibleCells().map((cell) => (
//                       <td
//                         key={cell.id}
//                         style={{ padding: '8px', border: '1px solid #ddd' }}
//                       >
//                         {cell.getIsGrouped() ? (
//                           <span
//                             style={{ cursor: 'pointer', fontWeight: 'bold' }}
//                             onClick={row.getToggleExpandedHandler()}
//                           >
//                             {row.getIsExpanded() ? '-' : '+'} {cell.getValue()} ({row.subRows.length})
//                           </span>
//                         ) : cell.getIsAggregated() ? (
//                           flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
//                         ) : cell.getIsPlaceholder() ? null : (
//                           flexRender(cell.column.columnDef.cell, cell.getContext())
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <Modal title={editingService ? 'Edit Service' : 'Add Service'} visible={isModalVisible} onCancel={handleCancel} onOk={handleSave}>
//             <Form form={form} layout="vertical">
//               <Form.Item name="group" label="Group" rules={[{ required: true, message: 'Please select a group' }]}>
//                 <Select>
//                   {[...new Set(serviceData.map(s => s.group))].map(group => (
//                     <Option key={group} value={group}>{group}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item name="name" label="Service Name" rules={[{ required: true, message: 'Please select a service name' }]}>
//                 <Select>
//                   {serviceData.map(service => (
//                     <Option key={service.name} value={service.name}>{service.name}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item name="credit" label="Credit" rules={[{ required: true, message: 'Please select credit type' }]}>
//                 <Select>
//                   <Option value="per Sensor/Tag">per Sensor/Tag</Option>
//                   <Option value="per report">per report</Option>
//                   <Option value="per report template">per report template</Option>
//                 </Select>
//               </Form.Item>
//             </Form>
//           </Modal>
//         </CustomCard>
//       </div>
//     </LayoutComponent>
//   );
// };

// export default ManageServices;

// import { Collapse, Button, Form, Select, Space, Typography, message, Modal, Popconfirm } from 'antd';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// import { useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CustomCard from '@/components/Card';
// import Layout from '@/components/Layout';

// const { Panel } = Collapse;
// const { Title } = Typography;

// const ManageServicesPage = () => {
//   const [managedServices, setManagedServices] = useState([]);
//   const [credits, setCredits] = useState([]);
//   const [services, setServices] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const [form] = Form.useForm();

//   const [openPanels, setOpenPanels] = useState({}); // Manages expanded/collapsed state


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [managedRes, creditsRes, servicesRes] = await Promise.all([
//           fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageServices/all`),
//           fetch(`${process.env.NEXT_PUBLIC_API_URL}/creditrules`),
//           fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`)
//         ]);

//         setManagedServices(await managedRes.json());
//         setCredits(await creditsRes.json());
//         setServices(await servicesRes.json());


//          // Open all panels by default
//          setOpenPanels(prev => {
//           const initialState = {};
//           managedServices.forEach(service => {
//             initialState[service.categoryName] = true;
//           });
//           return initialState;
//         });


        
//       } catch (error) {
//         toast.error('Failed to load data');
//       }
//     };

//     fetchData();
//   }, []);

//   const togglePanel = (category) => {
//     setOpenPanels((prev) => ({ ...prev, [category]: !prev[category] }));
//   };

//   const groupedServices = managedServices.reduce((acc, service) => {
//     const category = service.categoryName;
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(service);
//     return acc;
//   }, {});

//   const handleSubmit = async (values) => {
//     try {
//       const url = selectedService 
//           ? `${process.env.NEXT_PUBLIC_API_URL}/ManageServices/${selectedService.manageServiceId}`
//           : `${process.env.NEXT_PUBLIC_API_URL}/ManageServices`;

//       const response = await fetch(url, {
//           method: selectedService ? 'PUT' : 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//               serviceId: values.service,
//               creditId: values.credit
//           }),
//       });

//       if (!response.ok) throw new Error();

//       const updated = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageServices/all`).then(res => res.json());
//       setManagedServices(updated);
      
//       toast.success(`Service ${selectedService ? 'updated' : 'added'} successfully!`);
//       setVisible(false);
//       setSelectedService(null);
//     } catch (error) {
//       toast.error('Operation failed!');
//     }
//   };

//   const handleDelete = async (manageServiceId, serviceName) => {
//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageServices/${manageServiceId}`, {
//         method: 'DELETE',
//       });
      
//       setManagedServices(prev => prev.filter(s => s.manageServiceId !== manageServiceId));
//       toast.success(`Service "${serviceName}" deleted successfully!`);
//     } catch (error) {
//       toast.error('Delete failed!');
//     }
//   };

//   const handleCollapseChange = (keys) => {
//     setActiveKey(keys.length ? keys : []); // Allow toggling (collapse all when empty)
//   };
  
//   return (
//     <Layout>
//     <CustomCard title="Manage Services">
//     <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
//         <Title level={3}>Managed Services</Title>
//         <Button 
//           type="primary" 
//           icon={<PlusOutlined />}
//           onClick={() => {
//             form.resetFields();
//             setVisible(true);
//           }}
//         >
//           Add Service Pairing
//         </Button>
//       </div>



//       {/* <Collapse 
//         bordered={false}
//         defaultActiveKey={Object.keys(groupedServices)}
//         className="service-collapse"
//       >
//         {Object.entries(groupedServices).map(([category, services]) => (
//           <Panel 
//             header={`${category} (${services.length} services)`} 
//             key={category}
//             className="category-panel"
//           >
//             <div className="service-table">
//               <div className="service-row header">
//                 <div className="service-name">Service Name</div>
//                 <div className="service-description">Description</div>
//                 <div className="service-credit">Credit Rule</div>
//                 <div className="service-actions">Actions</div>
//               </div>
              
//               {services.map(service => (
//                 <div key={service.manageServiceId} className="service-row">
//                   <div className="service-name">{service.serviceName}</div>
//                   <div className="service-description">{service.serviceDescription}</div>
//                   <div className="service-credit">{service.creditRuleName}</div>
//                   <div className="service-actions">
//                     <Space>
//                       <Button 
//                         icon={<EditOutlined />} 
//                         onClick={() => {
//                           setSelectedService(service);
//                           form.setFieldsValue({
//                             service: service.serviceId,
//                             credit: service.creditRuleId
//                           });
//                           setVisible(true);
//                         }}
//                       />
//                   <Popconfirm
//   title={`Are you sure to delete "${service.serviceName}"?`}
//   onConfirm={() => handleDelete(service.manageServiceId, service.serviceName)}
//   okText="Yes"
//   cancelText="No"
// >
//   <Button 
//     icon={<DeleteOutlined />} 
//     danger 
//   />
// </Popconfirm>
//                     </Space>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Panel>
//         ))}
//       </Collapse> */}

//       <Modal
//         title={selectedService ? "Edit Service Pairing" : "New Service Pairing"}
//         visible={visible}
//         onCancel={() => {
//           setVisible(false);
//           setSelectedService(null);
//         }}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleSubmit}>
//           <Form.Item
//             name="service"
//             label="Service"
//             rules={[{ required: true, message: 'Please select a service!' }]}
//           >
//             <Select placeholder="Select service">
//               {services.map(service => (
//                 <Select.Option key={service.id} value={service.id}>
//                   {service.servicename}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name ="credit"
//             label="Credit Rule"
//             rules={[{ required: true, message: 'Please select a credit rule!' }]}
//           >
//             <Select placeholder="Select credit rule">
//               {credits.map(credit => (
//                 <Select.Option key={credit.id} value={credit.id}>
//                   {credit.creditrulename}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Button type="primary" htmlType="submit" block>
//             {selectedService ? 'Update Pairing' : 'Create Pairing'}
//           </Button>
//         </Form>
//       </Modal>

//       <style jsx global>{`
//         .service-collapse .ant-collapse-item {
//           border-bottom: none !important;
//           margin-bottom: 16px;
//           background: #fff;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .service-collapse .ant-collapse-header {
//           background: #fafafa;
//           border-radius: 8px !important;
//           font-weight: 500;
//           font-size: 16px;
//         }

//         .service-table {
//           margin: 0 -16px;
//         }

//         .service-row {
//           display: flex;
//           padding: 12px 16px;
//           border-bottom: 1px solid #f0f0f0;
//         }

//         .service-row.header {
//           background: #fafafa;
//           font-weight: 500;
//         }

//         .service-name {
//           width: 25%;
//           min-width: 200px;
//         }

//         .service-description {
//           width: 45%;
//           color: #666;
//         }

//         .service-credit {
//           width: 20%;
//         }

//         .service-actions {
//           width: 10%;
//           min-width: 120px;
//           text-align: right;
//         }
//       `}</style>
//     </div>
//     </CustomCard>
//     </Layout>
//   );
// };
// export default ManageServicesPage;



// export default ManageServices;
import { Collapse, Button, Form, Select, Space, Typography, message, Modal, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomCard from '@/components/Card';
import Layout from '@/components/Layout';

const { Panel } = Collapse;
const { Title } = Typography;

const ManageServicesPage = () => {
  const [managedServices, setManagedServices] = useState([]);
  const [credits, setCredits] = useState([]);
  const [services, setServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [form] = Form.useForm();

  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [managedRes, creditsRes, servicesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageServices/all`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/creditrules`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`)
        ]);

        const managedServicesData = await managedRes.json();
        setManagedServices(managedServicesData);
        setCredits(await creditsRes.json());
        setServices(await servicesRes.json());

        // Open all panels by default
        const initialState: Record<string, boolean> = {};
        managedServicesData.forEach((service: { categoryName: string }) => {
          initialState[service.categoryName] = true;
        });
        setOpenPanels(initialState);
      } catch (error) {
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, []);

  const togglePanel = (category: string) => {
    setOpenPanels((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const groupedServices = managedServices.reduce((acc, service) => {
    const category = service.categoryName;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {});

  const handleSubmit = async (values) => {
    try {
      const url = selectedService 
          ? `${process.env.NEXT_PUBLIC_API_URL}/ManageServices/${selectedService.manageServiceId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/ManageServices`;

      const response = await fetch(url, {
          method: selectedService ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              serviceId: values.service,
              creditId: values.credit
          }),
      });

      if (!response.ok) throw new Error();

      const updated = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageServices/all`).then(res => res.json());
      setManagedServices(updated);
      
      toast.success(`Service ${selectedService ? 'updated' : 'added'} successfully!`);
      setVisible(false);
      setSelectedService(null);
    } catch (error) {
      toast.error('Operation failed!');
    }
  };

  const handleDelete = async (manageServiceId, serviceName) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageServices/${manageServiceId}`, {
        method: 'DELETE',
      });
      
      setManagedServices(prev => prev.filter(s => s.manageServiceId !== manageServiceId));
      toast.success(`Service "${serviceName}" deleted successfully!`);
    } catch (error) {
      toast.error('Delete failed!');
    }
  };

  const handleCollapseChange = (keys) => {
    setActiveKey(keys.length ? keys : []); // Allow toggling (collapse all when empty)
  };
  
  return (
    <Layout>

<div className="col-md-12">
      <CustomCard title="Manage Services" fullWidth={true}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={3}>Managed Services</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setVisible(true);
          }}
        >
          Add Service Pairing
        </Button>
      </div>

      {Object.entries(groupedServices).map(([category, categoryServices], index) => (
        <div key={category}>
          <div 
            onClick={() => togglePanel(category)} 
            style={{
              background: '#f0f0f0',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <span> {index + 1}. {category}</span>
            {openPanels[category] ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </div>
          {openPanels[category] && (
            <div className="p-4 bg-white">
              <div className="service-table">
                {/* Table Header */}
                <div className="service-row header">
                  <div className="service-name">Service Name</div>
                  <div className="service-description">Description</div>
                  <div className="service-credit">Credit Rule</div>
                  <div className="service-actions">Actions</div>
                </div>

                {/* Service Items */}
                {categoryServices.map(service => (
                  <div key={service.manageServiceId} className="service-row">
                    <div className="service-name">{service.serviceName}</div>
                    <div className="service-description">{service.serviceDescription}</div>
                    <div className="service-credit">{service.creditRuleName}</div>
                    <div className="service-actions flex gap-2">
                      <Button 
                        icon={<EditOutlined />} 
                        onClick={() => {
                          setSelectedService(service);
                          form.setFieldsValue({
                            service: service.serviceId,
                            credit: service.creditRuleId
                          });
                          setVisible(true);
                        }}
                      />
                      <Popconfirm
                        title={`Are you sure to delete "${service.serviceName}"?`}
                        onConfirm={() => handleDelete(service.manageServiceId, service.serviceName)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button icon={<DeleteOutlined />} danger />
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <Modal
        title={selectedService ? "Edit Service Pairing" : "New Service Pairing"}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setSelectedService(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: 'Please select a service!' }]}
          >
            <Select placeholder="Select service">
              {services.map(service => (
                <Select.Option key={service.id} value={service.id}>
                  {service.servicename}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="credit"
            label="Credit Rule"
            rules={[{ required: true, message: 'Please select a credit rule!' }]}
          >
            <Select placeholder="Select credit rule">
              {credits.map(credit => (
                <Select.Option key={credit.id} value={credit.id}>
                  {credit.creditrulename}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {selectedService ? 'Update Pairing' : 'Create Pairing'}
          </Button>
        </Form>
      </Modal>

      <style jsx global>{`
        .service-collapse .ant-collapse-item {
          border-bottom: none !important;
          margin-bottom: 16px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .service-collapse .ant-collapse-header {
          background: #fafafa;
          border-radius: 8px !important;
          font-weight: 500;
                  }

        .service-table {
          margin: 0 -16px;
        }

        .service-row {
          display: flex;
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .service-row.header {
          background: #fafafa;
          font-weight: 500;
        }

        .service-name {
          width: 25%;
          min-width: 200px;
        }

        .service-description {
          width: 45%;
          color: #666;
        }

        .service-credit {
          width: 20%;
        }

        .service-actions {
          width: 10%;
          min-width: 120px;
          text-align: right;
        }

        @media (max-width: 768px) {
          .service-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .service-name, .service-description, .service-credit, .service-actions {
            width: 100%;
            min-width: 0;
          }

          .service-actions {
            text-align: left;
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
    </CustomCard>
</div>

    </Layout>
  );
};
export default ManageServicesPage;