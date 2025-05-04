import React, {use, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css';
import axiosInstance from "../axiosInstance";
import Modal from "../common/Modal";

function FindPw() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [authNum, setAuthNum] = useState("");

    const [findUserState, setFindUserState] = useState(false);
    const [validationState, setValidationState] = useState(false);
    const [message, setMessage] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleUserId = (e) => {
        setUserId(e.target.value);
    };

    const handleAuthNum = (e) => {
        setAuthNum(e.target.value);
    }

    const handleCheckUserId = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.get("/user/exist-userid", {
                params: {userId: userId}
            });
            const {success, message, userEmail} = response.data;

            console.log(message);
            setFindUserState(success);
            setMessage(message);
            setEmail(userEmail);

            if(success) {
                try{
                    const sendResponse = await axiosInstance.post("/user/send-email", {
                        email: userEmail
                    });
                    setModalMessage("계정에 등록된 이메일로 인증번호를 전송했습니다.");
                    setModalOpen(true);
                } catch (error) {
                    console.error("이메일 전송 요청 실패: ", error);
                }
            } else {
                setModalMessage("존재하지 않는 아이디 입니다.");
                setModalOpen(true);
            }

        } catch (error) {
            console.error("유저아이디 존재 여부 요청 실패: ", error.response?error.response.data:error.message);
            setModalMessage("서버와 통신 오류가 발생했습니다.");
            setModalOpen(true);
        }
    }

    const handleVerifyCode = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/user/verify-code", {
                email: email,
                code: authNum
            });

            const {success, message} = response.data;

            setValidationState(success);
            setMessage(message);
            setModalMessage(message);
            setModalOpen(true);
        } catch (error) {
            console.error("인증번호 확인 요청 실패: ", error.response?error.response.data:error.message);
            setModalMessage("서버와 통신 오류가 발생했습니다.");
            setModalOpen(true);
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h2 className="login-header">비밀번호 찾기</h2>
                <p className="description">
                    아이디를 입력해주세요.<br/>
                    계정에 등록된 이메일로 인증번호를 보내드립니다.
                </p>

                <div className="input-field-wrapper">
                    <div>
                        <input type="text" placeholder="아이디" name="userId" className="input-field" value={userId}
                               onChange={handleUserId}/>
                        <button className="login-button side-button" onClick={handleCheckUserId}>확인</button>
                    </div>
                </div>
                <div className="find-content">
                    <input type="text" placeholder="인증번호를 입력" className="input-field" value={authNum}
                           onChange={handleAuthNum} disabled={!findUserState}/>
                    <button
                        className="login-button side-button" onClick={handleVerifyCode} disabled={!findUserState}>
                        인증
                    </button>
                </div>

                {validationState && (
                    <div className="login-content" style={{display: "flex", justifyContent: "center"}}>
                        <div className="login-button" style={{width: "65%"}}
                             onClick={() => navigate("/change-pw", {state: {userId}})}>
                            비밀번호 변경하기
                        </div>
                    </div>
                )}

                <div className="login-etc-tab">
                    <div><Link to="/login" style={{textDecoration: "none", color: "inherit"}}>
                        로그인
                    </Link></div>
                    <div>|</div>
                    <div><Link to="/find-id" style={{textDecoration: "none", color: "inherit"}}>
                        아이디 찾기
                    </Link></div>
                    <div>|</div>
                    <div><Link to="/signup" style={{textDecoration: "none", color: "inherit"}}>
                        회원가입
                    </Link></div>
                </div>
            </div>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} message={modalMessage}/>

        </div>
    );
}

export default FindPw;
