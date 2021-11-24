import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Route, Switch, Redirect } from 'react-router-dom';
import DivButton from '../../components/DivButton';
import './index.scss';
import blogMenuIcon from '../../assets/blog.png';
import projectMenuIcon from '../../assets/project.png';
import aboutMeMenuIcon from '../../assets/about-me.png';
import Home from '../Home';
import Blogs from '../Blogs';
import Projects from '../Projects';
import AboutMe from '../About-me';
import TextButton from '../../components/TextButton';
import CategoriesBar from '../CategoriesBar';
import SingleBlog from '../SingleBlog';
import Tags from '../Tags';

const { Header, Footer, Sider, Content } = Layout;

export default function MainWebsite(props) {
    const [categorySideBarCollapsed, setCategorySideBarCollapsed] =
        useState(false);
    // const blogMenuIcon = blogMenuIcon;

    const menuClickHandler = (key) => {
        // console.log(key);
        props.history.push(key);
    };

    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Layout>
                    <Sider
                        id="main-sider"
                        style={{ backgroundColor: '#333333', color: 'white' }}
                        width="80px">
                        <Menu
                            theme="dark"
                            style={{
                                backgroundColor: 'transparent',
                            }}
                            onClick={({ key }) => {
                                menuClickHandler(key);
                            }}
                            defaultSelectedKeys={['1']}
                            mode="inline">
                            <Menu.Item
                                style={{
                                    padding: '0 10px',
                                    margin: '0 0',
                                    height: '85px',
                                }}
                                key="/blogs">
                                <div
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                        margin: '0 auto',
                                        backgroundImage: `url(${blogMenuIcon})`,
                                        backgroundRepeat: 'no-repeat',
                                    }}></div>
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    padding: '0 10px',
                                    margin: '0 0',
                                    height: '85px',
                                }}
                                key="/projects">
                                <div
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                        margin: '0 auto',
                                        backgroundImage: `url(${projectMenuIcon})`,
                                        backgroundRepeat: 'no-repeat',
                                    }}></div>
                            </Menu.Item>
                            <Menu.Item
                                style={{
                                    padding: '0 10px',
                                    margin: '0 0',
                                    height: '85px',
                                }}
                                key="/aboutMe">
                                <div
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                        margin: '0 auto',
                                        backgroundImage: `url(${aboutMeMenuIcon})`,
                                        backgroundRepeat: 'no-repeat',
                                    }}></div>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Sider
                        style={{
                            color: 'white',
                            overflow: 'scroll',
                            backgroundColor: '#222222',
                        }}
                        width="300px"
                        // collapsible
                        collapsed={categorySideBarCollapsed}
                        collapsedWidth={0}>
                        <CategoriesBar></CategoriesBar>
                    </Sider>
                    <Layout>
                        <Header
                            style={{
                                height: '35px',
                                padding: '0 0',
                                color: 'white',
                                backgroundColor: '#1B1B1B',
                            }}>
                            <DivButton
                                style={{ color: 'white', float: 'left' }}
                                onClick={() => {
                                    setCategorySideBarCollapsed(
                                        !categorySideBarCollapsed,
                                    );
                                }}>
                                <MenuOutlined
                                    style={{
                                        fontSize: '15px',
                                    }}
                                />
                            </DivButton>
                            <TextButton
                                style={{
                                    lineHeight: '35px',
                                    float: 'left',
                                    backgroundColor: '#272727',
                                    height: '35px',
                                    padding: '0 10px',
                                    borderTop: '3px solid #757FF8',
                                }}
                                onClick={() => {
                                    props.history.push('/home');
                                }}>
                                <p style={{ fontSize: '12px' }}>JackDeng.com</p>
                            </TextButton>
                        </Header>
                        <Content
                            style={{
                                overflow: 'scroll',
                                height: '300px',
                                backgroundColor: '#272727',
                            }}>
                            <Switch>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/blogs" component={Blogs}></Route>
                                <Route
                                    path="/projects"
                                    component={Projects}></Route>
                                <Route
                                    path="/aboutMe"
                                    component={AboutMe}></Route>
                                <Route
                                    path="/singleBlog"
                                    component={SingleBlog}></Route>
                                <Route path="/tags" component={Tags}></Route>
                                <Redirect to="/home"></Redirect>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
                <Footer
                    style={{
                        backgroundColor: '#1B1B1B',
                        color: '#EEEEEE',
                        height: '25px',
                        padding: '0 0',
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}>
                    Made By Jack Deng
                </Footer>
            </Layout>
        </>
    );
}
