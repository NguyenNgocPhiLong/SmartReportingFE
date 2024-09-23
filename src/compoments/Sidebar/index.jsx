import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';


// Sidebar component, nhận prop `children` để hiển thị nội dung chính
const Sidebar = ({ children }) => {
    
    const menuItems = [
        {
            key: '1',
            path: "/",
            name: "Resource",

        },
        {
            key: '2',
            path: "/project",
            name: "Project",

        },
        {
            key: '3',
            path: "/process",
            name: "Process",

        },
        {
            key: '4',
            path: "/task",
            name: "Task",

        },
    ];

    // Hàm xử lý sự kiện khi một mục menu được chọn
    const handleClick = (e) => {
        console.log('click ', e);
    };

    return (
        <div className="container flex">
            {/* Sidebar chứa các liên kết điều hướng */}
            <Menu
                onClick={handleClick}
                style={{ width: 256, height: '100vh' }}
                mode="inline"
                items={menuItems.map(item => ({
                    key: item.key,
                    icon: item.icon,
                    label: <NavLink to={item.path}>{item.name}</NavLink>
                }))}
            />
            {/* Main area để hiển thị nội dung của từng trang */}
            <div className='flex-1'>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Sidebar;
