import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { BaseURL } from '../../config/BaseAPi';

const Update = () => {
    // State để lưu trữ dữ liệu form
    const [formData, setFormData] = useState({
        _id: '',           
        name: '',          
        dateOfBirth: '',   
        account: '',       
        sex: '',         
        phoneNumber: '',   
        identityCard: '',  
        email: '',         
        status: '',        
        contract: '',      
        startDate: '',     
        endDate: ''        
    });

    
    const { id } = useParams();
    console.log(id); // In ra ID để kiểm tra

    
    const [resource, setResource] = useState([]);

    // Hàm fetch dữ liệu từ API để cập nhật form
    const fetchData = async () => {
        await axios
            .get(`${BaseURL.url}/resources/${id}`, {
                withCredentials: true, 
            })
            .then(function (response) {
                
                setFormData(response.data);
            })
            .catch(function (error) {
                console.log(error); 
            });
    };

    // Chuyển đổi giá trị startDate, endDate, và dateOfBirth thành format "YYYY-MM-DD"
    const formattedDate = formData.startDate.split("T")[0];
    formData.startDate = formattedDate;

    const formattedDate1 = formData.endDate.split("T")[0];
    formData.endDate = formattedDate1;

    const formattedDate2 = formData.dateOfBirth.split("T")[0];
    formData.dateOfBirth = formattedDate2;

    // State để lưu trữ lỗi xác thực
    const [errors, setErrors] = useState({});

    // Hàm xử lý thay đổi dữ liệu trong các trường input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, 
        });
    };

    // Hàm kiểm tra xác thực form
    const validateForm = () => {
        const newErrors = {};
        
        for (const key in formData) {
            if (formData[key] === '') {
                newErrors[key] = 'This field is required'; 
            }
        }
        // Kiểm tra số điện thoại không chứa chữ
        if (formData.phone && /[a-zA-Z]/.test(formData.phone)) {
            newErrors.phone = 'Phone number cannot contain letters';
        }
        // Kiểm tra ngày sinh không được ở tương lai
        if (formData.dateOfBirth && new Date(formData.dateOfBirth) > new Date()) {
            newErrors.dateOfBirth = 'Date of Birth cannot be in the future';
        }
        // Kiểm tra ngày kết thúc không được trước ngày bắt đầu
        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            newErrors.endDate = 'End Date cannot be before Start Date';
        }

        return newErrors; 
    };

    // Hook useNavigate để điều hướng sau khi cập nhật thành công
    const navigator = useNavigate();

    
    const handleUpdateCategory = async (e) => {
        e.preventDefault(); 
        await axios
            .put(`${BaseURL.url}/resources/${id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, 
            })
            .then(function (response) {
                console.log(response); 
                navigator('/'); 
            })
            .catch(function (error) {
                console.log(error); 
            });
    };

    // useEffect để fetch dữ liệu khi component được mount
    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        <div className="w-[1024px] mx-auto p-8 ">
            <h1 className="text-2xl font-semibold mb-6">Update User</h1>
            <form onSubmit={handleUpdateCategory} className="space-y-4">
                {/* Sử dụng lưới để sắp xếp các trường thành 2 cột trên màn hình lớn hơn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Trường Full Name */}
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full min-w-[200px] max-w-[400px] px-3 py-2 border border-gray-300 rounded-md"
                            style={{ width: 'auto' }}
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>
                    {/* Trường Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                    </div>
                    {/* Trường Sex */}
                    <div>
                        <label className="block text-sm font-medium">Sex</label>
                        <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Lgbt">LGBT</option>
                        </select>
                        {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
                    </div>
                    {/* Trường Phone */}
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    {/* Trường CCCD/CMND */}
                    <div>
                        <label className="block text-sm font-medium">CCCD/CMND</label>
                        <input
                            type="text"
                            name="identityCard"
                            value={formData.identityCard}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.cccd && <p className="text-red-500 text-sm mt-1">{errors.cccd}</p>}
                    </div>
                    {/* Trường Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full min-w-[200px] max-w-[400px] px-3 py-2 border border-gray-300 rounded-md"
                            style={{ width: 'auto' }}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    {/* Trường Position */}
                    <div>
                        <label className="block text-sm font-medium">Position</label>
                        <select
                            name="account"
                            value={formData.account}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="Admin">Admin</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Tester">Tester</option>
                        </select>
                        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                    </div>
                    {/* Trường Status */}
                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                    </div>
                    {/* Trường Contract Type */}
                    <div>
                        <label className="block text-sm font-medium">Contract Type</label>
                        <select
                            name="contract"
                            value={formData.contract}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                        </select>
                        {errors.contract && <p className="text-red-500 text-sm mt-1">{errors.contract}</p>}
                    </div>
                    {/* Trường Start Date */}
                    <div>
                        <label className="block text-sm font-medium">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                    </div>
                    {/* Trường End Date */}
                    <div>
                        <label className="block text-sm font-medium">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                    </div>
                </div>
                {/* Nút Update */}
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Update User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;
