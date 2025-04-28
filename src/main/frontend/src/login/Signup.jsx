import React from 'react';
import './Signup.css';

function Signup() {
    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="logo">STARBUCKS™</h1>
                <h2 className="welcome-text">회원가입</h2>
                <p className="description">
                    회원가입을 위해 아래의 폼을 작성해주세요.
                </p>

                <form className="signup-form">
                    <input type="text" placeholder="아이디" name="userId" className="input-field" />
                    <input type="password" placeholder="비밀번호" name="userPw" className="input-field"/>
                    <input type="password" placeholder="비밀번호 확인" name="userPwCheck" className="input-field" />
                    <input type="text" placeholder="이름" name="userName" className="input-field" />
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>

                <div className="login-link">
                    이미 계정이 있으신가요? <a href="#">로그인</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
