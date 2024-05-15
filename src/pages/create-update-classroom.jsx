import React, { useState, useEffect } from "react";
import { Button, Form, Input, DatePicker, Select, } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/css/add-student.css'
import moment from 'moment';

export default function AddAndEditClassRoom() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const navigate = useNavigate();
  const { id } = useParams();
  const { Option } = Select;
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout = {
    labelCol: {
      span: 4,
    }
  }
  const buttonItemLayout = {
    wrapperCol: {
      offset: 4,
    },
  };

  useEffect(() => {
    if (id) {
      getOneClassRoom();
    }
  }, []);

  const getOneClassRoom = async () => {
    const response = await fetch(`http://localhost:8000/classroom/${id}`);
    const data = await response.json();
    form.setFieldsValue({
      id: data.id,
      classNo: data.classNo,
      className: data.className,
      year: Number(data.year),
      grade: Number(data.grade),
      teacher: data.teacher,
    });
  }

  const updateClassRoom = async (id, e) => {
    const formData = {
      classNo: e.classNo,
      className: e.className,
      year: e.year,
      grade: e.grade,
      teacher: e.teacher,
    }
    try {
      const response = await fetch(`http://localhost:8000/classroom/${id}`, {
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
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const addClassRoom = async (e) => {
    const formData = {
      classNo: e.classNo,
      className: e.className,
      year: e.year,
      grade: e.grade,
      teacher: e.teacher,
    }
    try {
      const response = await fetch('http://localhost:8000/classroom', {
        method: 'POST',
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
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const createOrUpdateClassRoom = (data) => {
    if (id) {
      updateClassRoom(id, data)
    } else {
      addClassRoom(data)
    }

  }

  const getYears = () => {
    const years = [];
    const current = new Date().getFullYear();
    for (let i = 20; i >= 0; i--) {
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
        <Option value={i}>{`ป.${i + 1}`}</Option>
      )
    }
    return grades;
  }

  return (
    <>
      <h1>{id ? 'แก้ไข' : 'เพิ่ม' }ข้อมูลห้องเรียน</h1>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        className="text-left"
        onValuesChange={onFormLayoutChange}
        onFinish={createOrUpdateClassRoom}
      >
        <Form.Item label="เลขห้อง" name="classNo" rules={[{ required: true, message: 'โปรดระบุรเลขห้อง' }]}>
          <Input placeholder="ระบุรเลขห้อง" />
        </Form.Item>
        <Form.Item label="ชื่อห้อง" name="className" rules={[{ required: true, message: 'โปรดระบุชื่อห้อง' }]}>
          <Input placeholder="ระบุชื่อห้อง" />
        </Form.Item>
        <Form.Item label="ปีการศึกษา" name="year" rules={[{ required: true, message: 'โปรดระบุปีการศึกษา' }]}>
          <Select placeholder="ระบุปีการศึกษา">
            {getYears()}
            {/* {
              getYears.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
              ))
            } */}

          </Select>
        </Form.Item>
        <Form.Item label="ประดับชั้น" name="grade" rules={[{ required: true, message: 'โปรดระบุประดับชั้น' }]}>
          <Select placeholder="ระบุประดับชั้น">
            {getGrade()}
            {/* {
              getGrade.map((item) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))
            } */}
          </Select>
        </Form.Item>
        <Form.Item label="ครูประจำชั้น" name="teacher">
          <Input placeholder="ระบุครูประจำชั้น" />
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>);
}