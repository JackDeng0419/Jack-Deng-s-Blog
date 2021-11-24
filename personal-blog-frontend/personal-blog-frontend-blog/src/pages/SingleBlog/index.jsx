import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router';
import { reqBlogById, reqBlogContentById } from '../../api';
import BlogIntro from './blog-intro';
import MarkdownContent from '../../components/MarkdownContent';

function SingleBlog(props) {
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const { pathname } = props.location;
        const pathArray = getUrlId(pathname);
        if (pathArray.length === 1) {
            // only '/singleBlog', without the blog id
            props.history.push('/blogs');
        } else if (pathArray.length === 2) {
            // path contains blog id
            const blog_id = pathArray[1];
            if (props.location.state && props.location.state.blog_basic) {
                // click from other components, containing the basic info of the blog
                const { blog_basic } = props.location.state;
                // already have the basic info of the blog, we can render them first, and then we just need to fetch the blog content through the id
                // 1. render the basic info
                setBlog(blog_basic);
                // 2. fetch the content by id
                fetchBlogContentByIdToBlogBasic(blog_id, blog_basic);
            } else {
                // directly visit through the url
                // 1. fetch the whole blog through the id
                fetchBlogById(blog_id);
            }
        }
    }, [props.location.pathname]);

    // useEffect(() => {
    //     fetchTagsArray(blog.tags_id);
    // }, [blog.tags_id]);

    const fetchBlogById = async (blog_id) => {
        const result = await reqBlogById(blog_id);
        if (result.status === 0) {
            setBlog(result.data);
        } else {
            message.error(result.msg);
        }
    };

    const fetchBlogContentById = async (blog_id) => {
        const result = await reqBlogContentById(blog_id);
        if (result.status === 0) {
            setBlog({ ...blog, content: result.data });
        } else {
            message.error(result.msg);
        }
    };

    const fetchBlogContentByIdToBlogBasic = async (blog_id, blog_basic) => {
        const result = await reqBlogContentById(blog_id);
        if (result.status === 0) {
            setBlog({ ...blog_basic, content: result.data });
        } else {
            message.error(result.msg);
        }
    };

    const getUrlId = (pathname) =>
        pathname.split('/').filter((path) => path.length !== 0);

    return (
        <div>
            <BlogIntro blog={blog}></BlogIntro>
            <MarkdownContent content={blog.content}></MarkdownContent>
        </div>
    );
}
export default withRouter(SingleBlog);
