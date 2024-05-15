import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table, Popconfirm, Button, Col, Form, Input, Row, Select, Space } from 'antd';

import {
  FileAddOutlined
} from '@ant-design/icons';
import '../assets/css/student.css'
const { Option } = Select;

function Students() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: '#',
      dataIndex: 'key'
    },
    {
      title: 'StudentNo',
      dataIndex: 'studentNo',
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/student/${record.key}`}>Edit</Link>
          <Popconfirm
            title="คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่"
            onConfirm={() => deleteStudent(record.key)}
            okText="ใช่"
            cancelText="ไม่"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const getStudent = () => {
    return fetch('http://localhost:8000/students')
      .then((res) => res.json())
      .then((d) => setData(mapDataStudents(d)))
  }
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        getStudent();
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const mapDataStudents = (students) => {
    const mapData = [];
    const options = { month: 'long', timeZone: 'Asia/Bangkok' };
    students.forEach((e) => {
      mapData.push({
        key: e.id,
        studentNo: e.studentNo || null,
        prefix: e.prefix.name || null,
        firstName: e.firstName || null,
        lastName: e.lastName || null,
        gender: e.gender.name || null,
        dateOfBirth: new Date(e.dateOfBirth).toLocaleString('th-TH', options) || null,
        grade: e.classRoom?.grade || null
      })
    });
    return mapData;
  }

  useEffect(() => {
    getStudent();
  }, []);

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
      const grades = [];
      for (let i = 0; i < 6; i++) {
        grades.push(
          <Option value={i}>{i + 1}</Option>
        )
      }
      return grades;
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
      const search = values.searchText;
      fetch(`http://localhost:8000/students?search=${search ? '?search='+search :'' }`)
        .then((res) => res.json())
        .then((d) => setData(mapDataStudents(d)))
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    };
    return (
      <>
        <div style={{
          textAlign: 'right',
        }}><Link to="/student"><Button type="primary" className="create-update-student" ><FileAddOutlined />เพิ่มนักเรียน</Button></Link></div>
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name={`searchText`}
                label={`StudentNo/FirstName/LastName`}
              >
                <Input placeholder="StudentNo/FirstName/LastName" />
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
      </>
    );
  };

  return (
    <>
      <AdvancedSearchForm />
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default Students;

