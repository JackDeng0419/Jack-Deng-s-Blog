import React, { useEffect, useState } from 'react';
import { Input, Table, Tag, Space, Button, message, Modal, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqBlogs, reqDeleteBlog, reqUpdateBlogStatus } from '../../api';
import { userInfo } from 'os';

const { Search } = Input;
const { confirm } = Modal;

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default function Blog(props) {
    const [blogList, setBlogList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [searchedBlogList, setSearchedBlogList] = useState([]);
    // const [searchName, setSearchName] = useState('');

    useEffect(() => {
        fetchBlogList();
    }, []);

    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => <p>{category.name}</p>,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags) => (
                <>
                    {tags.map((tag) => {
                        return (
                            <Tag color={tag.color} key={tag._id}>
                                {tag.name.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 180,
            key: 'status',
            render: (status, blog) => {
                let statusText = 'unpublished';
                if (status === 1) {
                    statusText = 'published';
                }
                return (
                    <span>
                        <span style={{ minWidth: '50px' }}>{statusText}</span>
                        {/* onClick={() => updateBlogStatus(blog._id, status)}> */}
                        <Switch
                            defaultChecked={blog.status === 1 ? true : false}
                            style={{ marginLeft: '15px', float: 'right' }}
                            onChange={() => updateBlogStatus(blog._id, status)}
                        />
                    </span>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, blog) => (
                <Space size="middle">
                    <LinkButton
                        onClick={() => {
                            props.history.push('/write', { blog });
                        }}>
                        Edit
                    </LinkButton>
                    <LinkButton
                        onClick={() => {
                            showDeleteConfirm(blog._id, blog.title);
                        }}>
                        Delete
                    </LinkButton>
                </Space>
            ),
        },
    ];

    function initBlogList(blogs, categories, tags) {
        blogs.forEach((blog) => {
            blog.category = categories.find(
                (category) => category._id === blog.category_id,
            );
            blog.tags = tags.filter(
                (tag) => blog.tags_id.includes(tag._id) && !tag.is_deleted,
            );
        });
    }

    async function fetchBlogList() {
        const result = await reqBlogs();
        if (result.status === 0) {
            const { blogs, categories, tags } = result.data;
            initBlogList(blogs, categories, tags);
            setBlogList(blogs);
            setCategoryList(categories);
            setTagList(tags);
        } else {
            message.error(result.msg);
        }
    }

    async function updateBlogStatus(blog_id, status) {
        status = status === 0 ? 1 : 0;
        const result = await reqUpdateBlogStatus({ blog_id, status });
        if (result.status === 0) {
            message.success('Update blog status successfully.');
            fetchBlogList();
        }
    }

    function showDeleteConfirm(blog_id, title) {
        confirm({
            title: 'Do you Want to delete this blog?',
            icon: <ExclamationCircleOutlined />,
            content: `title: ${title}`,
            onOk() {
                deleteBlog(blog_id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    async function deleteBlog(blog_id) {
        const result = await reqDeleteBlog(blog_id);
        if (result.status === 0) {
            message.success('Delete blog successfully');
            fetchBlogList();
        } else {
            message.error(result.msg);
        }
    }

    useEffect(() => {
        setSearchedBlogList(blogList);
    }, [blogList]);

    return (
        <>
            <Search
                placeholder="blog title"
                allowClear
                onSearch={(searchName) => {
                    if (searchName === '' || searchName === null) {
                        setSearchedBlogList(blogList);
                    } else {
                        const searchedList = blogList.filter((blog) =>
                            blog.title
                                .toLowerCase()
                                .includes(searchName.toLowerCase()),
                        );
                        setSearchedBlogList(searchedList);
                    }
                }}
                style={{ width: 200, marginBottom: 20 }}
                // onChange={(e) => {
                //     console.log(e);
                //     // setSearchName(e);
                // }}
            />
            <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={() => {
                    props.history.push('/write');
                }}>
                <PlusOutlined />
                New blog
            </Button>
            <Table columns={columns} dataSource={searchedBlogList} />
        </>
    );
}
