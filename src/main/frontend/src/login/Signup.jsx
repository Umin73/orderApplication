import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import axiosInstance from "../axiosInstance";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: '',
        userPw: '',
        confirmPassword: '',
        username: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.userPw !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axiosInstance.post('/user/signup', {
                userId: formData.userId,
                userPw: formData.userPw,
                username: formData.username,
                email: formData.email,
                kakaouser: "일반유저",
                point: 0,
                role: "guest"
            });
            console.log('회원가입 성공: ',response.data);
            alert('회원가입에 성공하였습니다');
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패: ', error.response ? error.response.data : error.message);
            alert('회원가입 실패');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="logo">STARBUCKS™</h1>
                <h2 className="welcome-text">회원가입</h2>
                <p className="description">
                    회원가입을 위해 아래의 폼을 작성해주세요.
                </p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="아이디" name="userId" className="input-field" onChange={handleChange} />
                    <input type="password" placeholder="비밀번호" name="userPw" className="input-field" onChange={handleChange}/>
                    <input type="password" placeholder="비밀번호 확인" name="confirmPassword" className="input-field" onChange={handleChange}/>
                    <input type="text" placeholder="이름" name="username" className="input-field" onChange={handleChange} />
                    <input type="email" placeholder="이메일" name="email" className="input-field" onChange={handleChange} />
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>

                <div className="login-link">
                    이미 계정이 있으신가요?
                    <Link className="login-link-url" to="/login">
                    로그인
                </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
