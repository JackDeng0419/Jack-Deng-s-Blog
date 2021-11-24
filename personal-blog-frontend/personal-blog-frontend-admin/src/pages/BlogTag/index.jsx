import React, { useRef, useState, useEffect } from 'react';
import {
    Table,
    Tag,
    Space,
    Input,
    Button,
    Modal,
    Form,
    Select,
    message,
} from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { reqAddTag, reqDeleteTag, reqTags, reqUpdateTag } from '../../api';
import LinkButton from '../../components/link-button';

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

export default function BlogTag() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalType, setModalType] = useState(0); // 0: new tag, 1: change tag
    const [modalTagName, setModalTagName] = useState('');
    const [modalTagColor, setModalTagColor] = useState('magenta');
    const [currentChangeTagId, setCurrentChangeTagId] = useState('');
    const [tagList, setTagList] = useState([]);
    const [searchedTagList, setSearchedTagList] = useState([]);
    const formRef = useRef();

    const columns = [
        {
            title: 'Tag',
            key: 'tag',
            dataIndex: 'name',
            render: (name, tagObj) => (
                <>
                    <Tag color={tagObj.color} key={name}>
                        {name.toUpperCase()}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, tag) => (
                <Space size="middle">
                    <LinkButton
                        onClick={() => {
                            showModalChangeTag(tag);
                        }}>
                        Change
                    </LinkButton>
                    <LinkButton
                        onClick={() => {
                            showDeleteConfirm(tag._id, tag.name);
                        }}>
                        Delete
                    </LinkButton>
                </Space>
            ),
        },
    ];

    async function fetchTagList() {
        const result = await reqTags();
        if (result.status === 0) {
            setTagList(result.data);
        } else {
            message.error(result.msg);
        }
    }

    const showModalNewTag = () => {
        setCurrentChangeTagId('');
        setModalTagName('');
        setModalTagColor('magenta');
        // setTagTable({ name: '', color: 'magenta' }, formRef);
        setModalType(0);
        setIsModalVisible(true);
    };

    const showModalChangeTag = (tag) => {
        setCurrentChangeTagId(tag._id);
        setModalTagName(tag.name);
        setModalTagColor(tag.color);
        setModalType(1);
        setIsModalVisible(true);
    };

    // const showModalChangeTag = (tag) => {
    //     currentChangeTag = tag;
    //     setModalType(1);
    //     setIsModalVisible(true);
    //     // const { name, color } = tag;
    //     // setTagTable({ name, color }, formRef);
    // };

    // const setTagTable = ({ name, color }, formRef) => {
    //     if (typeof formRef.current === 'undefined') {
    //         return;
    //     }
    //     formRef.current.setFieldsValue({
    //         name,
    //         color,
    //     });
    // };

    const handleOk = async (tag_id = null) => {
        formRef.current.validateFields();
        setConfirmLoading(true);
        const { name, color } = formRef.current.getFieldsValue();

        if (tag_id !== null && tag_id !== '') {
            const result = await reqUpdateTag({ tag_id, name, color });
            setConfirmLoading(false);
            if (result.status === 0) {
                message.success('Update tag successfully');
                setIsModalVisible(false);
                fetchTagList();
            } else {
                message.error(result.msg);
            }
        } else {
            const result = await reqAddTag({ name, color });
            setConfirmLoading(false);
            if (result.status === 0) {
                message.success('Add new tag successfully');
                setIsModalVisible(false);
                fetchTagList();
            } else {
                message.error(result.msg);
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function showDeleteConfirm(tag_id, name) {
        confirm({
            title: 'Do you Want to delete this tag?',
            icon: <ExclamationCircleOutlined />,
            content: `Tag name: ${name}`,
            onOk() {
                deleteTag(tag_id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    async function deleteTag(tag_id) {
        const result = await reqDeleteTag(tag_id);
        if (result.status === 0) {
            message.success('Delete tag successfully.');
            fetchTagList();
        } else {
            message.error(result.msg);
        }
    }

    useEffect(() => {
        fetchTagList();
    }, []);

    useEffect(() => {
        if (typeof formRef.current === 'undefined') {
            return;
        }
        formRef.current.setFieldsValue({
            name: modalTagName,
            color: modalTagColor,
        });
    }, [modalTagName, modalTagColor]);

    useEffect(() => {
        setSearchedTagList(tagList);
    }, [tagList]);

    return (
        <>
            <Search
                placeholder="tag name"
                allowClear
                onSearch={(searchName) => {
                    if (searchName === '' || searchName === null) {
                        setSearchedTagList(tagList);
                    } else {
                        const searchedList = tagList.filter((tag) =>
                            tag.name
                                .toLowerCase()
                                .includes(searchName.toLowerCase()),
                        );
                        setSearchedTagList(searchedList);
                    }
                }}
                style={{ width: 200, marginBottom: 20 }}
            />
            <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={() => {
                    showModalNewTag();
                }}>
                <PlusOutlined />
                New tag
            </Button>
            <Table columns={columns} dataSource={searchedTagList} />
            <Modal
                title={modalType === 0 ? 'New tag' : 'Change tag'}
                visible={isModalVisible}
                onOk={() => {
                    handleOk(currentChangeTagId);
                }}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                <Form ref={formRef}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the tag name!',
                            },
                        ]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Color"
                        name="color"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the color!',
                            },
                        ]}
                        initialValue="magenta">
                        <Select defaultValue="magenta" style={{ width: 120 }}>
                            <Option value="magenta">magenta</Option>
                            <Option value="red">red</Option>
                            <Option value="volcano">volcano</Option>
                            <Option value="orange">orange</Option>
                            <Option value="gold">gold</Option>
                            <Option value="lime">lime</Option>
                            <Option value="green">green</Option>
                            <Option value="cyan">cyan</Option>
                            <Option value="blue">blue</Option>
                            <Option value="geekblue">geekblue</Option>
                            <Option value="purple">purple</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
