import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Table, Tag, Space, message, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategories, reqDeleteCategory } from '../../api';

const { Search } = Input;
const { confirm } = Modal;

export default function CategoryHome(props) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Blog Number',
            dataIndex: 'blog_num',
            key: 'blog_num',
        },
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        // },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (tags) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (category) => (
                <Space size="middle">
                    <LinkButton
                        onClick={() => {
                            props.history.push('/category/preview');
                        }}>
                        preview
                    </LinkButton>
                    <LinkButton
                        onClick={() => {
                            // console.log(category);
                            props.history.push('/category/addupdate', {
                                category,
                            });
                        }}>
                        change
                    </LinkButton>
                    <LinkButton
                        onClick={() => {
                            deleteCategoryConfirm(category);
                        }}>
                        delete
                    </LinkButton>
                </Space>
            ),
        },
    ];

    const [categoryList, setCategoryList] = useState([]);
    const [searchedCategoryList, setSearchedCategoryList] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);

    // const categoryListRef = useRef([]);
    useEffect(() => {
        fetchCategoryList();
        // setTimeout(() => {
        //     setCategoryList([
        //         {
        //             key: '1',
        //             name: 'Programming',
        //         },
        //         {
        //             key: '2',
        //             name: 'Life',
        //         },
        //         {
        //             key: '3',
        //             name: 'Book',
        //         },
        //     ]);
        //     setTableLoading(false);
        // }, 1000);
    }, []);

    async function fetchCategoryList() {
        const result = await reqCategories();
        if (result.status === 0) {
            // console.log(result.data);
            setCategoryList(result.data);
        } else {
            message.error(result.msg);
        }
        setTableLoading(false);
    }

    async function deleteCategory(category_id, blog_num) {
        const result = await reqDeleteCategory({ category_id, blog_num });
        if (result.status === 0) {
            message.success('Delete category successfully.');
            fetchCategoryList();
        } else {
            message.error(result.msg);
        }
    }

    function deleteCategoryConfirm(category) {
        console.log(category);
        if (category.blog_num === 0) {
            confirm({
                title: 'Do you want to delete this category?',
                icon: <ExclamationCircleOutlined />,
                content: `Category: ${category.name}`,
                onOk() {
                    deleteCategory(category._id, category.blog_num);
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            message.warn(
                'The category can only be deleted when its blog number is 0!',
            );
        }
    }

    useEffect(() => {
        setSearchedCategoryList(categoryList);
    }, [categoryList]);

    return (
        <>
            <Search
                placeholder="category name"
                allowClear
                onSearch={(searchName) => {
                    if (searchName === '' || searchName === null) {
                        setSearchedCategoryList(categoryList);
                    } else {
                        console.log(categoryList);
                        const searchedList = categoryList.filter((category) =>
                            category.name
                                .toLowerCase()
                                .includes(searchName.toLowerCase()),
                        );
                        setSearchedCategoryList(searchedList);
                    }
                }}
                style={{ width: 200, marginBottom: 20 }}
            />
            <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={() => props.history.push('/category/addupdate')}>
                <PlusOutlined />
                New category
            </Button>

            <Table
                columns={columns}
                dataSource={searchedCategoryList}
                loading={tableLoading}
            />
        </>
    );
}
