import React, {useEffect, useState} from 'react';
import { SlClose } from "react-icons/sl";

import "./KioskCart.css";
import Modal from "../../common/Modal";
import axiosInstance from "../../axiosInstance";
import {useNavigate} from "react-router-dom";

export default function KioskCart() {

    const navigate = useNavigate();

    const [allItemTotalPrice, setAllItemTotalPrice] = useState(0);

    const [modalMessage, setModalMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [cart, setCart] = useState([]);

    const handleCartItemList = async () => {
        try {
            const response = await axiosInstance.get("/cart/list");

            console.log(response.data);

            setCart(response.data)


            // setModalMessage("장바구니에 추가되었습니다.");
            // setModalOpen(true);

        } catch (error) {
            console.error("addToCart 요청 실패: ", error.response?error.response.data:error.message);
            setModalMessage("서버와 통신 오류가 발생했습니다.");
            setModalOpen(true);
        }
    }

    const updateCartQuantity = async (itemCode) => {
        try {
            console.log("itemCode : " , itemCode);
            await axiosInstance.post("/cart/add", { itemCode, quantity: 1 }); // 수량 +1
            handleCartItemList(); // 목록 새로고침
        } catch (error) {
            console.error("수량 변경 실패:", error);
        }
    };

    const decreaseCartQuantity = async (itemCode) => {
        try {
            await axiosInstance.post("/cart/remove", { itemCode, quantity: 1 }); // 수량 -1
            handleCartItemList(); // 목록 새로고침
        } catch (error) {
            console.error("수량 감소 실패:", error);
        }
    };

    const deleteCartItem = async (itemCode, quantity) => {
        try {
            // 전체 수량 제거 = 해당 항목 삭제
            await axiosInstance.post("/cart/remove", { itemCode, quantity });
            handleCartItemList();
        } catch (error) {
            console.error("항목 삭제 실패:", error);
        }
    };


    useEffect(() => {
        handleCartItemList();
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
            setAllItemTotalPrice(total);
        } else {
            setAllItemTotalPrice(0);
        }
    }, [cart]);

    return (
        <>
            <div className="cart-item-list-wrapper">
                <div className="cart-item-list-title">
                    주문상품
                </div>
                <div className="cart-item-list">
                    {cart.map((item, index) => (
                        <div className="cart-item-list-item">
                            <div className="cart-item-list-item-img">
                                <img src={item.itemImageUrl} alt="장바구니-음료-이미지"/>
                            </div>
                            <div className="cart-item-list-item-info">
                                <div className="cart-item-list-item-info-top">
                                    <div className="cart-item-list-item-info-title">{item.itemName}</div>
                                    <SlClose className="cart-item-list-item-info-delete" onClick={() => deleteCartItem(item.itemCode, item.quantity)}/>
                                </div>
                                <div className="cart-item-list-item-info-bottom">
                                    <div className="cart-item-quantity-selector">
                                        <div className="cart-item-quantity-button" onClick={() => decreaseCartQuantity(item.itemCode)}>-
                                        </div>
                                        <div className="cart-item-quantity-number">{item.quantity}</div>
                                        <div className="cart-item-quantity-button" onClick={() => updateCartQuantity(item.itemCode)}>+</div>
                                    </div>
                                    <div className="cart-item-quantity-price">{item.totalPrice}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr/>
            <div className="cart-total-price-wrapper">
                <div className="cart-total-price-title">상품금액</div>
                <div className="cart-total-price">{allItemTotalPrice}</div>
            </div>

            <div className="cart-button-wrapper">
                <div className="cart-order-button" onClick={() => navigate("/kiosk/pay")}>
                    주문하기
                </div>
            </div>

            <Modal isOpen={modalOpen} setIsOpen={setModalOpen} message={modalMessage}/>
        </>

    );
}
