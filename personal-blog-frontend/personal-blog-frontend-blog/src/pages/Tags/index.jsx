import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { reqTagByTagName } from '../../api';
import BigBlogList from '../../components/BigBlogList';
import TagBasicInfo from './tag-basic-info';

export default function Tags(props) {
    const [tag, setTag] = useState({
        name: '',
        blogs_id: [],
    });

    const getTagNameFromPathname = (pathname) => pathname.split('/')[2];

    const fetchTagByTagName = async (tagName) => {
        const result = await reqTagByTagName(tagName);
        if (result.status === 0) {
            if (result.data !== null) {
                setTag(result.data);
            }
        } else {
            message.error(result.msg);
        }
    };

    useEffect(() => {
        console.log('props.location.state: ', props.location.state);
        const state = props.location.state;
        const { pathname } = props.location;
        if (pathname === '/tags' || pathname === '/tags/') {
            props.history.push('/blogs');
        }
        if (!state || !state.hasOwnProperty('tag')) {
            // directly visit through the url
            const tagName = getTagNameFromPathname(pathname);
            fetchTagByTagName(tagName);
        } else {
            // visit through the "tag section"
            setTag(state.tag);
        }
    }, []);

    return (
        <div>
            <TagBasicInfo tag={tag}></TagBasicInfo>
            <BigBlogList blogs_id={tag.blogs_id}></BigBlogList>
        </div>
    );
}
