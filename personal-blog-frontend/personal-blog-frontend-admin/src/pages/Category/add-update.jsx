import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import IconUpload from './icon-upload';
import BackgroundUpload from './background-upload';
import { reqAddCategory, reqUpdateCategory } from '../../api';

const { TextArea } = Input;

export default function CategoryAddUpdate(props) {
    // console.log(props.location.state.category);
    const formInitialValue = {
        name: '',
        desc: '',
    };
    let categoryId = '';

    let addOrUpdate = 0; // 0: add, 1: update

    if (props.location.state && props.location.state.category) {
        console.log('add or update');
        const { name, desc, _id } = props.location.state.category;
        formInitialValue.name = name;
        formInitialValue.desc = desc;
        addOrUpdate = 1;
        categoryId = _id;
    }

    const onFinish = async (values) => {
        if (values.icon === undefined) {
            values.icon = '_';
        }
        const { name, desc, icon } = values;
        console.log('Success:', values);

        if (addOrUpdate === 0) {
            // if add
            const result = await reqAddCategory({ name, desc, icon });
            if (result.status === 0) {
                message.success('Add category successfully!');
                console.log('New category: ', result.data);
                props.history.goBack();
            } else {
                message.error(result.msg);
            }
        } else {
            // update
            const result = await reqUpdateCategory({
                categoryId,
                name,
                desc,
                icon,
            });
            if (result.status === 0) {
                message.success('Update category successfully!');
                console.log('Updated category: ', result.data);
                props.history.goBack();
            } else {
                message.error(result.msg);
            }
        }
    };

    return (
        <>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                initialValues={formInitialValue}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the category name!',
                        },
                    ]}>
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="Description" name="desc">
                    <TextArea showCount maxLength={100}></TextArea>
                </Form.Item>
                <Form.Item label="Icon" name="icon">
                    <IconUpload></IconUpload>
                </Form.Item>
                {/* <Form.Item label="Background">
                    <BackgroundUpload></BackgroundUpload>
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
