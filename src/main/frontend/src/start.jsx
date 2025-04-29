import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "./axiosInstance";
import './start.css';

function Login() {

    const [formData, setFormData] = useState({
        userId: '',
        userPw: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/user/login', {
                userId: formData.userId,
                userPw: formData.userPw,
            });

            console.log("로그인 성공:", response.data);
            alert("로그인에 성공했습니다");
        } catch (error) {
            console.error("로그인 실패: ", error.response?error.response.data:error.message);
            alert("로그인 실패");
        }
    }

    return (
        <div className="start-container">
            <img src={process.env.PUBLIC_URL + '/starbucks_logo.png'} alt="logo" style={{ width: '30vh' }} />
        </div>
    );
}

export default Login;
