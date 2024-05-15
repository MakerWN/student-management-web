import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table, Button, Col, Form, Input, Row, Select, Space, Popconfirm } from 'antd';
import {
  FileAddOutlined
} from '@ant-design/icons';
import '../assets/css/classroom.css'
const { Option } = Select;

export default function ClassRoom() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getClassRoom();
  }, [])

  const AdvancedSearchForm = () => {
    const [form] = Form.useForm();
    const formStyle = {
      maxWidth: 'none',
      padding: 24,
    };

    const onFinish = (values) => {
      const search = values.searchText;
      fetch(`http://localhost:8000/classroom${search ? '?search='+search :'' }`)
        .then((res) => res.json())
        .then((d) => setData(mapDataClassRoom(d)))
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

    };
    return (
      <>
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name={`searchText`}
                label={`ค้นหาข้อมูล เลขที่ห้อง/ชื่อห้อง/ครูประจำชั้น`}
              >
                <Input placeholder="เลขที่ห้อง/ชื่อห้อง/ครูประจำชั้น" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <div
                style={{
                  textAlign: 'left',
                }}
              >
                <Space size="small">
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Form>
      </>
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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/class-room/add-student/${record.key}`}>Detail</Link>
          <Link to={`/class-room/${record.key}`}>Edit</Link>
          <Popconfirm
            title="คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่"
            onConfirm={() => deleteClassRoom(record.key)}
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
  const getClassRoom = () => {
    return fetch('http://localhost:8000/classroom')
      .then((res) => res.json())
      .then((d) => setData(mapDataClassRoom(d)))
  }
  const mapDataClassRoom = (classRoom) => {
    const mapData = [];
    classRoom.forEach((e) => {
      mapData.push({
        key: e.id,
        classNo: e.classNo,
        className: e.className,
        year: Number(e.year) + 543,
        grade: e.grade,
        teacher: e.teacher
      })
    });
    return mapData;
  }
  const deleteClassRoom = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/classroom/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        getClassRoom();
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
  return (
    <>
      <div style={{
        textAlign: 'right',
      }}>
        <Link to="/class-room"><Button type="primary" className="add-classroom" ><FileAddOutlined />เพิ่มห้องเรียน</Button></Link>
        <Link to="/class-room/add-student"><Button type="primary" className="add-student-to-classroom" ><FileAddOutlined />เพิ่มนักเรียนเข้าห้อง</Button></Link>
      </div>
      <AdvancedSearchForm />
      <Table columns={columns} dataSource={data} />
    </>
  );
}



