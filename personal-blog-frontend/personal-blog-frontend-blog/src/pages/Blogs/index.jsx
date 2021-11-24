import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { reqBlogs } from '../../api';
import SectionIntro from '../../components/SectionIntro';
import BigBlogList from '../../components/BigBlogList';

export default function Blogs() {
    const title = 'Blogs';
    const desc =
        "Tutorials, technical articles, snippets, reference materials, and all development-related resources I've written. See Notes for everything else.";

    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        fetchBlogList();
    }, []);

    useEffect(() => {
        console.log(blogList);
    }, [blogList]);

    const fetchBlogList = async () => {
        const result = await reqBlogs();
        if (result.status === 0) {
            setBlogList(result.data.blogs);
        } else {
            message.error(result.msg);
        }
    };

    return (
        <div>
            <SectionIntro title={title} desc={desc}></SectionIntro>
            <BigBlogList blogs={blogList}></BigBlogList>
        </div>
    );
}
