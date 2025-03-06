// // pages/services-form/detail/[id].tsx
// import React from 'react';
// import { useRouter } from 'next/router';
// import { Table, Button } from 'antd';
// import Layout from '../../../components/Layout';
// import CustomCard from '@/components/Card';

// // Use the normalized category data directly
// const categoryData = [
//     {
//         id: 1,
//         name: 'Suite Apps', // Added category name
//         services: [
//             { key: 1, credit: 1, name: 'Data Insights with Custom Visualization', unit: 'per Sensor/Tag' },
//             { key: 2, credit: 2, name: 'Enterprise Energy Management, Building', unit: 'per Sensor/Tag' },
//         ],
//     },
//     {
//         id: 2,
//         name: 'Enterprise Services', // Added category name
//         services: [
//             { key: 1, credit: 1, name: 'Cloud Storage Solutions', unit: 'per GB' },
//             { key: 2, credit: 2, name: 'Data Backup Services', unit: 'per Backup' },
//         ],
//     },
// ];

// const CategoryDetail: React.FC = () => {
//     const router = useRouter();
//     const { id } = router.query;

//     // Find the category by ID
//     const category = categoryData.find((category) => category.id === Number(id));
//     const services = category ? category.services : [];

//     const columns = [
//         { title: 'Credit', dataIndex: 'credit', key: 'credit' },
//         { title: 'Service Name', dataIndex: 'name', key: 'name' },
//         { title: 'Unit', dataIndex: 'unit', key: 'unit' },
//     ];

//     return (
//         <Layout>
//             <CustomCard title={`Category: ${category ? category.name : ''}`}>
//                 <Button type="primary" onClick={() => router.back()} style={{ marginBottom: 16 }}>
//                     Back
//                 </Button>
//                 <Table
//                     dataSource={services}
//                     columns={columns}
//                     rowKey="key"
//                     pagination={false}
//                     components={{
//                         header: {
                           
//                             cell: (props) => {
//                                 const { children, ...restProps } = props;
//                                 return (
//                                     <th {...restProps} style={{ textAlign: 'center' }}>
//                                         {children}
//                                     </th>
//                                 );
//                             },
//                         },
//                     }}
//                     title={() => (
//                         <h3 style={{ textAlign: 'center', margin: 0 }}>
//                             {category ? category.name : ''}
//                         </h3>
//                     )}
                   
//                 />
//             </CustomCard>
//         </Layout>
//     );
// };
// export default CategoryDetail;


// pages/services-form/detail/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, Button } from 'antd';
import Layout from '../../../components/Layout';
import CustomCard from '@/components/Card';

const CategoryDetail: React.FC = () => {
    const router = useRouter();
    
    const { id, categoryName } = router.query; // Retrieve both id and categoryName from the query
    const [services, setServices] = useState([]);

    // Fetch services based on category ID
    const fetchServices = async () => {
        if (!id) return; // Ensure id is available
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/category/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [id]);

    const columns = [
        { title: 'Service Name', dataIndex: 'servicename', key: 'servicename' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
    ];

    return (
        <Layout>
            <CustomCard title={`Services for Category: ${categoryName}`}>
                <Button type="primary" onClick={() => router.back()} style={{ marginBottom: 16 }}>
                    Back
                </Button>
                <Table
                    dataSource={services}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            </CustomCard>
        </Layout>
    );
};

export default CategoryDetail;