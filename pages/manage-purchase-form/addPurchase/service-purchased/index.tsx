// import { Card, Button, Switch } from 'antd';
// import { useEffect, useState } from 'react';
// import moment from 'moment';
// import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
// import { toast } from 'react-toastify';

// const ServicePurchasedEdit = ({ purchase }) => {
//   const [transactionData, setTransactionData] = useState(null);
//   const [openPanels, setOpenPanels] = useState({});
//   const [takedPlan, setTakedPlan] = useState([]); // State to manage selected service IDs
//  console.log(purchase, 'purchase data')
//   useEffect(() => {
//     // Fetch data from the API for services with categories
//     const fetchServicesWithCategories = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/services-with-categories`);
//         const data = await response.json();

//         // Group services by category
//         const groupedServices = data.reduce((acc, service) => {
//           const category = service.categoryName;
//           if (!acc[category]) acc[category] = [];
//           acc[category].push({
//             id: service.serviceId,
//             serviceName: service.serviceName,
//             creditUsed: service.creditUsed || 'N/A',
//             expirationService: service.expirationService,
//             status: service.status || 'N/A',
//           });
//           return acc;
//         }, {});

//         setTransactionData({
//           customer: data[0]?.customerName || 'N/A',
//           services: groupedServices,
//         });

//         // Set all panels to open by default
//         const initialOpenPanels = Object.keys(groupedServices).reduce((acc, category) => {
//           acc[category] = true;
//           return acc;
//         }, {});
//         setOpenPanels(initialOpenPanels);

//         // Fetch currently purchased services using transactionId and customerName
//         await fetchPurchasedServices(purchase.transactionId);
//       } catch (error) {
//         console.error('Error fetching transaction data:', error);
//       }
//     };

//     // Fetch purchased services based on transactionId and customerName
//     const fetchPurchasedServices = async (transactionId) => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/services-with-categories-customer?transactionId=${transactionId}`);
//         const purchasedServices = await response.json();

//         // Extract service IDs from the purchased services
//         const selectedServiceIds = purchasedServices.map(service => service.serviceId);
//         setTakedPlan(selectedServiceIds); // Replace dummy data with actual purchased service IDs
//       } catch (error) {
//         console.error('Error fetching purchased services:', error);
//       }
//     };

//     fetchServicesWithCategories();
//   }, [purchase]); // Dependency array to refetch if purchase changes

//   const togglePanel = (category) => {
//     setOpenPanels(prev => ({ ...prev, [category]: !prev[category] }));
//   };

//   const handleServiceToggle = (serviceId, checked) => {
//     setTakedPlan(prev => {
//       if (checked) {
//         return [...prev, serviceId]; // Add service ID to TakedPlan
//       } else {
//         return prev.filter(id => id !== serviceId); // Remove service ID from TakedPlan
//       }
//     });
//   };

//   const handleCategoryToggle = (category, checked) => {
//     if (transactionData.services[category]) {
//       const serviceIds = transactionData.services[category].map(service => service.id);
//       setTakedPlan(prev => {
//         if (checked) {
//           return [...new Set([...prev, ...serviceIds])]; // Add all service IDs to TakedPlan
//         } else {
//           return prev.filter(id => !serviceIds.includes(id)); // Remove all service IDs from TakedPlan
//         }
//       });
//     }
//   };

//   if (!transactionData) return <p>No valid data.</p>;

//   return (
//     <>
//      <Button type="primary" onClick={async () => {
//   console.log(takedPlan); // Array of service ID list to send to server

//   // Create an array of purchase entries
//   const purchaseEntries = takedPlan.map(serviceId => ({
//     ServiceId: serviceId,
//     User: purchase.customerid,
//     TransactionId: purchase.transactionId
//   }));
//  console.log(purchaseEntries);
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/PurchaseService/UpdatePurchasesService`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(purchaseEntries),
//     });

//     if (!response.ok) {
//       const errorData = await response.json(); // Get error details
//       console.error('Error details:', errorData); // Log error details
//       throw new Error('Failed to update purchases');
//     }

//     const data = await response.json();
//     console.log(data); // Handle success response
//     toast.success('Purchases updated successfully');
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//     toast.error(error.message);
//   }
// }} style={{ marginBottom: 16 }}>
//   Update Purchases
// </Button>
//       <Card>
//         {Object.entries(transactionData.services).map(([category, categoryServices], index) => (
//           <div key={category}>
//             <div
//               style={{
//                 background: '#f0f0f0',
//                 padding: '12px 16px',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px  8px rgba(0,0,0,0.1)',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginBottom: '16px',
//               }}
//             >
//               <span>{index + 1}. {category}</span>
//               <Switch
//                 checked={categoryServices.some(service => takedPlan.includes(service.id))}
//                 onChange={(checked) => handleCategoryToggle(category, checked)}
//                 style={{ marginLeft: 'auto' }} />
//               <div onClick={() => togglePanel(category)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
//                 {openPanels[category] ? <CaretDownOutlined /> : <CaretRightOutlined />}
//               </div>
//             </div>
//             {openPanels[category] && (
//               <div className="p-4 bg-white">
//                 <div className="service-table">
//                   {/* Table Header */}
//                   <div className="service-row header">
//                     <div className="service-name">Service Name</div>
//                     <div className="service-used">Credit Used</div>
//                     <div className="service-expired">Expiration Date</div>
//                     <div className="service-status">Status</div>
//                     <div className="service-actions">Action</div>
//                   </div>

//                   {/* Service Items */}
//                   {categoryServices.map(service => (
//                     <div key={service.id} className={`service-row ${takedPlan.includes(service.id) ? 'checked' : ''}`}>
//                       <div className="service-name">{service.serviceName}</div>
//                       <div className="service-used">{service.creditUsed}</div>
//                       <div className="service-expired">{service.expirationService ? moment(service.expirationService).format('YYYY-MM-DD') : 'N/A'}</div>
//                       <div className="service-status">{service.status}</div>
//                       <div className="service-actions">
//                         <Switch
//                           checked={takedPlan.includes(service.id)}
//                           onChange={(checked) => handleServiceToggle(service.id, checked)}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </Card>

//       <style jsx public>{`
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
//           width: 20%;
//           min-width: 200px;
//         }

//         .service-expired {
//           width: 25%;
//           color: #666;
//         }

//         .service-status {
//           width: 20%;
//         }

//         .service-used {
//           width: 15%;
//         }

//         .service-actions {
//           width: 15%;
//           min-width: 120px;
//           text-align: right;
//         }

//         .checked {
//           background-color: #fff20442; /* Highlight checked items */
//         }

//         @media (max-width: 768px) {
//           .service-row {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .service-name, .service-expired, .service-status, .service-actions, .service-used {
//             width: 100%;
//             min-width: 0;
//           }

//           .service-actions {
//             text-align: left;
//             margin-top: 8px;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default ServicePurchasedEdit;
import { Card, Button, Switch, Modal } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const ServicePurchasedEdit = ({ purchase }) => {
  const [transactionData, setTransactionData] = useState(null);
  const [openPanels, setOpenPanels] = useState({});
  const [takedPlan, setTakedPlan] = useState([]); // State to manage selected service IDs
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [serviceToUnselect, setServiceToUnselect] = useState(null);
  const [categoryToUnselect, setCategoryToUnselect] = useState(null); // Track category being unselected

  useEffect(() => {
    // Fetch data from the API for services with categories
    const fetchServicesWithCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/services-with-categories`);
        const data = await response.json();
        console.log(data);
        // Group services by category
        const groupedServices = data.reduce((acc, service) => {
          const category = service.categoryName;
          if (!acc[category]) acc[category] = [];
          acc[category].push({
            id: service.serviceId,
            serviceName: service.serviceName,
            creditUsed: service.creditUsed || 'N/A',
            expirationService: service.expirationService,
            status: service.status || 'N/A',
            haveUnit: service.haveUnit // Include the HaveUnit property
          });
          return acc;
        }, {});

        setTransactionData({
          customer: data[0]?.customerName || 'N/A',
          services: groupedServices,
        });
     
        // Set all panels to open by default
        const initialOpenPanels = Object.keys(groupedServices).reduce((acc, category) => {
          acc[category] = true;
          return acc;
        }, {});
        setOpenPanels(initialOpenPanels);

        // Fetch currently purchased services using transactionId and customerName
        await fetchPurchasedServices(purchase.transactionId);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    // Fetch purchased services based on transactionId and customerName
    const fetchPurchasedServices = async (transactionId) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/services-with-categories-customer?transactionId=${transactionId}`);
        const purchasedServices = await response.json();

        // Extract service IDs from the purchased services
        const selectedServiceIds = purchasedServices.map(service => service.serviceId);
        setTakedPlan(selectedServiceIds); // Replace dummy data with actual purchased service IDs
      } catch (error) {
        console.error('Error fetching purchased services:', error);
      }
    };

    fetchServicesWithCategories();
  }, [purchase]); // Dependency array to refetch if purchase changes

  const togglePanel = (category) => {
    setOpenPanels(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleServiceToggle = (serviceId, checked) => {
    if (!checked) {
      setServiceToUnselect(serviceId);
      setIsModalVisible(true);
    } else {
      setTakedPlan(prev => [...prev, serviceId]); // Add service ID to TakedPlan
    }
  };

  const handleCategoryToggle = (category, checked) => {
    if (!checked) {
      setCategoryToUnselect(category); // Track the category being unselected
      setIsModalVisible(true);
    } else {
      // If checked, add only services with haveUnit === true to TakedPlan
      const serviceIds = transactionData.services[category]
        .filter(service => service.haveUnit) // Filter services with haveUnit === true
        .map(service => service.id);
      setTakedPlan(prev => [...new Set([...prev, ...serviceIds])]);
    }
  };

  const handleModalConfirm = () => {
    if (serviceToUnselect) {
      // Handle unselecting a single service
      setTakedPlan(prev => prev.filter(id => id !== serviceToUnselect));
    } else if (categoryToUnselect) {
      // Handle unselecting an entire category
      const serviceIds = transactionData.services[categoryToUnselect].map(service => service.id);
      setTakedPlan(prev => prev.filter(id => !serviceIds.includes(id)));
    }
    setIsModalVisible(false);
    setServiceToUnselect(null);
    setCategoryToUnselect(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    if (serviceToUnselect) {
      // Revert the switch back to checked for the service
      setTakedPlan(prev => [...prev, serviceToUnselect]);
    } else if (categoryToUnselect) {
      // Revert the switch back to checked for the category
      const serviceIds = transactionData.services[categoryToUnselect]
        .filter(service => service.haveUnit) // Filter services with haveUnit === true
        .map(service => service.id);
      setTakedPlan(prev => [...new Set([...prev, ...serviceIds])]);
    }
    setServiceToUnselect(null);
    setCategoryToUnselect(null);
  };

  if (!transactionData) return <p>No valid data.</p>;

  return (
    <>
      <Button type="primary" onClick={async () => {
        console.log(takedPlan); // Array of service ID list to send to server

        // Create an array of purchase entries
        const purchaseEntries = takedPlan.map(serviceId => ({
          ServiceId: serviceId,
          User: purchase.customerid,
          TransactionId: purchase.transactionId
        }));
        console.log(purchaseEntries);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/PurchaseService/UpdatePurchasesService`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseEntries),
          });

          if (!response.ok) {
            const errorData = await response.json(); // Get error details
            console.error('Error details:', errorData); // Log error details
            throw new Error('Failed to update purchases');
          }

          const data = await response.json();
          console.log(data); // Handle success response
          toast.success('Purchases updated successfully');
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          toast.error(error.message);
        }
      }} style={{ marginBottom: 16 }}>
        Update Purchases
      </Button>
      <Card>
        {Object.entries(transactionData.services).map(([category, categoryServices], index) => (
          <div key={category}>
            <div
              style={{
                background: '#f0f0f0',
                padding: '12px 16px',
                borderRadius: '8px',
                boxShadow: '0 2px  8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <span>{index + 1}. {category}</span>
              <Switch
                checked={categoryServices.some(service => takedPlan.includes(service.id))}
                onChange={(checked) => handleCategoryToggle(category, checked)}
                style={{ marginLeft: 'auto' }} />
              <div onClick={() => togglePanel(category)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                {openPanels[category] ? <CaretDownOutlined /> : <CaretRightOutlined />}
              </div>
            </div>
            {openPanels[category] && (
              <div className="p-4 bg-white">
                <div className="service-table">
                  {/* Table Header */}
                  <div className="service-row header">
                    <div className="service-name">Service Name</div>
                    <div className="service-used">Credit Used</div>
                    <div className="service-expired">Expiration Date</div>
                    <div className="service-status">Status</div>
                    <div className="service-actions">Action</div>
                  </div>

                  {/* Service Items */}
                  {categoryServices.map(service => {
                    console.log(`Service ID: ${service.id}, Have Unit: ${service.haveUnit}`); // Debugging log
                    return (
                      <div key={service.id} className={`service-row ${takedPlan.includes(service.id) ? 'checked' : ''}`}>
                        <div className="service-name">{service.serviceName}</div>
                        <div className="service-used">{service.creditUsed}</div>
                        <div className="service-expired">{service.expirationService ? moment(service.expirationService).format('YYYY-MM-DD') : 'N/A'}</div>
                        <div className="service-status">{service.status}</div>
                        <div className="service-actions">
                          <Switch
                            checked={takedPlan.includes(service.id)}
                            onChange={(checked) => handleServiceToggle(service.id, checked)}
                            disabled={!service.haveUnit} // Disable switch if haveUnit is false
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </Card>

      <Modal
        title="Warning"
        visible={isModalVisible}
        onOk={handleModalConfirm}
        onCancel={handleModalCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>
          {serviceToUnselect
            ? "Warning, the credit used on this service will also be removed. Are you sure you want to remove this service?"
            : "Warning, the credit used on all services in this <category will also be removed. Are you sure you want to remove this category?"}
        </p>
      </Modal>

      <style jsx public>{`
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
          width: 20%;
          min-width: 200px;
        }

        .service-expired {
          width: 25%;
          color: #666;
        }

        .service-status {
          width: 20%;
        }

        .service-used {
          width: 15%;
        }

        .service-actions {
          width: 15%;
          min-width: 120px;
          text-align: right;
        }

        .checked {
          background-color: #fff20442; /* Highlight checked items */
        }

        @media (max-width: 768px) {
          .service-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .service-name, .service-expired, .service-status, .service-actions, .service-used {
            width: 100%;
            min-width: 0;
          }

          .service-actions {
            text-align: left;
            margin-top: 8px;
          }
        }
      `}</style>
    </>
  );
};

export default ServicePurchasedEdit;