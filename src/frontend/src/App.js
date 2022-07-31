import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Row,
    Avatar,
} from 'antd';
import {
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
    DesktopOutlined,
    TeamOutlined,
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import StudentDrawerForm from './StudentDrawerForm';
import { useState, useEffect } from 'react';
import './App.css';

import { getAllStudents } from './client';

const { Content, Footer, Header, Sider } = Layout;

const TheAvatar = ({ name }) => {
    let trim = name.trim();
    // Default if no name
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined />} />;
    }

    const split = trim.split(' ');
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>;
    }

    return (
        <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>
    );
};

const columns = [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name} />,
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },

    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];

const loaderIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudents()
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                setFetching(false);
            });

    /**
     * Empty Array on second args mean zero dependencies
     */
    useEffect(() => {
        console.log('Component is mounted');
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={loaderIcon} />;
        }

        if (students <= 0) {
            return <Empty />;
        }

        return (
            <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Table
                    rowKey={(student) => student.id}
                    dataSource={students}
                    columns={columns}
                    bordered
                    title={() => (
                        <>
                            <Row
                                style={{
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                }}>
                                <Tag style={{ marginLeft: '10px' }}>
                                    Number of students
                                </Tag>
                                <Badge
                                    className="site-badge-count-4"
                                    count={students.length}
                                />
                            </Row>
                            <Button
                                onClick={() => setShowDrawer(!showDrawer)}
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined />}
                                size="medium">
                                Add New Student
                            </Button>
                        </>
                    )}
                />
            </>
        );
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360 }}>
                        {renderStudents()}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2022 Created by Linssen
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;
