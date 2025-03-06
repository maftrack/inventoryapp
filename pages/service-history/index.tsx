// components/PurchaseServiceHistoryTable.js
import React, { useEffect, useState } from 'react';
import { Table, Input, Space, Button, Modal, Form, Select, Checkbox, Tabs } from 'antd';
import Layout from '@/components/Layout';
import CustomCard from '@/components/Card';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const PurchaseServiceHistoryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        transactionid: { value: '', enabled: false },
        serviceName: { value: '', enabled: false },
        editor: { value: '', enabled: false },
        status: { value: '', enabled: false },
        amount: { value: '', enabled: false },
    });
    const [visibleColumns, setVisibleColumns] = useState({
        dateCreated: true,
        transactionid: true,
        serviceName: true,
        amount: true,
        editor: true,
        status: true,
        action: true,
    });

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize, searchText, filters]);

    useEffect(() => {
        const savedVisibleColumns = JSON.parse(localStorage.getItem('visibleColumns'));
        if (savedVisibleColumns) {
            setVisibleColumns(savedVisibleColumns);
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchaseServiceHistory?page=${pagination.current}&pageSize=${pagination.pageSize}&search=${searchText}&transactionid=${filters.transactionid.enabled ? filters.transactionid.value : ''}&serviceName=${filters.serviceName.enabled ? filters.serviceName.value : ''}&editor=${filters.editor.enabled ? filters.editor.value : ''}&status=${filters.status.enabled ? filters.status.value : ''}&amount=${filters.amount.enabled ? filters.amount.value : ''}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.items);
            setPagination({
                ...pagination,
                total: result.total,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
        setPagination({ ...pagination, current: 1 }); // Reset to first page
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        fetchData(); // Fetch data with the applied filters
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFilterChange = (changedValues) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...changedValues,
        }));
    };

    const handleColumnVisibilityChange = (columnKey, isVisible) => {
        const newVisibleColumns = { ...visibleColumns, [columnKey]: isVisible };
        setVisibleColumns(newVisibleColumns);
        localStorage.setItem('visibleColumns', JSON.stringify(newVisibleColumns));
    };

    const columns = [
        {
            title: 'Time',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
            render: (text) => new Date(text).toLocaleString(),
            sorter: (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transactionid',
            key: 'transactionid',
            sorter: (a, b) => a.transactionid.localeCompare(b.transactionid),
        },
        {
            title: 'Service Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
            sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
        },
        {
            title: 'Amount (Credit)',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => `${text} Credit`,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Editor',
            dataIndex: 'editor',
            key: 'editor',
            sorter: (a, b) => a.editor.localeCompare(b.editor),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'Activity',
            dataIndex: 'action',
            key: 'action',
        },
    ].filter(column => visibleColumns[column.key]);

    return (
        <Layout>
       <CustomCard title="Service History">
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Search..."
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                />
                <Button type="primary" onClick={showModal}>
                    Advanced Filter
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowKey="id"
            />
            <Modal
                title="Advanced Filter"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Filters" key="1">
                        <Form layout="vertical" onValuesChange={handleFilterChange}>
                            <Form.Item label="Transaction ID">
                                <Space>
                                    <Input placeholder="Enter Transaction ID" onChange={(e) => setFilters({ ...filters, transactionid: { ...filters.transactionid, value: e.target.value, enabled: filters.transactionid.enabled } })} disabled={!filters.transactionid.enabled} />
                                    <Checkbox checked={filters.transactionid.enabled} onChange={(e) => setFilters({ ...filters, transactionid: { ...filters.transactionid, enabled: e.target.checked } })}>Enable</Checkbox>
                                </Space>
                            </Form.Item>
                            <Form.Item label="Service Name">
                                <Space>
                                    <Input placeholder="Enter Service Name" onChange={(e) => setFilters({ ...filters, serviceName: { ...filters.serviceName, value: e.target.value, enabled: filters.serviceName.enabled } })} disabled={!filters.serviceName.enabled} />
                                    <Checkbox checked={filters.serviceName.enabled} onChange={(e) => setFilters({ ...filters, serviceName: { ...filters.serviceName, enabled: e.target.checked } })}>Enable</Checkbox>
                                </Space>
                            </Form.Item>
                            <Form.Item label="Editor">
                                <Space>
                                    <Input placeholder="Enter Editor Name" onChange={(e) => setFilters({ ...filters, editor: { ...filters.editor, value: e.target.value, enabled: filters.editor.enabled } })} disabled={!filters.editor.enabled} />
                                    <Checkbox checked={filters.editor.enabled} onChange={(e) => setFilters({ ...filters, editor: { ...filters.editor, enabled: e.target.checked } })}>Enable</Checkbox>
                                </Space>
                            </Form.Item>
                            <Form.Item label="Status">
                                <Space>
                                    <Select defaultValue="" style={{ width: 120 }} onChange={(value) => setFilters({ ...filters, status: { ...filters.status, value, enabled: filters.status.enabled } })}>
                                        <Option value="">Select Status</Option>
                                        <Option value="Pending">Pending</Option>
                                        <Option value="Confirm">Confirm</Option>
                                        <Option value="Canceled">Canceled</Option>
                                    </Select>
                                    <Checkbox checked={filters.status.enabled} onChange={(e) => setFilters({ ...filters, status: { ...filters.status, enabled: e.target.checked } })}>Enable</Checkbox>
                                </Space>
                            </Form.Item>
                            <Form.Item label="Amount (Credit)">
                                <Space>
                                    <Input placeholder="Enter Amount" onChange={(e) => setFilters({ ...filters, amount: { ...filters.amount, value: e.target.value, enabled: filters.amount.enabled } })} disabled={!filters.amount.enabled} />
                                    <Checkbox checked={filters.amount.enabled} onChange={(e) => setFilters({ ...filters, amount: { ...filters.amount, enabled: e.target.checked } })}>Enable</Checkbox>
                                </Space>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Columns" key="2">
                    <Space direction="vertical">
    {Object.keys(visibleColumns).map((columnKey) => {
        const formattedLabel = columnKey.replace(/([a-z])([A-Z])/g, '$1 $2')
                                        .replace(/^[a-z]/, (match) => match.toUpperCase());
        return (
            <Checkbox
                key={columnKey}
                checked={visibleColumns[columnKey]}
                onChange={(e) => handleColumnVisibilityChange(columnKey, e.target.checked)}
            >
                {formattedLabel}
            </Checkbox>
        );
    })}
</Space>

                    </TabPane>
                </Tabs>
            </Modal>
        </div>
         </CustomCard>
        </Layout>
    );
};

export default PurchaseServiceHistoryTable;