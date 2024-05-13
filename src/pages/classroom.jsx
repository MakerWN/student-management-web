import React, { useState } from "react";
import { Table } from 'antd';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
const { Option } = Select;
const AdvancedSearchForm = () => {
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: 'none',
    padding: 24,
  };
  const getYears = () => {
    const years = [];
    const current = new Date().getFullYear();
    for (let i = 20; i > 0; i--) {
      years.push(
        <Option value={current - i}>{(current + 543) - i}</Option>
      )
    }
    return years;
  }

  const onFinish = (values) => {
    const search = values;
    console.log({
      searchText: search.searchText,
      year: search.year,
      grade: search.grade,
      class: search.class
    });

  };
  return (

    <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            name={`year`}
            label={`Year`}
          >
            <Select>
              {getYears()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={`searchClassNo`}
            label={`Class No`}
          >
            <Input placeholder="SearchClassNo" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={`searchClassName`}
            label={`Class Name`}
          >
            <Input placeholder="SearchClassName" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={`searchTeacher`}
            label={`Teacher Name`}
          >
            <Input placeholder="SearchTeacher" />
          </Form.Item>
        </Col>
      </Row>
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Space>
      </div>
    </Form>
  );
};
const columns = [
  {
    title: '#',
    dataIndex: 'key'
  },
  {
    title: 'Class No.',
    dataIndex: 'classNo',
  },
  {
    title: 'Class Name',
    dataIndex: 'className',
  },
  {
    title: 'Year',
    dataIndex: 'year',
  },
  {
    title: 'Teacher',
    dataIndex: 'teacher',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i + 1,
    classNo: '101',
    className: 'P101',
    year: '2566',
    teacher: 'ณัฏฐกานต์ เจริญสกุล',
  });
}

export default function ClassRoom() {
  return (
    <>
      <AdvancedSearchForm />
      <Table columns={columns} dataSource={data} />
    </>
  );
}



