import React, { useState } from 'react';
import { useLocation, Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    FileTextOutlined,
    InboxOutlined,
    TagsOutlined,
} from '@ant-design/icons';
import Write from '../Write';

import './index.scss';
import BlogTag from '../BlogTag';
import Category from '../Category';
import Blog from '../Blog';

const { Header, Sider, Content } = Layout;

function Admin(props) {
    const [collapsed, setCollapsed] = useState(true);

    // const location = useLocation();
    // console.log(location.pathname);
    // if (location.pathname === '/write') {
    //     return;
    // }

    function menuClickHandler(key) {
        if (key === 'blogs') {
            props.history.push('/blog');
        } else if (key === 'categories') {
            props.history.push('/category');
        } else if (key === 'tags') {
            props.history.push('/tag');
        }
    }

    return (
        <Layout className="admin">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth="50px"
                width="150px">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['blogs']}
                    onClick={({ key }) => menuClickHandler(key)}>
                    <Menu.Item key="blogs" icon={<FileTextOutlined />}>
                        Blogs
                    </Menu.Item>
                    <Menu.Item key="categories" icon={<InboxOutlined />}>
                        Categories
                    </Menu.Item>
                    <Menu.Item key="tags" icon={<TagsOutlined />}>
                        Tags
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        },
                    )}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}>
                    <Switch>
                        <Route path="/write" component={Write}></Route>
                        <Route path="/tag" component={BlogTag}></Route>
                        <Route path="/category" component={Category}></Route>
                        <Route path="/blog" component={Blog}></Route>
                        <Redirect to="/"></Redirect>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
