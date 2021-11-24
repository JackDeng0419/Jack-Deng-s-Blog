import React, { useEffect, useRef, useState } from 'react';
import { Menu, message } from 'antd';
import {
    MinusSquareOutlined,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import DivButton from '../../components/DivButton';
import { reqBlogListByIds, reqCategories } from '../../api';
import { withRouter } from 'react-router';

const { SubMenu } = Menu;

function CategoriesBar(props) {
    const [categoryList, setCategoryList] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);

    const fetchCategoryList = async () => {
        const result = await reqCategories();
        if (result.status === 0) {
            result.data.forEach((category) => {
                category.blogs = [];
            });
            setCategoryList(result.data);
        } else {
            message.error(result.msg);
        }
    };

    const getBlogsIdByCategoryId = (category_id) => {
        return categoryList.find((category) => category._id === category_id)
            .blogs_id;
    };

    const fetchBlogsByCategoryId = async (index) => {
        const { blogs_id } = categoryList[index];
        const result = await reqBlogListByIds(blogs_id);
        if (result.status === 0) {
            categoryList[index].blogs = result.data;
            // setCategoryList((prevCategoryList) => {
            //     prevCategoryList[index].blogs = result.data;
            // });
            const tempCategoryList = [...categoryList];
            setCategoryList(tempCategoryList);
        } else {
            message.error(result.msg);
        }
    };

    const onOpenChange = (openKeys) => {
        setOpenKeys(openKeys);
    };

    const showBlog = ([blog_id, category_index]) => {
        const blog_basic = categoryList[category_index].blogs.find(
            (blog) => blog._id === blog_id,
        );
        props.history.push('/singleBlog/' + blog_id, { blog_basic });
    };

    useEffect(() => {
        fetchCategoryList();
    }, []);

    return (
        <div>
            <div
                style={{
                    backgroundColor: '#1B1B1B',
                    height: '35px',
                    lineHeight: '35px',
                    paddingLeft: '25px',
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    color: '#B3B9C5',
                }}>
                CATEGORIES
                <DivButton
                    onClick={() => {
                        setOpenKeys([]);
                    }}
                    style={{ float: 'right', marginRight: '10px' }}>
                    <MinusSquareOutlined style={{ fontSize: '18px' }} />
                </DivButton>
            </div>
            <Menu
                theme="dark"
                // onClick={this.handleClick}
                style={{ width: '100%', backgroundColor: '#222222' }}
                // selectedKeys={[this.state.current]}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                mode="inline">
                {/* <SubMenu
                    style={{
                        backgroundColor: '#161616',
                    }}
                    key="sub1"
                    title="Navigation One">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu
                    style={{
                        backgroundColor: '#161616',
                    }}
                    key="sub2"
                    title="Navigation Two">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu
                    style={{
                        backgroundColor: '#161616',
                    }}
                    key="sub4"
                    title="Navigation Three">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu> */}
                {categoryList.map((category, index) => (
                    <SubMenu
                        style={{
                            backgroundColor: '#161616',
                        }}
                        onTitleClick={({ key }) => {
                            fetchBlogsByCategoryId(key);
                        }}
                        key={index}
                        title={category.name}>
                        {category.blogs.map((blog) => (
                            <Menu.Item
                                onClick={({ keyPath }) => {
                                    showBlog(keyPath);
                                }}
                                key={blog._id}>
                                {blog.title}
                            </Menu.Item>
                        ))}
                    </SubMenu>
                ))}
            </Menu>
        </div>
    );
}

export default withRouter(CategoriesBar);
