import React, { Component } from 'react';
import { message, Select } from 'antd';
import { reqCategories } from '../../api';

const { Option } = Select;

export default class CategorySelect extends Component {
    constructor() {
        super();
        this.selectedValue = null;
    }

    state = {
        categoryList: [],
        loading: true,
    };

    onChange = (value) => {
        console.log(`selected ${value}`);
        // console.log('props:', this.props);
        this.selectedValue = value;
        const outerForm = this.props.formRef.current;
        outerForm.setFieldsValue({ category_id: value });
    };

    onBlur() {
        // console.log('blur');
    }

    onSearch(val) {
        // console.log('search:', val);
    }

    async fetchCategories() {
        const result = await reqCategories();
        if (result.status === 0) {
            this.setState({ categoryList: result.data, loading: false }, () => {
                if (this.props.categoryId !== '') {
                    this.selectedValue = this.props.categoryId;
                }
            });
        } else {
            message.error(
                'Failed to fetch the category list, please reload to try again.',
            );
        }
    }

    onFocus = () => {
        // if (this.loading) {
        //     return;
        // } else {
        // }
        // console.log('focus: ', this.categoryList);
        // const result = await reqCategories();
        // console.log(result.data);
    };
    componentDidMount() {
        this.fetchCategories();
    }

    render() {
        const { categoryList, loading } = this.state;
        return (
            <>
                <Select
                    value={this.selectedValue}
                    showSearch
                    style={{ width: 200, marginBottom: 15 }}
                    placeholder="Category"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    loading={loading}>
                    {categoryList.map((category) => (
                        <Option value={category._id}>{category.name}</Option>
                    ))}
                    {/* <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option> */}
                </Select>
            </>
        );
    }
}
