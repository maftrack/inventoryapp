import React from 'react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Inventory Management System</h1>
        <p>This is the home page content.</p>
      </>
    </Layout>
  );
};

export default Home;