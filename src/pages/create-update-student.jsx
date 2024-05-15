import React, { useState, useEffect } from "react";
import { Button, Form, Input, DatePicker, Select, } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/css/add-student.css'
import moment from 'moment';

export default function AddAndEditStudent() {
  const [form] = Form.useForm();
  const [prefix, setPrefix] = useState([]);
  const [genders, setGender] = useState([]);
  const [formLayout, setFormLayout] = useState('horizontal');
  const navigate = useNavigate();
  const { id } = useParams();
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
    getPrefix();
    getGender();
    if (id) {
      getOneStudent();
    }
  }, []);

  const getOneStudent = async () => {
    const response = await fetch(`http://localhost:8000/students/${id}`);
    const data = await response.json();
    form.setFieldsValue({
      id: data.id,
      studentNo: data.studentNo,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: moment(data.dateOfBirth),
      prefix: data.prefix.id,
      gender: data.gender.id
    });
  }

  const getPrefix = () => {
    return fetch(`http://localhost:8000/prefixs`)
      .then((res) => res.json())
      .then((data) => setPrefix(data))
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
  const getGender = () => {
    return fetch(`http://localhost:8000/genders`)
      .then((res) => res.json())
      .then((data) => setGender(data))
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  const updateStudent = async (id,e) => {
    const formData = {
      dateOfBirth: moment(e.dateOfBirth).format('YYYY-MM-DD'),
      firstName: e.firstName,
      genderCode: e.gender,
      lastName: e.lastName,
      prefixCode: e.prefix,
      studentNo: e.studentNo
    }
    try {
      const response = await fetch(`http://localhost:8000/students/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/students');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const addStudent = async (e) => {
    const formData = {
      dateOfBirth: moment(e.dateOfBirth).format('YYYY-MM-DD'),
      firstName: e.firstName,
      genderCode: e.gender,
      lastName: e.lastName,
      prefixCode: e.prefix,
      studentNo: e.studentNo
    }
    try {
      const response = await fetch('http://localhost:8000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/students');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const createOrUpdateStudent = (data) => {
    if(id){
      updateStudent(id,data)
    }else{
      addStudent(data)
    }
    
  }

  return (
    <>
      <h1>เพิ่มข้อมูลนักเรียน</h1>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        className="text-left"
        onValuesChange={onFormLayoutChange}
        onFinish={createOrUpdateStudent}
      >
        <Form.Item label="รหัสนักเรียน" name="studentNo">
          <Input placeholder="ระบุรหัสนักเรียน" />
        </Form.Item>
        <Form.Item label="คำนำหน้าชื่อ" name="prefix">
          <Select placeholder="ระบุคำนำหน้าชื่อ" defaultValue={form ? form.prefix?.id : undefined}>
            {
              prefix.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
              ))
            }

          </Select>
        </Form.Item>
        <Form.Item label="ชื่อ" name="firstName">
          <Input placeholder="ระบุชื่อ" />
        </Form.Item>
        <Form.Item label="นามสกุล" name="lastName">
          <Input placeholder="ระบุนามสกุล" />
        </Form.Item>
        <Form.Item label="วัน/เดือน/ปีเกิด" name="dateOfBirth">
          <DatePicker placeholder="ระบุวัน/เดือน/ปีเกิด" />
        </Form.Item>
        <Form.Item label="เพศ" name="gender">
          <Select placeholder="ระบุเพศ">
            {
              genders.map((item) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>);
}