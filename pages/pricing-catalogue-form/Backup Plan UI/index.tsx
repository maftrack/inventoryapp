import CustomCard from '@/components/Card';
import Layout from '@/components/Layout';
import PricingCard from '@/components/PricingCard';
import { useEffect, useState } from 'react';
import { Row, Col, Input } from 'antd'; // Import Ant Design components

const { Search } = Input;

export default function PricingDetail() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch('http://192.168.0.104:5216/api/services/services-with-categories-all');
            const data = await response.json();
            setServices(data);
        };

        fetchServices();
    }, []);

    // Group services by category
    const groupedServices = services.reduce((acc, service) => {
        const categoryId = service.categoryId;
        if (!acc[categoryId]) {
            acc[categoryId] = {
                categoryName: service.categoryName,
                services: [],
                categoryId: categoryId // Store categoryId here
            };
        }
        acc[categoryId].services.push(service);
        return acc;
    }, {});

    // Get the number of categories
    const categories = Object.values(groupedServices);

    // Filter categories based on search term
    const filteredCategories = categories.filter(group => {
        // Check if the category name includes the search term
        const categoryMatch = group.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

        // Check if any service name includes the search term (case insensitive)
        const serviceMatch = group.services.some(service =>
            service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Return true if either the category name or any service name matches
        return categoryMatch || serviceMatch;
    });

    return (
        <Layout>
            <CustomCard title="Pricing Detail">
                <Input
                    placeholder="Search service name or category name"
                    onChange={e => setSearchTerm(e.target.value)} // Update search term on change
                    style={{ marginBottom: 16 }}
                />
                <Row gutter={[16, 16]} justify={filteredCategories.length % 4 === 0 ? "center" : "start"}>
                    {filteredCategories.map((group, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <PricingCard 
                                category={group.categoryName} 
                                services={group.services} 
                                categoryId={group.categoryId} // Pass categoryId to PricingCard
                            />
                        </Col>
                    ))}
                </Row>
            </CustomCard>
        </Layout>
    );
}