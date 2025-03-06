import CustomCard from '@/components/Card';
import Layout from '@/components/Layout';
import { Table, Button } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ManageForm = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Purchase`); // Replace with your API endpoint
        const data = await response.json();

        // Map the API response to the format expected by the table
        const mappedTransactions = data.map((transaction, index) => ({
          key: index + 1, // Use index as key
          transactionId: transaction.transactionId,
          customerId: transaction.customerid, // Add customer ID
          customer: transaction.customerName, // Keep customer name for display
          totalPurchase: transaction.creditsPurchased, // Assuming this is the total purchase
          totalUsed: transaction.totalUsed, // Placeholder, adjust as needed
          balance: transaction.creditsPurchased, // Placeholder, adjust as needed
          status: transaction.status,
          date: new Date(transaction.purchaseDate).toLocaleDateString(), // Format date as needed
        }));

        setTransactions(mappedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);
  const encodeQueryParams = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return btoa(queryString); // Encode to Base64
};

// Usage in your button
  const columns = [
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' }, // Display customer name
    { title: 'Total Purchase', dataIndex: 'totalPurchase', key: 'totalPurchase' },
    { title: 'Total Used', dataIndex: 'totalUsed', key: 'totalUsed' },
    { title: 'Balance', dataIndex: 'balance', key: 'balance' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>

<Button 
    type="link" 
    onClick={() => {
        const encodedParams = encodeQueryParams({
            transactionId: record.transactionId,
            totalPurchase: record.totalPurchase,
            csname: record.customer,
            csid: record.customerid
        });
        router.push(`/manage-purchase-form/purchased-manager?data=${encodedParams}`);
    }}>
    View
</Button>
          <Button type="link" onClick={() => router.push(`/manage-purchase-form/edit?transactionId=${record.transactionId}&totalPurchase=${record.totalPurchase}`)}>
            Modify
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <CustomCard title="Manage Purchases">
        <Button type="primary" style={{ marginBottom: 16 }} onClick={() => router.push('/manage-purchase-form/addPurchase')}>
          Create Purchase
        </Button>
        {transactions.length > 0 ? (
          <Table
            bordered
            columns={columns}
            dataSource={transactions}
          />
        ) : (
          <p>Loading transactions...</p>
        )}
      </CustomCard>
    </Layout>
  );
};

export default ManageForm;