import { useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'antd';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import Layout from '@/components/Layout';
import CustomCard from '@/components/Card';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalPurchasedCredit, setTotalPurchasedCredit] = useState(0);
  const [totalServices, settotalServices] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPurchasesOverTime, setTotalPurchasesOverTime] = useState([]);
  const [creditsPurchasedByCustomers, setCreditsPurchasedByCustomers] = useState([]);
  const [serviceUsageByCategory, setServiceUsageByCategory] = useState([]);
  const [purchaseStatusDistribution, setPurchaseStatusDistribution] = useState([]);
  const [averageCreditUsedPerPurchase, setAverageCreditUsedPerPurchase] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState([]);

  const columnsCus = [
    {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        render: (_, __, index) => index + 1, // Render the index + 1 for rank
    },
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Total Purchased Credit',
        dataIndex: 'totalPurchasedCredit',
        key: 'totalPurchasedCredit',
        render: (text) => <span>{text.toFixed(2)}</span>, // Format the credit to 2 decimal places
    },


    
];



// Options for the pie chart
const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Service Usage by Category',
            font: {
                size: 20,
                weight: 'bold',
                color: '#ccc', // Title color
            },
            padding: {
                top: 20,
                bottom: 20,
            },
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw || 0;
                    const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${label}: ${value} (${percentage}%)`;
                },
            },
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip background color
            titleColor: '#fff', // Tooltip title color
            bodyColor: '#fff', // Tooltip body color
        },
        legend: {
            position: 'bottom',
            labels: {
                color: 'rgba(255, 255, 255, 0.7)', // Legend text color
            },
        },
    },
    elements: {
        arc: {
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.3)', // Arc border color
        },
    },
    animation: {
        animateRotate: true,
        animateScale: true,
    },
};
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Fetch all data in parallel
        const [
          totalCustomersRes,
          totalCreditsAvailableRes,
          totalServices,
          totalBalance,
          totalPurchasesOverTimeRes,
          creditsPurchasedByCustomersRes,
          serviceUsageByCategoryRes,
          purchaseStatusDistributionRes,
          averageCreditUsedPerPurchaseRes,
          topCustomer
        ] = await Promise.all([
          fetch(`${apiUrl}/dashboard/total-customers`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/total-purchased-credit`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/total-services`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/total-balance`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/total-purchases-over-time`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/credits-purchased-by-customers`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/service-usage-by-category`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/purchase-status-distribution`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/average-credit-used-per-purchase`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/top-customers`).then((res) => res.json()),
        ]);

        // Set state with fetched data
        setTotalCustomers(totalCustomersRes);
        setTotalPurchasedCredit(totalCreditsAvailableRes);
        settotalServices(totalServices);
        setTotalBalance(totalBalance);
        setTotalPurchasesOverTime(totalPurchasesOverTimeRes);
        setCreditsPurchasedByCustomers(creditsPurchasedByCustomersRes);
        setServiceUsageByCategory(serviceUsageByCategoryRes);
        setPurchaseStatusDistribution(purchaseStatusDistributionRes);
        setAverageCreditUsedPerPurchase(averageCreditUsedPerPurchaseRes);
        setTotalCustomer(topCustomer)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
    
    <CustomCard title="Dashboard">
  
      {/* Tiles */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      <div className="col-md-3 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Total Customers</p>
                      <p className="fs-30 mb-2">{totalCustomers}</p>
                      <p>Customer</p>
                    </div>
                  </div>
                </div>
     
        <div className="col-md-3 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Total Services</p>
                      <p className="fs-30 mb-2">{totalServices}</p>
                      <p>Services</p>
                    </div>
                  </div>
                </div>
     
      
        <div className="col-md-3 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Total Purchased</p>
                      <p className="fs-30 mb-2">{totalPurchasedCredit}</p>
                      <p>Credit</p>
                    </div>
                  </div>
                </div>
   
     
        <div className="col-md-3 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Total Balances</p>
                      <p className="fs-30 mb-2">{totalBalance}</p>
                      <p>Credit</p>
                    </div>
                  </div>
                </div>
     
      </Row>

      {/* Row 2: Two Charts */}
   {/* Row 2: Two Charts */}
{/* Row 2: Two Charts */}
<Row gutter={[16, 16]} style={{ marginBottom: '24px', display: 'flex', alignItems: 'stretch' }}>
    <Col xs={24} md={16}>
    <Card
            title="Total Purchases Over Time"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '100%' }}
        >
            <Line
                data={{
                    labels: totalPurchasesOverTime.map((item) => item.date),
                    datasets: [
                        {
                            label: 'Total Purchases',
                            data: totalPurchasesOverTime.map((item) => item.totalPurchases),
                            borderColor: 'rgba(75, 192, 192, 1)', // Line color
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fallback background color
                            fill: true,
                            tension: 0.4,
                            pointRadius: 5, // Size of points
                            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
                            pointBorderColor: '#fff', // Point border color
                            pointBorderWidth: 2, // Point border width
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Purchases Over Time',
                            font: {
                                size: 20,
                                weight: 'bold',
                            },
                        },
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip background color
                            titleColor: '#fff', // Tooltip title color
                            bodyColor: '#fff', // Tooltip body color
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                                color: '#333',
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)', // Lighter grid lines
                                lineWidth: 1,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Total Purchases',
                                color: '#333',
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)', // Lighter grid lines
                                lineWidth: 1,
                            },
                        },
                    },
                    // Add a plugin to create a gradient background
                    plugins: [{
                        beforeDraw: (chart) => {
                            const ctx = chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                            gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)'); // Start color
                            gradient.addColorStop(1, 'rgba(75, 192, 192, 0.1)'); // End color
                            ctx.fillStyle = gradient; // Set the gradient as the fill style
                            ctx.fillRect(0, 0, chart.width, chart.height); // Fill the chart area with the gradient
                        }
                    }]
                }}
            />
        </Card>
    </Col>
    <Col xs={24} md={8}>
    <Card
            title="Service Usage by Category"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '100%' }}
        >
            <Doughnut
                data={{
                    labels: serviceUsageByCategory.map((item) => item.categoryName),
                    datasets: [
                        {
                            label: 'Total Services',
                            data: serviceUsageByCategory.map((item) => item.totalService),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)', // Soft Red
                                'rgba(255, 159, 64, 0.6)', // Soft Orange
                                'rgba(255, 205, 86, 0.6)', // Soft Yellow
                                'rgba(75, 192, 192, 0.6)', // Soft Teal
                                'rgba(54, 162, 235, 0.6)', // Soft Blue
                            ],
                            // Removed borderColor
                            borderWidth: 0, // No borders
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                          //  text: 'Service Usage by Category',
                            font: {
                                size: 24,
                                weight: 'bold',
                                family: 'Arial, sans-serif',
                            },
                            color: '#333',
                            padding: {
                                top: 10,
                                bottom: 20,
                            },
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 20,
                                padding: 15,
                                font: {
                                    size: 14,
                                    family: 'Arial, sans-serif',
                                },
                                color: '#333',
                            },
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            titleFont: {
                                size: 16,
                                weight: 'bold',
                            },
                            bodyFont: {
                                size: 14,
                            },
                            cornerRadius: 5,
                        },
                    },
                    cutout: '70%', // This makes it a donut chart
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                    elements: {
                        arc: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                        },
                    },
                }}
            />
        </Card>
    </Col>
  


        {/* <Col xs={24} md={12}>
          <Card
            title="Credits Purchased by Customers"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <Bar
              data={{
                labels: creditsPurchasedByCustomers.map((item) => item.customerName),
                datasets: [
                  {
                    label: 'Total Credits Purchased',
                    data: creditsPurchasedByCustomers.map((item) => item.totalCreditsPurchased),
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Credits Purchased by Customers',
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Customer Name',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Total Credits Purchased',
                    },
                  },
                },
              }}
            />
          </Card>
        </Col> */}
      </Row>

      {/* Row 3: Top Customers */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            <CustomCard title="Top 5 Customers">
                <Table
                    columns={columnsCus}
                    dataSource={totalCustomer}
                    rowKey="customerName" // Use a unique key for each row
                    pagination={false} // Disable pagination if you want to show all results
                    style={{ width: '100%' }} // Full width
                />
            </CustomCard>
        </Row>
    </CustomCard>
    </Layout>
  );
};

export default Dashboard;