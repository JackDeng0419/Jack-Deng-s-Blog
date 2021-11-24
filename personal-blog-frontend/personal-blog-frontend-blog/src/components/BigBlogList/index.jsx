import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import { reqBlogListByIds } from '../../api';
import { formateDate } from '../../utils/dateUtils';
import { withRouter } from 'react-router';
import './index.scss';

function BigBlogList(props) {
    // const data = [
    //     'Racing car sprays burning fuel into crowd.',
    //     'Japanese princess to wed commoner.',
    //     'Australian walks 100km after outback crash.',
    //     'Man charged over missing wedding girl.',
    //     'Los Angeles battles huge wildfires.',
    // ];

    const blogs_id = [];

    const [blogList, setBlogList] = useState([]);

    const fetchBlogsByIds = async (blogs_id) => {
        console.log('blogs_id', blogs_id);
        const result = await reqBlogListByIds(blogs_id);
        if (result.status === 0) {
            console.log(result.data);
            setBlogList(result.data);
        } else {
            message.error(result.msg);
        }
    };

    useEffect(() => {
        if (props.blogs_id !== undefined && props.blogs_id.length !== 0) {
            fetchBlogsByIds(props.blogs_id);
        } else {
            // props has a blog list
            setBlogList(props.blogs);
        }
    }, [props.blogs_id, props.blogs]);

    return (
        <div>
            <List
                style={{ width: '900px', margin: '0 auto' }}
                className="big-blog-list"
                dataSource={blogList}
                renderItem={(blog) => (
                    <List.Item
                        // style={{
                        //     color: 'white',
                        //     display: 'flex',
                        //     cursor: 'pointer',
                        // }}
                        className="list-item"
                        onClick={() => {
                            props.history.push('/singleBlog/' + blog._id);
                        }}>
                        <div className="title">{blog.title}</div>{' '}
                        <div className="date">
                            {formateDate(blog.create_time)}
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default withRouter(BigBlogList);
