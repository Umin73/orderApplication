import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axiosInstance from "../axiosInstance";
import Modal from "../common/Modal";

function FindId() {

    const [email, setEmail] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [findId, setFindId] = useState("");

    const [validationState, setValidationState] = useState(false);
    const [message, setMessage] = useState("");
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleAuthNum = (e) => {
        setAuthNum(e.target.value);
    }

    const handleCheckEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.get("/user/exist-email", {
                params: {email: email}
            });

            const {success, message} = response.data;

            setValidationState(success);
            setMessage(message);

            // 이메일 인증 완료
            if(success) {
                setIsEmailConfirmed(true);
                try {
                    const sendResponse = await axiosInstance.post("/user/send-email", {
                        email: email
                    });
                    setModalMessage("이메일을 전송했습니다.");
                    setModalOpen(true);
                } catch (error2) {
                    console.error("이메일 전송 요청 실패: ", error2);
                }
            } else{
                setModalMessage("존재하지 않는 이메일 입니다.");
                setModalOpen(true);
            }

        } catch (error) {
            console.error("이메일 확인 요청 실패: ", error.response?error.response.data:error.message);
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

            setMessage(message);

            if(success) {
                try {
                    const response2 = await axiosInstance.get("/user/find-id", {
                        params: {email: email}
                    });
                    console.log("아이디 가져오기 요청 성공");

                    const {success, userId} = response2.data;
                    setFindId(userId);
                } catch (error2) {
                    console.error("아이디 가져오기 요청 실패: ", error2);
                }
            }
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
                <h2 className="login-header">아이디 찾기</h2>
                <p className="description">
                    가입된 계정의 이메일로 아이디를 알려드립니다.
                </p>

                <input type="email" placeholder="이메일" name="email" className="input-field" value={email}
                       onChange={handleEmail}/>
                <button className="login-button side-button" onClick={handleCheckEmail}>확인</button>

                <div className="find-content">
                    <input type="text" placeholder="인증번호를 입력" className="input-field" value={authNum}
                           onChange={handleAuthNum} disabled={!isEmailConfirmed}/>
                    <button
                        className="login-button side-button" onClick={handleVerifyCode} disabled={!isEmailConfirmed}>
                        인증
                    </button>
                </div>

                <div style={{minHeight: '50px', marginTop: '10px'}}>
                    {findId && (
                        <div className="findId_smallMsg">
                            <p className="notice">
                                인증하신 이메일로 등록된 아이디는 <b>{findId}</b> 입니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} message={modalMessage} />

        </div>
    );
}

export default FindId;
