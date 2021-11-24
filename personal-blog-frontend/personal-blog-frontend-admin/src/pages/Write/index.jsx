import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import MDEditor from '@uiw/react-md-editor';
import TagInput from '../../components/TagInput';
import CategorySelect from '../../components/CategorySelect';
import { Input, Button, Form, message } from 'antd';
import { reqAddBlog, reqBlogContentById, reqEditBlog } from '../../api';

const { Item } = Form;
const { TextArea } = Input;

export default function Write(props) {
    const [mdContent, setMdContent] = React.useState('**initial**');
    const [isEdit, setIsEdit] = React.useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [tagsId, setTagsId] = useState([]);
    const [blogId, setBlogId] = useState('');
    const mdRef = useRef();
    const formRef = useRef();

    useEffect(() => {
        // console.log(mdRef.current)
        console.log(props.location.state);
        if (props.location.state && props.location.state.blog) {
            const { category_id, title, tags_id, _id, desc } =
                props.location.state.blog;
            setIsEdit(true);
            setBlogId(_id);
            setCategoryId(category_id);
            setTagsId(tags_id);
            fetchBlogContentById(_id);
            formRef.current.setFieldsValue({
                category_id,
                title,
                desc,
                tags_id,
            });
        }
    }, []);

    // const saveBlog = () => {
    //     const blogObj = {
    //         title: null,
    //         createDate: Date.now(),
    //         tags: [],
    //         markdown: null,
    //     };
    //     blogObj.markdown = mdRef.current.markdown;
    //     console.log(blogObj);
    // };

    const onFinish = async (values) => {
        values.content = mdRef.current.markdown;
        console.log('submit:', values);
        if (isEdit) {
            values.blog_id = blogId;
            console.log('Edit result: ', values);
            const result = await reqEditBlog(values);
            if (result.status === 0) {
                message.success('Edit blog successfully!');
                props.history.goBack();
            } else {
                message.error(result.msg);
            }
        } else {
            const result = await reqAddBlog(values);
            if (result.status === 0) {
                message.success('Add new blog successfully!');
                console.log('new blog: ', result.data);
                props.history.goBack();
            } else {
                message.error(result.msg);
            }
        }
    };

    async function fetchBlogContentById(blog_id) {
        const result = await reqBlogContentById(blog_id);
        if (result.status === 0) {
            setMdContent(result.data);
        } else {
            message.error(result.msg);
        }
    }

    return (
        <>
            <Form onFinish={onFinish} ref={formRef}>
                <Item
                    name="category_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose the category',
                        },
                    ]}>
                    <CategorySelect
                        formRef={formRef}
                        categoryId={categoryId}></CategorySelect>
                </Item>
                <Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title',
                        },
                    ]}>
                    <Input
                        placeholder="Title"
                        style={{ marginBottom: 15 }}></Input>
                </Item>
                <Item
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the description',
                        },
                    ]}>
                    <TextArea
                        placeholder="Description"
                        showCount
                        maxLength={100}
                        style={{ marginBottom: 15 }}></TextArea>
                </Item>
                <Item name="tags_id" initialValue={[]}>
                    <TagInput formRef={formRef} tagsId={tagsId}></TagInput>
                </Item>
                <Item>
                    <MDEditor
                        value={mdContent}
                        onChange={setMdContent}
                        ref={mdRef}
                        style={{ marginBottom: 20 }}
                    />
                </Item>
                {/* <MDEditor.Markdown source={value} /> */}
                <Item>
                    <Button type="primary" htmlType="submit">
                        {isEdit ? 'Save edit' : 'Save new blog'}
                    </Button>
                </Item>
            </Form>
        </>
    );
}
