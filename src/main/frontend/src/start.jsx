import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstance from "./axiosInstance";
import './start.css';

function Start() {
    const navigate=useNavigate();
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

    useEffect(()=> {
        const timer=setTimeout(()=>{
            navigate("/login");
        }, 3000);
        return ()=> clearTimeout(timer);
        },[navigate]);  // 외부 변수 명시


    return (
        <div className="start-container">
            <img src={process.env.PUBLIC_URL + '/starbucks_logo.png'} alt="logo" style={{ width: '30vh' }} />
        </div>
    );
}

export default Start;
