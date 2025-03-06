import { Table, Card, Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import moment from 'moment';
import CustomCard from '@/components/Card';
import Layout from '@/components/Layout';
import { CaretDownOutlined, CaretRightOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';

const PurchasedManager = () => {
  const router = useRouter();
  const { data } = router.query; 
  const [transactionData, setTransactionData] = useState(null);
  const [openPanels, setOpenPanels] = useState({});
  const [draftService, setDraftService] = useState(null);

      // Define state variables for each parameter
      const [transactionId, setTransactionId] = useState(null);
      const [totalPurchase, setTotalPurchase] = useState(null);
      const [csid, setCsid] = useState(null);
      const [csname, setCsname] = useState(null);

      const [draftValue, setDraftValue] = useState(null); // State to hold the draft value

      const [isModalVisible, setIsModalVisible] = useState(false);
      const [modalData, setModalData] = useState(null);
  
  // //     useEffect(() => {
  // //    console.log(data,'datax');
  // //        if (data) {
          
  // //             // Decode the Base64 string
  // //             const decodedString = atob(data); // Decode from Base64
  // //             const params = new URLSearchParams(decodedString); // Parse the query string
  
  // //             // Set state variables
  // //             setTransactionId(params.get('transactionId'));
  // //             setTotalPurchase(params.get('totalPurchase'));
  // //             setCsid(params.get('csid'));
  // //             setCsname(params.get('csname'));


  // //              // Decode the Base64 string
  // //              const decodedString = atob(data); // Decode from Base64
  // //              const params = new URLSearchParams(decodedString); // Parse the query string
   
  // //                  const storedTransactionId = localStorage.getItem('transactionId');
  // //                  const storedTotalPurchase = localStorage.getItem('totalPurchase');
  // //                  const storedCsid = localStorage.getItem('csid');
  // //                  const storedCsname = localStorage.getItem('csname');
               
  // //                  if (storedTransactionId) setTransactionId(storedTransaction Id(storedTransactionId));
  // //                  if (storedTotalPurchase) setTotalPurchase(storedTotalPurchase);
  // //                  if (storedCsid) setCsid(storedCsid);
  // //                 if (storedCsname) setCsname(storedCsname);
           
          
  // //             // Fetch transaction data or perform any other logic here
  // //     //fetch(`${process.env.NEXT_PUBLIC_API_URL}/PurchaseService/${transactionId}`)
  // //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/PurchaseService/get-purchased-services/${transactionId}`) 
      
  // //     // fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/services-with-categories-customer?transactionId=${transactionId}&customerName=${encodeURIComponent(customerName)}`)
  // //       .then(response => response.json())
  // //       .then(datax => {
  // //         console.log(datax);
  // //         const groupedServices = datax.reduce((acc, service) => {
  // //           const category = service.categoryName;
  // //           if (!acc[category]) acc[category] = [];
  // //           acc[category].push(service);
  // //           return acc;
  // //         }, {});

  // //         setTransactionData({
  // //           customer: datax[0]?.customerName,
  // //           services: groupedServices,
  // //         });

  // //         const initialOpenPanels = Object.keys(groupedServices).reduce((acc, category) => {
  // //           acc[category] = true;
  // //           return acc;
  // //         }, {});
  // //         setOpenPanels(initialOpenPanels);
  // //       })
  // //       .catch(error => {
  // //         console.error('Error fetching transaction data:', error);
  // //       });

  // //            // Call the fetchDraftService function
  // //   const fetchDraftService = async () => {
  // //     try {
  // //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchaseservice/last-draft/${transactionId}`);
  // //       const data = await response.json();
  // //       setDraftService(data);
  // //     } catch (error) {
  // //       console.error('Error fetching draft service:', error);
  // //     }
  // //   };
  // // fetchDraftService();
  // //   }
  // // }, [data]);

  useEffect(() => {
    const draftData = localStorage.getItem('draftPurchaseData');
    if (draftData) {
      const parsedData = JSON.parse(draftData);
      setDraftValue(parsedData.creditUsed); // Assuming you want to show the creditUsed value
    }
    // Function to fetch transaction data
    const fetchTransactionData = async (transactionId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/PurchaseService/get-purchased-services/${transactionId}`);
            const datax = await response.json();
            
            const groupedServices = datax.reduce((acc, service) => {
                const category = service.categoryName;
                if (!acc[category]) acc[category] = [];
                acc[category].push(service);
                return acc;
            }, {});

            setTransactionData({
                customer: datax[0]?.customerName,
                services: groupedServices,
            });
            
            const initialOpenPanels = Object.keys(groupedServices).reduce((acc, category) => {
                acc[category] = true;
                return acc;
            }, {});
            setOpenPanels(initialOpenPanels);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    // Function to fetch draft service
    const fetchDraftService = async (transactionId) => {
      console.log(transactionData);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchaseservice/last-draft/${transactionId}`);
            const data = await response.json();
            setDraftService(data);
        } catch (error) {
            console.error('Error fetching draft service:', error);
        }
    };

    // Check if data is available
    if (data) {
        // Decode the Base64 string
        const decodedString = atob(data); // Decode from Base64
        const params = new URLSearchParams(decodedString); // Parse the query string

        // Set state variables from query parameters
        const transactionIdFromParams = params.get('transactionId');
        const totalPurchaseFromParams = params.get('totalPurchase');
        const csidFromParams = params.get('csid');
        const csnameFromParams = params.get('csname');

        // Set state variables
        setTransactionId(transactionIdFromParams);
        setTotalPurchase(totalPurchaseFromParams);
        setCsid(csidFromParams);
        setCsname(csnameFromParams);

        // Store in local storage
        localStorage.setItem('transactionId', transactionIdFromParams);
        localStorage.setItem('totalPurchase', totalPurchaseFromParams);
        localStorage.setItem('csid', csidFromParams);
        localStorage.setItem('csname', csnameFromParams);

        // Fetch transaction data and draft service
        fetchTransactionData(transactionIdFromParams);
        fetchDraftService(transactionIdFromParams);
    } else {
        // If no data in query, check local storage
        const storedTransactionId = localStorage.getItem('transactionId');
        const storedTotalPurchase = localStorage.getItem('totalPurchase');
        const storedCsid = localStorage.getItem('csid');
        const storedCsname = localStorage.getItem('csname');

        if (storedTransactionId) {
            setTransactionId(storedTransactionId);
            setTotalPurchase(storedTotalPurchase);
            setCsid(storedCsid);
            setCsname(storedCsname);

            // Fetch transaction data and draft service using stored ID
            fetchTransactionData(storedTransactionId);
            fetchDraftService(storedTransactionId);
        } else {
            console.error('No valid transaction data found.');
           // setLoading(false); // Stop loading if no data
        }
    }

   // setLoading(false); // Stop loading after processing
}, [data]); // Dependency array to re-run effect when data changes


  const togglePanel = (category) => {
    setOpenPanels(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleEditClick = (service) => {
    
    const encodedData = btoa(JSON.stringify(service));
    router.push(`/manage-purchase-form/purchased-manager/update-purchase?data=${encodedData}`);
  };

  if (!transactionData) return <p>No valid data.</p>;

  const totalPurchased = Object.values(transactionData.services).flat().length; // Count total services
  const totalUsed = Object.values(transactionData.services).flat().reduce((acc, service) => acc + (service.creditUsed || 0), 0); // Calculate total used
  const balance = totalPurchase - totalUsed; // Calculate balance
  const getLastDraftService = async (transactionId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchaseservice/last-draft/${transactionId}`);
        
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      setDraftService(data);
      return data; // This will return the DraftServiceResponse object
    } catch (error) {
      console.error('Failed to fetch last draft service:', error);
      throw error; // Rethrow the error for further handling
    }
  };

  const showApplyModal = () => {
    const draftData = localStorage.getItem('draftPurchaseData');
    if (!draftData) {
      toast.error('No draft data available to apply.');
      return;
    }

    const parsedData = JSON.parse(draftData);
    const serviceId = parsedData.serviceId;

    let foundService = null;
    for (const category in transactionData.services) {
      const categoryServices = transactionData.services[category];
      foundService = categoryServices.find(service => service.serviceid === serviceId);
      if (foundService) break;
    }

    if (!foundService) {
      toast.error('Service not found.');
      return;
    }

    // Set modal data and show modal
    setModalData({
      serviceName: foundService.serviceName,
      transactionId: parsedData.transactionId,
      serviceId: parsedData.serviceId,
      creditUsed: parsedData.creditUsed,
    });
    setIsModalVisible(true);
  };


  const handleApplyNowClick = async () => {
    if (!modalData) return;

    const updateData = {
      transactionId: modalData.transactionId,
      serviceId: modalData.serviceId,
      creditUsed: modalData.creditUsed,
      status: 'Confirmed',
      action: 'apply draft',
    };

    setIsModalVisible(false); // Close modal

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchaseservice/update-purchase`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Network response was not ok');
      }

      toast.success('Application submitted successfully!');
      localStorage.removeItem('draftPurchaseData');
      setDraftValue(0);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to submit application.');
      console.error('Error submitting application:', error);
    }
  };

  
  return (
    <Layout>
      <CustomCard title={`Transaction ${transactionId} (${totalPurchase} Total Purchased)`}>
        <br />
        
        <div className="row">
                <div className="col-md-3 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Total Purchase</p>
                      <p className="fs-30 mb-2">{totalPurchase}</p>
                      <p>Credit</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4 stretch-card transparent">
                  <div className="card card-dark-blue">
                    <div className="card-body">
                      <p className="mb-4">Total Used</p>
                      <p className="fs-30 mb-2">{totalUsed}</p>
                      <p>Consumsed</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4 stretch-card transparent">
                  <div className="card card-dark-blue">
                    <div className="card-body">
                      <p className="mb-4">Balance</p>
                      <p className="fs-30 mb-2">{balance}</p>
                      <p>Available</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4 stretch-card transparent">
  <div className="card card-dark-blue">
    <div className="card-body">
      <p className="mb-4">Last Draft</p>
      <p className="fs-30 mb-2">{draftValue !== null ? draftValue : 'No draft'}</p> {/* Display the draft value */}
      {draftValue !== null && ( // Conditionally render "Apply Now" only if draftValue is not null
        <p 
          style={{ textDecoration: 'underline', cursor: 'pointer' }} 
          onClick={showApplyModal}
        >
          Apply Now
        </p>
      )}
    </div>
  
                  </div>
                </div>
    
              </div>
           
    
  {/* Confirmation Modal */}
  <Modal
  title="Confirm Application"
  open={isModalVisible}
  onOk={handleApplyNowClick}
  onCancel={() => setIsModalVisible(false)}
  okText="Confirm"
  cancelText="Cancel"
>
  <p>Are you sure you want to apply for the following service?</p>
  
  {modalData && (
    <>
      <p><strong>Service Name:</strong> {modalData.serviceName}</p>
      <p><strong>Credits Used:</strong> {modalData.creditUsed}</p>
    </>
  )}
</Modal>


        <Card title={`Customer: ${csname || 'N/A'}`} style={{ marginBottom: 16 }}>
 

          {Object.entries(transactionData.services).map(([category, categoryServices], index) => (
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
                    <div className="service-row header">
                      <div className="service-name">Service Name</div>
                      <div className="service-used">Credit Used</div>
                      <div className="service-expired">Expiration Date</div>
                      <div className="service-status">Status</div>
                      <div className="service-actions">Action</div>
                    </div>

                    {categoryServices.map(service => (
                      <div key={service.id} className="service-row">
                        <div className="service-name">{service.serviceName}</div>
                        <div className="service-used">{service.creditUsed || 'N/A'}</div>
                        <div className="service-expired">{service.expirationService ? moment(service.expirationService).format('YYYY-MM-DD') : 'N/A'}</div>
                        <div className="service-status">{service.status || 'N/A'}</div>
                        <div className="service-actions ">
                          <Button 
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => handleEditClick(service)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <br />
              <Button type="primary" onClick={() => router.push('/manage-purchase-form')} style={{ marginBottom: 16 }}>
          Cancel
        </Button>
        </Card>

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
      </CustomCard>
      <ToastContainer />
    </Layout>
  );
};



export default PurchasedManager;