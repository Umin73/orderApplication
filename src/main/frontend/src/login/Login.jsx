import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axiosInstance from "../axiosInstance";

function Login() {

    const navigate = useNavigate();

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

            console.log("accessToken: ", response.data.accessToken);
            console.log("refreshToken: ", response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            const userRole = response.data.userRole;

            console.log("로그인 성공:", response.data);
            alert("로그인에 성공했습니다");
            if(userRole === "guest"){
                navigate("/kiosk/main");
            } else if(userRole === "admin") {
                navigate("/admin");
            }
        } catch (error) {
            console.error("로그인 실패: ", error.response?error.response.data:error.message);
            alert("로그인 실패");
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="logo">STARBUCKS™</h1>
                <h2 className="welcome-text">안녕하세요.<br/>스타벅스입니다.</h2>
                <p className="description">
                    회원 서비스 이용을 위해 로그인 해주세요.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="아이디" name="userId" className="input-field" value={formData.userId} onChange={handleChange}/>
                    <input type="password" placeholder="비밀번호" name="userPw" className="input-field" value={formData.userPw} onChange={handleChange}/>
                    <div className="login-etc-tab">
                        <div><Link to="/find-id" style={{ textDecoration: "none", color: "inherit" }}>
                            아이디 찾기
                        </Link></div>
                        <div>|</div>
                        <div><Link to="/find-pw" style={{ textDecoration: "none", color: "inherit" }}>
                            비밀번호 찾기
                        </Link></div>
                        <div>|</div>
                        <div><Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
                            회원가입
                        </Link></div>
                    </div>
                    <button type="submit" className="login-button">로그인하기</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
