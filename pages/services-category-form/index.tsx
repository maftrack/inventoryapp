// import React, { useState } from 'react';
// import { Table, Button, Modal, Form, Input, message, Layout, Typography } from 'antd';
// import { useRouter } from 'next/router';
// import LayoutComponent from '../../components/Layout';
// import CustomCard from '@/components/Card';

// const { Title } = Typography;

// const ServicesForm = () => {
//     const router = useRouter();
//     const [categories, setCategories] = useState([
//         { id: 1, name: 'Suite Apps', description: 'Comprehensive suite of applications.' },
//         { id: 2, name: 'Enterprise Services', description: 'Services tailored for enterprises.' }
//     ]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form] = Form.useForm();

//     const showModal = () => {
//         setIsModalVisible(true);
//         form.resetFields();
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const handleSave = () => {
//         form.validateFields().then((values) => {
//             setCategories([...categories, { id: Date.now(), ...values }]);
//             handleCancel();
//             message.success('Category added successfully!');
//         });
//     };

//     const columns = [
//         { title: 'Category Name', dataIndex: 'name', key: 'name' },
//         { title: 'Description', dataIndex: 'description', key: 'description' },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <Button type="link" onClick={() => router.push(`/services-category-form/detail/${record.id}`)}>View Details</Button>
//             )
//         }
//     ];

//     return (
//         <LayoutComponent>
//             <CustomCard title="Services Form">
//                  <div className="p-6">
//                 <Title level={4}>Manage Service Categories</Title>
//                 <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>Add Category</Button>
//                 <Table dataSource={categories} columns={columns} rowKey="id" bordered />

//                 <Modal title="Add Category" visible={isModalVisible} onCancel={handleCancel} onOk={handleSave}>
//                     <Form form={form} layout="vertical">
//                         <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please enter category name' }]}> 
//                             <Input />
//                         </Form.Item>
//                         <Form.Item name="description" label="Description"> 
//                             <Input.TextArea rows={4} />
//                         </Form.Item>
//                     </Form>
//                 </Modal>
//             </div>    
//             </CustomCard>
       
//         </LayoutComponent>
//     );
// };

// export default ServicesForm;
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Layout, Typography, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; // For generating GUIDs
import LayoutComponent from '../../components/Layout';
import CustomCard from '@/components/Card';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ServicesForm = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form] = Form.useForm();

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const newCategory = {
                categoryid: uuidv4(), // Generate a new GUID
                categoryName: values.name,
                description: values.description,
                // DateCreated will be set on the server
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add category');
            }

            const addedCategory = await response.json();
            setCategories([...categories, addedCategory]);
            handleCancel();
            toast.success('Category added successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to add category');
        }
    };

    const handleDelete = async (categoryid, categoryName) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryid}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            setCategories(categories.filter((category) => category.categoryid !== categoryid));
            toast.success(`Category "${categoryName}" deleted successfully!`);
        } catch (error) {
            toast.error(error.message || 'Failed to delete category');
        }
    };

    const showEditModal = (category) => {
        setEditingCategory(category);
        setIsEditModalVisible(true);
        form.setFieldsValue({
            name: category.categoryName,
            description: category.description,
        });
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setEditingCategory(null);
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedCategory = {
                ...editingCategory,
                categoryName: values.name,
                description: values.description,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${editingCategory.categoryid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            setCategories(categories.map((category) => (category.categoryid === updatedCategory.categoryid ? updatedCategory : category)));
            handleEditCancel();
            toast.success('Category updated successfully!');
        } catch (error) {
            toast.error('Failed to update category');
        }
    };

    const columns = [
        { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                   <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />} />

<Popconfirm
  title={`Warning! Deleting this category will also remove the associated services. Are you sure you want to delete "${record.categoryName}"?`}
  onConfirm={() => handleDelete(record.categoryid, record.categoryName)}
  okText="Yes"
  cancelText="No"
>
  <Button type="link" danger icon={<DeleteOutlined />} />
</Popconfirm>

<Button
  type="link"
  onClick={() =>
    router.push({
      pathname: `/services-category-form/detail/${record.categoryid}`,
      query: { categoryName: record.categoryName },
    })
  }
  icon={<EyeOutlined />} // Assuming you want to use an eye icon for "View Details"
/>
                </>
            ),
        },
    ];

    return (
        <LayoutComponent>
            <CustomCard title="Services Form">
                <div className="p-6">
                    <Title level={4}>Manage Service Categories</Title>
                    <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                        Add Category
                    </Button>
                    <Table
                        dataSource={categories}
                        columns={columns}
                        rowKey="categoryid"
                        bordered
                        pagination={{ pageSize: 5 }} // Client-side pagination
                    />

                    <Modal title="Add Category" visible={isModalVisible} onCancel={handleCancel} onOk={handleSave}>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Category Name"
                                rules={[{ required: true, message: 'Please enter category name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal title="Edit Category" visible={isEditModalVisible} onCancel={handleEditCancel} onOk={handleEditSave}>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Category Name"
                                rules={[{ required: true, message: 'Please enter category name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </CustomCard>
            <ToastContainer />
        </LayoutComponent>
    );
};

export default ServicesForm;