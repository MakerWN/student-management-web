import React from "react";
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
  const getGrade = () => {
    const years = [];
    for (let i = 0; i < 6; i++) {
      years.push(
        <Option value={i}>{i + 1}</Option>
      )
    }
    return years;
  }
  const getClass = () => {
    const years = [];
    for (let i = 0; i < 6; i++) {
      years.push(
        <Option value={i}>{i + 1}</Option>
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
        <Col span={8}>
          <Form.Item
            name={`searchText`}
            label={`CitizenID/FirstName/LastName`}
          >
            <Input placeholder="CitizenID/FirstName/LastName" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            name={`year`}
            label={`Year`}
          >
            <Select>
              {getYears()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name={`grade`}
            label={`Grade`}
          >
            <Select>
              {getGrade()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name={`class`}
            label={`Class`}
          >
            <Select>
              {getClass()}
            </Select>
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
    title: 'CitizenID',
    dataIndex: 'citizenID',
  },
  {
    title: 'Prefix',
    dataIndex: 'prefix',
  },
  {
    title: 'FirstName',
    dataIndex: 'firstName',
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Date Of Birth',
    dataIndex: 'dateOfBirth',
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
  },
  {
    title: 'Class',
    dataIndex: 'class',
  },
  {
    title: 'Year',
    dataIndex: 'year',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    citizenID: '0743413718596',
    prefix: 'ชาย',
    firstName: 'พัทธมน',
    lastName: 'ธนโชควาณิช',
    gender: 'ชาย',
    dateOfBirth: '2004-03-23',
    grade: '1',
    class: '3',
    year: '2560'
  });
}

export default function Students() {
  return (
    <>
      <AdvancedSearchForm />
      <Table columns={columns} dataSource={data} />
    </>
  );
}



