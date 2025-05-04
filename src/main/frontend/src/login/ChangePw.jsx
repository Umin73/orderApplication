import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Login.css';
import axiosInstance from "../axiosInstance";
import Modal from "../common/Modal";

function ChangePw() {

    const location = useLocation();
    const {userId} = location.state;

    const [userNewPw, setUserNewPw] = useState("")
    const [userNewPwCheck, setUserNewPwCheck] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const isButtonDisabled =
        !userNewPw.trim() ||
        !userNewPwCheck.trim() ||
        userNewPw !== userNewPwCheck;

    const handleUserNewPw = (e) => {
        setUserNewPw(e.target.value);
    };

    const handleUserNewPwCheck = (e) => {
        setUserNewPwCheck(e.target.value);
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!userNewPw || !userNewPwCheck) {
            setModalMessage("모든 입력값을 입력해주세요.");
            setModalOpen(true);
            return;
        }

        if (userNewPw !== userNewPwCheck) {
            setModalMessage("비밀번호가 일치하지 않습니다.");
            setModalOpen(true);
            return;
        }

        try {
            const response = await axiosInstance.post("/user/change-pw", {
                userId: userId,
                newPw: userNewPw
            });

            setModalMessage(response.data);
            setModalOpen(true);
        } catch (error) {
            console.error("비밀번호 변경 실패:", error.response ? error.response.data : error.message);
            setModalMessage("비밀번호 변경 중 오류가 발생했습니다.");
            setModalOpen(true);
        }
    };



    return (
        <div className="login-container">
            <div className="login-content">
                <h2 className="login-header">비밀번호 변경</h2>
                <p className="description">
                    새로운 비밀번호를 입력해주세요.
                </p>

                <div className="input-field-wrapper">
                    <div>
                        <input
                            type="password"
                            placeholder="새로운 비밀번호"
                            className="input-field"
                            value={userNewPw}
                            onChange={handleUserNewPw}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="새로운 비밀번호 확인"
                            className="input-field"
                            value={userNewPwCheck}
                            onChange={handleUserNewPwCheck}
                        />
                    </div>
                    {userNewPwCheck && userNewPw !== userNewPwCheck && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                            비밀번호가 일치하지 않습니다.
                        </p>
                    )}
                    <div>
                        <button
                            className="login-button"
                            onClick={handleChangePassword}
                            disabled={isButtonDisabled}>
                            비밀번호 변경
                        </button>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} message={modalMessage}/>

        </div>
    );
}

export default ChangePw;
