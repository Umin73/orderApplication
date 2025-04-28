import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="logo">STARBUCKS™</h1>
                <h2 className="welcome-text">안녕하세요.<br/>스타벅스입니다.</h2>
                <p className="description">
                    회원 서비스 이용을 위해 로그인 해주세요.
                </p>

                <form className="login-form">
                    <input type="text" placeholder="아이디" name="userId" className="input-field" />
                    <input type="password" placeholder="비밀번호" name="userPw" className="input-field"/>
                    <div className="login-etc-tab">
                        <div>아이디 찾기</div>
                        <div>|</div>
                        <div>비밀번호 찾기</div>
                        <div>|</div>
                        <div>회원가입 찾기</div>
                    </div>
                    <button type="submit" className="login-button">로그인하기</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
