import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from "../../common/Modal";
import axiosInstance from "../../axiosInstance";

import "./KioskMyInfo.css";

export default function KioskMyInfo() {
    const navigate = useNavigate();

    const [modalMessage, setModalMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [inputModalOpen, setInputModalOpen] = useState(false);
    const [inputLabel, setInputLabel] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [updateType, setUpdateType] = useState(""); // 'username' or 'email'

    const openInputModal = (label, type) => {
        setInputLabel(label);
        setUpdateType(type);
        setInputValue("");
        setInputModalOpen(true);
    };

    const handleInputSubmit = async () => {
        try {
            const endpoint = updateType === 'username' ? '/user/update-username' : '/user/update-email';
            const response = await axiosInstance.post(endpoint, inputValue, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            setModalMessage(response.data);
        } catch (error) {
            setModalMessage(error.response?.data || "정보 변경에 실패했습니다.");
        } finally {
            setInputModalOpen(false);
            setModalOpen(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setModalMessage("로그아웃 되었습니다.");
        setModalOpen(true);
        setTimeout(() => navigate("/"), 2000);
    };

    const handleDeleteUser = async () => {
        try {
            const response = await axiosInstance.delete("/user/delete");
            setModalMessage("회원 탈퇴가 완료되었습니다.");
            setConfirmModalOpen(false);
            setModalOpen(true);
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setModalMessage("회원 탈퇴에 실패했습니다.");
            setConfirmModalOpen(false);
            setModalOpen(true);
        }
    };

    return (
        <>
            <div className="my-info-container">
                <div className="my-info-wrapper">
                    <div className="my-info-title">이름</div>
                    <div className="my-info-button" onClick={() => openInputModal("새 이름", "username")}>변경</div>
                </div>
                <div className="my-info-wrapper">
                    <div className="my-info-title">이메일</div>
                    <div className="my-info-button" onClick={() => openInputModal("새 이메일", "email")}>변경</div>
                </div>
                <div className="my-info-wrapper">
                    <div className="my-info-title" onClick={handleLogout}>로그아웃</div>
                </div>
                <div className="my-info-wrapper">
                    <div className="my-info-title"  onClick={() => setConfirmModalOpen(true)}>회원 탈퇴</div>
                </div>
            </div>

            {/* 일반 결과 모달 */}
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} message={modalMessage}/>

            {/* 입력 모달 */}
            {inputModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{inputLabel}을 입력하세요</h3>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="modal-input"
                        />
                        <div className="modal-buttons">
                            <button onClick={() => setInputModalOpen(false)}>취소</button>
                            <button onClick={handleInputSubmit}>확인</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 탈퇴 확인 모달 */}
            {confirmModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>정말로 회원 탈퇴하시겠습니까?</h3>
                        <div className="modal-buttons">
                            <button onClick={() => setConfirmModalOpen(false)}>취소</button>
                            <button onClick={handleDeleteUser}>회원 탈퇴</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
