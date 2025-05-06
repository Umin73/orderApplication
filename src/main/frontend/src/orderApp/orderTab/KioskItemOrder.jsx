import React, {useEffect, useState} from 'react';
import axios from 'axios';

import "./KioskItemOrder.css";
import Modal from "../../common/Modal";
import axiosInstance from "../../axiosInstance";
import {useNavigate} from "react-router-dom";

export default function KioskItemOrder(item) {

    const navigate = useNavigate();

    const itemName = item.item.itemName;
    const itemDescription = item.item.itemDescription;
    const itemImageUrl = item.item.itemImageUrl;
    const itemPrice = item.item.itemPrice;

    const [itemCnt, setItemCnt] = useState(1);
    const [totalPrice, setTotalPrice] = useState(itemPrice);
    const [modalMessage, setModalMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/cart/add", {
                itemCode: item.item.itemCode,
                quantity: itemCnt,
            });
            console.log("아이템 카트에 넣기 성공");

            setModalMessage("장바구니에 추가되었습니다.");
            setModalOpen(true);

        } catch (error) {
            console.error("addToCart 요청 실패: ", error.response?error.response.data:error.message);
            setModalMessage("서버와 통신 오류가 발생했습니다.");
            setModalOpen(true);
        }
    }

    const handleDirectOrder = () => {
        navigate('/kiosk/pay', {
            state: {
                directOrder: true,
                item: item.item,
                quantity: itemCnt,
            }
        });
    }

    useEffect(() => {
        setTotalPrice(itemCnt * itemPrice);
    }, [itemCnt, itemPrice]);


    return (
        <>
            <div className="order-item-info-wrapper">
                <div className="order-item-info-img">
                    <img src={itemImageUrl} alt={itemName}/>
                </div>
                <div className="order-item-info-title">{itemName}</div>
                <div className="order-item-info-description">{itemDescription}</div>
            </div>

            <div className="order-item-quantity-wrapper">
                <div className="order-item-quantity-selector">
                    <div className="order-item-quantity-button" onClick={() => {
                        if (itemCnt > 1) {
                            setItemCnt(itemCnt - 1);
                        }
                    }}>-</div>
                    <div className="order-item-quantity-number">{itemCnt}</div>
                    <div className="order-item-quantity-button" onClick={() => {
                        if (itemCnt <= 100) {
                            setItemCnt(itemCnt + 1);
                        }
                    }}>+</div>
                </div>
                <div className="order-item-quantity-price">{itemPrice}</div>
            </div>

            <div className="order-item-total-price-wrapper">
                <div className="order-item-total-title">총 상품금액</div>
                <div className="order-item-total-price">{totalPrice}</div>
            </div>

            <div className="order-item-buttons-wrapper">
                <div className="order-item-button"
                     style={{backgroundColor: "#DBDBDB"}}
                     onClick={handleDirectOrder}>
                    바로 주문
                </div>
                <div className="order-item-button" style={{backgroundColor: "#4AA366", color:"white"}}
                onClick={handleAddToCart}>
                    장바구니 담기
                </div>
            </div>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} message={modalMessage} />

        </>

    );
}
