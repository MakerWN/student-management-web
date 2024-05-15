import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Col, Form, Input, Row, Select, Space, Popconfirm } from 'antd';


export default function AddStudentToClass() {
  const [classRoom, setClassRoom] = useState([]);
  const [classRoomDetail, setClassRoomDetail] = useState();
  const [students, setStudent] = useState([]);
  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState(null);
  const navigate = useNavigate();
  // const { Option } = Select;
  const columns = [
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
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    if (id) {
      getOneClassRoom()
    } else {
      getClassRoom();
      
    }
    getStudent();
  }, [])
  const getClassRoom = () => {
    return fetch('http://localhost:8000/classroom')
      .then((res) => res.json())
      .then((d) => setClassRoom(mapDataClassRoom(d)))
  }
  const getOneClassRoom = async () => {
    return fetch(`http://localhost:8000/classroom/${id}`)
      .then((res) => res.json())
      .then((d) => setClassRoomDetail(setDataClassRoom(d)))
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
  const setDataClassRoom = (classRoom) => {
    const mapData = {
      key: classRoom.id,
      classNo: classRoom.classNo || '',
      className: classRoom.className || '',
      year: Number(classRoom.year) + 543 || '',
      grade: classRoom.grade || '',
      teacher: classRoom.teacher || ''
    };
    console.log(mapData)
    return mapData;
  }
  const getStudent = () => {
    const path = id ? `http://localhost:8000/students?filter[classCode]=${id}` : `http://localhost:8000/students`;
    return fetch(path)
      .then((res) => res.json())
      .then((d) => setStudent(mapDataStudents(d)))
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
        gender: e.gender.id || null,
        dateOfBirth: new Date(e.dateOfBirth).toLocaleString('th-TH', options) || null,
        grade: e.classRoom?.grade || null
      })
    });
    return mapData;
  }

  const handleSelectChange = (e) => {
    setSelectedValue(e);
  };

  const addStudentToClassRoom = async () => {
    const formData = []
    selectedRowKeys.forEach((studentId) => {
      formData.push({
        id: studentId,
        classCode: selectedValue
      })
    })
    const response = await fetch(`http://localhost:8000/students/add-student-to-classroom`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      navigate('/classrooms');
    } else {
      console.error('Failed to send data');
    }
  }

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <h1>{id ? 'นำนักเรียนออกห้องเรียน' : 'เพิ่มนักเรียนเข้าห้องเรียน'}</h1>
      {id ?
        <div>
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <div style={{
              textAlign: 'left'
            }}>
              <Row gutter={24}>
                <Col span={8}>
                  <h3>เลขที่ห้อง</h3>
                  <span>{classRoomDetail ? classRoomDetail.classNo : ''}</span>
                </Col>
                <Col span={8}>
                  <h3>ชื่อห้อง</h3>
                  <span>{classRoomDetail ? classRoomDetail.className : ''}</span>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <h3>ปีการศึกษา</h3>
                  <span>{classRoomDetail ? classRoomDetail.year : ''}</span>
                </Col>
                <Col span={8}>
                  <h3>ครูประจำชั้น</h3>
                  <span>{classRoomDetail ? classRoomDetail.teacher : ''}</span>
                </Col>
              </Row>
            </div>

            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
            <div style={{
              textAlign: 'left'
            }}>
              <Form.Item>
                <Button type="primary" onClick={addStudentToClassRoom} disabled={!hasSelected} loading={loading} danger>
                  นำออก
                </Button>
              </Form.Item>
            </div>

          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={students} />
        </div>
        : <div>
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <div style={{
              textAlign: 'left'
            }}>
              <Space direction="horizontal">
                <Form.Item label="ประดับชั้น" name="classRoom" rules={[{ required: true, message: 'โปรดระบุประดับชั้น' }]}>
                  <Select placeholder="ระบุประดับชั้น" style={{ width: '200px' }} value={selectedValue} onChange={handleSelectChange}>
                    {
                      classRoom.map((item) => (
                        <Select.Option key={item.key} value={item.key}>{item.classNo}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={addStudentToClassRoom} disabled={!hasSelected} loading={loading}>
                    บันทึก
                  </Button>
                </Form.Item>
              </Space>
            </div>

            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={students} />
        </div>}
    </>
  )
}