import React, { useEffect, useState } from 'react';
import './blog-intro.scss';
import { reqTagsByIds } from '../../api';
import TagSection from './tag-section';

export default function BlogIntro(props) {
    const [tagsArray, setTagsArray] = useState([]);

    useEffect(() => {
        // console.log(props.blog.tags_id);
        const { tags_id } = props.blog;
        if (tags_id !== undefined) {
            fetchTagsArray(tags_id);
        }
    }, [props.blog.tags_id]);

    const fetchTagsArray = async (tags_id) => {
        const result = await reqTagsByIds(tags_id);
        if (result.status === 0) {
            setTagsArray(result.data);
        }
    };

    return (
        <div className="section-intro">
            <h1 className="title">{props.blog.title}</h1>
            <TagSection tagsArray={tagsArray} />
            <p className="written-time">Written in Wed, 12, Nov, 2021</p>
            <p className="desc">{props.blog.desc}</p>
        </div>
    );
}
