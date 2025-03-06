import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { Bar, Line, Pie } from 'react-chartjs-2';
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
  const [totalCreditsAvailable, setTotalCreditsAvailable] = useState(0);
  const [totalServices, settotalServices] = useState(0);
  const [mostPopularService, setMostPopularService] = useState({});
  const [totalPurchasesOverTime, setTotalPurchasesOverTime] = useState([]);
  const [creditsPurchasedByCustomers, setCreditsPurchasedByCustomers] = useState([]);
  const [serviceUsageByCategory, setServiceUsageByCategory] = useState([]);
  const [purchaseStatusDistribution, setPurchaseStatusDistribution] = useState([]);
  const [averageCreditUsedPerPurchase, setAverageCreditUsedPerPurchase] = useState([]);

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
          mostPopularServiceRes,
          totalPurchasesOverTimeRes,
          creditsPurchasedByCustomersRes,
          serviceUsageByCategoryRes,
          purchaseStatusDistributionRes,
          averageCreditUsedPerPurchaseRes,
        ] = await Promise.all([
          fetch(`${apiUrl}/dashboard/total-customers`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/total-credits-available`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/total-services`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/most-popular-service`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/total-purchases-over-time`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/credits-purchased-by-customers`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/service-usage-by-category`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/purchase-status-distribution`).then((res) => res.json()),
          fetch(`${apiUrl}/dashboard/average-credit-used-per-purchase`).then((res) => res.json()),
        ]);

        // Set state with fetched data
        setTotalCustomers(totalCustomersRes);
        setTotalCreditsAvailable(totalCreditsAvailableRes);
        settotalServices(totalServices);
        setMostPopularService(mostPopularServiceRes);
        setTotalPurchasesOverTime(totalPurchasesOverTimeRes);
        setCreditsPurchasedByCustomers(creditsPurchasedByCustomersRes);
        setServiceUsageByCategory(serviceUsageByCategoryRes);
        setPurchaseStatusDistribution(purchaseStatusDistributionRes);
        setAverageCreditUsedPerPurchase(averageCreditUsedPerPurchaseRes);
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
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #004f9b 0%, #fda085 100%)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              color: '#fff',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Total Customers</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCustomers}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #004f9b 0%, #8fd3f4 100%)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              color: '#fff',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Total Services </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalServices} Services</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #004f9b 0%, #a6c1ee 100%)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              color: '#fff',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Total Credits Available</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCreditsAvailable}</p>
          </Card>
        </Col>
    
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #004f9b 0%, #fad0c4 100%)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              color: '#fff',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Most Popular Service</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {mostPopularService.serviceName} ({mostPopularService.purchaseCount})
            </p>
          </Card>
        </Col>
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
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Total Purchases Over Time',
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Purchases',
                },
              },
            },
          }}
        />
      </Card>
    </Col>
    <Col xs={24} md={8}>
      <Card
        title="Service Usage by Category"
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '100%' }}
      >
        <Pie
          data={{
            labels: serviceUsageByCategory.map((item) => item.categoryName),
            datasets: [
              {
                label: 'Total Services',
                data: serviceUsageByCategory.map((item) => item.totalService),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Service Usage by Category',
              },
              legend: {
                position: 'bottom',
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

      {/* Row 3: Three Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>

        <Col xs={24} md={8}>
          <Card
            title="Purchase Status Distribution"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <Bar
              data={{
                labels: purchaseStatusDistribution.map((item) => item.status),
                datasets: [
                  {
                    label: 'Purchase Status Distribution',
                    data: purchaseStatusDistribution.map((item) => item.count),
                    backgroundColor: purchaseStatusDistribution.map((item, index) =>
                      `hsl(${index * 90}, 70%, 50%)`
                    ),
                    borderColor: purchaseStatusDistribution.map((item, index) =>
                      `hsl(${index * 90}, 70%, 30%)`
                    ),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Purchase Status Distribution',
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Status',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Count',
                    },
                  },
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            title="Average Credit Used per Purchase"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <Line
              data={{
                labels: averageCreditUsedPerPurchase.map((item) => item.date),
                datasets: [
                  {
                    label: 'Average Credit Used',
                    data: averageCreditUsedPerPurchase.map((item) => item.averageCreditUsed),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Average Credit Used per Purchase',
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Average Credit Used',
                    },
                  },
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </CustomCard>
    </Layout>
  );
};

export default Dashboard;