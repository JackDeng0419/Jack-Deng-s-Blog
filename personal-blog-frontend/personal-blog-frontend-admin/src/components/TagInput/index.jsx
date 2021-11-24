import React, { useEffect, useState } from 'react';
import { message, Select, Tag } from 'antd';
import { reqTags } from '../../api';

const { Option } = Select;

export default function TagInput(props) {
    const [tagList, setTagList] = useState([]);
    // for (let i = 10; i < 36; i++) {
    //     children.push(
    //         <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
    //     );
    // }
    // let tagListInEdit = [];
    const [tagListInEdit, setTagListInEdit] = useState([]);

    useEffect(() => {
        fetchTagList();
    }, []);

    async function fetchTagList() {
        const result = await reqTags();
        if (result.status === 0) {
            setTagList(result.data);
        } else {
            message.error(result.msg);
        }
    }

    useEffect(() => {
        setTagListInEdit(
            props.tagsId.filter((tagId) => {
                return tagList.find((tag) => tag._id === tagId);
            }),
        );
        console.log('Tag list in edit: ', tagListInEdit);
    }, [tagList, props.tagsId]);

    function handleChange(value) {
        console.log(`tag selected ${value}`);
        setTagListInEdit(value);
        const outerForm = props.formRef.current;
        outerForm.setFieldsValue({ tags_id: value });
    }

    // function tagRender(props) {
    //     console.log('tagRender', props);
    //     const { label, value, closable, onClose } = props;
    //     const onPreventMouseDown = (event) => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     };
    //     return (
    //         <Tag
    //             color={value}
    //             onMouseDown={onPreventMouseDown}
    //             closable={closable}
    //             onClose={onClose}
    //             style={{ marginRight: 3 }}>
    //             {label}
    //         </Tag>
    //     );
    // }

    return (
        <Select
            mode="multiple"
            value={tagListInEdit}
            showArrow
            // tagRender={tagRender}
            style={{ width: '100%', marginBottom: 15 }}
            placeholder="Tags"
            onChange={handleChange}>
            {/* {children} */}
            {tagList.map((tag) => (
                <Option key={tag._id}>
                    <Tag color={tag.color} style={{ height: '20px' }}>
                        {tag.name.toUpperCase()}
                    </Tag>
                    {/* {tag.name} */}
                </Option>
            ))}
        </Select>
    );
}
