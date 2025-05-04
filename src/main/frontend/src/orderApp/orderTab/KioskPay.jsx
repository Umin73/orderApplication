import React, {useEffect, useState} from 'react';
import { SlClose } from "react-icons/sl";

import "./KioskPay.css";
import Modal from "../../common/Modal";
import axiosInstance from "../../axiosInstance";
import {useNavigate} from "react-router-dom";

export default function KioskPay() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [requestNote, setRequestNote] = useState('');
    const [packagingOption, setPackagingOption] = useState('포장해주세요.');
    const [paymentOption, setPaymentOption] = useState('신용카드');

    const [modalMessage, setModalMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const fetchCart = async () => {
        try {
            const response = await axiosInstance.get('/cart/list');
            setCart(response.data);
        } catch (error) {
            console.error('장바구니 조회 실패:', error);
            setModalMessage('장바구니를 불러오는 데 실패했습니다.');
            setModalOpen(true);
        }
    };

    const handleOrder = async () => {
        try {
            console.log("paymentOption: ", paymentOption);
            await axiosInstance.post('/order/create', {
                requestNote,
                packagingOption,
                paymentOption,
            });
            setModalMessage('주문이 완료되었습니다.');
            setModalOpen(true);

            setTimeout(() => {
                navigate('/kiosk/main');
            }, 5000);
        } catch (error) {
            console.error('주문 실패:', error);
            setModalMessage('주문 처리 중 오류가 발생했습니다.');
            setModalOpen(true);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <>
            <div className="kiosk-pay-wrapper">
                {/* 1. 주문 상품 */}
                <div className="order-section">
                    <div className="order-header">
                        <span className="section-title">주문 상품</span>
                        <span className="order-summary">{cart[0]?.itemName} 외 {cart.length-1}건</span>
                    </div>
                    {cart.map((item, index) => (
                        <div key={index} className="order-item">
                            <img src={item.itemImageUrl} alt="상품 이미지" />
                            <div className="item-info">
                                <div>{item.itemName}</div>
                                <div>{item.quantity}개</div>
                            </div>
                            <div className="item-price">{item.totalPrice.toLocaleString()}원</div>
                        </div>
                    ))}
                </div>

                {/* 2. 요청사항 */}
                <div className="request-section">
                    <div className="section-title">요청사항</div>
                    <input
                        type="text"
                        className="request-input"
                        placeholder="매장 요청사항이 있으면 적어주세요."
                        value={requestNote}
                        onChange={e => setRequestNote(e.target.value)}
                    />
                    <div className="packaging-options">
                        <label>
                            <input type="radio" value="포장해주세요." checked={packagingOption === '포장해주세요.'} onChange={e => setPackagingOption(e.target.value)} /> 포장해주세요.
                        </label>
                        <label>
                            <input type="radio" value="매장에서 먹고 갈게요." checked={packagingOption === '매장에서 먹고 갈게요.'} onChange={e => setPackagingOption(e.target.value)} /> 매장에서 먹고 갈게요.
                        </label>
                    </div>
                </div>

                {/* 3. 결제 수단 */}
                <div className="payment-section" style={{marginTop:"20px"}}>
                    <div className="section-title">결제 수단</div>
                    <div className="payment-options">
                        {['신용카드', '간편카드결제', '네이버페이', '카카오페이'].map(option => (
                            <label key={option}>
                                <input type="radio" value={option} checked={paymentOption === option} onChange={e => setPaymentOption(e.target.value)} /> {option}
                            </label>
                        ))}
                    </div>
                </div>

                {/* 4. 결제 금액 */}
                <div className="price-section">
                    <div className="price-row">
                        <span>상품금액</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="price-row">
                        <span>할인금액</span>
                        <span>-0원</span>
                    </div>
                    <div className="price-row total">
                        <span>결제금액</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                </div>

                {/* 5. 안내사항 및 주문버튼 */}
                <div className="notice-section">
                    <ul className="notice-list">
                        <li>1. 매장 상황에 따라 주문이 불가할 수 있습니다.</li>
                        <li>2. 결제 후 주문 변경/취소는 불가합니다.</li>
                        <li>3. 일부 메뉴는 조기 품절될 수 있습니다.</li>
                    </ul>
                    <button className="pay-button" onClick={handleOrder}>주문하기</button>
                </div>
            </div>
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} message={modalMessage}/>
        </>

    );
}
