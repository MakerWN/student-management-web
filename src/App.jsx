import React from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  TeamOutlined,
  TableOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

import Home from './pages/home';
import Students from './pages/students';
import ClassRoom from './pages/classrooms';
import AddAndEditStudent from './pages/create-update-student';
import AddAndEditClassRoom from './pages/create-update-classroom';
import AddStudentToClass from './pages/add-student-to-classroom';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: `/`,
    icon: <HomeOutlined />,
    label: `DashBoard`,
  },
  {
    key: `/students`,
    icon: <TeamOutlined />,
    label: `Students`,
  },
  {
    key: `/classrooms`,
    icon: <TableOutlined />,
    label: `Classroom`,
  }
];

function App() {
  let navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu onClick={({ key }) => { navigate(key) }} theme="dark" mode="inline" defaultSelectedKeys={['/']}  items={items} />
        </Sider>
        <Layout
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}>
            <div style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/students' element={<Students />}></Route>
                <Route path='/classrooms' element={<ClassRoom />}></Route>
                <Route path='/student' element={<AddAndEditStudent />}></Route>
                <Route path='/student/:id' element={<AddAndEditStudent />}></Route>
                <Route path='/class-room' element={<AddAndEditClassRoom />}></Route>
                <Route path='/class-room/:id' element={<AddAndEditClassRoom />}></Route>
                <Route path='/class-room/add-student' element={<AddStudentToClass />}></Route>
                <Route path='/class-room/add-student/:id' element={<AddStudentToClass />}></Route>
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
