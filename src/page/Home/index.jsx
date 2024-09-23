import { useEffect, useState } from 'react'
import axios from 'axios';

import ButtonCustom from '../../compoments/Button'
import AntTableCustom from '../../compoments/nTable'

import { formatDate, formatPhone } from '../../utils/format';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';  
import { BaseURL } from '../../config/BaseAPi';


function HomePage() {
  // State để lưu giá trị tìm kiếm đầu vào
  const [Search, setSearch] = useState('');

  // State để lưu trữ tài nguyên được fetch từ server
  const [resources, setResources] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng từ react-router-dom

  const columns = [
    {
      title: 'Full Name', 
      dataIndex: 'name', 
      fixed: 'left', 
      width: 150, 
    },
    {
      title: 'Date Birth', 
      dataIndex: 'dateOfBirth',
    },
    {
      title: 'Sex', 
      dataIndex: 'sex',
      width: 80, 
    },
    {
      title: 'CCCD', 
      dataIndex: 'identityCard',
    },
    {
      title: 'Phone', 
      dataIndex: 'phoneNumber',
      width: 150, 
    },
    {
      title: 'Email', 
      dataIndex: 'email',
      width: 250, 
    },
    {
      title: 'Contract Type', 
      dataIndex: 'contract',
    },
    {
      title: 'Start Date', 
      dataIndex: 'startDate',
    },
    {
      title: 'End Date', 
      dataIndex: 'endDate',
    },
    {
      title: 'Action', 
      fixed: 'right', 
      width: 80, 
      render: (item) => (
        <>
          <div className='w-full flex justify-between'>
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer text-blue-500 text-xl transform transition-transform duration-200 hover:scale-110"
              onClick={() => navigate(`/update/${item?._id}`)}
            />

            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer text-red-500 text-xl transform transition-transform duration-200 hover:scale-110"
              onClick={(e) => handleDeleteResource(item?._id)}
            />
          </div>
        </>
      ),
    },
  ];

  // Hàm để fetch tài nguyên từ server và định dạng dữ liệu
  const getResource = async () => {
    await axios
      .get(`${BaseURL.url}/resources?search=${Search}`, { // Query tìm kiếm trên BE
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data?.length);
        const formattedData = response.data.map((item, index) => {
          return {
            key: index + 1, 
            ...item, // Spread các thuộc tính của item
            phoneNumber: formatPhone(item.phoneNumber),
            dateOfBirth: formatDate(item.dateOfBirth),  
            startDate: formatDate(item.startDate), 
            endDate: formatDate(item.endDate), 
          };
        });

        setResources(formattedData); // Cập nhật state với dữ liệu đã định dạng
        console.log(formattedData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Hàm xử lý xóa tài nguyên
  const handleDeleteResource = async (id) => {
    await axios
      .delete(`${BaseURL.url}/resources/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        getResource(); // Fetch lại tài nguyên sau khi xóa thành công
        alert("Delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("Delete fail");
      });
  };

  // useEffect để fetch tài nguyên khi component được mount hoặc khi giá trị tìm kiếm thay đổi
  useEffect(() => {
    getResource();
  }, [Search]);

  return (
    <div>
      {/* Thành phần Button tùy chỉnh để xử lý đầu vào tìm kiếm */}
      <ButtonCustom setSearch={setSearch} />
      {/* Thành phần Bảng tùy chỉnh để hiển thị tài nguyên */}
      <AntTableCustom data={resources} columnsTable={columns} />
    </div>
  );
}

export default HomePage;